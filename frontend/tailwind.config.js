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
  }