/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        //Color for placeholder text in input fields
        placeholder: "#6b7280",

        //Color for all primary components
        primary: "#14213D",
        primary_hover: "#20335E",
        primary_background: "#8fb2fc",
        primary_border: "#8fb2fc",

        //Color for all secondary components
        secondary: "#FCA311",
        secondary_hover: "#FCB441",
        secondary_background: "#fcdeae",
        secondary_border: "#fcdeae",

        //Color for error
        error: "#991b1b",
        error_hover: "#fecaca",
        error_background: "#fecaca",
        error_border: "#991b1b",

        //Color for warning
        warning: "#f97316",
        warning_hover: "#ffedd5",
        warning_background: "#ffedd5",
        warning_border: "#f97316",
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
