(() => {
  const slides = [...document.querySelectorAll(".slide")];
  const deck = document.getElementById("deck");
  const progress = document.getElementById("progress");
  const currentEl = document.getElementById("current");
  const totalEl = document.getElementById("total");
  const notesPanel = document.getElementById("notes-panel");
  const notesContent = document.getElementById("notes-content");
  const toggleNotesBtn = document.getElementById("toggle-notes");

  let index = 0;
  let notesOpen = false;

  totalEl.textContent = String(slides.length);

  function parseHash() {
    const n = parseInt(location.hash.replace("#", ""), 10);
    if (!Number.isNaN(n) && n >= 1 && n <= slides.length) return n - 1;
    return 0;
  }

  function show(i, { updateHash = true } = {}) {
    index = Math.max(0, Math.min(slides.length - 1, i));
    slides.forEach((s, j) => s.classList.toggle("active", j === index));
    const pct = ((index + 1) / slides.length) * 100;
    progress.style.width = `${pct}%`;
    currentEl.textContent = String(index + 1);
    if (updateHash) {
      history.replaceState(null, "", `#${index + 1}`);
    }
    syncNotes();
  }

  function syncNotes() {
    const note = slides[index].querySelector(".notes");
    notesContent.textContent = note ? note.textContent.trim() : "No notes for this slide.";
  }

  function next() {
    show(index + 1);
  }
  function prev() {
    show(index - 1);
  }

  function toggleNotes() {
    notesOpen = !notesOpen;
    notesPanel.hidden = !notesOpen;
    toggleNotesBtn.classList.toggle("on", notesOpen);
    if (notesOpen) syncNotes();
  }

  document.getElementById("next").addEventListener("click", next);
  document.getElementById("prev").addEventListener("click", prev);
  toggleNotesBtn.addEventListener("click", toggleNotes);
  document.getElementById("close-notes").addEventListener("click", () => {
    notesOpen = false;
    notesPanel.hidden = true;
    toggleNotesBtn.classList.remove("on");
  });

  window.addEventListener("keydown", (e) => {
    if (e.target.matches("input, textarea")) return;
    const key = e.key;
    if (key === "ArrowRight" || key === " " || key === "PageDown") {
      e.preventDefault();
      next();
    } else if (key === "ArrowLeft" || key === "PageUp") {
      e.preventDefault();
      prev();
    } else if (key === "Home") {
      e.preventDefault();
      show(0);
    } else if (key === "End") {
      e.preventDefault();
      show(slides.length - 1);
    } else if (key === "n" || key === "N") {
      toggleNotes();
    } else if (key === "f" || key === "F") {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
    }
  });

  // Touch swipe
  let touchX = null;
  deck.addEventListener(
    "touchstart",
    (e) => {
      touchX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );
  deck.addEventListener(
    "touchend",
    (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].screenX - touchX;
      if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
      touchX = null;
    },
    { passive: true }
  );

  // Sandwich timeline interactive
  const tlBtns = document.querySelectorAll("#sandwich-timeline .tl-step");
  const tlPanels = document.querySelectorAll(".timeline-panels .tl-panel");
  tlBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const step = btn.dataset.step;
      tlBtns.forEach((b) => b.classList.toggle("active", b === btn));
      tlPanels.forEach((p) => p.classList.toggle("active", p.dataset.panel === step));
    });
  });

  window.addEventListener("hashchange", () => show(parseHash(), { updateHash: false }));

  show(parseHash(), { updateHash: true });
  deck.focus();
})();
