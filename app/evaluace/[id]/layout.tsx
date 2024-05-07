import FrameworkHeader from "@/components/framework-header";

export default function FrameworkSubmissionLayout({
  children,
  params: { id },
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  return (
    <div className="flex flex-col min-h-screen bg-muted">
      <FrameworkHeader id={id} />
      <main className="">{children}</main>
    </div>
  );
}
