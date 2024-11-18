/** @type {import('tailwindcss').Config} */
export default
  {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}", // Adjust paths to match your project structure
    ],
    theme: {
      extend: {},
    },
    plugins: [require("daisyui")],
    daisyui: {
      themes: ["light"], // Force only the light theme
    },
    theme: {
      extend: {
        animation: {
          updown: 'updown 3s ease-in-out infinite',
        },
        keyframes: {
          updown: {
            '0%, 100%': { transform: 'translateY(0)' },
            '50%': { transform: 'translateY(-13px)' },
          },
        },
      },
    },
  
  }