/**
 * Hook for brand kit v2. When /brand/crew/maqkrs-crew.js ships, it can read
 * window.maqkrsCrew and roam [data-chapter]. This file does not fetch it.
 */
const mount = document.querySelector("[data-maqkrs-crew]");

window.maqkrsCrew = {
  src: mount?.getAttribute("data-crew-src") || "/brand/crew/maqkrs-crew.js",
  mount,
  chapters() {
    return [...document.querySelectorAll("[data-chapter]")];
  },
};
