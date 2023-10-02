/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1200px",
      "2xl": "1450px",
    },
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
