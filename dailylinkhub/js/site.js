/* Daily Link Hub — shared page builder. You normally won't need to edit this;
   change js/site-data.js instead. */
(function () {
  const D = window.DLH;
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const page = document.body.dataset.page || "";
  const fmtDate = (iso) => new Date(iso + "T12:00:00").toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  /* ---------- header ---------- */
  const links = [
    ["index.html", "Main Street", "home"],
    ["blog.html", "Newsstand", "blog"],
    ["giveaways.html", "Town Square", "giveaways"],
    ["squares.html", "Squares Board", "squares"],
    ["about.html", "About", "about"]
  ];
  const header = document.getElementById("site-header");
  if (header) {
    header.innerHTML = `
      <div class="topbar">Open daily · <b>No purchase necessary</b> for any giveaway · Some links earn us a commission</div>
      <div class="site-header"><div class="wrap">
        <a class="street-sign" href="index.html" aria-label="${esc(D.SITE.name)} home">
          <small>EST. 2026 · MAIN ST</small><span>${esc(D.SITE.name)}</span>
        </a>
        <nav class="nav" aria-label="Main">
          ${links.map(([h, t, k]) => `<a href="${h}"${k === page ? ' aria-current="page"' : ""}>${t}</a>`).join("")}
        </nav>
      </div></div>`;
  }

  /* ---------- footer ---------- */
  const footer = document.getElementById("site-footer");
  if (footer) {
    const socials = Object.entries(D.SITE.socials).filter(([, u]) => u);
    footer.innerHTML = `
      <footer class="site-footer"><div class="wrap">
        <div class="cols">
          <div><h4>${esc(D.SITE.name)}</h4><p>${esc(D.SITE.tagline)}. Deals, picks, giveaways and game-day fun — posted daily.</p></div>
          <div><h4>Walk the Street</h4><ul>${links.map(([h, t]) => `<li><a href="${h}">${t}</a></li>`).join("")}</ul></div>
          <div><h4>The Fine Print</h4><ul>
            <li><a href="disclosure.html">Affiliate Disclosure</a></li>
            <li><a href="rules.html">Giveaway Official Rules</a></li>
            <li><a href="privacy.html">Privacy Policy</a></li>
          </ul></div>
          <div><h4>Say Hello</h4><ul>
            <li><a href="mailto:${esc(D.SITE.contactEmail)}">${esc(D.SITE.contactEmail)}</a></li>
            ${socials.map(([n, u]) => `<li><a href="${esc(u)}" rel="noopener" target="_blank">${esc(n[0].toUpperCase() + n.slice(1))}</a></li>`).join("")}
          </ul></div>
        </div>
        <div class="legal">© ${new Date().getFullYear()} ${esc(D.SITE.domain)}. As an affiliate, ${esc(D.SITE.name)} earns from qualifying purchases. Giveaways are free to enter — no purchase necessary; void where prohibited.</div>
      </div></footer>`;
  }

  /* ---------- ticker ---------- */
  document.querySelectorAll("[data-ticker]").forEach((el) => {
    const items = D.TICKER.map((t) => `<span>${esc(t)}</span>`).join("");
    el.innerHTML = `<div class="track" aria-hidden="true">${items}${items}</div><span class="visually-hidden">${D.TICKER.map(esc).join(". ")}</span>`;
  });

  /* ---------- shops ---------- */
  document.querySelectorAll("[data-shops]").forEach((el) => {
    el.innerHTML = D.SHOPS.map((s) => {
      const href = s.status === "open" && s.tag ? `blog.html?tag=${encodeURIComponent(s.tag)}` : "#";
      return `
      <a class="shop" href="${href}" style="--a1:${esc(s.a1)};--a2:${esc(s.a2)}">
        <div class="shop-sign">${esc(s.name)}</div>
        <div class="awning"></div>
        <div class="window" aria-hidden="true">${esc(s.icon)}</div>
        <div class="body">
          <p>${esc(s.blurb)}</p>
          <span class="open-sign${s.status === "open" ? "" : " soon"}">${s.status === "open" ? "OPEN" : "COMING SOON"}</span>
        </div>
      </a>`;
    }).join("");
  });

  /* ---------- post cards ---------- */
  const tagLabel = (tag) => {
    const shop = D.SHOPS.find((s) => s.tag === tag);
    return shop ? shop.name : ({ news: "Town News", life: "Behind the Counter" }[tag] || tag);
  };
  const card = (p) => `
    <article class="note">
      <div class="tag">${esc(tagLabel(p.tag))}</div>
      <h3><a href="post.html?p=${encodeURIComponent(p.slug)}">${esc(p.title)}</a></h3>
      <p>${esc(p.excerpt)}</p>
      <div class="meta">${fmtDate(p.date)}</div>
    </article>`;

  document.querySelectorAll("[data-posts]").forEach((el) => {
    const limit = parseInt(el.dataset.posts, 10) || D.POSTS.length;
    const chipsEl = document.querySelector("[data-chips]");
    const params = new URLSearchParams(location.search);
    let active = params.get("tag") || "all";

    const render = () => {
      const list = D.POSTS.filter((p) => active === "all" || p.tag === active).slice(0, limit);
      el.innerHTML = list.length ? list.map(card).join("") :
        `<article class="note"><h3>Nothing in this window yet</h3><p>Posts for this shop are on the way. Check back tomorrow!</p></article>`;
    };

    if (chipsEl) {
      const tags = ["all", ...new Set(D.POSTS.map((p) => p.tag).concat(D.SHOPS.filter((s) => s.tag && s.status === "open").map((s) => s.tag)))];
      chipsEl.innerHTML = tags.map((t) => `<button class="chip" data-tag="${esc(t)}" aria-pressed="${t === active}">${t === "all" ? "Everything" : esc(tagLabel(t))}</button>`).join("");
      chipsEl.addEventListener("click", (e) => {
        const b = e.target.closest(".chip"); if (!b) return;
        active = b.dataset.tag;
        chipsEl.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", c.dataset.tag === active));
        history.replaceState(null, "", active === "all" ? "blog.html" : `blog.html?tag=${encodeURIComponent(active)}`);
        render();
      });
    }
    render();
  });

  /* ---------- single post ---------- */
  const postEl = document.querySelector("[data-post]");
  if (postEl) {
    const slug = new URLSearchParams(location.search).get("p");
    const p = D.POSTS.find((x) => x.slug === slug);
    if (!p) {
      postEl.innerHTML = `<h1>Shop's closed</h1><p>We couldn't find that post. <a href="blog.html">Back to the Newsstand</a>.</p>`;
    } else {
      document.title = `${p.title} | ${D.SITE.name}`;
      const desc = document.querySelector('meta[name="description"]');
      if (desc) desc.setAttribute("content", p.excerpt);
      postEl.innerHTML = `
        <div class="note-tag tag" style="font-weight:800;letter-spacing:.1em;text-transform:uppercase;font-size:.78rem;color:var(--brick)">${esc(tagLabel(p.tag))}</div>
        <h1>${esc(p.title)}</h1>
        <div class="meta">${fmtDate(p.date)} · ${esc(D.SITE.name)}</div>
        ${p.body}
        <p class="mt"><a href="blog.html">← Back to the Newsstand</a></p>`;
    }
  }

  /* ---------- sign-up forms (newsletter + giveaway entries) ---------- */
  document.querySelectorAll("form[data-signup]").forEach((form) => {
    const msg = form.querySelector(".form-msg");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const data = Object.fromEntries(new FormData(form));
      data.form = form.dataset.signup;
      if (!D.SITE.formEndpoint) {
        msg.textContent = "Almost open! (Site owner: add a formEndpoint in js/site-data.js to start collecting sign-ups.)";
        return;
      }
      msg.textContent = "Sending…";
      try {
        const r = await fetch(D.SITE.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) });
        if (!r.ok) throw new Error(r.status);
        form.reset();
        msg.textContent = form.dataset.success || "You're in! See you on Main Street.";
      } catch {
        msg.textContent = "Hmm, that didn't go through. Try again in a minute.";
      }
    });
  });
})();
