/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    extend: {
        colors: {
          dezitech: {
            50: "#fff5f6",
            100: "#ffe3e7",
            200: "#ffccd3",
            300: "#fda2b0",
            400: "#f05c72",
            500: "#C8102E",
            600: "#a30d25",
            700: "#7c091c",
            800: "#550613",
            900: "#32030b",
          },
          neutral: {
            50: "#F8F8F9",
            100: "#F1F2F4",
            300: "#E0E2E6",
            500: "#6B7280",
            900: "#111827",
          },
          carbon: {
            900: "#0b0f14",
            800: "#0f1724",
            700: "#1b2435",
          },
        },
      fontFamily: {
        heading: [
          "var(--font-heading)",
          "Space Grotesk",
          "Inter",
          "system-ui",
          "sans-serif",
        ],
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        26: "6.5rem",
      },
      boxShadow: {
        soft: "0 10px 40px rgba(0,0,0,0.08)",
      },
      borderRadius: {
        xl: "1.25rem",
      },
    },
  },
  plugins: [],
};
