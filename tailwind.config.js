import { nextui } from "@nextui-org/react";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navbar: "#ffffffcc",
        primary: "#d68a67",
        primarydarker: "#873E1D",
        text: "#403F3F",
        sheet: "#F3F3F3",
        hover: "#D2D2D2",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      aspectRatio: {
        "45/39": "45/39",
      },
    },
  },
  darkMode: "class",
  plugins: [require("@tailwindcss/typography"), nextui()],
};
