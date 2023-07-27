import Card from "./card";

export default function PlaceholderComponent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Card
      className={
        "flex flex-col justify-center items-center bg-sheet pt-4 mb-[1em]"
      }
    >
      <div className="text-sm text-text">Připravujeme</div>
      <div className="text-text text-xl text-center max-w-lg leading-relaxed">
        {children}
      </div>
    </Card>
  );
}
