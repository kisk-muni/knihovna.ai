const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xs: ["14px"],
        sm: ["15px"],
        base: ["16px"],
      },
      colors: {
        transparent: "transparent",
        border: { DEFAULT: "#F3F3F3" },
        current: "currentColor",
        navbar: "#ffffffcc",
        background: "#fff",
        sheet: "#F3F3F3",
        hover: "#D2D2D2",
        primary: {
          DEFAULT: "#d68a67",
          50: "#fbf6f1",
          100: "#f7e8dd",
          200: "#edcfbb",
          300: "#e2ae8f",
          400: "#d68a67",
          500: "#cc6943",
          600: "#be5438",
          700: "#9e4130",
          800: "#7f372d",
          900: "#672e27",
          950: "#371613",
        },
        text: {
          DEFAULT: "#09090b",
          50: "#f4f5f7",
          100: "#e4e5e9",
          200: "#cbcdd6",
          300: "#a7aab9",
          400: "#7b7f95",
          500: "#60637a",
          600: "#525468",
          700: "#474957",
          800: "#3f3f4b",
          900: "#383941",
          950: "#09090b",
        },
        muted: {
          DEFAULT: "#F4F4F5",
        },
        accent: {
          DEFAULT: "#F4F4F5",
        },
        secondary: {
          DEFAULT: "#F4F4F5",
        },
        neutral: {
          50: "#f7f7f8",
          100: "#eeeef0",
          200: "#d9d9de",
          300: "#b8b9c1",
          400: "#91939f",
          500: "#737584",
          600: "#5d5e6c",
          700: "#4c4d58",
          800: "#41414b",
          900: "#393941",
          950: "#18181b",
        },
        black: colors.black,
        white: colors.white,
        yellow: colors.amber,
        orange: colors.orange,
        blue: colors.blue,
        purple: colors.purple,
        red: colors.red,
        pink: colors.pink,
        emerald: colors.emerald,
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
  plugins: [require("@tailwindcss/typography")],
};
