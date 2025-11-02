import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        barrel: {
          base: "#9a653d",
          dark: "#70452a",
          light: "#c68d5a"
        }
      }
    }
  },
  plugins: []
};

export default config;
