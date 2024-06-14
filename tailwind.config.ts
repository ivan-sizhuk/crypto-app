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
        "background-dark": "#191a1f",
      },
    },
  },
  plugins: [
    function ({ addComponents }: any) {
      addComponents({
        ".container": {
          backgroundColor: "#2b3139", // bg-indigo-950
          transition: "border-color 0.01s ease-in-out, box-shadow 0.2s ease-in-out",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "1rem",
          cursor: "pointer",
          border: "2px solid transparent",
          "&:hover": {
            boxShadow: "inset 0 0 1px #edf8ff, inset 0 0 1px #edf8ff, inset 0 0 10px #edf8ff", // inset glow effect
          },
        },
        ".container-no-hover": {
          backgroundColor: "#2b3139", // bg-indigo-950
          transition: "border-color 0.01s ease-in-out, box-shadow 0.2s ease-in-out",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "1rem",
          border: "2px solid transparent",
        },
      });
    },
  ],
};

export default config;
