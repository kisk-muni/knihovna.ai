import SiteConfig from "@/site-config";
import Image from "next/image";

export default function Logo() {
  return (
    <div className="self-center whitespace-nowrap text-text flex font-semibold transition ease-out delay-150">
      <Image
        src="/logo-clean-a.png"
        width="24"
        height="24"
        alt="Logo knihovna.ai"
        className="mr-2 shadow-sm rounded-[8px] ovefrlow-hidden"
      />
      {SiteConfig.title}
    </div>
  );
}
