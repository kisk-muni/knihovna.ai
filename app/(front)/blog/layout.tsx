import BackgroundGradient from "@/components/ui/background-gradient";
import Container from "@/components/ui/container";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex flex-col">
      <BackgroundGradient />
      <section>
        <Container size="prose">
          <div className="relative pt-[70px] pb-20 md:pb-24">{children}</div>
        </Container>
      </section>
    </main>
  );
}
