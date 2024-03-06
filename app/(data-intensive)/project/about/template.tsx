export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-6 bg-white">
      <div className="prose mx-auto prose-headings:font-medium prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline prose-text mb-2 prose-headings:leading-tight prose-h1:text-2xl prose-h1:font-medium prose-h2:text-xl prose-h2:mt-4 prose-h2:mb-3 prose-h3:text-lg prose-h4:text-md prose-h5:text-base">
        {children}
      </div>
    </div>
  );
}
