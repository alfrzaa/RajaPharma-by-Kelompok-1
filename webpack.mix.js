const mix = require("laravel-mix");
mix.js("resources/js/app.js", "public/js").react().sourceMaps();
// .postCss('resources/css/app.css', 'public/css', [
//     require('tailwindcss'), // add this
// ])
