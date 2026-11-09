/* ==========================================================
   DAILY LINK HUB — EDIT THIS FILE TO RUN THE SITE
   ----------------------------------------------------------
   Everything you'll change day-to-day lives here:
     1. SITE      – name, tagline, form endpoint, socials
     2. TICKER    – the scrolling marquee messages
     3. SHOPS     – the storefronts on Main Street (affiliate categories)
     4. POSTS     – your blog posts (newest first)
   No coding needed: copy an existing block, change the words, save.
   ========================================================== */

window.DLH = {

  SITE: {
    name: "Daily Link Hub",
    domain: "dailylinkhub.net",
    tagline: "Your daily stroll down Main Street",
    // Paste a free form endpoint here (Formspree, Getform, Basin, etc.)
    // e.g. "https://formspree.io/f/abcd1234". Leave "" until you have one.
    formEndpoint: "",
    contactEmail: "hello@dailylinkhub.net",
    socials: {
      // Fill in or leave "" to hide
      facebook: "",
      instagram: "",
      tiktok: "",
      x: ""
    }
  },

  /* The current free giveaway (sweepstakes). Update each week.
     ends = ISO date/time. Remember to fill in rules.html too. */
  GIVEAWAY: {
    title: "This Week: Game-Day Tailgate Kit",
    prize: "Folding table, cooler and a portable speaker",
    icon: "🎁",
    arv: "$150",
    ends: "2026-11-16T23:59:00-05:00",
    pastWinners: [
      // { name: "Jamie R.", prize: "Coffee bundle", date: "2026-11-02" }
    ]
  },

  /* MAIN STREET TV — live news channels shown in the side TV window.
     Each uses the channel's own official YouTube live stream (embedding is
     allowed by the channel). "id" is the YouTube channel ID (starts with UC).
     To add one: open the channel on YouTube → About/Share → Copy channel ID.
     If a channel isn't live right now, viewers get a "Watch on YouTube" link. */
  TV: [
    { name: "ABC News",  id: "UCBi2mrWuNuyYy4gbM6fU18Q" },
    { name: "NBC News",  id: "UCeY0bbntWzzVIaj2z3QigXg" },
    { name: "CBS News",  id: "UC8p1vwvWtl6T73JiExfWs1g" },
    { name: "LiveNOW",   id: "UCJg9wBPyKMNA5sRDnvzmkdg" },
    { name: "Bloomberg", id: "UCIALMKvObZNtJ6AmdCLP7Lg" },
    { name: "Sky News",  id: "UCoMdktPbSTixAyNGwb-UYkQ" }
  ],

  /* LIVE SCOREBOARD — leagues shown under the TV (ESPN public scoreboard feed).
     path = ESPN sport/league. Remove any you don't want. */
  SCORES: [
    { name: "NFL",  path: "football/nfl" },
    { name: "NCAAF", path: "football/college-football" },
    { name: "NBA",  path: "basketball/nba" },
    { name: "NHL",  path: "hockey/nhl" },
    { name: "MLB",  path: "baseball/mlb" }
  ],

  TICKER: [
    "Fresh deals posted daily",
    "Free weekly giveaway — no purchase necessary",
    "Game-day squares board is OPEN",
    "New on the Newsstand: this week's picks",
    "Join the Main Street mailing list"
  ],

  /* Each shop = an affiliate category / storefront.
     status: "open" shows a red OPEN sign, "soon" shows COMING SOON.
     a1/a2 = awning stripe colors. link = where the shop points
     (a blog tag page, or straight to an affiliate link). */
  SHOPS: [
    { name: "The Hardware Store", icon: "🛠️", blurb: "Tools, gadgets and fix-it gear we'd actually buy.", tag: "tools",   a1: "#c2362b", a2: "#fff",    status: "open" },
    { name: "Tech & Radio Shop",  icon: "📻", blurb: "Electronics, components, chargers and smart-home picks.", tag: "tech", a1: "#1d2a44", a2: "#36e3ff", status: "open" },
    { name: "The Corner Diner",   icon: "🍳", blurb: "Kitchen gear, coffee makers and snack-time finds.", tag: "kitchen", a1: "#2f6b4f", a2: "#fbf3e4", status: "open" },
    { name: "Main St. Arcade",    icon: "🕹️", blurb: "Games, consoles, controllers and fun stuff.", tag: "games", a1: "#ff3d8b", a2: "#121826", status: "open" },
    { name: "Sporting Goods",     icon: "🏈", blurb: "Game-day gear, tailgate setups and fan merch.", tag: "sports", a1: "#f2b632", a2: "#23180f", status: "open" },
    { name: "Five & Dime",        icon: "🪙", blurb: "Daily deals under $20 — the bargain bin.", tag: "deals", a1: "#8e3b2a", a2: "#f2b632", status: "open" },
    { name: "Mystery Storefront", icon: "❓", blurb: "Something new is moving in. Watch this window.", tag: "", a1: "#5a4636", a2: "#c9a98a", status: "soon" }
  ],

  /* BLOG POSTS — newest first.
     tag must match a shop tag above (or "news" / "life" for blog-only posts).
     body is plain HTML. Use productCard(...) helpers by writing the HTML
     shown in the first post. Affiliate links: add rel="sponsored nofollow". */
  POSTS: [
    {
      slug: "welcome-to-main-street",
      title: "Welcome to Main Street: What Daily Link Hub Is All About",
      date: "2026-11-09",
      tag: "news",
      excerpt: "The doors are open. Here's what this little downtown is, how it works, and why it'll be a bit chaotic sometimes.",
      body: `
        <p>Welcome in! Daily Link Hub is my corner of the internet — part blog, part bargain bin, part town square. Every day I'll be posting links to things I've found, tested, or just think are worth a look.</p>
        <h2>How the street works</h2>
        <p>Each <strong>storefront</strong> on Main Street is a category: tools, tech, kitchen, games, sports and daily deals. Walk into any shop and you'll find my posts and picks for that aisle.</p>
        <p>The <strong>Newsstand</strong> is the blog. Some days it's a tidy product roundup, some days it's me rambling. That's the deal.</p>
        <p>The <strong>Town Square</strong> is where the fun is — free giveaways and the game-day squares board. Always free to enter.</p>
        <h2>How I keep the lights on</h2>
        <p>Some links here are affiliate links. If you buy something through them I may earn a small commission at no extra cost to you. It never changes what I recommend. Full details are on the <a href="disclosure.html">disclosure page</a>.</p>
        <div class="product-card">
          <div class="thumb">🔦</div>
          <div>
            <h4>Example Product Card</h4>
            <p>This is what a product pick looks like. Swap the name, blurb and link for a real affiliate product.</p>
            <a class="btn" href="#" rel="sponsored nofollow noopener" target="_blank">Check Price →</a>
          </div>
        </div>
        <p>Grab a coffee at the diner, take a stroll, and come back tomorrow — there'll be something new in the window.</p>
      `
    },
    {
      slug: "how-the-squares-board-works",
      title: "Game Day 101: How a Football Squares Board Works (and the Math Behind It)",
      date: "2026-11-08",
      tag: "sports",
      excerpt: "100 boxes, 20 random digits, four chances to win. Here's how squares work and which numbers really are luckier.",
      body: `
        <p>A squares board is a 10×10 grid — <strong>100 boxes</strong>. One team runs across the top, the other down the side. Once every box is claimed, the digits 0–9 are drawn at random for each side.</p>
        <h2>How you win</h2>
        <p>At the end of each quarter, take the <em>last digit</em> of each team's score. Find where that column and row meet — whoever owns that box wins the quarter. Score 17–10? That's the box at 7 and 0.</p>
        <h2>The math: not all boxes are equal</h2>
        <p>Before the numbers are drawn, every box has exactly a 1 in 100 chance of being any given pair, so the game is fair. <em>After</em> the draw, the odds are lopsided, because football scores land in 3s and 7s. Historically the last digits 0, 7, 3 and 4 show up far more than 2, 5 or 9. A 0–7 box can hit several times more often than a 2–2 box.</p>
        <p>That's why the numbers are drawn <strong>after</strong> the board fills — nobody can cherry-pick the good boxes.</p>
        <p>Our board is free to play: <a href="squares.html">open the squares board</a>.</p>
      `
    },
    {
      slug: "under-20-desk-upgrades",
      title: "5 Desk Upgrades Under $20 (Five & Dime Picks)",
      date: "2026-11-06",
      tag: "deals",
      excerpt: "Cheap little things that make the workspace nicer — cable clips, a monitor riser and more.",
      body: `
        <div class="disclosure-box">Heads up: this post has affiliate links. <a href="disclosure.html">Learn more</a>.</div>
        <p>Placeholder roundup — swap in your real picks and affiliate links.</p>
        <div class="product-card"><div class="thumb">📎</div><div><h4>Adhesive Cable Clips</h4><p>Keep chargers from diving behind the desk.</p><a class="btn" href="#" rel="sponsored nofollow noopener" target="_blank">Check Price →</a></div></div>
        <div class="product-card"><div class="thumb">🖥️</div><div><h4>Monitor Riser</h4><p>Raise the screen, save the neck, gain a storage shelf.</p><a class="btn" href="#" rel="sponsored nofollow noopener" target="_blank">Check Price →</a></div></div>
        <div class="product-card"><div class="thumb">💡</div><div><h4>USB Desk Lamp</h4><p>Bendy neck, three brightness levels, runs off any USB port.</p><a class="btn" href="#" rel="sponsored nofollow noopener" target="_blank">Check Price →</a></div></div>
      `
    },
    {
      slug: "chaos-update-week-one",
      title: "Chaos Update: Week One Behind the Counter",
      date: "2026-11-04",
      tag: "life",
      excerpt: "Real talk from the back office. What worked, what broke, and what's coming next.",
      body: `<p>Blog-style post placeholder. This is where the off-the-cuff, "chaotic times" posts go — no products needed. Just write.</p>`
    }
  ]
};
