import { sanityFetch } from "@/sanity/lib/fetch";
import Screen from "../_components/screen";
import { infoQuery } from "@/sanity/lib/queries";
import CustomPortableText from "@/app/_components/portable-text";

export default async function Page() {
  const data = await sanityFetch({ query: infoQuery });

  return (
    <Screen className="h-screen min-h-screen [&_p]:dark:text-white ">
      <CustomPortableText
        className="w-full col-span-full row-start-4 row-span-1 md:col-start-5 md:row-start-4 md:col-span-3 md:row-span-2 indent-12"
        //@ts-expect-error stupid types
        value={data[0].bio}
      />
      <p className="md:col-start-5 md:grid-span-3 row-start-6 self-end opacity-25 dark:opacity-75">
        © aite aigbe 2025
      </p>
    </Screen>
  );
}
