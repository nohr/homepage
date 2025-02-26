import { sanityFetch } from "@/sanity/lib/fetch";
import Screen from "../_components/screen";
import { infoQuery } from "@/sanity/lib/queries";
import CustomPortableText from "./portable-text";

export default async function Page() {
  const data = await sanityFetch({ query: infoQuery });

  return (
    <Screen>
      <CustomPortableText
        className="col-start-9 row-start-4 col-span-4 row-span-3 indent-12"
        //@ts-expect-error stupid types
        value={data[0].bio}
      />
      <p className="col-start-9 row-start-6 col-span-2 self-end opacity-25">
        © Aite Aigbe 2024
      </p>
    </Screen>
  );
}
