import "server-only";
import { randomBytes, timingSafeEqual } from "node:crypto";
import { chmod, mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";

// The Riot API key lives only on the server: in RIOT_API_KEY (env) or in a 0600 file written
// by the settings page. It is never sent back to the browser.
// Changing the key from the settings page needs a setup code that is generated on each server
// start and printed in the server's terminal, so other people on the network can't replace it.

const DIR = path.join(process.cwd(), ".zen-secrets");
const KEY_FILE = path.join(DIR, "riot-api-key");
const CODE_FILE = path.join(DIR, "setup-code");

let fileKey: string | undefined;
let loaded = false;

async function ensureDir() {
  await mkdir(DIR, { recursive: true, mode: 0o700 });
  await chmod(DIR, 0o700);
}

export async function getRiotApiKey(): Promise<{ key?: string; source?: "env" | "file" }> {
  if (process.env.RIOT_API_KEY) return { key: process.env.RIOT_API_KEY, source: "env" };
  if (!loaded) {
    fileKey = (await readFile(KEY_FILE, "utf8").catch(() => "")).trim() || undefined;
    loaded = true;
  }
  return fileKey ? { key: fileKey, source: "file" } : {};
}

export async function saveRiotApiKey(key: string) {
  await ensureDir();
  await writeFile(KEY_FILE, key, { mode: 0o600 });
  await chmod(KEY_FILE, 0o600);
  fileKey = key;
  loaded = true;
}

export async function deleteRiotApiKey() {
  await rm(KEY_FILE, { force: true });
  fileKey = undefined;
  loaded = true;
}

/** Called once at server start (instrumentation.ts). */
export async function createSetupCode(): Promise<string> {
  // 10 chars from an unambiguous alphabet, shown as XXXXX-XXXXX.
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = randomBytes(10);
  const raw = [...bytes].map((b) => alphabet[b % alphabet.length]).join("");
  const code = `${raw.slice(0, 5)}-${raw.slice(5)}`;
  await ensureDir();
  await writeFile(CODE_FILE, code, { mode: 0o600 });
  await chmod(CODE_FILE, 0o600);
  return code;
}

const MAX_FAILURES = 5;
const LOCK_MS = 10 * 60_000;
let failures = 0;
let lockedUntil = 0;

export async function checkSetupCode(input: string): Promise<"ok" | "wrong" | "locked"> {
  if (Date.now() < lockedUntil) return "locked";
  const expected = (await readFile(CODE_FILE, "utf8").catch(() => "")).trim();
  const given = input.trim().toUpperCase();
  const ok =
    expected.length > 0 &&
    given.length === expected.length &&
    timingSafeEqual(Buffer.from(given), Buffer.from(expected));
  if (ok) {
    failures = 0;
    return "ok";
  }
  if (++failures >= MAX_FAILURES) {
    failures = 0;
    lockedUntil = Date.now() + LOCK_MS;
    return "locked";
  }
  return "wrong";
}
