/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Helvetica', 'Arial', 'sans-serif', '"Apple Color Emoji"', '"Segoe UI Emoji"'],
        mono: ['ui-monospace', 'SFMono-Regular', '"SF Mono"', 'Menlo', 'Consolas', '"Liberation Mono"', 'monospace'],
      },
      colors: {
        gh: {
          canvas: '#0d1117',
          surface: '#161b22',
          overlay: '#1c2128',
          border: '#30363d',
          'border-muted': '#21262d',
          'fg-default': '#e6edf3',
          'fg-muted': '#8b949e',
          'fg-subtle': '#6e7681',
          'accent-fg': '#58a6ff',
          'accent-subtle': '#388bfd26',
          'accent-emphasis': '#1f6feb',
          'success-fg': '#3fb950',
          'success-subtle': '#238636',
          'success-emphasis': '#2ea043',
          'danger-fg': '#f85149',
          'danger-subtle': '#da363326',
          'warning-fg': '#d29922',
          'warning-subtle': '#bb800926',
          'done-fg': '#a371f7',
          'done-subtle': '#8957e526',
          'sponsor-fg': '#db61a2',
          green: {
            400: '#3fb950',
            600: '#238636',
            700: '#196c2e',
            800: '#0f3320',
          },
          blue: {
            400: '#58a6ff',
            500: '#388bfd',
          }
        }
      },
      borderRadius: {
        'gh': '6px',
        'gh-md': '8px',
        'gh-lg': '12px',
        'gh-xl': '16px',
        'gh-2xl': '20px',
        'gh-pill': '999px',
      },
      boxShadow: {
        'gh-sm': '0 1px 0 rgba(27,31,36,0.1)',
        'gh': '0 1px 3px rgba(27,31,36,0.12), 0 8px 24px rgba(66,74,83,0.12)',
        'gh-md': '0 3px 6px rgba(27,31,36,0.15), 0 8px 24px rgba(66,74,83,0.2)',
        'gh-lg': '0 8px 24px rgba(140,149,159,0.2)',
        'gh-btn': 'inset 0 1px 0 rgba(255,255,255,0.08)',
        'gh-floating': '0 0 0 1px #30363d, 0 16px 32px rgba(1,4,9,0.85)',
        'gh-overlay': '0 0 0 1px #30363d, 0 8px 32px 0 rgba(1,4,9,0.96)',
      },
      keyframes: {
        marqueeAnim: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulse2: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        }
      },
      animation: {
        'marquee': 'marqueeAnim 40s linear infinite',
        'marquee-fast': 'marqueeAnim 15s linear infinite',
        'fade-in-up': 'fadeInUp 0.6s ease-out forwards',
        'pulse2': 'pulse2 2s cubic-bezier(0.4,0,0.6,1) infinite',
        'blink': 'blink 1s step-end infinite',
      }
    },
  },
  plugins: [],
};
