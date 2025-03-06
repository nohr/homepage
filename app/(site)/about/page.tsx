import Screen from "@components/screen";

export default async function AboutPage() {
  return (
    <Screen id="about" className="!pt-[25svh] min-h-screen grid-rows-4">
      About
      <p className="col-start-9 row-start-2 col-span-4 self-end ">
        This page is currently under construction. Please reach me via email:
        hi[at]aitenoria.com
      </p>
    </Screen>
  );
}
