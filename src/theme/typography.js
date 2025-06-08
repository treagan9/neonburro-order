// theme/typography.js
export const typography = {
    fonts: {
      heading: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      body: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      mono: "'JetBrains Mono', 'Fira Code', monospace"
    },
    fontSizes: {
      // Hero section (only for main hero)
      hero: {
        h1: { base: "3xl", md: "4xl", lg: "5xl" }
      },
      // All other section headings
      section: {
        h2: { base: "2xl", md: "3xl", lg: "4xl" }
      },
      // Subsections
      subsection: {
        h3: { base: "xl", md: "2xl" }
      },
      // Body text
      body: {
        lg: { base: "md", md: "lg" },
        md: { base: "sm", md: "md" },
        sm: { base: "xs", md: "sm" }
      }
    },
    fontWeights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700
    },
    lineHeights: {
      tight: 1.1,
      base: 1.5,
      relaxed: 1.7
    },
    letterSpacings: {
      tight: "-0.02em",
      normal: "0",
      wide: "0.1em",
      wider: "0.2em"
    }
  };
  
  export default typography;