module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}', 
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          850: '#232323',
        },
      },
      animation: {
        'fade-in-out': 'fade-in-out 3s ease',
      },
      keyframes: {
        'fade-in-out': {
          '0%': { opacity: 0 },
          '20%, 80%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      },
      fontFamily: {
        'racing-sans': ['Racing Sans One'],
      },
    },
  },
  plugins: [],
};
