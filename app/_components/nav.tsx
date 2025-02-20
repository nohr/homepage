import Link from "next/link";
import Play from "./play-icon";

export default function Nav() {
  return (
    <div className="grid fixed z-40 p-4 top-0 left-0 gap-4 w-full mix-blend-difference grid-cols-12 items-start *:w-fit">
      {/* Home */}
      <Link href="/" className="col-span-2 cursor-pointer">
        Aitenoria Aigbe
      </Link>
      {/* Tags */}
      <div className="flex flex-col col-start-5 col-span-2 *:w-fit *:cursor-pointer">
        <Link href="">All</Link>
        <Link href="&t=Graphics">Graphics</Link>
        <Link href="&t=Websites">Websites</Link>
        <Link href="&t=Interactive">Interactive</Link>
      </div>
      {/* Links */}
      <Link className="col-start-9" href="/about">
        About
      </Link>
      <Link className="col-start-10" href="/shop">
        Shop
      </Link>
      <Play />{" "}
      <Link className="col-start-12 text-red-600 cursor-pointer" href="/studio">
        Studio
      </Link>
    </div>
  );
}
