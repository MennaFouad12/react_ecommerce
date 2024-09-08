const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  content: [  "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
   
     "./node_modules/flowbite/**/*.js",
     flowbite.content(),
  ],
    
  theme: {
    container:{
      center:true,
      padding:"40px"
    },
    extend: {},
  },
  plugins: [
    flowbite.plugin(),
  ],
}

