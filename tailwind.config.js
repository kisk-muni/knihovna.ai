import { nextui } from "@nextui-org/react";
const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      navbar: "#ffffffcc",
      background: "#fff",
      sheet: "#F3F3F3",
      hover: "#D2D2D2",
      primary: {
        'DEFAULT': "#d68a67",
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
        "DEFAULT": "#403f3f",
        50: "#f6f5f5",
        100: "#e7e6e6",
        200: "#d1d0d0",
        300: "#b1afb0",
        400: "#898788",
        500: "#6e6c6d",
        600: "#5e5c5d",
        700: "#504e4e",
        800: "#464444",
        900: "#403f3f",
        950: "#262626",
      },
      neutral: {
        50: "#fafafa",
        100: "#f5f5f5",
        150: "#F3F3F3",
        200: "#e5e5e5",
        300: "#d4d4d4",
        400: "#a3a3a3",
        500: "#737373",
        600: "#525252",
        700: "#404040",
        800: "#262626",
        900: "#171717",
        950: "#0a0a0a",
      },
      black: colors.black,
      white: colors.white,
      yellow: colors.amber,
      orange: colors.orange,
      emerald: colors.emerald,
    },
    extend: {
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
