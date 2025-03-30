export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
      },
      colors: {
        primary: "#E74C3C",
        secondary: "#E74C3C",
        tertiary: "#F1C40F",
        quaternary: "#2ECC71",
        light: "#ECF0F1",
        dark: "#34495E",
        white: "#FFFFFF",
        gray: "#95A5A6",
        lightgray: "#F5F5F5",
        lightergray: "#F8F9FA",
        darkergray: "#343A40",
        darkestgray: "#212121",
        error: "#E74C3C",
        success: "#2ECC71",
        warning: "#F1C40F",
      },
    },
  },
  plugins: [],
};
