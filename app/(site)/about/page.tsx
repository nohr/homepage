import Screen from "@components/screen";

export default async function AboutPage() {
  return (
    <Screen id="about" className="!pt-[25svh] min-h-screen ">
      <h1 className="row-start-1">About</h1>
      <p className="md:col-start-5 md:row-start-2 md:col-span-3 md:row-span-2 row-start-2 ">
        This page is currently under construction. <br /> Please reach me via
        email: hi[at]aitenoria.com
      </p>
    </Screen>
  );
}
