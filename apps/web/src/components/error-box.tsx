export function ErrorBox({ error }: { error: unknown }) {
  const message = error instanceof Error ? error.message : "Something went wrong.";
  return (
    <div className="rounded-lg border border-rose-500/40 bg-rose-500/10 p-4 text-sm">
      <p className="font-medium text-rose-700 dark:text-rose-300">Couldn&apos;t load data from Riot</p>
      <p className="mt-1 text-ink/70">{message}</p>
    </div>
  );
}
