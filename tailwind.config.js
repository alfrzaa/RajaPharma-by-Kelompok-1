/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: "#1A6291",
          secondary: "#9333EA", // contoh warna tambahan
          danger: "#DC2626",    // contoh warna tambahan
        },
      },
    },
    plugins: [],
  }
  
export default {
    content: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.jsx",
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}

