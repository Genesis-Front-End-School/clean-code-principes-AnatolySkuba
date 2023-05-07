/** @type {import('tailwindcss').Config} */
module.exports = {
<<<<<<< HEAD
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
        extend: {
            screens: {
                mobile: { max: "684px" },
                tablet: { min: "684px", max: "1016px" },
                laptop: { min: "1016px", max: "1348px" },
                desktop: "1348px",
            },
            width: {
                50: "12.5rem",
            },
        },
        minWidth: {
            80: "320px",
        },
        maxWidth: {
            160: "640px",
        },
    },
    plugins: [],
};
=======
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        mobile: { max: '684px' },
        tablet: { min: '684px', max: '1016px' },
        laptop: { min: '1016px', max: '1348px' },
        desktop: '1348px',
      },
      width: {
        50: '12.5rem',
      },
      animation: {
        bounce200: 'bounce 1s infinite 200ms',
        bounce400: 'bounce 1s infinite 400ms',
      },
    },
    minWidth: {
      fill: '-webkit-fill-available',
    },
    maxWidth: {
      160: '640px',
    },
  },
  plugins: [],
};

>>>>>>> b21e8e224cbdf05c4789e8343bb9e4637cc0a677
