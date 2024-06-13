import type { InkConfig } from '@/utils/ink'
import clsx from 'clsx'

const FIXED_CLASSES =
  'group rounded inline-flex font-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2'

const HOVER_OPACITY = 'hovers:transition hovers:hover:opacity-80'

export const config: InkConfig = {
  variants: {
    DEFAULT: {
      root: clsx(FIXED_CLASSES),
      showArrow: true,
    },
    contained: {
      root: clsx(
        FIXED_CLASSES,
        'w-full justify-center text-center md:w-auto',
        HOVER_OPACITY,
      ),
      showArrow: false,
    },
    outlined: {
      root: clsx(
        'border',
        FIXED_CLASSES,
        'w-full justify-center text-center md:w-auto',
        HOVER_OPACITY,
      ),
      showArrow: false,
    },
  },
  colors: {
    // = steel
    DEFAULT: {
      DEFAULT: {
        root: 'text-steel focus-visible:outline-steel',
      },
      contained: {
        root: 'text-creme bg-steel focus-visible:outline-steel',
      },
      outlined: {
        root: 'text-steel border-steel focus-visible:outline-steel',
      },
    },
    spark: {
      DEFAULT: {
        root: 'text-spark focus-visible:outline-spark',
      },
      contained: {
        root: 'text-creme bg-spark focus-visible:outline-spark',
      },
      outlined: {
        root: 'text-spark border-spark focus-visible:outline-spark',
      },
    },
    white: {
      DEFAULT: {
        root: 'text-white focus-visible:outline-white',
      },
      contained: {
        root: 'text-steel bg-white focus-visible:outline-white',
      },
      outlined: {
        root: 'border-white text-white focus-visible:outline-white',
      },
    },
  },
  sizes: {
    DEFAULT: {
      DEFAULT: {
        root: 'py-1/125 text-16 leading-125 gap-x-1/125',
      },
    },
    outlined: {
      DEFAULT: {
        root: 'px-1/200 py-1/125 text-16 leading-125 gap-x-1/125',
      },
    },
    contained: {
      DEFAULT: {
        root: 'px-1/200 py-1/125 text-16 leading-125 gap-x-1/125',
      },
    },
  },
}
