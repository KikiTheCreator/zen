import Link from "next/link";
import { notFound } from "next/navigation";
import { LESSONS, type LessonId } from "@zen/core";

export async function generateStaticParams() {
  return Object.keys(LESSONS).map((lessonId) => ({ lessonId }));
}

export default async function LessonPage({ params }: PageProps<"/learn/[lessonId]">) {
  const { lessonId } = await params;
  const lesson = LESSONS[lessonId as LessonId];
  if (!lesson) notFound();

  return (
    <article className="max-w-2xl space-y-5">
      <Link href="/learn" className="text-sm text-ink/50 hover:text-ink">
        ← All lessons
      </Link>
      <h1 className="text-3xl font-semibold">{lesson.title}</h1>
      <p className="text-lg text-ink/75">{lesson.summary}</p>
      <ul className="list-disc space-y-2 pl-5 text-ink/85">
        {lesson.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <div className="rounded-lg border border-emerald-500/30 bg-emerald-500/5 p-4">
        <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Drill</p>
        <p className="mt-1 text-ink/80">{lesson.drill}</p>
      </div>
    </article>
  );
}
