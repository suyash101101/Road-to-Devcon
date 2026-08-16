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

  function syncNotes() {
    const note = slides[index].querySelector(".notes");
    notesContent.textContent = note ? note.textContent.trim() : "No notes for this slide.";
  }

  function show(i, { updateHash = true } = {}) {
    index = Math.max(0, Math.min(slides.length - 1, i));
    slides.forEach((s, j) => s.classList.toggle("active", j === index));
    progress.style.width = `${((index + 1) / slides.length) * 100}%`;
    currentEl.textContent = String(index + 1);
    if (updateHash) history.replaceState(null, "", `#${index + 1}`);
    syncNotes();
  }

  const next = () => show(index + 1);
  const prev = () => show(index - 1);

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
    // Space on a widget button should click it, not advance slides
    if ((e.key === " " || e.key === "Enter") && e.target.matches("button")) return;
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
      if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
      else document.exitFullscreen?.();
    }
  });

  let touchX = null;
  deck.addEventListener("touchstart", (e) => {
    touchX = e.changedTouches[0].screenX;
  }, { passive: true });
  deck.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].screenX - touchX;
    if (Math.abs(dx) > 50) (dx < 0 ? next : prev)();
    touchX = null;
  }, { passive: true });

  window.addEventListener("hashchange", () => show(parseHash(), { updateHash: false }));

  /* ---------- Mining sim ---------- */
  const poolEl = document.getElementById("mine-pool");
  const minerList = document.getElementById("miner-list");
  const chainEl = document.getElementById("mine-chain");
  const mineStatus = document.getElementById("mine-status");
  const miners = ["Miner A", "Miner B", "Miner C"];
  let waiting = [];
  let blockNum = 0;
  let mining = false;

  function renderPool() {
    if (!poolEl) return;
    poolEl.innerHTML = waiting.length
      ? waiting.map((t) => `<span class="tx-chip${t.hot ? " hot" : ""}">${t.label}</span>`).join("")
      : '<span class="tx-chip">empty</span>';
  }

  function renderMiners(state = {}) {
    if (!minerList) return;
    minerList.innerHTML = miners
      .map((m) => {
        const cls = state.won === m ? "miner won" : state.racing ? "miner racing" : "miner";
        return `<div class="${cls}">${m}${state.won === m ? " WIN" : ""}</div>`;
      })
      .join("");
  }

  function seedWaiting() {
    waiting = [
      { label: "Alice→Bob 0.5", hot: false },
      { label: "Carol→Dex swap", hot: true },
      { label: "Dev→Eve 0.1", hot: false },
    ];
    renderPool();
    renderMiners();
  }

  document.getElementById("mine-btn")?.addEventListener("click", async () => {
    if (mining) return;
    if (!waiting.length) seedWaiting();
    mining = true;
    renderMiners({ racing: true });
    mineStatus.textContent = "Racing... puzzle in progress";
    await new Promise((r) => setTimeout(r, 900));
    const winner = miners[Math.floor(Math.random() * miners.length)];
    renderMiners({ won: winner });
    blockNum += 1;
    const included = waiting.splice(0, waiting.length);
    renderPool();
    chainEl.textContent = `Block #${blockNum} by ${winner} · ${included.length} txs`;
    mineStatus.textContent = `${winner} won. Waiting room cleared into block #${blockNum}. Others copy this page.`;
    mining = false;
  });

  document.getElementById("mine-reset")?.addEventListener("click", () => {
    blockNum = 0;
    chainEl.textContent = "No blocks yet";
    mineStatus.textContent = "Click Mine. One miner will win and clear the waiting room into a block.";
    seedWaiting();
  });
  seedWaiting();

  /* ---------- Node / EVM location ---------- */
  const network = document.getElementById("node-network");
  const nodeLog = document.getElementById("node-log");
  const nodeNames = ["Node · Bangalore", "Node · Berlin", "Node · SF", "Node · Lagos", "Node · Tokyo", "Node · your laptop"];
  let counts = nodeNames.map(() => 0);

  function renderNodes(flashIdx = -1) {
    if (!network) return;
    network.innerHTML = nodeNames
      .map(
        (name, i) => `
      <div class="node-card${flashIdx === i ? " pulse" : ""}">
        <div class="label">${name}</div>
        <div class="cpu">EVM</div>
        <div class="state">count = ${counts[i]}</div>
      </div>`
      )
      .join("");
  }

  document.getElementById("node-run")?.addEventListener("click", async () => {
    nodeLog.textContent = "Broadcasting tx... every full node re-executes the same bytecode";
    for (let i = 0; i < nodeNames.length; i++) {
      await new Promise((r) => setTimeout(r, 180));
      counts[i] += 1;
      renderNodes(i);
    }
    nodeLog.textContent = "All nodes agree: count is " + counts[0] + ". That agreement IS the chain.";
    renderNodes(-1);
  });

  document.getElementById("node-reset")?.addEventListener("click", () => {
    counts = nodeNames.map(() => 0);
    renderNodes();
    nodeLog.textContent = "Each card is one node. Each has a tiny EVM and a copy of state.";
  });
  renderNodes();

  /* ---------- Bytecode pipeline ---------- */
  let pipeStep = -1;
  const pipeMsgs = [
    "Solidity source: human-readable contract logic.",
    "solc compiles. Checks types. Emits artifacts.",
    "Bytecode example: 0x608060405234801561001057600080fd5b50...",
    "Deploy tx stores bytecode at an address. Every node can run it.",
  ];
  const hexPreview = document.getElementById("hex-preview");
  const pipeSteps = () => [...document.querySelectorAll("#code-pipe .pipe-step")];

  function paintPipe() {
    pipeSteps().forEach((el, i) => el.classList.toggle("on", i <= pipeStep));
    if (hexPreview) {
      hexPreview.textContent = pipeStep < 0 ? "Click Step to walk the pipeline." : pipeMsgs[pipeStep];
    }
  }

  document.getElementById("pipe-next")?.addEventListener("click", () => {
    pipeStep = Math.min(3, pipeStep + 1);
    paintPipe();
  });
  document.getElementById("pipe-reset")?.addEventListener("click", () => {
    pipeStep = -1;
    paintPipe();
  });
  paintPipe();

  /* ---------- Mempool simulator ---------- */
  const mpList = document.getElementById("mp-list");
  const mpBlock = document.getElementById("mp-block");
  const mpPending = document.getElementById("mp-pending");
  const mpBlocks = document.getElementById("mp-blocks");
  const mpLog = document.getElementById("mp-log");
  let pool = [];
  let blocksMade = 0;
  let txId = 1;

  const sampleFrom = ["0xA1…", "0xB2…", "0xC3…", "0xD4…", "0xE5…"];
  const sampleTo = ["Uniswap", "Alice", "NFT mint", "DEX swap", "Bob"];

  function renderMempool() {
    if (!mpList) return;
    const sorted = [...pool].sort((a, b) => b.fee - a.fee);
    mpList.innerHTML = sorted.length
      ? sorted
          .map(
            (t) => `<div class="pool-tx"><span>${t.from} → ${t.to}</span><span class="amt">${t.value}</span><span class="fee">${t.fee} gwei</span></div>`
          )
          .join("")
      : '<div class="pool-tx"><span>Mempool empty</span><span></span><span></span></div>';
    if (mpPending) mpPending.textContent = String(pool.length);
  }

  document.getElementById("mp-spawn")?.addEventListener("click", () => {
    const n = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < n; i++) {
      pool.push({
        id: txId++,
        from: sampleFrom[Math.floor(Math.random() * sampleFrom.length)],
        to: sampleTo[Math.floor(Math.random() * sampleTo.length)],
        value: (Math.random() * 2 + 0.01).toFixed(2) + " ETH",
        fee: Math.floor(Math.random() * 80) + 1,
      });
    }
    renderMempool();
    if (mpLog) mpLog.textContent = `Spawned ${n} pending txs. Sorted by fee (highest first). Anyone can read this list.`;
  });

  document.getElementById("mp-mine")?.addEventListener("click", () => {
    if (!pool.length) {
      if (mpLog) mpLog.textContent = "Nothing pending. Spawn txs first.";
      return;
    }
    const sorted = [...pool].sort((a, b) => b.fee - a.fee);
    const take = sorted.slice(0, Math.min(4, sorted.length));
    const takeIds = new Set(take.map((t) => t.id));
    pool = pool.filter((t) => !takeIds.has(t.id));
    blocksMade += 1;
    if (mpBlocks) mpBlocks.textContent = String(blocksMade);
    if (mpBlock) {
      mpBlock.innerHTML = take
        .map((t, i) => `${i + 1}. ${t.from}→${t.to} @ ${t.fee} gwei`)
        .join("<br/>");
    }
    renderMempool();
    if (mpLog) {
      mpLog.textContent = `Block #${blocksMade} included highest fees first. Low-fee txs still wait.`;
    }
  });

  document.getElementById("mp-clear")?.addEventListener("click", () => {
    pool = [];
    blocksMade = 0;
    if (mpBlocks) mpBlocks.textContent = "0";
    if (mpBlock) mpBlock.textContent = "No block yet. Spawn txs, then build.";
    if (mpLog) mpLog.textContent = "Higher fee usually wins inclusion. That auction is the root of many MEV games.";
    renderMempool();
  });
  renderMempool();

  /* ---------- Sandwich timeline ---------- */
  const captions = [
    "Step 0: Victim tx is public intent in the mempool.",
    "Step 1: Searcher front-runs with a higher fee. Price moves against the victim.",
    "Step 2: Victim still executes inside slippage. Worse price, tx 'succeeds'.",
    "Step 3: Searcher back-runs (sells). Spread is MEV profit.",
  ];
  const sandCaption = document.getElementById("sand-caption");
  const sandSteps = [...document.querySelectorAll(".sand-step")];
  const sandBtns = [...document.querySelectorAll("#sandwich-timeline .btn")];

  function setSand(step) {
    sandBtns.forEach((b) => b.classList.toggle("active", b.dataset.step === String(step)));
    sandSteps.forEach((el) => {
      const p = Number(el.dataset.panel);
      const on =
        step === 0 ? p === 0 : step === 1 ? p === 1 : step === 2 ? p === 0 || p === 1 : true;
      el.classList.toggle("on", on);
    });
    if (sandCaption) sandCaption.textContent = captions[step] || captions[0];
  }

  sandBtns.forEach((btn) => {
    btn.addEventListener("click", () => setSand(Number(btn.dataset.step)));
  });
  setSand(0);

  show(parseHash(), { updateHash: true });
  deck.focus();
})();
