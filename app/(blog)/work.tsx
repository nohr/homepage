import Screen from "@components/screen";
import ProjectCard from "../_components/project-card";
import { AllPostQueryResult } from "@/sanity.types";

export default function Work({ data }: { data: AllPostQueryResult }) {
  return (
    <Screen>
      <div>
        {data.map((post) => (
          <ProjectCard key={post.name} post={post} />
        ))}
      </div>
    </Screen>
  );
}
