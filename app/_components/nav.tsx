import Link from "next/link";
import Play from "./play-icon";

export default function Nav() {
  return (
    <nav className="grid !text-white fixed z-40 p-4 top-0 left-0 gap-4 w-full mix-blend-exclusion dark:mix-blend-difference grid-cols-12 items-start *:w-fit">
      {/* Home */}
      <Link href="/" className="col-span-2 cursor-pointer uppercase">
        Aitenoria Aigbe
      </Link>
      {/* Tags */}
      <div className="flex flex-col col-start-5 col-span-2 *:w-fit *:cursor-pointer">
        <Link href="">ALL</Link>
        <Link href="&t=Graphics">GRAPHICS</Link>
        <Link href="&t=Websites">WEBSITES</Link>
        <Link href="&t=Interactive">INTERACTIVE</Link>
      </div>
      {/* Links */}
      <Link className="col-start-9" href="/about">
        ABOUT
      </Link>
      <Link className="col-start-10" href="/shop">
        SHOP
      </Link>
      <Play />
      {process.env.NODE_ENV === "development" ? (
        <Link
          className="col-start-12 text-red-600 cursor-pointer"
          href="/studio"
        >
          STUDIO
        </Link>
      ) : null}
    </nav>
  );
}
