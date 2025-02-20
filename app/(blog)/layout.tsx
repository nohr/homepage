import "../globals.css";

import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import {
  VisualEditing,
  toPlainText,
  type PortableTextBlock,
} from "next-sanity";
import { Inter } from "next/font/google";
import { draftMode } from "next/headers";

import Home from "./home";
import About from "./about";
import Work from "./work";
import Nav from "@components/nav";
import AlertBanner from "./alert-banner";
import PortableText from "./portable-text";

import * as demo from "@/sanity/lib/demo";
import { sanityFetch } from "@/sanity/lib/fetch";
import { settingsQuery, allPostQuery } from "@/sanity/lib/queries";
import { resolveOpenGraphImage } from "@/sanity/lib/utils";
import { AllPostQueryResult } from "@/sanity.types";

export async function generateMetadata(): Promise<Metadata> {
  const settings = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false,
  });
  const title = settings?.title || "aitenoria.com";
  const description = settings?.description || demo.description;

  const ogImage = resolveOpenGraphImage(settings?.ogImage);
  let metadataBase: URL | undefined = undefined;
  try {
    metadataBase = settings?.ogImage?.metadataBase
      ? new URL(settings.ogImage.metadataBase)
      : undefined;
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title,
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
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
  const data: AllPostQueryResult = await sanityFetch({ query: allPostQuery });
  const { isEnabled: isDraftMode } = await draftMode();

  return (
    <html
      lang="en"
      className={`${inter.variable} text-[13px] bg-white text-black dark:bg-black dark:text-white`}
    >
      <body>
        <section className="min-h-screen">
          {isDraftMode && <AlertBanner />}
          <main className="snap-mandatory">
            <Nav />
            <Home />
            <Work data={data} />
            <About data={data} />
            {children}
          </main>
        </section>
        {isDraftMode && <VisualEditing />}
        <SpeedInsights />
      </body>
    </html>
  );
}
