import Screen from "@components/screen";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allPostQuery } from "@/sanity/lib/queries";
import { AllPostQueryResult } from "@/sanity.types";
import ProjectCard from "@/app/_components/project-card";

export default async function WorkPage() {
  const data: AllPostQueryResult = await sanityFetch({ query: allPostQuery });

  return (
    <Screen id="work" className="!pt-[16.67svh] ">
      {data.map((project) => (
        <ProjectCard key={project._id} project={project} />
      ))}
    </Screen>
  );
}
