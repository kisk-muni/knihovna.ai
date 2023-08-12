import Container from "@/components/container";
import Headline from "@/components/headline";
import PlaceholderComponent from "@/components/placeholder-component";

/* eslint-disable @next/next/no-img-element */
export default function DesignPage() {
  // write 6 html paragraphs with random english text
  // use lorem ipsum generator
  return (
    <div className="prose">
      <Headline as="h1" level="ultra">
        AI Příručka
      </Headline>
      <PlaceholderComponent>
        Na tomto místě brzy najdete doporučené materiály pro knihovníky.
      </PlaceholderComponent>
    </div>
  );
}
