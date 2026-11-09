# Daily Link Hub (dailylinkhub.net)

A "Downtown Main Street" affiliate blog: storefronts for each product category, a blog ("the Newsstand"), free weekly giveaways ("the Town Square") and a free game-day squares board.

Plain HTML/CSS/JS. No build step, so it runs on any static host (GitHub Pages, Netlify, Cloudflare Pages).

## Run it day to day: edit one file

Everything you change lives in **`js/site-data.js`**:

| Section    | What it controls |
|------------|------------------|
| `SITE`     | Name, contact email, socials, and `formEndpoint` (where sign-ups go) |
| `GIVEAWAY` | This week's prize, value, end date and the Wall of Winners |
| `TV`       | Live news channels in the Main Street TV (YouTube channel IDs) |
| `SCORES`   | Leagues on the live scoreboard under the TV |
| `TICKER`   | The scrolling marquee messages |
| `SHOPS`    | The storefronts (categories) on Main Street |
| `POSTS`    | Blog posts, newest first. Copy one block, change the words, and the post shows up. |

Affiliate links go in post bodies as `<a class="btn" href="YOUR-LINK" rel="sponsored nofollow noopener" target="_blank">Check Price →</a>`.

## Main Street TV and live scores

- The home page has a **Good Morning, Main Street** briefing next to a retro TV. The other pages get a **📺 Live TV** button that docks the same TV in the corner.
- The TV plays each network's **official YouTube live stream**. Those channels allow embedding, which makes this legal. Streams don't load until a viewer picks a channel, and they start muted.
- **Live games can't be shown.** League broadcast rights don't allow it, and unofficial streams get sites taken down and can put your affiliate accounts at risk. The scoreboard shows live scores instead, using ESPN's public scoreboard feed and refreshing every minute.
- If a channel isn't live or the score feed is down, viewers get a "Watch on YouTube" or "See scores on ESPN" link instead of a blank box.
- Check each channel once after launch. Networks sometimes end a live stream or change channels; swap the `id` in `site-data.js` if needed.

## Before launch checklist

1. **Collect sign-ups.** Make a free form at Formspree (or Getform or Basin) and paste its URL into `formEndpoint`. Newsletter and giveaway entries both go there.
2. **Official rules.** Fill in every `[bracket]` in `rules.html` (your name or business, address, dates, prize).
3. **Disclosure.** Keep the Amazon sentence in `disclosure.html` only if you join Amazon Associates. Add any other programs you join.
4. **Privacy.** Review `privacy.html` against the tools you actually use.

## Giveaways and squares: keep them free

Paid raffles, and paid squares boards where the site takes money, count as **illegal gambling for individuals and for-profit businesses in almost every US state**. Only registered charities can legally run raffles, under a state permit. So this site uses the legal versions:

- **Giveaways are free-entry sweepstakes.** No purchase necessary, and the official rules are posted. You earn from the email list, the traffic, and brands paying to sponsor prizes.
- **The squares board is a free scorekeeping tool.** The site never handles money. Prizes, if any, come from sponsors.

If total prizes in one giveaway are worth more than $5,000, New York and Florida require registration and a bond, so talk to a lawyer first.

## Hosting on dailylinkhub.net

The `CNAME` file is already here. The simplest route is to give this folder its own GitHub repo (or Netlify or Cloudflare Pages project) with these files at the root. Then point the domain's DNS at the host:

- **GitHub Pages:** four `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`, plus a `CNAME` record for `www` → `<your-username>.github.io`. Then turn on "Enforce HTTPS."
