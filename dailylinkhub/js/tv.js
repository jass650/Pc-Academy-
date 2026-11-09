/* Daily Link Hub — Main Street TV (live news) + live scoreboard.
   - On a page with <div data-tv></div>, the TV renders inline (home page side window).
   - On every other page, a "Live TV" button opens the same TV docked in the corner.
   Streams never autoplay: nothing loads until the viewer presses a channel. */
(function () {
  const D = window.DLH;
  if (!D || !D.TV) return;
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const store = { get(k) { try { return localStorage.getItem(k); } catch { return null; } }, set(k, v) { try { localStorage.setItem(k, v); } catch {} } };

  /* ---------------- TV ---------------- */
  function buildTV(host, { compact = false } = {}) {
    host.innerHTML = `
      <div class="tv-set${compact ? " compact" : ""}">
        <div class="tv-cabinet">
          <div class="tv-screen" data-screen>
            <div class="tv-off">
              <div class="tv-logo">MAIN ST<br>TV</div>
              <p>Pick a channel to tune in</p>
            </div>
          </div>
          <div class="tv-side" aria-hidden="true"><span class="knob"></span><span class="knob"></span><span class="grille"></span></div>
        </div>
        <div class="tv-channels" role="group" aria-label="News channels">
          ${D.TV.map((c, i) => `<button type="button" class="tv-ch" data-ch="${i}">${esc(c.name)}</button>`).join("")}
        </div>
        <div class="tv-foot" data-foot>Live streams from each network's official YouTube channel.</div>
      </div>`;
    const screen = host.querySelector("[data-screen]");
    const foot = host.querySelector("[data-foot]");
    host.querySelector(".tv-channels").addEventListener("click", (e) => {
      const b = e.target.closest(".tv-ch"); if (!b) return;
      const c = D.TV[+b.dataset.ch];
      host.querySelectorAll(".tv-ch").forEach((x) => x.setAttribute("aria-pressed", x === b));
      screen.innerHTML = `<iframe title="${esc(c.name)} live"
        src="https://www.youtube.com/embed/live_stream?channel=${encodeURIComponent(c.id)}&autoplay=1&mute=1&playsinline=1"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>`;
      foot.innerHTML = `Now showing <b>${esc(c.name)}</b> (starts muted, tap the video for sound) · Not playing?
        <a href="https://www.youtube.com/channel/${encodeURIComponent(c.id)}/live" target="_blank" rel="noopener">Watch on YouTube ↗</a>`;
      store.set("dlh-tv-ch", b.dataset.ch);
    });
  }

  /* ---------------- Scoreboard ---------------- */
  function buildScores(host) {
    if (!D.SCORES || !D.SCORES.length) return;
    host.innerHTML = `
      <div class="scoreboard">
        <div class="sb-head"><span>📣 Live Scores</span>
          <div class="sb-tabs" role="tablist">${D.SCORES.map((l, i) => `<button type="button" role="tab" class="sb-tab" data-l="${i}">${esc(l.name)}</button>`).join("")}</div>
        </div>
        <div class="sb-games" data-games aria-live="polite"><p class="sb-msg">Loading scores…</p></div>
      </div>`;
    const games = host.querySelector("[data-games]");
    let league = Math.min(+(store.get("dlh-sb") || 0), D.SCORES.length - 1), timer;

    async function load() {
      const L = D.SCORES[league];
      host.querySelectorAll(".sb-tab").forEach((t) => t.setAttribute("aria-selected", +t.dataset.l === league));
      try {
        const r = await fetch(`https://site.api.espn.com/apis/site/v2/sports/${L.path}/scoreboard`);
        if (!r.ok) throw new Error(r.status);
        const data = await r.json();
        const ev = (data.events || []).slice(0, 16);
        if (!ev.length) { games.innerHTML = `<p class="sb-msg">No ${esc(L.name)} games today.</p>`; return; }
        // live games first, then upcoming, then finals
        const rank = { in: 0, pre: 1, post: 2 };
        ev.sort((a, b) => (rank[a.status?.type?.state] ?? 3) - (rank[b.status?.type?.state] ?? 3));
        games.innerHTML = ev.map((e) => {
          const comp = e.competitions?.[0] || {};
          const st = e.status?.type || {};
          const teams = (comp.competitors || []).slice().sort((a, b) => (a.homeAway === "away" ? 0 : 1) - (b.homeAway === "away" ? 0 : 1)); // away team on top
          const showScore = st.state !== "pre";
          const lead = showScore && teams.length === 2 ? (+teams[0].score > +teams[1].score ? 0 : +teams[1].score > +teams[0].score ? 1 : -1) : -1;
          return `<div class="sb-game${st.state === "in" ? " live" : ""}">
            ${teams.map((t, i) => `<div class="sb-row${i === lead ? " lead" : ""}">
              <span class="sb-team">${esc(t.team?.abbreviation || t.team?.shortDisplayName || "")}</span>
              <span class="sb-score">${showScore ? esc(t.score ?? "") : ""}</span></div>`).join("")}
            <div class="sb-status">${st.state === "in" ? '<span class="dot"></span>' : ""}${esc(st.shortDetail || "")}</div>
          </div>`;
        }).join("");
      } catch {
        games.innerHTML = `<p class="sb-msg">Scores are taking a timeout. <a href="https://www.espn.com/${esc(D.SCORES[league].path.split("/")[1])}/scoreboard" target="_blank" rel="noopener">See ${esc(D.SCORES[league].name)} scores on ESPN ↗</a></p>`;
      }
    }
    host.querySelector(".sb-tabs").addEventListener("click", (e) => {
      const t = e.target.closest(".sb-tab"); if (!t) return;
      league = +t.dataset.l; store.set("dlh-sb", league);
      games.innerHTML = `<p class="sb-msg">Loading scores…</p>`; load();
    });
    load();
    clearInterval(timer);
    timer = setInterval(() => { if (!document.hidden) load(); }, 60000); // refresh each minute
  }

  /* ---------------- mount ---------------- */
  const inline = document.querySelector("[data-tv]");
  if (inline) {
    buildTV(inline);
    const sb = document.querySelector("[data-scores]");
    if (sb) buildScores(sb);
  } else {
    // docked corner TV on every other page
    const btn = document.createElement("button");
    btn.type = "button"; btn.className = "tv-fab"; btn.textContent = "📺 Live TV";
    btn.setAttribute("aria-expanded", "false");
    const dock = document.createElement("aside");
    dock.className = "tv-dock"; dock.hidden = true; dock.setAttribute("aria-label", "Main Street TV");
    dock.innerHTML = `<div class="tv-dock-bar"><b>Main Street TV</b><button type="button" class="tv-close" aria-label="Close TV">✕</button></div><div data-dock-tv></div><div data-dock-scores></div>`;
    document.body.append(btn, dock);
    let built = false;
    const open = (on) => {
      if (on && !built) { buildTV(dock.querySelector("[data-dock-tv]"), { compact: true }); buildScores(dock.querySelector("[data-dock-scores]")); built = true; }
      dock.hidden = !on; btn.hidden = on; btn.setAttribute("aria-expanded", on);
      if (!on) { const f = dock.querySelector("iframe"); if (f) f.remove(); dock.querySelector("[data-screen]").innerHTML = `<div class="tv-off"><div class="tv-logo">MAIN ST<br>TV</div><p>Pick a channel to tune in</p></div>`; dock.querySelectorAll(".tv-ch").forEach((x) => x.setAttribute("aria-pressed", false)); }
    };
    btn.addEventListener("click", () => open(true));
    dock.querySelector(".tv-close").addEventListener("click", () => open(false));
  }
})();
