# Daily Link Hub (dailylinkhub.net)

A "Downtown Main Street" affiliate blog: storefronts for each product category, a blog ("the Newsstand"), free weekly giveaways ("the Town Square") and a free game-day squares board.

Plain HTML/CSS/JS. No build step, so it runs on any static host (GitHub Pages, Netlify, Cloudflare Pages).

## Run it day to day: edit one file

Everything you change lives in **`js/site-data.js`**:

| Section    | What it controls |
|------------|------------------|
| `SITE`     | Name, contact email, socials, and `formEndpoint` (where sign-ups go) |
| `GIVEAWAY` | This week's prize, value, end date and the Wall of Winners |
| `TICKER`   | The scrolling marquee messages |
| `SHOPS`    | The storefronts (categories) on Main Street |
| `POSTS`    | Blog posts, newest first. Copy one block, change the words, and the post shows up. |

Affiliate links go in post bodies as `<a class="btn" href="YOUR-LINK" rel="sponsored nofollow noopener" target="_blank">Check Price →</a>`.

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
