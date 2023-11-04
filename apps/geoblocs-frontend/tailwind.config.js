/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors: {
      gGreen: "#65A500",
      gBlue: "#0172AD",
      gGray: "#F0F0F0",
      glGreen: "#E0EDCC",
      red: "#A50000",
      white: "#FFFFFF",
      black: "#000000",
    },
    extend: {
      screens: {
        md: "640px",
        lg: "1300px",
        xl: "1280px",
        "2xl": "1536px",
      },
    },
  },
  // plugins: [require("daisyui"), require("flowbite/plugin")],
  plugins: [require("daisyui")],
};
