/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                'custom-green': '#032d28',
            },
        }
    },
    plugins: [
        require('@designbycode/tailwindcss-text-shadow'),
    ]
}
