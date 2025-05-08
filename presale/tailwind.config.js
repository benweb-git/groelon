/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        txt: {
          100: "#191d4d",
          200: "#3b3f7d",
          300: "#5e65a6",
          400:"#ffffee",
          500:"#000000",
        },
        primary: "#9aacd6",
        secondary: "#c2d8e5",
        accent: {
          100: "#f1c40e",
          200: "#6bb5e1",
          300: "#3c709a",
          400: "#5cb75c",
          500: "#e77e23",
          600: "#bf3a2b",
        },
      },
    },
     keyframes: {
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' }
        }
      },
      animation: {
        'scroll': 'scroll 20s linear infinite'
      }
  },
  plugins: [],
}

