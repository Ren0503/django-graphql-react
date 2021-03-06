const colors = require("tailwindcss/colors");

module.exports = {
  mode: "jit",
  purge: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      boxShadow: {
        topxl: "0 -20px 20px -20px rgba(0, 0, 0, 0.1)",
      },
      
      colors: {
        gray_dark: {
            DEFAULT: "#15181C"
        },
        trueGray: colors.trueGray
    },
    },
  },
  variants: {
    extend: {
      
    },
  },
  plugins: [],
};
