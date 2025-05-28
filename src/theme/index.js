import { extendTheme } from '@chakra-ui/react';
import colors from './colors';

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  colors,
  styles: {
    global: {
      body: {
        bg: 'dark.black',
        color: 'matrix.500',
        fontFamily: 'monospace',
      },
      '*::selection': {
        bg: 'matrix.700',
        color: 'matrix.400',
      },
      '::-webkit-scrollbar': {
        width: '8px',
        bg: 'dark.void',
      },
      '::-webkit-scrollbar-thumb': {
        bg: 'matrix.700',
        borderRadius: '4px',
      },
      '::-webkit-scrollbar-thumb:hover': {
        bg: 'matrix.600',
      },
    },
  },
  fonts: {
    heading: `'Space Mono', 'Courier New', monospace`,
    body: `'Fira Code', 'JetBrains Mono', monospace`,
    mono: `'Fira Code', monospace`,
  },
});

export default theme;
