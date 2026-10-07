/**
 * js/config.js
 * Interface contract and configuration for Andrew Strachan's Electronic Career Portfolio.
 * Defines variant configuration supporting Public (sanitized, GitHub Pages)
 * and Private (unredacted, Firebase Hosting) builds.
 * Compatible with data/config.js and adheres to PROJECT.md §Interface Contracts.
 */

var PortfolioConfig = {
  // Active environment variant ('public' or 'private')
  variant: 'public',
  isPublic: true,
  redacted: true,

  // Candidate Contact & Profile Information
  contact: {
    name: 'Andrew Strachan',
    headline: 'Cybersecurity Systems Engineer & Secure Systems Architect',
    fellowship: 'CyberCorps: Scholarship for Service (SFS) Scholar | Clearable',
    location: 'Birmingham, Alabama',
    email: 'strachan@uab.edu',
    phone: undefined, // Explicitly omitted/undefined on public variant
    github: 'https://github.com/astrachan163',
    linkedin: 'https://www.linkedin.com/in/andrew-william-strachan/'
  },

  // Credential gating configuration
  credentials: {
    showTestLogins: false,
    environment: 'production'
  },

  // Presentation HUD Configuration
  presentation: {
    timeLimitSeconds: 420, // 7 minutes presentation time
    alertThresholdSeconds: 60, // 1 minute remaining warning
    autoAdvance: false
  },

  // Variants dictionary for runtime and build tooling
  variants: {
    public: {
      variant: 'public',
      isPublic: true,
      redacted: true,
      contact: {
        name: 'Andrew Strachan',
        location: 'Birmingham, Alabama',
        email: 'strachan@uab.edu',
        phone: undefined
      },
      credentials: {
        showTestLogins: false
      }
    },
    private: {
      variant: 'private',
      isPublic: false,
      redacted: false,
      contact: {
        name: 'Andrew Strachan',
        location: 'Birmingham, Alabama',
        email: 'strachan@uab.edu'
      },
      credentials: {
        showTestLogins: true,
        ghsLogin: {
          username: 'z@z.com',
          pass: 'zzzzzz'
        }
      }
    }
  }
};

/**
 * Helper to retrieve configuration for a specified variant
 */
function getVariantConfig(variant = 'public') {
  if (variant === 'public') {
    return PortfolioConfig.variants.public;
  }
  if (variant === 'private') {
    return PortfolioConfig.variants.private;
  }
  return PortfolioConfig.variants.public;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioConfig;
}

if (typeof window !== 'undefined') {
  window.PortfolioConfig = PortfolioConfig;
}
