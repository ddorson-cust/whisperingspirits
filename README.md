# The Whispering Spirits — Website

A dark, atmospheric, professional website for a paranormal investigation group, built with plain HTML, CSS and JavaScript. No frameworks, no build step, no backend — it runs entirely as static files, which makes it a perfect fit for GitHub Pages.

## Folder structure

```
/
├── index.html              Homepage (hero, intro, pillars, upcoming events preview)
├── about.html               About page (history, investigators, philosophy, equipment, safety)
├── events.html               Full events listing (upcoming + past)
├── contact.html              Contact page (socials + email)
├── style.css                 All site styling
├── config.js                 Social media links + contact email — EDIT THIS FIRST
├── events-data.js            The list of investigations/events — EDIT THIS TO ADD EVENTS
├── script.js                  Shared site behaviour (nav, animations, social wiring)
├── events.js                   Renders event cards from events-data.js
├── README.md                  This file
└── assets/
    ├── whispering-spirits-banner.jpg   Your supplied banner (used on the homepage hero)
    ├── whispering-spirits-logo.jpg     Your supplied circular logo (used as the site logo)
    └── event-images/
        ├── placeholder-event-1.jpg …4.jpg   Placeholder atmospheric images — replace these
```

### Why a multi-page site rather than one long page?

You asked for a dedicated Events page because it will eventually hold many investigations — a single-page design would make that list unwieldy and would bury Home, About and Contact under it. Four short, focused pages (Home, About, Events, Contact) keep each page's job clear, keep the Events page free to grow, and are simpler to link to directly (e.g. sharing a direct link to "Events" on social media).

---

## 1. Your branding assets are already in place

Your uploaded banner and logo have been placed at:

- `assets/whispering-spirits-banner.jpg`
- `assets/whispering-spirits-logo.jpg`

These are your original files, used as-is — nothing has been redrawn or recreated. If you ever need to replace them with new versions, just overwrite these two files with new images **using the same filenames**, and the whole site will update automatically. If you use different filenames, update the `src="assets/..."` references in `index.html`, `about.html`, `events.html` and `contact.html` (search for `whispering-spirits-banner` / `whispering-spirits-logo`) and the `<link rel="icon">` line in each page's `<head>`.

---

## 2. Adding event images

Four placeholder images are included at `assets/event-images/placeholder-event-1.jpg` through `-4.jpg` so the Events page looks complete out of the box. To use your own photos:

1. Add your image file to `assets/event-images/` (JPG or PNG, ideally a similar wide/landscape shape to the placeholders).
2. Open `events-data.js`.
3. Find the event you want to update and change its `image` value to the new filename, e.g.:
   ```js
   image: "assets/event-images/ancient-manor-2026.jpg",
   ```

---

## 3. Adding a new event

All events live in one place: **`events-data.js`**. To add one:

1. Open `events-data.js`.
2. Copy an existing event entry — everything from the opening `{` to the closing `},`.
3. Paste it as a new entry inside the `EVENTS` array.
4. Edit the values between the quote marks:

```js
{
  title: "Investigation Name",
  date: "2026-10-24",       // YYYY-MM-DD — this drives upcoming/past sorting
  time: "19:30",             // 24-hour HH:MM
  location: "Location Name",
  description: "A short description of the investigation.",
  price: "£40",
  status: "BOOK NOW",        // BOOK NOW | LIMITED AVAILABILITY | SOLD OUT | COMING SOON
  image: "assets/event-images/your-image.jpg",
  bookingUrl: "https://www.eventbrite.co.uk/e/your-event"
}
```

5. Save the file. The homepage's "Forthcoming Investigations" preview and the Events page both update automatically — no HTML editing required.

Events with a `date` in the past automatically move to the "Past Investigations" list on the Events page — you don't need to delete or relocate anything yourself.

### Event status

Set `status` to one of:
- `"BOOK NOW"` — shows a working Book Now button (green tag)
- `"LIMITED AVAILABILITY"` — shows a working Book Now button (amber tag)
- `"SOLD OUT"` — Book Now button is replaced with a disabled "Sold Out" label (red tag)
- `"COMING SOON"` — Book Now button is replaced with a disabled "Coming Soon" label

