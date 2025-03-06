import Screen from "@components/screen";
import Image from "next/image";
import { sanityFetch } from "@/sanity/lib/fetch";
import { allPostQuery } from "@/sanity/lib/queries";
import PortableText from "../portable-text";
import { AllPostQueryResult } from "@/sanity.types";
import VimeoVideo from "@/app/_components/vimeo-video";
import { Suspense } from "react";

export default async function WorkPage() {
  const data: AllPostQueryResult = await sanityFetch({ query: allPostQuery });
  const rank_styles = [
    "grid-cols-2 grid-rows-[1fr_1fr_0.5fr] col-span-4 h-[25vw]",
    "grid-cols-2 grid-rows-[1fr_1fr_0.5fr] col-span-6 h-[40vw]",
    "grid-cols-2 grid-rows-[1fr_1fr_0.5fr] col-span-12 h-[65vw]",
    "grid-cols-2 grid-rows-[1fr_1fr_0.5fr] col-span-4 h-[72vw]",
    "grid-cols-2 grid-rows-[1fr_1fr_0.5fr] col-span-8 h-[40vw]",
    "grid-cols-2 grid-rows-[1fr_1fr_0.5fr] col-span-8 h-full",
  ];

  function projectByID(id: string) {
    return data.find(({ _id }) => _id === id);
  }

  const daetyas = projectByID("1883c802-878c-4ffe-b378-8a60031967c5");
  const fiathouse = projectByID("16af5ef9-b1be-441f-9fd4-9e2128cd3721");
  const nestcenter = projectByID("22011f8d-c502-40ea-b892-70c8502bcb5b");
  const tour360 = projectByID("9d7514d7-62a4-4217-a0b2-ffc1eaab738a");
  const handposeui = projectByID("88c5cf84-d93e-4f0c-8941-0245e6cd68d6");
  const geese3dcountry = projectByID("7da1ff09-1e3e-41b8-ad2f-0ce36997e52b");
  const gear = projectByID("598d9491-87aa-48e4-a3b1-c6e47087ab45");
  const nabla = projectByID("b3a2c645-c49d-4c65-85ff-e35525e4c9de");
  const kamaladisa = projectByID("f087069d-e928-4bf5-926a-93a2c9e4ca15");
  const afterdarkdigital = projectByID("955694c9-5c54-40a6-8c74-0eaf6f9e55ef");
  const bizzle = projectByID("abcdacd1-0654-428a-ae23-c261d2c1a344");
  const projector = projectByID("8707c685-835e-4095-b668-a6f1eff9bdfd");
  const ekodigital = projectByID("08855b36-3551-434e-935a-960dab63fcab");
  const realms = projectByID("7b342d0a-f4e4-489e-a69d-2882024d9db8");
  const nxgn = projectByID("dcae4967-b0be-4ef4-b689-5466fc42da8c");

  function ProjectCard({
    project,
    rankClass = rank_styles[project.rank ?? 0],
    imgClass = "",
  }: {
    project: AllPostQueryResult[number];
    rankClass?: string;
    imgClass?: string;
  }) {
    return (
      <div key={project._id} className={`grid gap-2 ${rankClass}`}>
        <div
          className={`row-start-1 col-span-2 row-span-2 pointer-events-none relative h-full overflow-hidden ${imgClass}`}
        >
          <Suspense>
            {project.vimeo ? <VimeoVideo id={project.vimeo ?? 0} /> : null}
            {!project.vimeo && project.thumbnail?.blurhash ? (
              <Image
                src={project.thumbnail.blurhash}
                alt={project.name ?? project._id + " blurhash"}
                fill
                sizes="400px"
                priority
                className={`pointer-events-none absolute select-none object-cover -z-10`}
              />
            ) : null}
          </Suspense>
        </div>
        <div className="flex flex-col row-start-3 col-span-2 row-span-1">
          {project.name}{" "}
          {process.env.NODE_ENV === "development" ? project.rank : null}
          <span className="opacity-75">
            {project.content !== null && project.content !== undefined ? (
              //@ts-expect-error they fucked up the types
              <PortableText value={project.content} />
            ) : null}
          </span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Screen id="work" className="!pt-[16.67svh] ">
        {daetyas && <ProjectCard project={daetyas} />}
        {fiathouse && <ProjectCard project={fiathouse} />}
      </Screen>

      <Screen className=" ">
        {nestcenter && <ProjectCard project={nestcenter} />}

        {tour360 && <ProjectCard project={tour360} />}
      </Screen>

      <Screen className=" ">
        {handposeui && <ProjectCard project={handposeui} />}

        {geese3dcountry && <ProjectCard project={geese3dcountry} />}

        {gear && <ProjectCard project={gear} />}
      </Screen>

      <Screen className=" ">{nabla && <ProjectCard project={nabla} />}</Screen>

      <Screen className=" ">
        {kamaladisa && <ProjectCard project={kamaladisa} />}

        {afterdarkdigital && <ProjectCard project={afterdarkdigital} />}
      </Screen>

      <Screen className=" ">
        {projector && <ProjectCard project={projector} />}

        {bizzle && <ProjectCard project={bizzle} imgClass="aspect-square" />}
      </Screen>

      <Screen className=" ">
        {ekodigital && (
          <ProjectCard
            project={ekodigital}
            rankClass="grid-cols-2 grid-rows-[1fr_1fr_0.5fr] col-span-12 h-[60vw]"
          />
        )}
      </Screen>

      <Screen className=" ">
        {realms && <ProjectCard project={realms} imgClass="aspect-square" />}

        {nxgn && <ProjectCard project={nxgn} />}
      </Screen>
    </div>
  );
}
