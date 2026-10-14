"use server";

import { refresh } from "next/cache";
import { checkSetupCode, deleteRiotApiKey, saveRiotApiKey } from "@/lib/secrets";
import { validateRiotApiKey } from "@/lib/riot";

export interface KeyFormState {
  ok?: boolean;
  message?: string;
}

const KEY_FORMAT = /^RGAPI-[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function authorize(form: FormData): Promise<string | undefined> {
  const result = await checkSetupCode(String(form.get("setupCode") ?? ""));
  if (result === "locked") return "Too many wrong setup codes. Try again in 10 minutes.";
  if (result === "wrong") return "Wrong setup code. It's printed in the terminal where the server is running.";
}

/** One action for the form: the clicked button sends intent=save or intent=delete. */
export async function keyAction(_prev: KeyFormState, form: FormData): Promise<KeyFormState> {
  const denied = await authorize(form);
  if (denied) return { ok: false, message: denied };

  if (form.get("intent") === "delete") {
    await deleteRiotApiKey();
    refresh();
    return { ok: true, message: "Key removed from this server." };
  }

  const key = String(form.get("apiKey") ?? "").trim();
  if (!KEY_FORMAT.test(key)) return { ok: false, message: "That doesn't look like a Riot key (RGAPI-…)." };

  const check = await validateRiotApiKey(key);
  if (check === "rejected") return { ok: false, message: "Riot rejected this key. Is it expired? Generate a new one." };
  if (check === "unreachable") return { ok: false, message: "Couldn't reach Riot to check the key. Try again." };

  await saveRiotApiKey(key);
  refresh();
  return { ok: true, message: "Key saved and verified with Riot." };
}
