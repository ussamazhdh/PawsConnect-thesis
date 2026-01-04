module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1240px',
      '2xl': '1440px'
    },
    colors: {
      // PawConnect Brand Colors
      brand: '#1B4D3E', // Primary green
      'brand-light': '#2D6B5A',
      'brand-dark': '#14382E',
      'brand-bg': '#E8F5ED',
      accent: '#FF7A36', // Warm orange
      'accent-light': '#FF9A5C',
      'accent-dark': '#E55F1F',
      'accent-bg': '#FFF4F0',
      // Legacy support (keeping for compatibility)
      primary: '#2D5F3F',
      'primary-light': '#E8F5ED',
      'primary-hover': '#4A8F6A',
      // Neutral colors
      white: '#ffff',
      offwhite: '#FAFAFA',
      shadow: '#FBFBFB',
      input: '#F4F4F4',
      'gray-dark': '#1A1A1A',
      gray: '#4A4A4A',
      'gray-light': '#6B6B6B',
      'gray-hover': '#8E8E8E',
      // Semantic colors
      green: '#2CDF53',
      blue: '#4A90E2',
      red: '#E63946',
      'card-light': '#FAFAFA'
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem'
      },
      borderRadius: {
        '4xl': '2rem'
      }
    }
  }
};
