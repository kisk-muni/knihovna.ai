import Card from "@/components/card";
import Link from "next/link";
import Image from "next/image";

export default function Bookmark({
  url,
  imageUrl,
  title,
  description,
}: {
  url: string;
  imageUrl: string;
  title?: string;
  description: string;
  image?: string;
}) {
  // const image = "https://knihovna.ai/screenshot?url=" + url;
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/;
  const urlMatch = url.match(linkRegex);
  const imageMatch = imageUrl.match(linkRegex);
  return (
    <Link href={urlMatch ? urlMatch[2] : "#"} className="mb-6 block">
      <Card
        size="base"
        theme="white"
        className="flex flex-row md:flex-col lg:flex-row shadow-sm hover:shadow overflow-hidden border border-text/10 hover:border-text/20"
      >
        <div className="p-4">
          {title && (
            <p className="text-lg leading-tight mt-0 mb-2 text-text font-bold">
              {title}
            </p>
          )}
          <p className="text-lg mt-0 mb-0 text-text">{description}</p>
        </div>
        {imageUrl && (
          <div className="w-52 relative grow shrink-0 overflow-hidden bg-sheet border-l border-text/5">
            <Image
              src={imageMatch ? imageMatch[2] : imageUrl}
              alt={title ? title : description}
              layout={"fill"}
              objectFit={"cover"}
              sizes="280px"
              objectPosition="left top"
              className="m-0 p-0"
            />
          </div>
        )}
      </Card>
    </Link>
  );
}
