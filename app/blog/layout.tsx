import Container from "@/components/container";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col">
      <div
        className="absolute md:-inset-x-[calc(100%)] top-0 h-[300px] -z-10 transform-gpu"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-[#FCF2E8] -z-10 to-[#ffffff]"></div>
      </div>
      <section>
        <Container>
          <div className="relative max-w-2xl mx-auto pt-[70px] pb-20 md:pb-24">
            {children}
          </div>
        </Container>
      </section>
    </main>
  );
}
