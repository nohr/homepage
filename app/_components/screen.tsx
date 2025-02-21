export default function Screen({
  children,
  className = "",
  id = undefined,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={
        "grid grid-cols-12 grid-rows-6 h-screen md:p-4 md:gap-4 " + className
      }
    >
      {children}
    </div>
  );
}
