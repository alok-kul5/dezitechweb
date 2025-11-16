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
            100: "#F8F8F9",
            300: "#EAEAEA",
            500: "#C8102E",
            700: "#8f0c20",
          },
          neutral: {
            50: "#F8F8F9",
            100: "#F1F2F4",
            300: "#E0E2E6",
            500: "#6B7280",
            900: "#0F1724",
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
