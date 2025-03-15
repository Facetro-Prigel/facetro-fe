/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: '#E4D8FD',
          200: '#C2A7FB',
          300: '#A076F9',
          400: '#7E45F7',
          500: '#5C14F5'
        },
        secondary: {
          100: '#FFF9E5',
          200: '#FFEEB2',
          300: '#FFE382',
          400: '#FFD74D',
          500: '#FFCC1A'
        }
      },
      backgroundImage: {
        'primary': "url(/src/assets/bg.png)",
      },
      keyframes: {
        pingb: {
          '50%': {borderTop: "4px solid rgba(0,0,0,0.5)",
            borderRight: "4px solid rgba(0,0,0,0.3)",
            borderBottom: "4px solid rgba(0,0,0,0.1)",
            borderLeft: "4px solid rgba(0,0,0,0.3)"},
          '0%, 100%': {borderTop: "4px solid rgba(0,0,0,0.05)",
            borderRight: "4px solid rgba(0,0,0,0.05)",
            borderBottom: "4px solid rgba(0,0,0,0.05)",
            borderLeft: "4px solid rgba(0,0,0,0.05)"}
          },
        updown:{
          '0%, 100%':{
            top: "-2%"
          },
          '50%':{
            top: '102%'
          }

        }
      },

    },
    minHeight: {
      '1/2': '50%',
    },
    fontFamily:{
      'digital': ['DS-Digital', 'sans-serif']
    }
  }
}

