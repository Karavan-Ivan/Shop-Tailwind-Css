/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        backgroundColor: "#FCF7E6",
        lightSand: "#FCF7E6",
        white: "#FFFFFF",
      },
      container: {
        padding: {
          DEFAULT: "24px",
          lg: "120px",
          md: "120px",
        },
      },
      fontSize: {
        mainSize: "14px",
        bigSize: "16px",
        smallSize: "12px",
        desktopBig: "20px",
      },
      width: {
        logomarkMobile: "23px",
        logomarkDecktop: "45px",
        logotypeMobile: "94px",
        logotypeDecktop: "192px",
      },
      height: {
        logomarkMobile: "23px",
        logomarkDecktop: "45px",
        logotypeMobile: "48px",
        logotypeDecktop: "98px",
        98: "98px",
        18: "18px",
      },
      lineHeight: {
        small: "15px",
        main: "18px",
        big: "21px",
        desktopBig: "26px",
      },
      padding: {
        "26px": "26px",
      },
      fontFamily: {
        main: ["Space Grotesk", "sans-serif"],
        footer: ["Space Mono", "monospace"],
      },
    },
    plugins: [],
  },
};
