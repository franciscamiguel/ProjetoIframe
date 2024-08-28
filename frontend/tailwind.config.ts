import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}", // Inclua seus arquivos .jsx e .html
  ],
  theme: {
    extend: {
      colors: {
        "button-background": "#646cff",
        "button-hover": "#535bf2",
        "button-active": "#4044cc",
        "background-dark": "#121212",
        "text-light": "#fff",
        "background-light": "#fff",
        "text-dark": "#000",
      },
      fontFamily: {
        sans: [
          "Inter",
          "system-ui",
          "Avenir",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;