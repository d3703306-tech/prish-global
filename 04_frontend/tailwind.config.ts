import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        phantom: {
          navy: "#001F3F",
          dark: "#001220",
          gold: "#CA9703",
          goldLight: "#E5B84C",
          cream: "#FDF8F0",
        },
      },
      fontFamily: {
        heading: ["Inter", "sans-serif"],
        body: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(202, 151, 3, 0.3)' },
          '100%': { boxShadow: '0 0 40px rgba(202, 151, 3, 0.6)' },
        },
      },
    },
  },
  plugins: [],
};
export default config;
