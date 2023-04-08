/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        primary: "#14213D",
        primary_hover: "#20335E",
        secondary: "#E5E5E5",
        secondary_hover: "#FCB441",
        gray: "#E5E5E5",
        black: "#000000",
        white: "#FFFFFF"
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}