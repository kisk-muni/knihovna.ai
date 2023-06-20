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
        primary: {
          50: "#fbf6f1",
          100: "#f7eadd",
          200: "#edd2bb",
          300: "#e2b28f",
          400: "#d58d63",
          500: "#cc7043",
          600: "#be5b38",
          700: "#9e4730",
          800: "#7f3b2d",
          900: "#673227",
          950: "#371813",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
