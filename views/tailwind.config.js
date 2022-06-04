module.exports = {
  content: [
    "./src/*.{jsx, js}",
    "./*.html",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "grad": "linear-gradient(to right, rgba(0, 113, 133, 0.78), rgba(0, 49, 147, 0.9)), url('/images/bg.jpg')",
      },
      fontFamily: {
        'montserrat': ['Montserrat'],
        'lato': ['Lato'],
        'garamond': ['Garamond']
      }
    },
  },
  plugins: [],
}
