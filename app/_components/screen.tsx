import { RefObject } from "react";

export default function Screen({
  children,
  className = " grid-rows-6",
  id = undefined,
}: {
  children: React.ReactNode;
  className?: string;
  ref?: RefObject<HTMLDivElement | null>;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={"grid gap-4 grid-cols-1 md:grid-cols-6 p-4 " + className}
    >
      {children}
    </div>
  );
}
