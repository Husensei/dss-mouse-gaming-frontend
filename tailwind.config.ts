import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./pages/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./app/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}", "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}"],
  theme: {
    transparent: "transparent",
    current: "currentColor",
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "dark-tremor": {
          brand: {
            faint: "#18B4F7", // custom
            DEFAULT: "#C8CAD0", // blue-500
            emphasis: "#182730", // blue-400
          },
          border: {
            DEFAULT: "transparent", // gray-800
          },
          ring: {
            DEFAULT: "transparent", // gray-800
          },
        },
      },
    },
  },
  plugins: [require("daisyui")],
};
export default config;
