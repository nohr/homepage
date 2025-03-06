import { sanityFetch } from "@/sanity/lib/fetch";
import Screen from "../_components/screen";
import { infoQuery } from "@/sanity/lib/queries";
import CustomPortableText from "./portable-text";
import Canva from "../(3D)/Canvas";

export default async function Page() {
  const data = await sanityFetch({ query: infoQuery });

  return (
    <Screen className="h-screen min-h-screen">
      <div className="md:row-start-3 md:row-span-4 md:col-start-1 w-full">
        <Canva />
      </div>

      <CustomPortableText
        className="col-start-1 col-span-full row-start-5 row-span-1 md:col-start-9 md:row-start-4 md:col-span-4 md:row-span-3 indent-12"
        //@ts-expect-error stupid types
        value={data[0].bio}
      />
      <p className="md:col-start-9 row-start-6 col-span-3 self-end opacity-25">
        © Aite Aigbe 2024
      </p>
    </Screen>
  );
}
