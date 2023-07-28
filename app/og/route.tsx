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
            <span
              style={{
                width: 24,
                height: 24,
                borderRadius: 8,
                backgroundColor: "#d78a67",
                letterSpacing: ".01em",
                //
                boxShadow: "0 0 12px 1px #ffffff99",
              }}
            />
            <span
              style={{
                marginLeft: 8,
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
