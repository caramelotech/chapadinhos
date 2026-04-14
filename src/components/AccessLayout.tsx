interface AccessLayoutProps {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AccessLayout({ title, subtitle, children }: AccessLayoutProps) {
  return (
    <div>
      <h1 className="text-h2 text-center">{title}</h1>
      <h2 className="text-h6 mb-10 text-center">{subtitle}</h2>
      <>{children}</>
    </div>
  );
}
