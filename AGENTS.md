# figma-make-app

React + Vite + Tailwind CSS project running inside Figma Make.

## Development Server

A Vite development server is **already running** on `$PORT` (default 8443). You don't need to start it manually.

- Preview URL: The user can access the running app through the preview panel
- Hot reload: Changes to source files are reflected immediately

The API listens on `127.0.0.1:$API_PORT` (default 8787) via `pnpm dev:api`. Vite proxies `/api` to it. It stores Get Started leads, contact messages, calculator visits, teacher, DocWealth, review, course, and seminar form submissions, Google sign-in sessions, and first-party page timing in MySQL (`MYSQL_HOST`, `MYSQL_PORT`, `MYSQL_USER`, `MYSQL_PASSWORD`, `MYSQL_DATABASE`).

Put Google credentials in environment secrets, never in chat or source:

- `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID` turn on live reviews. Without them, `GET /api/google-reviews` returns sample reviews.
- `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` turn on header Google sign-in. The OAuth redirect URI is `$APP_ORIGIN/api/auth/google/callback` (`APP_ORIGIN` defaults to `http://127.0.0.1:8443`).

Page timing uses the first-party `ma_vid` cookie. `GET /api/analytics/summary` returns page totals only to a signed-in Google user listed in `ADMIN_EMAILS`. Form writes reject cross-site requests. Calculator reports are emailed with `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` and `MAIL_FROM`; without those, Email returns 503 and Download PDF still saves the file. The recipient is the address stored with the `ma_calc` cookie, not an address in the request body. When those SMTP settings are present, Get Started, Contact, and Book a Review also send a plain-text copy to a fixed staff address. The row is still saved when mail is not configured or that send fails. myanmol.com mail is Microsoft 365: use `SMTP_HOST=smtp.office365.com`, `SMTP_PORT=587`, and set `SMTP_USER` and `MAIL_FROM` to the same licensed mailbox. Authenticated SMTP must be enabled on that mailbox in the Microsoft 365 admin center. Port 587 requires STARTTLS. Start local MariaDB with `sudo service mariadb start`, then `MYSQL_PASSWORD=... bash scripts/prepare-mysql.sh` once to create the database user.

## Toolchain

`.mise.toml` pins Node.js 22 and pnpm 10.34.3. Activate that pnpm with `corepack prepare pnpm@10.34.3 --activate`, then install with `pnpm install --frozen-lockfile`. Photos and logos are Git LFS objects; run `git lfs pull` after checkout so image files are not pointer text.

Cloud Agents run on Linux, so import paths must match filename case exactly.

## Project Structure

This is the canonical project structure. Start with task-relevant files below. Only follow imports or inspect other files when required, when a documented path is missing, or when the repository contradicts this guide.

- `src/main.tsx` - React entrypoint; imports `src/index.css` and mounts `src/App.tsx` into the `#root` element
- `src/App.tsx` - Primary application component and the usual starting point for UI work
- `src/index.css` - Global CSS entrypoint and Tailwind CSS v4 import
- `index.html` - Vite HTML shell containing the `#root` element and loading `src/main.tsx`
- `package.json` - Project dependencies and the Vite build, development, preview, and formatting scripts
- `vite.config.ts` - Vite configuration with React, Tailwind CSS v4, and Figma Make plugins plus the `@` alias for `src`
- `.mise.toml` - Toolchain versions for Node.js and pnpm

## Dependencies

- Runtime: React 19 and React DOM 19
- Styling: Tailwind CSS v4 with the `@tailwindcss/vite` plugin
- Build tooling: Vite 8, TypeScript 5.7, and `@vitejs/plugin-react`
- Formatting: oxfmt

## Styling

This project uses **Tailwind CSS v4** through the `@tailwindcss/vite` plugin configured in `vite.config.ts`. `src/index.css` imports Tailwind with `@import 'tailwindcss';`. Use Tailwind utility classes directly in JSX and put global CSS or Tailwind v4 theme customization in `src/index.css`. This scaffold does not need a Tailwind config file or PostCSS config.

`src/main.tsx` imports `src/index.css`, so global font wiring belongs in `src/index.css`. Keep CSS `@import` statements first, then add any `@font-face` rules and font-family defaults there.

## Code quality

- Use double quotes for strings containing apostrophes (`"We're here to help"`), or escape them in single-quoted strings. An unescaped apostrophe in a single-quoted string breaks the build.
- Ensure JSX tags are closed and braces are balanced.
- Export components as default exports.
