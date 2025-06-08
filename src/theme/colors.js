// theme/colors.js
export const colors = {
  // Primary Brand Colors - Your unique teal/cyan
  brand: {
    primary: '#00E5E5',    // Unique teal - between cyan and turquoise
    primaryDark: '#00B8B8', // Darker teal for hover states
    primaryLight: '#4DFFFF', // Lighter teal for glows
    primaryAlpha: {
      10: 'rgba(0, 229, 229, 0.1)',
      20: 'rgba(0, 229, 229, 0.2)',
      30: 'rgba(0, 229, 229, 0.3)',
      50: 'rgba(0, 229, 229, 0.5)',
      70: 'rgba(0, 229, 229, 0.7)',
    }
  },
  
  // Accent Colors - Limited palette
  accent: {
    neon: '#39FF14',      // Neon green for energy/success
    warm: '#FF6B00',      // Orange for CTAs and warmth
    cool: '#00B8E6',      // Secondary blue-teal
  },
  
  // Neutral Colors
  dark: {
    void: '#000000',      // Pure black
    black: '#0A0A0A',     // Background black
    gray: '#1A1A1A',      // Card backgrounds
    slate: '#2A2A2A',     // Lighter elements
  },
  
  // Semantic Colors
  semantic: {
    success: '#39FF14',   // Using neon green
    warning: '#FFFF00',   // Yellow for warnings
    error: '#FF3366',     // Red-pink for errors
    info: '#00B8E6',      // Using cool blue
  },
  
  // Text Colors
  text: {
    primary: '#FFFFFF',
    secondary: '#B8B8B8',
    muted: '#808080',
    inverse: '#0A0A0A',
  },
  
  // UI Colors
  ui: {
    border: 'rgba(255, 255, 255, 0.1)',
    borderHover: 'rgba(0, 229, 229, 0.5)',
    backdrop: 'rgba(0, 0, 0, 0.6)',
    overlay: 'rgba(0, 0, 0, 0.8)',
  }
};

export default colors;