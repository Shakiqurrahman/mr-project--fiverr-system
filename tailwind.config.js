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
        dispute: "#fb9715",
      },
      boxShadow: {
        "btn-shadow": "0px 0px 5px 1px rgba(0, 0, 0, 0.10)",
      },
      animation: {
        popup: "pop-up 1.5s ease-out forwards",
      },
      keyframes: {
        "pop-up": {
          "0%": {
            transform: "scale(1.5)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
    },
    plugins: [],
  },
};
