// theme/index.js
import { extendTheme } from '@chakra-ui/react';
import colors from './colors';
import typography from './typography';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors,
  ...typography,
  styles: {
    global: {
      'html, body': {
        bg: 'dark.black',
        color: 'text.primary',
        fontFamily: 'body',
        lineHeight: 'base',
        overflowX: 'hidden',
        scrollBehavior: 'smooth',
      },
      '*::selection': {
        bg: 'brand.primaryAlpha.50',
        color: 'brand.primaryLight',
      },
      '::-webkit-scrollbar': {
        width: '8px',
        bg: 'dark.void',
      },
      '::-webkit-scrollbar-thumb': {
        bg: 'brand.primaryAlpha.30',
        borderRadius: '4px',
        '&:hover': {
          bg: 'brand.primaryAlpha.50',
        }
      },
      // Focus styles for accessibility
      'button:focus-visible, a:focus-visible': {
        outline: '2px solid',
        outlineColor: 'brand.primary',
        outlineOffset: '2px',
      },
      // Heading styles
      'h1, h2, h3, h4, h5, h6': {
        fontFamily: 'heading',
        fontWeight: 'bold',
        letterSpacing: 'tight',
        lineHeight: 'tight',
      },
      // Code and mono elements
      'code, pre, .mono': {
        fontFamily: 'mono',
      }
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'semibold',
        borderRadius: 'full',
        transition: 'all 0.3s',
      },
      variants: {
        solid: {
          bg: 'brand.primary',
          color: 'dark.black',
          _hover: {
            bg: 'brand.primaryDark',
            transform: 'translateY(-2px)',
            boxShadow: '0 10px 30px rgba(0, 229, 229, 0.4)',
          },
        },
        outline: {
          borderColor: 'brand.primary',
          color: 'brand.primary',
          _hover: {
            bg: 'brand.primaryAlpha.10',
          },
        },
      },
    },
    Heading: {
      baseStyle: {
        fontFamily: 'heading',
        fontWeight: 'bold',
        letterSpacing: 'tight',
      },
    },
    Text: {
      baseStyle: {
        lineHeight: 'base',
      },
    },
  },
});

export default theme;