/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {},
    colors: {
      "custom-bg-primary": "#262626",
      "custom-font-primary": "#f0eace",
      white: "#ffffff",
      black: "#000000",
      green: "#65A500",
      blue: "#3838d6",
    },
  },
  plugins: [require("daisyui")],
};
