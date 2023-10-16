import SiteConfig from "@/site-config";
import Image from "next/image";

export default function Logo() {
  return (
    <div className="self-center whitespace-nowrap text-text flex font-semibold transition items-center ease-out delay-150">
      <div className="mr-1 shadow-sm rounded-[6px] block overflow-hidden h-5 w-5 relative">
        <Image
          src="/logo-clean-a.png"
          alt="Logo knihovna.ai"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
        />
      </div>
      {SiteConfig.title}
    </div>
  );
}