---

## 4. Connecting booking links

Each event's `bookingUrl` should point to your external ticketing page (Eventbrite, Ticket Tailor, Skiddle, etc.). Until you have a real link, leave it as `"REPLACE_WITH_EVENT_BOOKING_URL"` — the button will still display, but will link to `#` and show a tooltip noting the link isn't configured yet. Booking links open in a new tab automatically.

---

## 5. Changing social media links

Open **`config.js`** and replace the four placeholder values with your real profile URLs:

```js
const WHATSAPP_URL  = "REPLACE_WITH_WHATSAPP_URL";   // e.g. "https://wa.me/447000000000"
const INSTAGRAM_URL = "REPLACE_WITH_INSTAGRAM_URL";  // e.g. "https://instagram.com/thewhisperingspirits_"
const TIKTOK_URL    = "REPLACE_WITH_TIKTOK_URL";     // e.g. "https://tiktok.com/@thewhisperingspirits_"
const FACEBOOK_URL  = "REPLACE_WITH_FACEBOOK_URL";   // e.g. "https://facebook.com/thewhisperingspirits"
```

Every social icon across the site (header, mobile menu, footer, Contact page) is wired to these four values — you only ever need to update them in this one place.

---

## 6. Changing the contact email

Also in **`config.js`**:

```js
const CONTACT_EMAIL = "YOUR_EMAIL_ADDRESS";
```

Replace with your real address, e.g. `"info@thewhisperingspirits.co.uk"`. This single value powers the `mailto:` button and the displayed email text on the Contact page.

---

## 7. Testing the site locally

Because the site uses plain JavaScript `<script>` includes, it's best viewed through a local web server rather than opening the HTML files directly (some browsers block local file-to-file requests).

**Option A — Python (built into macOS/Linux, and installable free on Windows):**
```bash
cd path/to/whispering-spirits
python3 -m http.server 8000
```
Then open **http://localhost:8000** in your browser.

**Option B — VS Code "Live Server" extension:**
Install the "Live Server" extension, right-click `index.html`, choose "Open with Live Server".

---

## 8. Creating a GitHub repository

1. Go to [github.com](https://github.com) and sign in (or create a free account).
2. Click the **+** icon (top right) → **New repository**.
3. Name it something like `whispering-spirits-website`.
4. Set it to **Public** (required for free GitHub Pages).
5. Do **not** initialise with a README (you already have one) — click **Create repository**.

---

## 9. Uploading the website to GitHub

**Option A — GitHub's website (no command line needed):**
1. On your new repository's page, click **uploading an existing file**.
2. Drag the entire contents of this project folder (all files and the `assets` folder) into the upload area.
3. Scroll down, add a commit message like "Initial website upload", and click **Commit changes**.

**Option B — Command line (git):**
```bash
cd path/to/whispering-spirits
git init
git add .
git commit -m "Initial website upload"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/whispering-spirits-website.git
git push -u origin main
```

---

## 10. Enabling GitHub Pages

1. In your repository, go to **Settings** → **Pages** (left sidebar, under "Code and automation").
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Under **Branch**, choose **main** and folder **/ (root)**, then click **Save**.
4. Wait a minute or two, then refresh the page — GitHub will show your live URL, typically:
   ```
   https://YOUR_USERNAME.github.io/whispering-spirits-website/
   ```
5. Visit that URL to see your live site. Any time you push new changes to `main`, the site updates automatically within a minute or two.

---

## Notes on content

- The **About** page contains clearly marked placeholder boxes (dashed copper borders) for group history, investigator bios, philosophy detail, equipment, and safety policy — no specific people, locations, dates or qualifications have been invented. Replace the placeholder text directly in `about.html` when you're ready.
- The sample events in `events-data.js` use an example location and a generic booking URL — replace these with real investigations before going live.
- All copy avoids stating that paranormal phenomena are scientifically proven, in line with a credible, investigative tone.
