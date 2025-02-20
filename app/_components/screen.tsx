export default function Screen({ children }: { children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-12 grid-rows-6 h-screen md:p-4 md:gap-4">
      {children}
    </div>
  );
}
