import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "background-dark": "#191a1f", // Your custom background color
      },
    },
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".container": {
          backgroundColor: "#2b3139", // bg-indigo-950
          "&:hover": {
            backgroundColor: "#5E6673", // hover:bg-indigo-900
          },
          transition: "background-color 0.2s ease-in-out",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "1rem",
          cursor: "pointer",
        },
      });
    },
  ],
};

export default config;
