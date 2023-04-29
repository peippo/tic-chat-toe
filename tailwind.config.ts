import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: {
          350: "rgb(183 188 197)",
        },
      },
      backgroundImage: {
        "screen-pattern": "url('/tiny-checkers.svg')",
        body: "url('/dither-bg.png'), linear-gradient(to top left, #1e293b, #475569)",
      },
      dropShadow: {
        text: "0 1px 1px rgba(0, 0, 0, 0.5)",
        button: "0 2px 0 rgba(0, 0, 0, 0.1)",
      },
      boxShadow: {
        screen:
          "inset 0 0 25px -5px rgb(82 67 0 / 1), inset 2px 3px 3px 0 rgb(82 67 0 / 0.7)",
        battery: "0 0 10px 5px rgb(224 0 0 / 0.3)",
        cell: "inset 3px 3px 0 0 rgb(0 0 0 / 0.1)",
        "cell-active":
          "inset -2px -2px 0 0 rgb(255 255 255 / 0.25), inset 1px 1px 0 0 rgb(255 255 255 / 0.5)",
        button:
          "inset 0 -15px 5px -5px rgb(216 180 254 / 0.4), inset 0 -2px 1px 2px rgb(216 180 254 / 0.4), inset 4px 4px 1px 2px rgb(216 180 254 / 0.1)",
        "button-active":
          "inset 3px -10px 20px -5px rgb(0 0 0 / 0.5), inset 2px 6px 2px 0 rgb(0 0 0 / 0.5)",
      },
    },
  },
  plugins: [],
} satisfies Config;
