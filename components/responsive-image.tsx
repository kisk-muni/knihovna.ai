import Image from "next/image";

export default function ResponsiveImage(props: any) {
  return (
    <Image
      alt={props.alt}
      sizes="100vw"
      style={{ width: "100%", height: "auto" }}
      src={props.src}
    />
  );
}
