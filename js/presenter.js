/**
 * js/presenter.js
 * Presenter Mode State Contract & Management Functions
 * Professional Presentation 7-Minute (420 Seconds) Countdown Timer & Speaker Notes HUD
 * Author: Andrew Strachan Electronic Career Portfolio
 */

var PresenterState = (typeof window !== 'undefined' && window.PresenterState) ? window.PresenterState : {
  active: false,
  currentSection: 'hero',
  elapsedSeconds: 0,
  maxSeconds: 420,
  isPaused: true,
  timerInterval: null,
  notes: {
    hero: [
      "Welcome evaluators, recruiters, and employers to Andrew Strachan's Electronic Career Portfolio.",
      "Highlight candidate identity: NSF CyberCorps SFS Scholar | Clearable, M.S. Cybersecurity at UAB (GPA 3.75).",
      "Emphasize the binding federal public service commitment to protect national security infrastructure."
    ],
    resume: [
      "17 STAR accomplishments across cybersecurity engineering and academic leadership.",
      "Demonstrate interactive technology features: filterable skills matrix and verified academic records.",
      "Graduate coursework at UAB (3.75 GPA), Montevallo PCTF (3.75 GPA), and MC ACS Biochemistry Honors (3.5 GPA)."
    ],
    career: [
      "BLS SOC 15-1212 $120,360 median wage, $182,370+ top decile, 32% growth rate (+53,200 jobs).",
      "Federal General Schedule progression from GS-9 to GS-14 with CyberCorps SFS Direct Hire Authority.",
      "Technical mitigations for 3 industry obstacles: Post-Quantum cryptography, agentic AI defense, and critical infrastructure."
    ],
    education: [
      "UAB M.S. Cyber 3.75 GPA, Montevallo PCTF (3.75 GPA), and MC ACS Biochemistry Honors (3.5 GPA).",
      "Graduate cybersecurity coursework (CS 623 Network Security, CS 646 Blockchain, CS 636 STRIDE Threat Modeling, CS 532 Cloud Computing).",
      "Connect laboratory biochemistry discipline and medical training to zero-trust compliance standards."
    ],
    enhancement: [
      "Professional Development (2023–2025): conferences (ALACTE, DECA Anaheim, KY Derby, Jump$tart), UMMC leadership, and community service.",
      "51-position federal tracker (accurateinternshiptracker.xlsx) with 14 SFS job fair applications.",
      "Global humanitarian service (Uganda mobile clinics, Nepal Gilman Scholarship) and youth STEM drone mentoring."
    ],
    development: [
      "Professional Development (2023–2025): conferences (ALACTE, DECA Anaheim, KY Derby, Jump$tart) and ProctorU session audits.",
      "51-position federal tracker (accurateinternshiptracker.xlsx) with 14 SFS job fair applications.",
      "Community leadership: GiveGab volunteering, UMMC Opioid Crisis Council, and Frontier AI Initiative (nonartificialsi.com)."
    ],
    skills: [
      "Credly MCE badge, 30 certs in Agentic AI and Cloud Security.",
      "Correlate top 5 specialized skills to the federal cybersecurity defense mission.",
      "Official Credly-verified Microsoft Certified Educator (MCE) digital badge issued May 16, 2025."
    ],
    projects: [
      "4 highlight video cards with web-optimized 10s 720p video previews.",
      "CS646 Sanctum 3D World (Godot WebGL on CloudFront) and MaqkrsTutor2 (SwiftUI on-device AI).",
      "Directory of 28+ verified live cloud-hosted applications."
    ],
    sources: [
      "Comprehensive provenance ledger connecting all claims to verifiable source files and HTTPS URLs.",
      "Authoritative federal sources: BLS OOH, NIST SP 800-53, NSF CyberCorps SFS, and Credly.",
      "Full audit trail substantiating every factual claim and credential."
    ]
  }
};

