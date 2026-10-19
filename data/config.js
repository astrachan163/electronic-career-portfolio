/**
 * data/config.js
 * Interface contract and configuration for Andrew Strachan's Electronic Career Portfolio.
 * Defines variant configuration supporting Public (sanitized, GitHub Pages)
 * and Private (unredacted, Firebase Hosting) builds.
 */

var PortfolioConfig = (typeof window !== 'undefined' && window.PortfolioConfig) ? window.PortfolioConfig : {
  // Active environment variant
  variant: 'public',
  redacted: true,

  // Candidate Contact & Profile Information
  contact: {
    name: 'Andrew Strachan',
    headline: 'M.S. Cybersecurity Candidate | CyberAICorps Scholar | UAB',
    programLine: 'SFS CyberAICorps scholarship recipient (NSF-funded, with a post-graduation government service commitment)',
    location: 'Birmingham, Alabama',
    email: 'astrachan162@gmail.com',
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

  // Variants dictionary for build tooling
  variants: {
    public: {
      variant: 'public',
      isPublic: true,
      redacted: true,
      contact: {
        name: 'Andrew Strachan',
        location: 'Birmingham, Alabama',
        email: 'astrachan162@gmail.com',
        phone: undefined
      },
      credentials: {
        showTestLogins: false
      }
    },
    private: {
      variant: 'public',
      isPublic: true,
      redacted: true,
      contact: {
        name: 'Andrew Strachan',
        location: 'Birmingham, Alabama',
        email: 'astrachan162@gmail.com'
      },
      credentials: {
        showTestLogins: false,
        ghsLogin: undefined
      }
    }
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioConfig;
}

if (typeof window !== 'undefined') {
  window.PortfolioConfig = PortfolioConfig;
}
