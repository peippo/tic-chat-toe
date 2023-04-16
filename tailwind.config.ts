import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        pressed: "inset 0 -10px 20px -5px rgb(0 0 0 / 0.5)",
      },
    },
  },
  plugins: [],
} satisfies Config;
