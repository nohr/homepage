import Screen from "@components/screen";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allPostQuery } from "@/sanity/lib/queries";
import { AllPostQueryResult } from "@/sanity.types";
import Projects from "./projects";

export default async function WorkPage() {
  const data: AllPostQueryResult = await sanityFetch({ query: allPostQuery });

  return (
    <Screen id="work" className="!pt-[16.67svh] ">
      <Projects data={data} />
    </Screen>
  );
}
