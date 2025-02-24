/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      animation: {
        check: "check 0.4s ease",
        egg: "egg 1s ease-out infinite",
        pan: "pan 0.5s linear alternate infinite",
        shake: "shake 0.25s linear infinite",
        wavy: "wavy 1s infinite",
      },
      backgroundImage: {
        egg: "radial-gradient(circle 3px, #fff6 90%, transparent 10%), radial-gradient(circle 12px, #ffc400 90%, transparent 10%), radial-gradient(circle 12px, #ffae00 100%, transparent 0)",
        "pan-handle":
          "linear-gradient(#6C4924, #4B2D21), linear-gradient(#4D5457 24px, transparent 0), linear-gradient(#9F9E9E 24px, transparent 0)",
        vignette:
          "radial-gradient(ellipse at center, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.3) 100%)",
      },
      backgroundPosition: {
        egg: "-4px -6px, -2px -2px, -1px -1px",
        "pan-handle": "right center, 17px center, 0px center",
      },
      backgroundSize: {
        "pan-handle": "50px 10px, 4px 8px, 24px 4px",
      },
      borderRadius: {
        10: "10px",
        egg: "47% 36% 50% 50% / 49% 45% 42% 44%",
        "pan-handle": "4px",
        pan: "15px",
      },
      boxShadow: {
        egg: "-2px -3px #0002 inset, 0 0 4px #0003 inset",
        pan: "0 -1px 4px #5D6063 inset",
        social: "0 0 5px #F2EDD5",
        "social-ring": "0 0 15px #F2EDD5",
      },
      colors: {
        magenta: "#261026",
        pan: "#3E494D",
        red: "#604151",
        gray: "#9F8B8D",
        yellow: "#F2EDD5",
        green: "#899871",
      },
      fontFamily: {
        welcome: "Starborn, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      },
      height: {
        egg: "53px",
      },
      keyframes: {
        check: {
          "50%": { transform: "scale(0.9)" },
        },
        egg: {
          "0%, 100%": {
            transform: "translate(-50%, -20px) rotate3d(90, 0, 0, 90deg)",
            opacity: "0",
          },
          "10%, 90%": {
            transform: "translate(-50%, -30px) rotate3d(90, 0, 0, 90deg)",
            opacity: "1",
          },
          "25%": {
            transform: "translate(-50%, -40px) rotate3d(85, 17, 2, 70deg)",
          },
          "75%": {
            transform: "translate(-50%, -40px) rotate3d(75, -3, 2, 70deg)",
          },
          "50%": {
            transform: "translate(-55%, -50px) rotate3d(75, -8, 3, 50deg)",
          },
        },
        pan: {
          "0%": {
            transform: "rotate(-5deg)",
          },
          "100%": {
            transform: "rotate(10deg)",
          },
        },
        shake: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(5px)" },
          "50%": { transform: "translateX(-5px)" },
          "75%": { transform: "translateX(5px)" },
          "100%": { transform: "translateX(0)" },
        },
        wavy: {
          "0%, 40%, 100%": { transform: "translateY(0)" },
          "20%": { transform: "translateY(-4px)" },
        },
      },
      ringWidth: {
        20: "20px",
      },
      spacing: {
        "pan-handle": "calc(100% - 2px)",
        0.75: "3px",
        2.75: "11px",
        4.5: "18px",
        6.25: "25px",
        7.5: "30px",
        12.5: "50px",
        18.5: "74px",
        25: "100px",
        29.5: "118px",
        30: "120px",
        35: "140px",
        37.5: "150px",
        42.5: "170px",
        85: "340px",
        112.5: "450px",
        250: "1000px",
        280: "1120px",
      },
      transitionDelay: {
        400: "400ms",
        600: "600ms",
      },
      transformOrigin: {
        pan: "170px 0",
      },
      transitionProperty: {
        height: "height",
      },
      transitionTimingFunction: {
        ease: "ease",
      },
      translate: {
        egg: "translate(-50%, -20px) rotate3d(75, -2, 3, 78deg)",
      },
      width: {
        egg: "55px",
        pan: "120px",
        "pan-handle": "70px",
      },
      zIndex: {
        60: "60",
      },
    },
  },
  plugins: [],
};
