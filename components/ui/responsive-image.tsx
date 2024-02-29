import Image from "next/image";

export default function ResponsiveImage(props: any) {
  return (
    <div className="w-full h-full relative">
      <Image
        alt={props.alt}
        fill
        src={props.src}
        style={{
          objectFit: "contain",
        }}
      />
    </div>
  );
}
