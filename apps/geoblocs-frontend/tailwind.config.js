/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
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
    extend: {},
  },
  plugins: [require("daisyui")],
};
