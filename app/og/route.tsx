/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-no-comment-textnodes */
import siteConfig from "@/site-config";
import { ImageResponse } from "next/server";

// Route segment config
export const runtime = "edge";

const sizes = {
  width: 800,
  height: 400,
};

// Font
const interSemiBold = fetch(
  new URL("../../public/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

// Image generation
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    // ?title=<title>
    const hasTitle = searchParams.has("title");
    const title = hasTitle
      ? searchParams.get("title")?.slice(0, 100)
      : "Mapujeme budoucnost knihoven v éře AI.";

    // Convert image data to base64
    return new ImageResponse(
      (
        // ImageResponse JSX element
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "100%",
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            letterSpacing: "-.02em",
            background: "linear-gradient(180deg, #fff2e6 9%, #ffffff)",
            fontWeight: 700,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              top: "42px",
              left: "42px",
              right: "42px",
            }}
          >
            <img
              src="data:image/png;base64,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"
              width="24"
              height="24"
              style={{
                marginRight: 8,
                boxShadow: "0 0 12px 1px #ffffff99",
                borderRadius: 8,
                overflow: "hidden",
              }}
            />
            <span
              style={{
                fontSize: 20,
                color: "#403f3f",
              }}
            >
              {siteConfig.title}
            </span>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "0 42px",
              fontSize: 48,
              width: "auto",
              maxWidth: 550,
              color: "#403f3f",
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            {title}
          </div>
        </div>
      ),
      // ImageResponse options
      {
        ...sizes,
        fonts: [
          {
            name: "Inter",
            data: await interSemiBold,
            style: "normal",
            weight: 400,
          },
        ],
      }
    );
  } catch (e: any) {
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
