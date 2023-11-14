/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#222e35',
        secondary: '#111b21',
        btn: '#00a884',
        btnHover: '#06cf9c',
        input: "#2a3942"
      },
      backgroundImage: {
        'chat': "url('assets/bg-chat.png')",
      }
    },
  },
  plugins: [],
}

