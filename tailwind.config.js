/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1b8cdc",
        secondary: "#f1592a",
        lightskyblue: "#edf7fd",
        lightcream: "#ffefef",
        revision: "#f1592a",
        ongoing: "#078510",
        waiting: "#9d0e66",
        delivered: "#0e97a0",
        canceled: "#e60006",
      },
    },
    plugins: [],
  }
};
