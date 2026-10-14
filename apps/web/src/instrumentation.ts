export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;
  const { createSetupCode } = await import("./lib/secrets");
  const code = await createSetupCode();
  console.log(`\n  Zen setup code (needed to set the Riot API key at /settings): ${code}\n`);
}
