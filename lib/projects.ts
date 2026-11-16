/**
 * Small pure helpers for addressing and describing projects.
 * Kept free of React and Sanity imports so they can be used anywhere,
 * including inside the R3F canvas.
 */

type WithKey = { _id: string; slug?: string | null };

type WithTags = {
  medium?: string | null;
  tags?: Array<{ slug?: string | null; title?: string | null }> | null;
};

/** The URL key for a project. Falls back to `_id` until a slug is generated. */
export function projectKey(project: WithKey): string {
  return project.slug || project._id;
}

function tagQuery(tag?: string | null): string {
  return tag ? `?t=${encodeURIComponent(tag)}` : "";
}

/** `/work/<key>`, keeping the active tag filter if there is one. */
export function projectHref(project: WithKey, tag?: string | null): string {
  return `/work/${encodeURIComponent(projectKey(project))}${tagQuery(tag)}`;
}

/** `/work`, keeping the active tag filter if there is one. */
export function workHref(tag?: string | null): string {
  return `/work${tagQuery(tag)}`;
}

/** The key in `/work/<key>`, or `""` when no project is open. */
export function openProjectKey(pathname: string | null | undefined): string {
  if (!pathname) return "";
  const [, section, key] = pathname.split("/");
  if (section !== "work" || !key) return "";
  try {
    return decodeURIComponent(key);
  } catch {
    return key;
  }
}

/** True if any tag slug matches; otherwise falls back to the legacy `medium`. */
export function matchesTag(project: WithTags, tag?: string | null): boolean {
  if (!tag) return true;
  if (project.tags?.some((t) => t?.slug === tag)) return true;
  return project.medium === tag;
}

/** Uses `orientation` if set, else the legacy "rank 3 means portrait". */
export function isPortrait(project: {
  orientation?: string | null;
  rank?: number | null;
}): boolean {
  if (project.orientation) return project.orientation === "portrait";
  return project.rank === 3;
}

/** `year`, else the year of `date`. */
export function projectYear(project: {
  year?: number | null;
  date?: string | null;
}): number | null {
  if (typeof project.year === "number") return project.year;
  if (!project.date) return null;
  const year = new Date(project.date).getFullYear();
  return Number.isNaN(year) ? null : year;
}

/** First tag title, else the legacy `medium`. */
export function projectMedium(project: WithTags): string | null {
  const title = project.tags?.find((t) => t?.title)?.title;
  return title || project.medium || null;
}
