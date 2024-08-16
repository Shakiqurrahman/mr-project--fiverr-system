/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1b8cdc",
        secondary: "#f1592a",
      },
    },
  },
  plugins: [],
};
