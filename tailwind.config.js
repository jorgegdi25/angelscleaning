/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                primary: "#00b4d8",
                sky: {
                    pale: "#EAF6FA",
                    light: "#D3EEF6",
                },
                charcoal: "#334155",
                navy: {
                    DEFAULT: "#0f172a",
                    dark: "#020617",
                }
            },
            fontFamily: {
                display: ["Poppins", "sans-serif"],
            },
            borderRadius: {
                DEFAULT: "0.5rem",
            },
        },
    },
    plugins: [
        require('@tailwindcss/forms'),
        require('@tailwindcss/typography'),
        require('@tailwindcss/container-queries')
    ],
}
