# A little corner ♡

A soft, English-language personal profile inspired by the character references supplied by the owner. Original generated background, blush colors, gentle motion, responsive layout, and Telegram / Discord / Steam / TikTok links. Plain HTML, CSS, and JavaScript; no build or installation needed.

## Personalize

Edit `profile.json`:

- `name`: your display name.
- `nickname`: your nickname, with or without `@`.
- `bio`: your introduction. Use `\n` for a new line.
- `eyebrow` and `tags`: the small caption and interest chips.
- `avatar` and `background`: relative asset paths or HTTPS image URLs.
- `links`: labels, descriptions, and URLs. Empty URLs show “link coming soon” without opening a fake profile. Set `"hidden": true` to hide a link. Additional links can use `"platform": "link"`.

Examples of URLs to put in the four links (replace the sample values):

```text
https://t.me/your_username
https://discord.com/users/YOUR_NUMERIC_USER_ID
https://steamcommunity.com/id/your_username
https://www.tiktok.com/@your_username
```

Keep JSON quotes and commas valid. Do not place passwords or private information in this public file.

## Publish on GitHub Pages

1. Create a GitHub repository and upload these files, including `assets` and `.github/workflows/pages.yml`, to the `main` branch.
2. Open **Settings → Pages → Build and deployment → Source** and select **GitHub Actions**.
3. Open **Actions → Deploy profile to GitHub Pages → Run workflow** (or push a change).
4. Your site will be at `https://YOUR_USERNAME.github.io/YOUR_REPOSITORY/`. GitHub shows the exact address under **Settings → Pages**.

If you prefer publishing from a branch, choose **Deploy from a branch**, then **main / (root)** in Pages settings; the root files work directly. Automatic workflow deployment assumes a branch named `main`.

## Local preview

From this folder run `python -m http.server 4173`, then open `http://localhost:4173`. An HTTP server is needed to load JSON; opening `index.html` directly from disk is not supported.

## Motion and privacy

The “slow & cozy” button pauses animations. The site also respects the device's reduced-motion preference. The little heart interaction is local and does not count visitors or send data. There are no trackers. Fonts load from Google Fonts with system-font fallbacks.

## Artwork

The background lives in `assets/character.png`. It was newly generated with the built-in image generation tool using the two user-supplied character images as appearance references. This is a personal fan-inspired template, not an official Wypher website. See `assets/artwork-prompt.txt` for the generation brief.
