import { RefObject } from "react";

export default function Screen({
  children,
  className = "grid-rows-6 h-screen",
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
      className={"grid grid-cols-12 min-h-screen md:p-4 md:gap-4 " + className}
    >
      {children}
    </div>
  );
}
