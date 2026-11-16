import type { Metadata } from "next";

import { sanityFetch } from "@/sanity/lib/fetch";
import { projectMetaQuery } from "@/sanity/lib/queries";

type Props = { params: Promise<{ slug: string }> };

function safeDecode(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = safeDecode((await params).slug);
  const project = await sanityFetch({
    query: projectMetaQuery,
    params: { slug },
    // Metadata should never contain stega
    stega: false,
  });

  if (!project) return {};

  const title = project.name ?? undefined;
  const text =
    typeof project.description === "string"
      ? project.description.replace(/\s+/g, " ").trim()
      : "";
  const description = text ? text.slice(0, 160) : undefined;
  const canonical = `/work/${encodeURIComponent(project.slug || slug)}`;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      images: project.image ? [project.image] : undefined,
    },
  };
}

// The project itself is rendered by <Content> in the layout.
export default function ProjectPage() {
  return <></>;
}
