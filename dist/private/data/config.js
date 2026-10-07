/**
 * data/config.js
 * Interface contract and configuration for Andrew Strachan's Electronic Career Portfolio.
 * Defines variant configuration supporting Public (sanitized, GitHub Pages)
 * and Private (unredacted, Firebase Hosting) builds.
 */

var PortfolioConfig = (typeof window !== 'undefined' && window.PortfolioConfig) ? window.PortfolioConfig : {
  // Active environment variant
  variant: 'private',
  redacted: false,

  // Candidate Contact & Profile Information
  contact: {
    name: 'Andrew Strachan',
    headline: 'Cybersecurity Systems Engineer & Secure Systems Architect',
    fellowship: 'CyberCorps: Scholarship for Service (SFS) Scholar | Clearable',
    location: 'Birmingham, Alabama',
    email: 'strachan@uab.edu',
    github: 'https://github.com/astrachan163',
    linkedin: 'https://www.linkedin.com/in/andrew-william-strachan/'
  },

  // Credential gating configuration
  credentials: {
    showTestLogins: true,
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
      variant: 'private',
      isPublic: false,
      redacted: false,
      contact: {
        name: 'Andrew Strachan',
        location: 'Birmingham, Alabama',
        email: 'strachan@uab.edu',
        phone: undefined
      },
      credentials: {
        showTestLogins: true
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

if (typeof module !== 'undefined' && module.exports) {
  module.exports = PortfolioConfig;
}

if (typeof window !== 'undefined') {
  window.PortfolioConfig = PortfolioConfig;
}
