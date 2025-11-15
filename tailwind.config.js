/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'status-healthy': '#10b981',
        'status-warning': '#f59e0b',
        'status-critical': '#ef4444',
      },
    },
  },
  plugins: [],
}