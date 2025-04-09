import Screen from "@components/screen";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allPostQuery } from "@/sanity/lib/queries";
import { AllPostQueryResult } from "@/sanity.types";
import ProjectList from "@/app/_components/project-list";
import { Suspense } from "react";
import PreviewContent from "@/app/_components/preview-content";

export default async function WorkPage() {
  const data: AllPostQueryResult = await sanityFetch({ query: allPostQuery });

  return (
    <Screen id="work" className="!pt-[16.67svh] min-h-screen">
      <Suspense>
        {/* <div className="!hidden md:!flex md:col-span-4 items-start order-2"> */}
        {/*   <PreviewContent /> */}
        {/* </div> */}
        <ProjectList projects={data} />
      </Suspense>
    </Screen>
  );
}
