import Link, { LinkProps } from "next/link";

interface AnchorFootnoteLinkProps extends Omit<LinkProps, "href"> {
  "data-footnote-ref"?: boolean;
  href: string;
}

export default function AnchorFootnoteLink(props: AnchorFootnoteLinkProps) {
  const { "data-footnote-ref": dataFootnoteRef, ...rest } = props;
  return <Link {...rest} />;
}
