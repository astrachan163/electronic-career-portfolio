/**
 * tools/copy-assets.js
 * Automated asset copy pipeline for Andrew Strachan's Electronic Career Portfolio.
 * Copies verified brand assets, 10-second video previews & posters, evidence screenshots,
 * and presentation companion documents from master device locations into ./assets/
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const ROOT_DIR = path.resolve(__dirname, '..');
const ASSETS_DIR = path.join(ROOT_DIR, 'assets');

// Destination subdirectories
const DIRS = [
  path.join(ASSETS_DIR, 'brand'),
  path.join(ASSETS_DIR, 'previews'),
  path.join(ASSETS_DIR, 'screenshots'),
  path.join(ASSETS_DIR, 'docs')
];

// Master copy manifest
const MANIFEST = [
  // 1. Brand Mark & Badges
  {
    src: '/Users/andrewstrachan/.gemini/antigravity/brain/3402f430-b8a8-4e53-b08d-fa36c0d004a1/.user_uploaded/media_1791283990241.jpg',
    targets: [
      'assets/brand/media_1791283990241.jpg',
      'assets/brand/circuit-m-logo.jpg',
      'assets/brand/logo_circuit_m.jpg'
    ]
  },
  {
    src: '/Users/andrewstrachan/Current Resume by Year/Badges & Certifications/mce-microsoft-certified-educator.png',
    targets: [
      'assets/brand/mce-microsoft-certified-educator.png',
      'assets/brand/mce-badge.png'
    ]
  },

  // 2. 10s Video Previews & Posters
  {
    src: '/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/sanctum-v1-10s-720p.mp4',
    targets: [
      'assets/previews/sanctum-v1-10s-720p.mp4',
      'assets/previews/sanctum.mp4'
    ]
  },
  {
    src: '/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/sanctum-v1-10s-720p.webm',
    targets: [
      'assets/previews/sanctum-v1-10s-720p.webm',
      'assets/previews/sanctum.webm'
    ]
  },
  {
    src: '/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/sanctum-v1-poster.png',
    targets: [
      'assets/previews/sanctum-v1-poster.png',
      'assets/previews/sanctum-poster.png'
    ]
  },
  {
    src: '/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/adaptivehs-v1-10s-720p.mp4',
    targets: [
      'assets/previews/adaptivehs-v1-10s-720p.mp4',
      'assets/previews/adaptivehs.mp4'
    ]
  },
  {
    src: '/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/adaptivehs-v1-10s-720p.webm',
    targets: [
      'assets/previews/adaptivehs-v1-10s-720p.webm',
      'assets/previews/adaptivehs.webm'
    ]
  },
  {
    src: '/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/adaptivehs-v1-poster.png',
    targets: [
      'assets/previews/adaptivehs-v1-poster.png',
      'assets/previews/adaptivehs-poster.png'
    ]
  },
  {
    src: '/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/tutor-v1-10s-720p.mp4',
    targets: [
      'assets/previews/tutor-v1-10s-720p.mp4',
      'assets/previews/tutor.mp4'
    ]
  },
  {
    src: '/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/tutor-v1-10s-720p.webm',
    targets: [
      'assets/previews/tutor-v1-10s-720p.webm',
      'assets/previews/tutor.webm'
    ]
  },
  {
    src: '/Users/andrewstrachan/Maqkrs_Hub/exports/2026-10-03/tutor-v1-poster.png',
    targets: [
      'assets/previews/tutor-v1-poster.png',
      'assets/previews/tutor-poster.png'
    ]
  },
  {
    src: '/Users/andrewstrachan/Maqkrs_Hub/held-for-clearance/exports/2026-10-03/ghs-v1-10s-720p.mp4',
    targets: [
      'assets/previews/ghs-v1-10s-720p.mp4',
      'assets/previews/ghs.mp4'
    ]
  },
  {
    src: '/Users/andrewstrachan/Maqkrs_Hub/held-for-clearance/exports/2026-10-03/ghs-v1-10s-720p.webm',
    targets: [
      'assets/previews/ghs-v1-10s-720p.webm',
      'assets/previews/ghs.webm'
    ]
  },
  {
    src: '/Users/andrewstrachan/Maqkrs_Hub/held-for-clearance/exports/2026-10-03/ghs-v1-poster.png',
    targets: [
      'assets/previews/ghs-v1-poster.png',
      'assets/previews/ghs-poster.png'
    ]
  },

  // 3. Evidence Screenshots - Maqkrs-hq reports/evidence
  {
    src: '/Users/andrewstrachan/Documents/ChatGPT/Maqkrs-hq/reports/evidence/backup-interaction.png',
    targets: ['assets/screenshots/backup-interaction.png']
  },
  {
    src: '/Users/andrewstrachan/Documents/ChatGPT/Maqkrs-hq/reports/evidence/backup-launch.png',
    targets: ['assets/screenshots/backup-launch.png']
  },
  {
    src: '/Users/andrewstrachan/Documents/ChatGPT/Maqkrs-hq/reports/evidence/backup-topic.png',
    targets: ['assets/screenshots/backup-topic.png']
  },
  {
    src: '/Users/andrewstrachan/Documents/ChatGPT/Maqkrs-hq/reports/evidence/g01-persistence-after-reload.png',
    targets: ['assets/screenshots/g01-persistence-after-reload.png']
  },
  {
    src: '/Users/andrewstrachan/Documents/ChatGPT/Maqkrs-hq/reports/evidence/g01-persistence-before-browser-close.png',
    targets: ['assets/screenshots/g01-persistence-before-browser-close.png']
  },
  {
    src: '/Users/andrewstrachan/Documents/ChatGPT/Maqkrs-hq/reports/evidence/g01-persistence-before-reload.png',
    targets: ['assets/screenshots/g01-persistence-before-reload.png']
  },
  {
    src: '/Users/andrewstrachan/Documents/ChatGPT/Maqkrs-hq/reports/evidence/g01-persistence-relaunch-hud.png',
    targets: ['assets/screenshots/g01-persistence-relaunch-hud.png']
  },
  {
    src: '/Users/andrewstrachan/Documents/ChatGPT/Maqkrs-hq/reports/evidence/g01-persistence-relaunch-note-after.png',
    targets: ['assets/screenshots/g01-persistence-relaunch-note-after.png']
  },
  {
    src: '/Users/andrewstrachan/Documents/ChatGPT/Maqkrs-hq/reports/evidence/g01-persistence-relaunch-note-before.png',
    targets: ['assets/screenshots/g01-persistence-relaunch-note-before.png']
  },
  {
    src: '/Users/andrewstrachan/Documents/ChatGPT/Maqkrs-hq/reports/evidence/primary-launch.png',
    targets: ['assets/screenshots/primary-launch.png']
  },
  {
    src: '/Users/andrewstrachan/Documents/ChatGPT/Maqkrs-hq/reports/evidence/primary-topic.png',
    targets: ['assets/screenshots/primary-topic.png']
  },
  {
    src: '/Users/andrewstrachan/Documents/ChatGPT/Maqkrs-hq/reports/evidence/web-home.png',
    targets: ['assets/screenshots/web-home.png']
  },
  {
    src: '/Users/andrewstrachan/Documents/ChatGPT/Maqkrs-hq/reports/evidence/web-mobile-dark.png',
    targets: ['assets/screenshots/web-mobile-dark.png']
  },
  {
    src: '/Users/andrewstrachan/Documents/ChatGPT/Maqkrs-hq/reports/evidence/web-mobile-light.png',
    targets: ['assets/screenshots/web-mobile-light.png']
  },

  // 4. Screenshots - DevAtlas 3D environment
  {
    src: '/Users/andrewstrachan/DevAtlas/portfolio-draft/dist/assets/atlas-concept.webp',
    targets: ['assets/screenshots/atlas-concept.webp']
  },
  {
    src: '/Users/andrewstrachan/DevAtlas/portfolio-draft/dist/assets/prototype-forge.png',
    targets: ['assets/screenshots/prototype-forge.png']
  },
  {
    src: '/Users/andrewstrachan/DevAtlas/portfolio-draft/dist/assets/prototype-hash-lab.png',
    targets: ['assets/screenshots/prototype-hash-lab.png']
  },
  {
    src: '/Users/andrewstrachan/DevAtlas/portfolio-draft/dist/assets/prototype-overworld.png',
    targets: ['assets/screenshots/prototype-overworld.png']
  },
  {
    src: '/Users/andrewstrachan/DevAtlas/portfolio-draft/dist/assets/sanctum-consensus-room.png',
    targets: ['assets/screenshots/sanctum-consensus-room.png']
  },
  {
    src: '/Users/andrewstrachan/DevAtlas/portfolio-draft/dist/assets/sanctum-money-room.png',
    targets: ['assets/screenshots/sanctum-money-room.png']
  },
  {
    src: '/Users/andrewstrachan/DevAtlas/portfolio-draft/dist/assets/sanctum-world-aerial.png',
    targets: ['assets/screenshots/sanctum-world-aerial.png']
  },

  // 5. Benchmark & Companion Documents
  {
    src: '/Users/andrewstrachan/UAB_Timeline_Meeting/Electronic Portfolio/Electronic Career Portfolio.pdf',
    targets: [
      'assets/docs/fbla-guidelines-rating-sheet.pdf',
      'assets/docs/Electronic Career Portfolio.pdf'
    ]
  },
  {
    src: '/Users/andrewstrachan/UAB_Timeline_Meeting/Electronic Portfolio/State Event Presentation-DonnaKaran Allen.pptx.pdf',
    targets: [
      'assets/docs/benchmark-student-presentation-companion.pdf',
      'assets/docs/State Event Presentation-DonnaKaran Allen.pptx.pdf'
    ]
  },
  {
    src: '/Users/andrewstrachan/Current Resume by Year/AndrewStrachanResume.pdf',
    targets: [
      'assets/docs/AndrewStrachanResume_Full.pdf',
      'assets/docs/AndrewStrachanResume.pdf'
    ]
  }
];

function generateFaviconSvg() {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128" width="128" height="128">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#060b13"/>
      <stop offset="100%" stop-color="#0b1220"/>
    </linearGradient>
    <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffd700"/>
      <stop offset="100%" stop-color="#d4af37"/>
    </linearGradient>
    <linearGradient id="cyanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00e5ff"/>
      <stop offset="100%" stop-color="#0a9396"/>
    </linearGradient>
    <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="3" result="blur"/>
      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
    </filter>
  </defs>

  <!-- Background diamond canvas -->
  <rect width="128" height="128" rx="24" fill="url(#bgGrad)" stroke="#1e293b" stroke-width="2"/>

  <!-- Outer diamond PCB boundary -->
  <polygon points="64,12 116,64 64,116 12,64" fill="none" stroke="url(#goldGrad)" stroke-width="3" filter="url(#glow)"/>

  <!-- Circuit nodes & traces -->
  <circle cx="64" cy="12" r="4" fill="#ffd700"/>
  <circle cx="116" cy="64" r="4" fill="#ffd700"/>
  <circle cx="64" cy="116" r="4" fill="#ffd700"/>
  <circle cx="12" cy="64" r="4" fill="#ffd700"/>

  <line x1="64" y1="20" x2="64" y2="34" stroke="#00e5ff" stroke-width="2"/>
  <line x1="64" y1="108" x2="64" y2="94" stroke="#00e5ff" stroke-width="2"/>
  <line x1="20" y1="64" x2="34" y2="64" stroke="#00e5ff" stroke-width="2"/>
  <line x1="108" y1="64" x2="94" y2="64" stroke="#00e5ff" stroke-width="2"/>

  <!-- Inner shield -->
  <polygon points="64,28 98,46 98,78 64,100 30,78 30,46" fill="#0b1220" stroke="url(#cyanGrad)" stroke-width="2"/>

  <!-- Geometric Monogram "M" -->
  <path d="M42 82 L42 46 L64 68 L86 46 L86 82" fill="none" stroke="url(#goldGrad)" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
}

function main() {
  console.log('=== Andrew Strachan Portfolio: Asset Pipeline Ingestion ===');
  console.log(`Target root: ${ROOT_DIR}`);
  console.log(`Assets destination: ${ASSETS_DIR}`);

  // Create subdirectories
  for (const dir of DIRS) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
      console.log(`Created directory: ${dir}`);
    }
  }

  let totalCopied = 0;
  let totalBytes = 0;
  const errors = [];

  for (const item of MANIFEST) {
    if (!fs.existsSync(item.src)) {
      console.error(`[MISSING] Source file not found: ${item.src}`);
      errors.push(item.src);
      continue;
    }

    const stat = fs.statSync(item.src);
    const size = stat.size;
    totalBytes += size;

    if (size > 100 * 1024 * 1024) {
      console.error(`[ERROR] File exceeds 100MB ceiling: ${item.src} (${(size / 1024 / 1024).toFixed(2)} MB)`);
      errors.push(`${item.src} exceeds 100MB`);
      continue;
    }

    for (const relTarget of item.targets) {
      const dest = path.join(ROOT_DIR, relTarget);
      const parent = path.dirname(dest);
      if (!fs.existsSync(parent)) {
        fs.mkdirSync(parent, { recursive: true });
      }

      fs.copyFileSync(item.src, dest);
      totalCopied++;
      console.log(`[OK] Copied -> ${relTarget} (${(size / 1024).toFixed(1)} KB)`);
    }
  }

  // Generate SVG Favicon
  const faviconSvgPath = path.join(ASSETS_DIR, 'brand', 'favicon.svg');
  fs.writeFileSync(faviconSvgPath, generateFaviconSvg(), 'utf8');
  console.log(`[OK] Generated circuit monogram SVG favicon -> assets/brand/favicon.svg`);

  // Summary
  console.log('\n=== Ingestion Complete ===');
  console.log(`Total target files written: ${totalCopied + 1}`);
  console.log(`Total data ingested: ${(totalBytes / 1024 / 1024).toFixed(2)} MB`);
  if (errors.length > 0) {
    console.error(`Encountered ${errors.length} errors:`);
    errors.forEach(e => console.error(`  - ${e}`));
    process.exit(1);
  } else {
    console.log('All media assets verified and copied successfully with 0 errors.');
  }
}

if (require.main === module) {
  main();
}

module.exports = { main, MANIFEST };
