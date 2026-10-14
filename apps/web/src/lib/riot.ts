import "server-only";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { cacheLife } from "next/cache";
import { notFound } from "next/navigation";
import { getRiotApiKey } from "./secrets";
import {
  accountRegionOf,
  platformOfMatchId,
  regionOf,
  type Account,
  type Match,
  type Platform,
  type Timeline,
} from "@zen/core";

// Riot Web API client. The key never leaves the server.
// Finished matches never change, so they're stored on disk forever (swap for R2 in production).

export class RiotError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}

const MAX_RETRIES = 3;
const CACHE_DIR = path.join(process.cwd(), ".zen-cache");

async function riotFetch<T>(host: string, pathname: string): Promise<T> {
  const { key } = await getRiotApiKey();
  if (!key) throw new RiotError(500, "No Riot API key yet. Add one at /settings.");

  for (let attempt = 0; ; attempt++) {
    const res = await fetch(`https://${host}.api.riotgames.com${pathname}`, {
      headers: { "X-Riot-Token": key },
      cache: "no-store",
    });
    if (res.ok) return (await res.json()) as T;
    if (res.status === 429 && attempt < MAX_RETRIES) {
      const wait = Number(res.headers.get("Retry-After") ?? 1);
      await new Promise((r) => setTimeout(r, wait * 1000));
      continue;
    }
    if (res.status === 401 || res.status === 403) {
      throw new RiotError(
        res.status,
        "Riot rejected the API key. Development keys expire every 24 hours: set a new one at /settings.",
      );
    }
    throw new RiotError(res.status, `Riot API ${res.status} on ${pathname}`);
  }
}

async function diskCached<T>(name: string, load: () => Promise<T>): Promise<T> {
  const file = path.join(CACHE_DIR, `${name}.json`);
  try {
    return JSON.parse(await readFile(file, "utf8")) as T;
  } catch {
    const value = await load();
    await mkdir(CACHE_DIR, { recursive: true });
    await writeFile(file, JSON.stringify(value));
    return value;
  }
}

// Errors thrown inside "use cache" are redacted in production, so cached loaders return a
// result object instead and the public wrappers re-throw outside the cache. Failures are
// cached only briefly.
type Settled<T> = { ok: true; value: T } | { ok: false; status: number; message: string };

async function settle<T>(promise: Promise<T>): Promise<Settled<T>> {
  try {
    return { ok: true, value: await promise };
  } catch (e) {
    cacheLife("seconds");
    const status = e instanceof RiotError ? e.status : 500;
    return { ok: false, status, message: e instanceof Error ? e.message : "Unknown error" };
  }
}

function unwrap<T>(result: Settled<T>): T {
  if (!result.ok) throw new RiotError(result.status, result.message);
  return result.value;
}

async function cachedAccount(platform: Platform, gameName: string, tagLine: string) {
  "use cache";
  cacheLife("hours");
  return settle(
    riotFetch<Account>(
      accountRegionOf(platform),
      `/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`,
    ),
  );
}

export async function getAccount(platform: Platform, gameName: string, tagLine: string): Promise<Account> {
  return unwrap(await cachedAccount(platform, gameName, tagLine));
}

/** Summoner's Rift queues: 400 normal draft, 420 ranked solo, 440 ranked flex, 490 quickplay. */
const SR_QUEUES = new Set([400, 420, 440, 490]);

async function cachedMatchIds(platform: Platform, puuid: string, count: number) {
  "use cache";
  cacheLife("minutes");
  const host = regionOf(platform);
  const base = `/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}`;
  return settle(
    riotFetch<string[]>(host, `${base}&type=ranked`).then((ranked) =>
      // Not enough ranked games: include normals so new players still see something.
      ranked.length >= count ? ranked : riotFetch<string[]>(host, base),
    ),
  );
}

export async function getMatchIds(platform: Platform, puuid: string, count = 10): Promise<string[]> {
  return unwrap(await cachedMatchIds(platform, puuid, count));
}

function matchHost(matchId: string) {
  const platform = platformOfMatchId(matchId);
  if (!platform) throw new RiotError(400, `Unknown match id ${matchId}`);
  return regionOf(platform);
}

export function getMatch(matchId: string): Promise<Match> {
  return diskCached(`match-${matchId}`, () => riotFetch<Match>(matchHost(matchId), `/lol/match/v5/matches/${matchId}`));
}

export function getTimeline(matchId: string): Promise<Timeline> {
  return diskCached(`timeline-${matchId}`, () =>
    riotFetch<Timeline>(matchHost(matchId), `/lol/match/v5/matches/${matchId}/timeline`),
  );
}

export function isSummonersRift(match: Match) {
  return match.info.mapId === 11 && SR_QUEUES.has(match.info.queueId);
}

/** Run a Riot data load; 404 → Next.js not-found page, other errors are returned for display. */
export async function attempt<T>(load: () => Promise<T>): Promise<{ data: T } | { error: unknown }> {
  try {
    return { data: await load() };
  } catch (e) {
    if (e instanceof RiotError && e.status === 404) notFound();
    return { error: e };
  }
}

/** Check a key against Riot before saving it (status endpoint, cheap and always available). */
export async function validateRiotApiKey(key: string): Promise<"ok" | "rejected" | "unreachable"> {
  try {
    const res = await fetch("https://na1.api.riotgames.com/lol/status/v4/platform-data", {
      headers: { "X-Riot-Token": key },
      cache: "no-store",
    });
    if (res.ok) return "ok";
    return res.status === 401 || res.status === 403 ? "rejected" : "unreachable";
  } catch {
    return "unreachable";
  }
}
