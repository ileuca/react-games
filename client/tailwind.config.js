/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 200ms ease-in-out",
      },
    },
  },
  daisyui: {
    themes: [
      {
        light: {
          primary: "#1e68ce",
          secondary: "#008914",
          accent: "#fc8dbf",
          neutral: "#26252D",
          "base-100": "#f3f4f6",
          info: "#7BAAE0",
          success: "#62DAC4",
          warning: "#F4B766",
          error: "#E92F3C",
        },
      },
      {
        dark: {
          primary: "#1e68ce",
          secondary: "#008914",
          accent: "#fc8dbf",
          neutral: "#26252D",
          "base-100": "#374151",
          info: "#7BAAE0",
          success: "#62DAC4",
          warning: "#F4B766",
          error: "#E92F3C",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
