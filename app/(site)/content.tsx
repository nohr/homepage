"use client";

import CustomPortableText from "@/app/_components/portable-text";
import Screen from "../_components/screen";
import { AllPostQueryResult, InfoQueryResult } from "@/sanity.types";
import ProjectList from "@/app/_components/project-list";
import { Suspense, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLenis } from "lenis/react";

export default function Content({
  info,
  posts,
}: {
  info: InfoQueryResult;
  posts: AllPostQueryResult;
}) {
  const pathname = usePathname();
  const lenis = useLenis();

  useEffect(() => {
    if (pathname.split("/")[1])
      lenis?.scrollTo(`#${pathname.split("/")[1]}`, { offset: -90 });
    else lenis?.scrollTo(0);
  }, [pathname, lenis]);

  return (
    <>
      {/* homepage */}
      <Screen className="h-screen p-4 md:p-0">
        <CustomPortableText
          className="w-full justify-self-center md:justify-self-auto  col-span-full row-start-3 row-span-1 md:col-start-5 md:row-start-4 md:col-span-3 md:row-span-2 indent-12 dark:!text-white"
          //@ts-expect-error stupid types
          value={info[0].bio}
        />
      </Screen>
      {/* Projects */}
      <Screen id="work" className="!pt-[16.67svh] min-h-svh">
        <Suspense fallback={null}>
          <ProjectList projects={posts} />
        </Suspense>
      </Screen>
      {/* About */}
      <Screen id="about" className="!pt-[25svh] min-h-screen p-4 md:p-0">
        <h1 className="row-start-1">About</h1>
        <p className="md:col-start-5 md:row-start-2 md:col-span-3 md:row-span-2 row-start-2 ">
          This page is currently under construction. <br /> Please reach me via
          email: hi[at]aitenoria.com
        </p>
      </Screen>
    </>
  );
}
