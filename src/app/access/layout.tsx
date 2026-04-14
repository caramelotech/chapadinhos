export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="grid h-full place-items-center">
      <div className="w-[450px] rounded-[20px] bg-white px-8 pb-8 pt-6 drop-shadow-lg">
        {children}
      </div>
    </main>
  );
}
