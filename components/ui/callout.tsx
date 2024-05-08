export const Callout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center bg-yellow-100 rounded-xl mb-3 px-3 py-2 leading-snug">
      {children}
    </div>
  );
};
