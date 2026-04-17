# DEPLOYMENT — GitHub + Hostinger

Complete walk-through for getting this repo live on Hostinger.

---

## Part 1 — Install & test locally

Before touching GitHub or Hostinger, make sure the site builds on your machine.

```bash
# from the rabs-site folder
npm install
npm run dev
```

Open `http://localhost:5173` — you should see the full site. Stop the server with `Ctrl+C`.

Then test the production build:

```bash
npm run build
npm run preview
```

Preview URL should look identical to dev. If that all works, you're ready to push.

---

## Part 2 — Create the GitHub repository

### 2.1 Create the empty repo on GitHub
1. Go to https://github.com/new
2. Repository name: `rabs-site` (or whatever you prefer)
3. Visibility: **Private** is fine (Hostinger can still pull from private repos after authentication)
4. **Do NOT** check "Add a README", "Add .gitignore", or "Add license" — this repo already has them
5. Click **Create repository**

### 2.2 Push the local code to GitHub

In the `rabs-site` folder:

```bash
git init
git add .
git commit -m "Initial commit: RABS marketing site"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/rabs-site.git
git push -u origin main
```

Refresh GitHub — your code should be there.

### 2.3 Watch the GitHub Action run

The workflow in `.github/workflows/deploy.yml` runs automatically on every push to `main`. It builds the site and publishes the contents of `dist/` to a new branch called `deploy`.

1. Go to your repo → **Actions** tab
2. You should see "Build & publish dist" running
3. When it finishes (~1–2 min), go to **Branches** — you'll see a new `deploy` branch
4. Click into `deploy`: you should see `index.html`, `assets/`, etc. — the built, ready-to-serve files.

If the Action fails, check the log. The most common issue is a permissions error — in your repo go to **Settings → Actions → General → Workflow permissions** and ensure "Read and write permissions" is selected.

---

## Part 3 — Connect to Hostinger

Hostinger offers a few hosting plan types. The setup is slightly different for each.

### Option A — Hostinger shared hosting with Git integration (recommended)

This is the path if you have any standard Hostinger Web Hosting, Premium, or Business plan.

1. **Log into hPanel** (https://hpanel.hostinger.com)
2. Go to **Websites → your domain → Dashboard**
3. In the left sidebar, click **Advanced → Git**
4. Click **Create repository**
5. Fill in:
   - **Repository address**: `https://github.com/YOUR_USERNAME/rabs-site.git`
   - **Branch**: `deploy`  ← important! This is the built-files branch, not `main`
   - **Install path**: `public_html` (or a subdirectory if you want)
6. If the repo is private, Hostinger will guide you through adding a deploy key or connecting via GitHub OAuth
7. Click **Create**

Once created, click the repo row and hit **Deploy** (or enable **Auto-deploy** so it pulls on every push to the `deploy` branch).

Your site is live at your domain.

### Option B — Manual upload (no Git integration)

If your plan doesn't include Git integration, or you just want to push once:

1. On your local machine: `npm run build`
2. Open **hPanel → Files → File Manager**
3. Navigate to `public_html`
4. Delete any default files in there (the Hostinger placeholder `index.html`, etc.)
5. Upload **the contents of your local `dist/` folder** (not the folder itself — its contents)
6. You can drag-and-drop, or use ZIP upload + extract, or use FTP

Repeat this any time you update the site. (Git integration is worth setting up for anything beyond a one-off.)

### Option C — Hostinger Static Hosting (if your plan has it)

Some Hostinger plans offer dedicated static hosting that builds from your repo automatically. If you see a **Static Hosting** option in hPanel, use that instead — you can often point it directly at `main` and it will run `npm run build` for you. Otherwise stick to Option A.

---

## Part 4 — Domain & SSL

1. **hPanel → Domains**: make sure your domain points at this hosting account. If you bought the domain through Hostinger, it's already linked. If the domain is elsewhere (Namecheap, GoDaddy, etc.), update its nameservers to Hostinger's (shown in hPanel).
2. **hPanel → SSL**: install the free Let's Encrypt SSL. Enable "Force HTTPS" once it's issued.
3. Decide whether you want `www.yourdomain.com` or the apex `yourdomain.com` as the canonical URL, and set up the redirect in hPanel → Redirects.

---

## Part 5 — Update flow (going forward)

Once everything is wired up, your loop is:

1. Edit code locally
2. `git add . && git commit -m "what changed" && git push`
3. GitHub Action builds and pushes to `deploy` (~1–2 min)
4. Hostinger auto-deploys from `deploy` (if you enabled auto-deploy) — otherwise click **Deploy** in hPanel
5. Refresh your site

That's it.

---

## Troubleshooting

**Action fails with "Permission to … denied"**
Repo → Settings → Actions → General → Workflow permissions → "Read and write permissions" → Save.

**Site loads but CSS/JS is missing (blank page or broken styles)**
Check the browser console. If paths start with `/assets/…` and 404, the issue is the `base` in `vite.config.js`. It's already set to `'./'` in this repo, which produces relative paths that work in Hostinger subdirectories. If you deploy to a nested folder, keep `./`. If you deploy to the root of a domain, `/` also works.

**Form doesn't send email**
The form currently simulates a submit (`setTimeout` in `handleSubmit`). Wire it to a real endpoint — see `PROJECT_SETUP.md` section 8.4 (Formspree is the fastest option for an MVP).

**Fonts look wrong / default**
Check that the Google Fonts `<link>` in `index.html` hasn't been modified and that your Hostinger site isn't running behind a filter that blocks Google Fonts. Try opening devtools → Network → filter for "fonts.googleapis" to verify they load.

**Changes to `main` don't appear on the live site**
- Check Actions tab: did the build succeed?
- Check `deploy` branch: was it updated with the latest commit?
- Check hPanel → Git: did Hostinger pull? If auto-deploy is off, click **Deploy**.
