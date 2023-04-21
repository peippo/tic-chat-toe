import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        text: "0 1px 1px rgba(0, 0, 0, 0.5)",
        button: "0 2px 0 rgba(0, 0, 0, 0.1)",
      },
      boxShadow: {
        button:
          "inset 0 -15px 5px -5px rgb(216 180 254 / 0.4), inset 0 -2px 1px 2px rgb(216 180 254 / 0.4), inset 4px 4px 1px 2px rgb(216 180 254 / 0.1)",
        "button-active":
          "inset 0 -10px 20px -5px rgb(0 0 0 / 0.5), inset 0 6px 2px 0 rgb(0 0 0 / 0.5)",
      },
    },
  },
  plugins: [],
} satisfies Config;
