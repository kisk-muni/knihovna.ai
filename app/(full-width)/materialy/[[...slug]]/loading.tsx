export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="mt-2 animate-pulse flex flex-col gap-y-2">
      <div className="h-10 bg-neutral-200/80 mb-6 rounded-full w-1/3"></div>
      <div className="h-6 bg-neutral-200/80 w-4/5 rounded-full"></div>
      <div className="h-6 bg-neutral-200/80 w-4/5 rounded-full"></div>
      <div className="h-6 bg-neutral-200/80 w-3/5 rounded-full"></div>
      <div className="h-6 bg-neutral-200/80 w-4/5 rounded-full"></div>
      <div className="h-6 bg-neutral-200/80 w-2/5 rounded-full"></div>
    </div>
  );
}
