/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      maxHeight: {
        '128': '28rem',
      },
     
      fontFamily: {
        'sans': ['Source Sans Pro', 'sans-serif'],
      },
    },
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      DEFAULT: '0.25rem',
      DEFAULT: '4px',
      'md': '0.375rem',
      'lg': '1.9rem',
      'full': '9999px',
      '4xl' : '40px',
      'large': '12px',
    }
  },
  plugins: [],
}

