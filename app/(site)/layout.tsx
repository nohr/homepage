import "../globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { VisualEditing } from "next-sanity";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";

import Nav from "@components/nav";

import ScrollWrapper from "../_components/scroll-wrapper";
import { allPostQuery, infoQuery, tagQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import Canva from "../(3D)/Canvas";
import Content from "./content";
import { Suspense } from "react";
// import { resolveOpenGraphImage } from "@/sanity/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  // const settings = await sanityFetch({
  //   query: settingsQuery,
  //   // Metadata should never contain stega
  //   stega: false,
  // });
  const title = "aitenoria.com";
  const description =
    "creative technologist and software engineer crafting experiences that reward a shift in perspective.";

  // const ogImage = resolveOpenGraphImage(settings?.ogImage);
  // let metadataBase: URL | undefined = undefined;
  // try {
  //   metadataBase = settings?.ogImage?.metadataBase
  //     ? new URL(settings.ogImage.metadataBase)
  //     : undefined;
  // } catch {
  //   // ignore
  // }
  return {
    // metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: description,
    // openGraph: {
    //   images: ogImage ? [ogImage] : [],
    // },
  };
}

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isEnabled: isDraftMode } = await draftMode();
  const tags = await sanityFetch({ query: tagQuery });
  const info = await sanityFetch({ query: infoQuery });
  const posts = await sanityFetch({ query: allPostQuery });

  return (
    <html
      lang="en"
      className={`${inter.variable} text-[13px] bg-white text-black dark:bg-black dark:text-white`}
    >
      <body>
        <ScrollWrapper>
          <Nav tags={tags} />
          <main>
            {children}
            <Content info={info} posts={posts} />
          </main>
          {isDraftMode && <VisualEditing />}
          <SpeedInsights />
          <Analytics />
        </ScrollWrapper>
        <Canva />
      </body>
    </html>
  );
}
