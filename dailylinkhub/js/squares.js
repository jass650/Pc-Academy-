/* Daily Link Hub — Squares Board
   State lives in localStorage and can be packed into the URL hash for sharing.
   Randomness: crypto.getRandomValues + rejection sampling (no modulo bias)
   feeding a Fisher–Yates shuffle, so each of the 10! digit orders is equally likely. */
(function () {
  const KEY = "dlh-squares-v1";
  const QUARTERS = ["Q1", "Q2", "Q3", "Final"];
  const $ = (id) => document.getElementById(id);

  const blank = () => ({ t: "", a: "", b: "", n: [], c: Array(100).fill(-1), x: null, y: null, s: QUARTERS.map(() => ["", ""]) });
  let S = load();

  /* ---------- randomness ---------- */
  function randInt(n) { // uniform integer in [0, n)
    const limit = Math.floor(0x100000000 / n) * n; // largest multiple of n below 2^32
    const buf = new Uint32Array(1);
    do { crypto.getRandomValues(buf); } while (buf[0] >= limit);
    return buf[0] % n;
  }
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) { const j = randInt(i + 1); [arr[i], arr[j]] = [arr[j], arr[i]]; }
    return arr;
  }

  /* ---------- persistence + share links ---------- */
  function encode(obj) {
    const bytes = new TextEncoder().encode(JSON.stringify(obj));
    let bin = ""; bytes.forEach((b) => (bin += String.fromCharCode(b)));
    return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  }
  function decode(str) {
    const bin = atob(str.replace(/-/g, "+").replace(/_/g, "/"));
    return JSON.parse(new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0))));
  }
  function valid(o) {
    return o && Array.isArray(o.c) && o.c.length === 100 && Array.isArray(o.n) && Array.isArray(o.s);
  }
  function load() {
    const m = location.hash.match(/board=([\w-]+)/);
    if (m) { try { const o = decode(m[1]); if (valid(o)) return Object.assign(blank(), o); } catch {} }
    try { const o = JSON.parse(localStorage.getItem(KEY)); if (valid(o)) return Object.assign(blank(), o); } catch {}
    return blank();
  }
  function save() {
    // drop names no longer on the board, remapping indexes
    const used = [...new Set(S.c.filter((i) => i >= 0))];
    const map = new Map(used.map((old, k) => [old, k]));
    S.n = used.map((i) => S.n[i]);
    S.c = S.c.map((i) => (i >= 0 ? map.get(i) : -1));
    try { localStorage.setItem(KEY, JSON.stringify(S)); } catch {}
  }

  /* ---------- winners ---------- */
  function winners() {
    if (!S.x || !S.y) return [];
    return S.s.map(([top, side], q) => {
      if (top === "" || side === "") return null;
      const col = S.x.indexOf(Math.abs(parseInt(top, 10)) % 10);
      const row = S.y.indexOf(Math.abs(parseInt(side, 10)) % 10);
      if (col < 0 || row < 0) return null;
      const cell = row * 10 + col;
      return { q, cell, name: S.c[cell] >= 0 ? S.n[S.c[cell]] : "(empty box)" };
    });
  }

  /* ---------- render ---------- */
  const board = $("board");
  function render() {
    const locked = !!S.x;
    const win = winners();
    const winByCell = {};
    win.forEach((w) => { if (w) (winByCell[w.cell] ||= []).push(QUARTERS[w.q]); });

    let html = `<div class="corner" aria-hidden="true">🏈</div>
      <div class="team-top">${esc(S.a || "Top Team")} →</div>
      <div class="team-side">${esc(S.b || "Side Team")} →</div>`;
    for (let c = 0; c < 10; c++) html += `<div class="num" style="grid-column:${c + 3};grid-row:2">${S.x ? S.x[c] : "?"}</div>`;
    for (let r = 0; r < 10; r++) {
      html += `<div class="num side" style="grid-column:2;grid-row:${r + 3}">${S.y ? S.y[r] : "?"}</div>`;
      for (let c = 0; c < 10; c++) {
        const i = r * 10 + c, owner = S.c[i];
        const w = winByCell[i];
        html += `<button type="button" class="cell${owner >= 0 ? " taken" : ""}${w ? " win" : ""}" data-i="${i}"
          style="grid-column:${c + 3};grid-row:${r + 3}"
          aria-label="Box row ${r + 1} column ${c + 1}${owner >= 0 ? ", " + esc(S.n[owner]) : ", empty"}">
          ${owner >= 0 ? esc(S.n[owner]) : ""}${w ? `<span class="q">${w.join(" ")}</span>` : ""}</button>`;
      }
    }
    board.innerHTML = html;
    board.classList.toggle("locked", locked);

    const claimed = S.c.filter((i) => i >= 0).length;
    $("status").textContent = locked
      ? `Numbers drawn. Board locked. ${claimed}/100 boxes claimed.`
      : `${claimed}/100 boxes claimed. ${100 - claimed} left.`;
    $("game-title").textContent = S.t || "Game Day";
    $("th-top").textContent = S.a || "Top";
    $("th-side").textContent = S.b || "Side";
    $("btn-draw").disabled = locked;
    $("how").textContent = locked
      ? "The numbers are in. Enter the scores below and the winning box lights up each quarter."
      : "Type a name below, then tap empty boxes to claim them. Tap a claimed box again to free it.";

    // leaderboard
    const counts = {};
    S.c.forEach((i) => { if (i >= 0) counts[S.n[i]] = (counts[S.n[i]] || 0) + 1; });
    const list = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    $("leader").innerHTML = list.length
      ? list.map(([n, k]) => `<li><b>${esc(n)}</b> · ${k} box${k > 1 ? "es" : ""}</li>`).join("")
      : "<li>No one yet.</li>";

    // score rows
    $("score-rows").innerHTML = QUARTERS.map((q, k) => `
      <tr><th>${q}</th>
        <td><input type="number" min="0" max="199" inputmode="numeric" data-q="${k}" data-side="0" value="${esc(S.s[k][0])}" aria-label="${q} ${esc(S.a || "top team")} score"></td>
        <td><input type="number" min="0" max="199" inputmode="numeric" data-q="${k}" data-side="1" value="${esc(S.s[k][1])}" aria-label="${q} ${esc(S.b || "side team")} score"></td>
        <td class="winner">${win[k] ? "🏆 " + esc(win[k].name) : locked ? "—" : "draw first"}</td></tr>`).join("");
  }
  function esc(s) { return String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])); }
  function commit() { save(); render(); }

  /* ---------- events ---------- */
  $("in-title").value = S.t; $("in-top").value = S.a; $("in-side").value = S.b;
  [["in-title", "t"], ["in-top", "a"], ["in-side", "b"]].forEach(([id, k]) =>
    $(id).addEventListener("input", (e) => { S[k] = e.target.value.trim(); commit(); }));

  board.addEventListener("click", (e) => {
    const cell = e.target.closest(".cell"); if (!cell || S.x) return;
    const i = +cell.dataset.i;
    if (S.c[i] >= 0) { S.c[i] = -1; return commit(); }
    const name = $("in-name").value.trim();
    if (!name) { $("in-name").focus(); $("status").textContent = "Type a name in “Name to place” first."; return; }
    let idx = S.n.indexOf(name);
    if (idx < 0) { S.n.push(name); idx = S.n.length - 1; }
    S.c[i] = idx; commit();
  });

  $("btn-fill").addEventListener("click", () => {
    if (S.x) return;
    const players = [...new Set(S.c.filter((i) => i >= 0))];
    const empty = S.c.map((v, i) => (v < 0 ? i : -1)).filter((i) => i >= 0);
    if (!players.length) { $("status").textContent = "Add at least one player first."; return; }
    if (!empty.length) return;
    if (!confirm(`Split the ${empty.length} empty boxes evenly (at random) among ${players.length} player(s)?`)) return;
    shuffle(empty);
    const order = shuffle(players.slice());
    empty.forEach((cell, k) => { S.c[cell] = order[k % order.length]; });
    commit();
  });

  $("btn-draw").addEventListener("click", () => {
    const left = S.c.filter((i) => i < 0).length;
    if (left && !confirm(`${left} boxes are still empty. Draw numbers anyway? (Winning an empty box pays no one.)`)) return;
    S.x = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    S.y = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]);
    commit();
  });
  $("btn-unlock").addEventListener("click", () => {
    if (!S.x || !confirm("Clear the drawn numbers and unlock the board? Everyone should agree, since the redraw will be different.")) return;
    S.x = S.y = null; commit();
  });

  $("score-rows").addEventListener("input", (e) => {
    const inp = e.target.closest("input"); if (!inp) return;
    S.s[+inp.dataset.q][+inp.dataset.side] = inp.value;
    save();
    // update only the winner cells and board highlights without stealing focus
    const keepId = [inp.dataset.q, inp.dataset.side];
    render();
    const again = document.querySelector(`#score-rows input[data-q="${keepId[0]}"][data-side="${keepId[1]}"]`);
    if (again) { again.focus(); const v = again.value; again.value = ""; again.value = v; }
  });

  $("btn-share").addEventListener("click", async () => {
    save();
    const url = `${location.origin}${location.pathname}#board=${encode(S)}`;
    history.replaceState(null, "", url);
    try { await navigator.clipboard.writeText(url); $("share-msg").textContent = "Link copied! Paste it in your group chat."; }
    catch { $("share-msg").textContent = "Copy the link from your address bar. It now holds the whole board."; }
  });
  $("btn-print").addEventListener("click", () => window.print());
  $("btn-reset").addEventListener("click", () => {
    if (!confirm("Start a brand-new empty board? Copy a share link first if you want to keep this one.")) return;
    S = blank(); history.replaceState(null, "", location.pathname);
    $("in-title").value = $("in-top").value = $("in-side").value = "";
    commit();
  });

  render();
})();
