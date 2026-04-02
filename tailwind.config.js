module.exports = {
  content: [
    './*.html',
    './nav.html',
    './footer.html',
    './main.js'
  ],
  safelist: [
    'text-blue-600',
    'border-blue-600',
    'border-b-2',
    'pb-1',
    'font-bold',
    'font-medium',
    'hidden'
  ],
  theme: {
    extend: {
      colors: {
        'tertiary': '#00647b',
        'primary-fixed': '#859aff',
        'on-tertiary-container': '#004050',
        'inverse-primary': '#6e88ff',
        'on-secondary-fixed-variant': '#3b507b',
        'error-container': '#f74b6d',
        'on-tertiary-fixed': '#002a35',
        'primary': '#0043f3',
        'surface-tint': '#0043f3',
        'tertiary-container': '#00cffc',
        'error': '#b41340',
        'on-secondary-fixed': '#1d335d',
        'surface-container-lowest': '#ffffff',
        'surface-dim': '#d0d5d8',
        'on-primary-fixed': '#000000',
        'inverse-surface': '#0b0f10',
        'primary-dim': '#003ad6',
        'secondary-fixed-dim': '#aec4f6',
        'on-surface-variant': '#595c5e',
        'on-surface': '#2c2f31',
        'on-primary': '#f2f1ff',
        'surface': '#f5f7f9',
        'outline': '#747779',
        'tertiary-dim': '#00576c',
        'on-background': '#2c2f31',
        'on-tertiary-fixed-variant': '#004a5c',
        'secondary': '#465b87',
        'surface-variant': '#d9dde0',
        'surface-container': '#e5e9eb',
        'on-tertiary': '#e2f6ff',
        'surface-container-low': '#eef1f3',
        'tertiary-fixed-dim': '#00c0ea',
        'on-secondary-container': '#314771',
        'outline-variant': '#abadaf',
        'surface-container-highest': '#d9dde0',
        'error-dim': '#a70138',
        'on-primary-fixed-variant': '#001f7f',
        'secondary-container': '#bfd1ff',
        'secondary-dim': '#3a4f7a',
        'on-primary-container': '#001868',
        'primary-fixed-dim': '#728bff',
        'on-error-container': '#510017',
        'on-error': '#ffefef',
        'surface-bright': '#f5f7f9',
        'on-secondary': '#f0f2ff',
        'secondary-fixed': '#bfd1ff',
        'tertiary-fixed': '#00cffc',
        'background': '#f5f7f9',
        'primary-container': '#859aff',
        'inverse-on-surface': '#9a9d9f',
        'surface-container-high': '#dfe3e6'
      },
      fontFamily: {
        'headline': ['Plus Jakarta Sans', 'sans-serif'],
        'body': ['Manrope', 'sans-serif'],
        'label': ['Manrope', 'sans-serif']
      },
      borderRadius: {
        DEFAULT: '0.125rem',
        lg: '0.25rem',
        xl: '0.5rem',
        full: '0.75rem'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries')
  ]
};