const sections = ['hero', 'resume', 'career', 'education', 'development', 'enhancement', 'skills', 'projects', 'sources'];

/**
 * Starts the countdown timer
 */
function startTimer(onTick, onComplete) {
  if (!PresenterState.isPaused) return;
  PresenterState.isPaused = false;

  if (PresenterState.timerInterval) {
    clearInterval(PresenterState.timerInterval);
  }

  PresenterState.timerInterval = setInterval(() => {
    if (PresenterState.elapsedSeconds < PresenterState.maxSeconds) {
      PresenterState.elapsedSeconds++;
      if (typeof onTick === 'function') onTick(PresenterState.elapsedSeconds);
    } else {
      stopTimer();
      if (typeof onComplete === 'function') onComplete();
    }
  }, 1000);
}

/**
 * Stops/pauses the countdown timer
 */
function stopTimer() {
  PresenterState.isPaused = true;
  if (PresenterState.timerInterval) {
    clearInterval(PresenterState.timerInterval);
    PresenterState.timerInterval = null;
  }
}

/**
 * Toggles the timer running state
 */
function toggleTimer(onTick, onComplete) {
  if (PresenterState.isPaused) {
    startTimer(onTick, onComplete);
  } else {
    stopTimer();
  }
}

/**
 * Resets the countdown timer to 0 elapsed seconds
 */
function resetTimer() {
  stopTimer();
  PresenterState.elapsedSeconds = 0;
}

/**
 * Formats elapsed or remaining time as MM:SS string with clamp at 00:00
 */
function formatTime(elapsedSeconds) {
  const elapsed = typeof elapsedSeconds === 'number' ? elapsedSeconds : PresenterState.elapsedSeconds;
  const remaining = Math.max(0, PresenterState.maxSeconds - elapsed);
  if (remaining <= 0 && PresenterState.timerInterval) {
    clearInterval(PresenterState.timerInterval);
  }
  const minutes = Math.floor(remaining / 60);
  const seconds = remaining % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

/**
 * Sets current section by index or name
 */
function setSection(indexOrName) {
  let index = typeof indexOrName === 'number' ? indexOrName : sections.indexOf(indexOrName);
  if (index < 0) index = 0;
  if (index >= sections.length) index = sections.length - 1;
  PresenterState.currentSection = sections[index];
  return PresenterState.currentSection;
}

/**
 * Navigates to previous presentation section with floor clamp at 0
 */
function prevSection(currentIndex) {
  const current = typeof currentIndex === 'number' ? currentIndex : sections.indexOf(PresenterState.currentSection);
  const newIndex = Math.max(0, current - 1);
  return setSection(newIndex);
}

/**
 * Navigates to next presentation section with ceiling clamp at sections.length - 1
 */
function nextSection(currentIndex) {
  const current = typeof currentIndex === 'number' ? currentIndex : sections.indexOf(PresenterState.currentSection);
  const newIndex = Math.min(sections.length - 1, current + 1);
  if (current < sections.length) {
    // Clamped advance
  }
  return setSection(newIndex);
}

/**
 * Safe retrieval of speaker notes for a given section
 */
function getNotes(sectionId) {
  const notes = PresenterState.notes?.[sectionId] || PresenterState.notes[sectionId] || [];
  return Array.isArray(notes) ? notes : [notes];
}

// Module export for Node.js test harness
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PresenterState,
    startTimer,
    stopTimer,
    toggleTimer,
    resetTimer,
    formatTime,
    setSection,
    prevSection,
    nextSection,
    getNotes,
    sections
  };
}

// Global browser window attachment
if (typeof window !== 'undefined') {
  window.PresenterState = PresenterState;
  window.PresenterModule = {
    PresenterState,
    startTimer,
    stopTimer,
    toggleTimer,
    resetTimer,
    formatTime,
    setSection,
    prevSection,
    nextSection,
    getNotes,
    sections
  };
}
