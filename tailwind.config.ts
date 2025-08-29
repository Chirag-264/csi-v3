import type { Config } from "tailwindcss";
import type { PluginCreator } from "tailwindcss/types/config";
const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");
const { default: flattenColorPalette } = require("tailwindcss/lib/util/flattenColorPalette");

const textGradientBorderPlugin: PluginCreator = function ({ addUtilities }) {
  addUtilities({
    '.text-gradient-border': {
      'position': 'relative',
      'background-image': 'linear-gradient(0deg, rgba(29, 51, 9, 0.99) 18.4%, #4dff00ff 100%, #41d324ff 53.4%)',
      '-webkit-background-clip': 'text',
      'background-clip': 'text',
      'color': 'transparent',
      'display': 'inline-block',
    },
    '.scrollbar-none': {
          '::-webkit-scrollbar': { display: 'none' }, 
          'scrollbar-width': 'none', 
        },
    // '.text-gradient-border::before': {
    //   'content': 'attr(data-text)',
    //   'position': 'absolute',
    //   'left': '0',
    //   'top': '0',
    //   'z-index': '-1',
    //   'color': 'white',
    //   'text-shadow': `
    //     0.125px 0.125px 0 white,
    //     0.25px 0.25px 0 white,
    //     -0.125px 0.125px 0 white,
    //     -0.25px 0.25px 0 white,
    //     0.125px -0.125px 0 white,
    //     0.25px -0.25px 0 white,
    //     -0.125px -0.125px 0 white,
    //     -0.25px -0.25px 0 white
    //   `,
    //   'clip-path': 'polygon(0 0, 100% 0, 100% 15%, 0 15%)', // Cover only top 25%
    // },
    // '.text-gradient-border::after': {
    //   'content': 'attr(data-text)',
    //   'position': 'absolute',
    //   'left': '0',
    //   'top': '0',
    //   'z-index': '-1',
    //   'color': 'white',
    //   'text-shadow': `
    //     0.125px 0 0 white,
    //     0.25px 0 0 white,
    //     -0.125px 0 0 white,
    //     -0.25px 0 0 white
    //   `,
    //   'clip-path': 'polygon(0 15%, 100% 15%, 100% 100%, 0% 100%)', // Side borders start from 25%
    // },
  });
};

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
            "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
    },
      animation: {
        orbit: "orbit calc(var(--duration)*1s) linear infinite",
        "spin-around": "spin-around calc(var(--speed) * 2) infinite linear",
        slide: "slide var(--speed) ease-in-out infinite alternate",
        "marquee": "marquee 60s linear infinite",
        backgroundPositionSpin:
                    "background-position-spin 3000ms infinite alternate",
                ripple: "ripple var(--duration,2s) ease calc(var(--i, 0)*.2s) infinite",
                shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        orbit: {
          "0%": {
            transform:
              "rotate(0deg) translateY(calc(var(--radius) * 1px)) rotate(0deg)",
          },
          "100%": {
            transform:
              "rotate(360deg) translateY(calc(var(--radius) * 1px)) rotate(-360deg)",
          },
        },
        "spin-around": {
          "0%": {
            transform: "translateZ(0) rotate(0)",
          },
          "15%, 35%": {
            transform: "translateZ(0) rotate(90deg)",
          },
          "65%, 85%": {
            transform: "translateZ(0) rotate(270deg)",
          },
          "100%": {
            transform: "translateZ(0) rotate(360deg)",
          },
        },
        slide: {
          to: {
            transform: "translate(calc(100cqw - 100%), 0)",
          },
        },
        "background-position-spin": {
          "0%": { backgroundPosition: "top center" },
          "100%": { backgroundPosition: "bottom center" },
      },
      ripple: {
          "0%, 100%": {
              transform: "translate(-50%, -50%) scale(1)",
          },
          "50%": {
              transform: "translate(-50%, -50%) scale(0.9)",
          },
      },
      "shine-pulse": {
          "0%": {
              "background-position": "0% 0%",
          },
          "50%": {
              "background-position": "100% 100%",
          },
          to: {
              "background-position": "0% 0%",
          },
      },
      shimmer: {
          from: {
              backgroundPosition: "0 0",
          },
          to: {
              backgroundPosition: "-200% 0",
          },
      },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [addVariablesForColors, textGradientBorderPlugin],
};

export default config;

function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}