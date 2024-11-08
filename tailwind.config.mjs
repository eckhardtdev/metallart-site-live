/** @type {import('tailwindcss').Config} */
import tailwindcssTypography from '@tailwindcss/typography'
import tailwindcssForms from '@tailwindcss/forms'
import colors from 'tailwindcss/colors'
import defaultTheme from 'tailwindcss/defaultTheme'
import plugin from 'tailwindcss/plugin'
const withMT = require('@material-tailwind/react/utils/withMT')

const round = (num) =>
  num
    .toFixed(7)
    .replace(/(\.[0-9]+?)0+$/, '$1')
    .replace(/\.0$/, '')
const rem = (px) => `${round(px / 16)}rem`
const em = (px, base) => `${round(px / base)}em`

const fontFamily = {
  sans: ['Sora Variable', ...defaultTheme.fontFamily.sans],
  static: ['Sora', ...defaultTheme.fontFamily.sans],
  mono: [
    'Apple Color Emoji',
    'Segoe UI Emoji',
    'Segoe UI Symbol',
    'Noto Color Emoji',
    ...defaultTheme.fontFamily.mono,
  ],
}

export default withMT({
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // TailwindCSS Color Generator
      // https://uicolors.app/create
      // NOTE: Heads up! If you change a color here, you need to change it in the
      // - storyblok/components.273160.json storyblok-palette fields like "backgroundColor"
      // - src/utils/color.ts helper function
      colors: {
        'transparent': 'transparent',
        'current': 'currentColor',

        'black': '#000000',
        'white': '#ffffff',
        'debug': '#50b0af',
        'debug-gray': '#eff1f3',
        'body': '#363f46', // steel-900
        'error-text': '#f9685d',
        'error-icon': '#f9685d',
        'error-ring': '#f9685d',
        'error-placeholder': '#f9685d',

        'creme': {
          'DEFAULT': '#f2f2f2', // 100
          '50': '#f8f8f8',
          '100': '#f2f2f2',
          '200': '#dcdcdc',
          '300': '#bdbdbd',
          '400': '#989898',
          '500': '#7c7c7c',
          '600': '#656565',
          '700': '#525252',
          '800': '#464646',
          '900': '#3d3d3d',
          '950': '#292929',
        },
        'gold': {
          'DEFAULT': '#ad9467', // 400
          '50': '#f6f5f0',
          '100': '#eae5d7',
          '200': '#d6ccb2',
          '300': '#beac86',
          '400': '#ad9467',
          '500': '#9c8056',
          '600': '#866848',
          '700': '#6c503c',
          '800': '#5c4537',
          '900': '#503c33',
          '950': '#2d201b',
        },
        'velvet': {
          'DEFAULT': '#00474f', // 900
          '50': '#ecffff',
          '100': '#bdf9ff',
          '200': '#7bf2ff',
          '300': '#31e8ff',
          '400': '#00ecff',
          '500': '#00e3ed',
          '600': '#00b2bf',
          '700': '#008a97',
          '800': '#006b77',
          '900': '#00474f',
          '950': '#00353d',
        },
        'spark': {
          'DEFAULT': '#f9685d', // 400
          '50': '#fef3f2',
          '100': '#fee4e2',
          '200': '#fececa',
          '300': '#fdaaa4',
          '400': '#f9685d',
          '500': '#f04f43',
          '600': '#dd3225',
          '700': '#ba261b',
          '800': '#9a231a',
          '900': '#80231c',
          '950': '#450e0a',
        },
        'steel': {
          'DEFAULT': '#363f46', // 900
          '50': '#f5f5f5',
          '100': '#e5e6e6',
          '200': '#d0d1d2',
          '300': '#afb2b5',
          '400': '#9a9ea5',
          '500': '#868b92',
          '600': '#72787f',
          '700': '#5e656c',
          '800': '#4a5259',
          '900': '#363f46',
          '950': '#20272c',
        },
      },
      fontFamily,
      fontSize: {
        '10': rem(10),
        '12': rem(12),
        '14': rem(14),
        '16': rem(16),
        '18': rem(18),
        '22': rem(22),
        '24': rem(24),
        '26': rem(26),
        '30': rem(30),
        '32': rem(32),
        '36': rem(36),
        '46': rem(46),
        '48': rem(48),
        '60': rem(60),
      },
      fontWeight: {
        // https://tailwindcss.com/docs/font-weight
        '300': '300', // light
        '400': '400', // normal
        '500': '500', // medium
        '600': '600', // semibold
        '700': '700', // bold
        '800': '800', // extrabold
      },
      spacing: {
        'page-margin': 'var(--page-margin)',
        'gap': 'var(--gap)',
        'offset-wide': 'var(--offset-wide)',
        'offset-content': 'var(--offset-content)',
        'header': 'var(--header-height)',
        'anchornav': 'var(--anchornav-height)',
        'xs': rem(20), // used for default column gap
        'sm': rem(40),
        'md': rem(80),
        'lg': rem(140),
        'xl': rem(280),
        '1/25': '0.25em',
        '1/50': '0.5em',
        '1/75': '0.75em',
        '1/100': '1em',
        '1/125': '1.25em',
        '1/150': '1.5em',
        '1/175': '1.75em',
        '1/200': '2em',
        '8.5': rem(34),
        '13': rem(52),
        '15': rem(60),
        '18': rem(72),
        '25': rem(100),
        '50': rem(200),
        '100': rem(400),
      },
      lineHeight: {
        '120': '1.2',
        '125': '1.25',
        '140': '1.4',
        '150': '1.5',
      },
      letterSpacing: {},
      maxWidth: {
        'text-card': rem(400),
      },
      width: {},
      height: {
        'svh': ['100vh', '100svh'],
      },
      minHeight: {
        'svh': ['100vh', '100svh'],
      },
      screens: {
        'md+': { raw: 'screen and (max-width: 767px)' },
        'lg+': { raw: 'screen and (max-width: 1023px)' },
        'xl+': { raw: 'screen and (max-width: 1419px)' },
        'xl': '1420px',
        'hovers': { raw: '(hover: hover)' },
        'hoversnot': { raw: '(hover: none)' },
      },
      aspectRatio: {
        '2/5': '2/5',
        '9/21': '9/21',
        '1/2': '1/2',
        '9/16': '9/16',
        '2/3': '2/3',
        '3/4': '3/4',
        '1/1': '1/1',
        '4/3': '4/3',
        '3/2': '3/2',
        '16/9': '16/9',
        '2/1': '2/1',
        '21/9': '21/9',
        '5/2': '5/2',
      },
      boxShadow: {
        'line': '0 0 0 1px rgba(0, 0, 0, 1)',
        'border':
          '1px 0 0 0 #000, 0 1px 0 0 #000, 1px 1px 0 0 #000, 1px 0 0 0 #000 inset, 0 1px 0 0 #000 inset',
      },
      // URL encoder vor SVG
      // https://yoksel.github.io/url-encoder/
      backgroundImage: {},
      transitionProperty: {
        'opacity': 'opacity, visibility',
      },
      transitionDuration: {
        DEFAULT: '300ms',
      },
      transitionDelay: {
        '50': '50ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
        '300': '300ms',
        '350': '350ms',
        '400': '400ms',
        '450': '450ms',
        '500': '500ms',
        '550': '550ms',
        '600': '600ms',
        '650': '650ms',
        '700': '700ms',
        '750': '750ms',
        '800': '800ms',
        '850': '850ms',
        '900': '900ms',
        '950': '950ms',
        '1000': '1000ms',
      },
      transitionTimingFunction: {
        css: 'ease',
        'css-in': 'ease-in',
        'css-out': 'ease-out',
        'css-in-out': 'ease-in-out',
        'in-sine': 'cubic-bezier(0.12, 0, 0.39, 0)',
        'out-sine': 'cubic-bezier(0.61, 1, 0.88, 1)',
        'in-out-sine': 'cubic-bezier(0.37, 0, 0.63, 1)',
        'in-power1': 'cubic-bezier(0.11, 0, 0.5, 0)',
        'out-power1': 'cubic-bezier(0.5, 1, 0.89, 1)',
        'in-out-power1': 'cubic-bezier(0.45, 0, 0.55, 1)',
        'in-power2': 'cubic-bezier(0.32, 0, 0.67, 0)',
        'out-power2': 'cubic-bezier(0.33, 1, 0.68, 1)',
        'in-out-power2': 'cubic-bezier(0.65, 0, 0.35, 1)',
        'in-power3': 'cubic-bezier(0.5, 0, 0.75, 0)',
        'out-power3': 'cubic-bezier(0.25, 1, 0.5, 1)',
        'in-out-power3': 'cubic-bezier(0.76, 0, 0.24, 1)',
        'in-power4': 'cubic-bezier(0.64, 0, 0.78, 0)',
        'out-power4': 'cubic-bezier(0.22, 1, 0.36, 1)',
        'in-out-power4': 'cubic-bezier(0.83, 0, 0.17, 1)',
        'in-expo': 'cubic-bezier(0.7, 0, 0.84, 0)',
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-expo': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'in-circ': 'cubic-bezier(0.55, 0, 1, 0.45)',
        'out-circ': 'cubic-bezier(0, 0.55, 0.45, 1)',
        'in-out-circ': 'cubic-bezier(0.85, 0, 0.15, 1)',
        'in-back': 'cubic-bezier(0.36, 0, 0.66, -0.56)',
        'out-back': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'in-out-back': 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
      },
      animation: {
        'point-left': 'point-left 400ms cubic-bezier(0.45, 0, 0.55, 1)',
        'point-right': 'point-right 400ms cubic-bezier(0.45, 0, 0.55, 1)',
        'bounce-rest': 'bounce-rest 6s cubic-bezier(0.45, 0, 0.55, 1) infinite',
      },
      keyframes: {
        'point-left': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-20%)' },
        },
        'point-right': {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(20%)' },
        },
        'bounce-rest': {
          '80%, 90%, 90%, 100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '85%, 95%': {
            transform: 'translateY(25%)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
      gridTemplateColumns: {
        '2-max': 'repeat(2, minmax(0, max-content))',
        '3-max': 'repeat(3, minmax(0, max-content))',
        '4-max': 'repeat(4, minmax(0, max-content))',
        '5-max': 'repeat(5, minmax(0, max-content))',
        '6-max': 'repeat(6, minmax(0, max-content))',
        '7-max': 'repeat(7, minmax(0, max-content))',
        '8-max': 'repeat(8, minmax(0, max-content))',
      },
      gridAutoColumns: {
        'full': '100%',
      },
      zIndex: {
        'header': 1000,
        'globalnav': 2040,
        'contactdialog': 2020,
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },

      typography: {
        // https://github.com/tailwindlabs/tailwindcss-typography/blob/master/src/styles.js
        DEFAULT: {
          css: {
            fontSize: rem(16),
            lineHeight: round(20 / 16),
            'a, .richtext-link': {
              color: 'var(--tw-prose-links)',
              fontWeight: 'inherit',
              textDecoration: 'underline',
              textDecorationThickness: 'max(1px, 0.05em)',
              textUnderlineOffset: '0.125em',
              textUnderlinePosition: 'auto',
              // textDecorationStyle: 'wavy',
            },
            // It works, but it's not perfect and is now handled by the rich text renderer
            // src/components/storyblok/StoryblokRichText.astro
            // 'a[href$=".png"],a[href$=".jpg"],a[href$=".jpeg"],a[href$=".svg"],a[href$=".gif"],a[href$=".webp"]':
            //   {
            //     backgroundColor: 'var(--theme)',
            //     textDecoration: 'none',
            //   },
            'ol > li::marker': {
              fontVariantNumeric: 'proportional-nums',
            },
            'h3': {
              fontWeight: 400,
            },
            maxWidth: '1200px',
          },
        },
        lg: {
          css: [
            {
              fontSize: rem(18),
              lineHeight: round(28 / 18),
              p: {
                marginTop: em(24, 18),
                marginBottom: em(24, 18),
              },
              '[class~="lead"]': {
                fontSize: em(22, 18),
                lineHeight: round(32 / 22),
                marginTop: em(24, 22),
                marginBottom: em(24, 22),
              },
              blockquote: {
                marginTop: em(40, 24),
                marginBottom: em(40, 24),
                paddingLeft: em(24, 24),
              },
              h1: {
                fontSize: em(48, 18),
                marginTop: '0',
                marginBottom: em(40, 48),
                lineHeight: round(48 / 48),
              },
              h2: {
                fontSize: em(30, 18),
                marginTop: em(56, 30),
                marginBottom: em(32, 30),
                lineHeight: round(40 / 30),
              },
              h3: {
                fontSize: em(24, 18),
                marginTop: em(40, 24),
                marginBottom: em(16, 24),
                lineHeight: round(36 / 24),
              },
              h4: {
                marginTop: em(32, 18),
                marginBottom: em(8, 18),
                lineHeight: round(28 / 18),
              },
              img: {
                marginTop: em(32, 18),
                marginBottom: em(32, 18),
              },
              picture: {
                marginTop: em(32, 18),
                marginBottom: em(32, 18),
              },
              'picture > img': {
                marginTop: '0',
                marginBottom: '0',
              },
              video: {
                marginTop: em(32, 18),
                marginBottom: em(32, 18),
              },
              kbd: {
                fontSize: em(16, 18),
                borderRadius: rem(5),
                paddingTop: em(4, 18),
                paddingRight: em(8, 18),
                paddingBottom: em(4, 18),
                paddingLeft: em(8, 18),
              },
              code: {
                fontSize: em(16, 18),
              },
              'h2 code': {
                fontSize: em(26, 30),
              },
              'h3 code': {
                fontSize: em(21, 24),
              },
              pre: {
                fontSize: em(16, 18),
                lineHeight: round(28 / 16),
                marginTop: em(32, 16),
                marginBottom: em(32, 16),
                borderRadius: rem(6),
                paddingTop: em(16, 16),
                paddingRight: em(24, 16),
                paddingBottom: em(16, 16),
                paddingLeft: em(24, 16),
              },
              ol: {
                marginTop: em(24, 18),
                marginBottom: em(24, 18),
                paddingLeft: em(28, 18),
              },
              ul: {
                marginTop: em(24, 18),
                marginBottom: em(24, 18),
                paddingLeft: em(28, 18),
              },
              li: {
                marginTop: em(12, 18),
                marginBottom: em(12, 18),
              },
              'ol > li': {
                paddingLeft: em(8, 18),
              },
              'ul > li': {
                paddingLeft: em(8, 18),
              },
              '> ul > li p': {
                marginTop: em(16, 18),
                marginBottom: em(16, 18),
              },
              '> ul > li > *:first-child': {
                marginTop: em(24, 18),
              },
              '> ul > li > *:last-child': {
                marginBottom: em(24, 18),
              },
              '> ol > li > *:first-child': {
                marginTop: em(24, 18),
              },
              '> ol > li > *:last-child': {
                marginBottom: em(24, 18),
              },
              'ul ul, ul ol, ol ul, ol ol': {
                marginTop: em(16, 18),
                marginBottom: em(16, 18),
              },
              dl: {
                marginTop: em(24, 18),
                marginBottom: em(24, 18),
              },
              dt: {
                marginTop: em(24, 18),
              },
              dd: {
                marginTop: em(12, 18),
                paddingLeft: em(28, 18),
              },
              hr: {
                marginTop: em(56, 18),
                marginBottom: em(56, 18),
              },
              'hr + *': {
                marginTop: '0',
              },
              'h2 + *': {
                marginTop: '0',
              },
              'h3 + *': {
                marginTop: '0',
              },
              'h4 + *': {
                marginTop: '0',
              },
              table: {
                fontSize: em(16, 18),
                lineHeight: round(24 / 16),
              },
              'thead th': {
                paddingRight: em(12, 16),
                paddingBottom: em(12, 16),
                paddingLeft: em(12, 16),
              },
              'thead th:first-child': {
                paddingLeft: '0',
              },
              'thead th:last-child': {
                paddingRight: '0',
              },
              'tbody td, tfoot td': {
                paddingTop: em(12, 16),
                paddingRight: em(12, 16),
                paddingBottom: em(12, 16),
                paddingLeft: em(12, 16),
              },
              'tbody td:first-child, tfoot td:first-child': {
                paddingLeft: '0',
              },
              'tbody td:last-child, tfoot td:last-child': {
                paddingRight: '0',
              },
              figure: {
                marginTop: em(32, 18),
                marginBottom: em(32, 18),
              },
              'figure > *': {
                marginTop: '0',
                marginBottom: '0',
              },
              figcaption: {
                fontSize: em(16, 18),
                lineHeight: round(24 / 16),
                marginTop: em(16, 16),
              },
            },
            {
              '> :first-child': {
                marginTop: '0',
              },
              '> :last-child': {
                marginBottom: '0',
              },
            },
          ],
        },
        xl: {
          css: [
            {
              fontSize: rem(20),
              lineHeight: round(24 / 20),
              p: {
                marginTop: em(24, 20),
                marginBottom: em(24, 20),
              },
              '[class~="lead"]': {
                fontSize: em(24, 20),
                lineHeight: round(36 / 24),
                marginTop: em(24, 24),
                marginBottom: em(24, 24),
              },
              blockquote: {
                marginTop: em(48, 30),
                marginBottom: em(48, 30),
                paddingLeft: 0,
              },
              h1: {
                fontSize: em(56, 20),
                marginTop: '0',
                marginBottom: em(48, 56),
                lineHeight: round(56 / 56),
              },
              h2: {
                fontSize: em(36, 20),
                marginTop: em(56, 36),
                marginBottom: em(32, 36),
                lineHeight: round(40 / 36),
              },
              h3: {
                fontSize: em(30, 20),
                marginTop: em(48, 30),
                marginBottom: em(20, 30),
                lineHeight: round(40 / 30),
              },
              h4: {
                marginTop: em(36, 20),
                marginBottom: em(12, 20),
                lineHeight: round(32 / 20),
              },
              img: {
                marginTop: em(40, 20),
                marginBottom: em(40, 20),
              },
              video: {
                marginTop: em(40, 20),
                marginBottom: em(40, 20),
              },
              figure: {
                marginTop: em(40, 20),
                marginBottom: em(40, 20),
              },
              'figure > *': {
                marginTop: '0',
                marginBottom: '0',
              },
              figcaption: {
                fontSize: em(18, 20),
                lineHeight: round(28 / 18),
                marginTop: em(18, 18),
              },
              code: {
                fontSize: em(18, 20),
              },
              'h2 code': {
                fontSize: em(31, 36),
              },
              'h3 code': {
                fontSize: em(27, 30),
              },
              pre: {
                fontSize: em(18, 20),
                lineHeight: round(32 / 18),
                marginTop: em(36, 18),
                marginBottom: em(36, 18),
                borderRadius: rem(8),
                paddingTop: em(20, 18),
                paddingRight: em(24, 18),
                paddingBottom: em(20, 18),
                paddingLeft: em(24, 18),
              },
              ol: {
                marginTop: em(24, 20),
                marginBottom: em(24, 20),
                paddingLeft: em(32, 20),
              },
              ul: {
                marginTop: em(24, 20),
                marginBottom: em(24, 20),
                paddingLeft: em(32, 20),
              },
              li: {
                marginTop: em(12, 20),
                marginBottom: em(12, 20),
              },
              'ol > li': {
                paddingLeft: em(8, 20),
              },
              'ul > li': {
                paddingLeft: em(8, 20),
              },
              '> ul > li p': {
                marginTop: em(16, 20),
                marginBottom: em(16, 20),
              },
              '> ul > li > *:first-child': {
                marginTop: em(24, 20),
              },
              '> ul > li > *:last-child': {
                marginBottom: em(24, 20),
              },
              '> ol > li > *:first-child': {
                marginTop: em(24, 20),
              },
              '> ol > li > *:last-child': {
                marginBottom: em(24, 20),
              },
              'ul ul, ul ol, ol ul, ol ol': {
                marginTop: em(16, 20),
                marginBottom: em(16, 20),
              },
              hr: {
                marginTop: em(56, 20),
                marginBottom: em(56, 20),
              },
              'hr + *': {
                marginTop: '0',
              },
              'h2 + *': {
                marginTop: '0',
              },
              'h3 + *': {
                marginTop: '0',
              },
              'h4 + *': {
                marginTop: '0',
              },
              table: {
                fontSize: em(18, 20),
                lineHeight: round(28 / 18),
              },
              'thead th': {
                paddingRight: em(12, 18),
                paddingBottom: em(16, 18),
                paddingLeft: em(12, 18),
              },
              'thead th:first-child': {
                paddingLeft: '0',
              },
              'thead th:last-child': {
                paddingRight: '0',
              },
              'tbody td, tfoot td': {
                paddingTop: em(16, 18),
                paddingRight: em(12, 18),
                paddingBottom: em(16, 18),
                paddingLeft: em(12, 18),
              },
              'tbody td:first-child, tfoot td:first-child': {
                paddingLeft: '0',
              },
              'tbody td:last-child, tfoot td:last-child': {
                paddingRight: '0',
              },
            },
            {
              '> :first-child': {
                marginTop: '0',
              },
              '> :last-child': {
                marginBottom: '0',
              },
            },
          ],
        },
        black: {
          css: {
            '--tw-prose-body': colors.black,
            '--tw-prose-headings': colors.black,
            '--tw-prose-lead': colors.black,
            '--tw-prose-links': colors.black,
            '--tw-prose-bold': colors.black,
            '--tw-prose-counters': colors.black,
            '--tw-prose-bullets': colors.black,
            '--tw-prose-hr': colors.black,
            '--tw-prose-quotes': colors.black,
            '--tw-prose-quote-borders': colors.black,
            '--tw-prose-captions': colors.black,
            '--tw-prose-code': colors.black,
            '--tw-prose-pre-code': colors.black,
            '--tw-prose-pre-bg': colors.black,
            '--tw-prose-th-borders': colors.black,
            '--tw-prose-td-borders': colors.black,
            '--tw-prose-invert-body': colors.white,
            '--tw-prose-invert-headings': colors.white,
            '--tw-prose-invert-lead': colors.white,
            '--tw-prose-invert-links': colors.white,
            '--tw-prose-invert-bold': colors.white,
            '--tw-prose-invert-counters': colors.white,
            '--tw-prose-invert-bullets': colors.white,
            '--tw-prose-invert-hr': colors.white,
            '--tw-prose-invert-quotes': colors.white,
            '--tw-prose-invert-quote-borders': colors.white,
            '--tw-prose-invert-captions': colors.white,
            '--tw-prose-invert-code': colors.white,
            '--tw-prose-invert-pre-code': colors.white,
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': colors.white,
            '--tw-prose-invert-td-borders': colors.white,
          },
        },
        white: {
          css: {
            '--tw-prose-body': colors.white,
            '--tw-prose-headings': colors.white,
            '--tw-prose-lead': colors.white,
            '--tw-prose-links': colors.white,
            '--tw-prose-bold': colors.white,
            '--tw-prose-counters': colors.white,
            '--tw-prose-bullets': colors.white,
            '--tw-prose-hr': colors.white,
            '--tw-prose-quotes': colors.white,
            '--tw-prose-quote-borders': colors.white,
            '--tw-prose-captions': colors.white,
            '--tw-prose-code': colors.white,
            '--tw-prose-pre-code': colors.white,
            '--tw-prose-pre-bg': colors.white,
            '--tw-prose-th-borders': colors.white,
            '--tw-prose-td-borders': colors.white,
            '--tw-prose-invert-body': colors.black,
            '--tw-prose-invert-headings': colors.black,
            '--tw-prose-invert-lead': colors.black,
            '--tw-prose-invert-links': colors.black,
            '--tw-prose-invert-bold': colors.black,
            '--tw-prose-invert-counters': colors.black,
            '--tw-prose-invert-bullets': colors.black,
            '--tw-prose-invert-hr': colors.black,
            '--tw-prose-invert-quotes': colors.black,
            '--tw-prose-invert-quote-borders': colors.black,
            '--tw-prose-invert-captions': colors.black,
            '--tw-prose-invert-code': colors.black,
            '--tw-prose-invert-pre-code': colors.black,
            '--tw-prose-invert-pre-bg': 'rgb(0 0 0 / 50%)',
            '--tw-prose-invert-th-borders': colors.black,
            '--tw-prose-invert-td-borders': colors.black,
          },
        },
      },
    },
  },
  plugins: [
    tailwindcssTypography,
    tailwindcssForms,
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.stack': {
          display: 'grid',
        },
        '.stack > *': {
          'grid-area': '1/1',
          width: '100%',
        },
      })
    }),
  ],
})
