export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex min-h-screen flex-col items-center justify-center xl:pt-28 xl:pb-44">
      AUTH
      {children}
    </section>
  );
}
