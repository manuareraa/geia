const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      gGreen: "#65A500",
      gBlue: "#0172AD",
      gGray: "#F0F0F0",
      glGreen: "#E0EDCC",
      white: "#FFFFFF",
      black: "#000000",
    },
  },
  // darkMode: "class",
  plugins: [require("daisyui"), nextui()],
};
