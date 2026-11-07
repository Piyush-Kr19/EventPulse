<div align="center">

# ⚡ EventPulse

### Be the main character at every event.

A modern, responsive event discovery and booking platform. Browse curated conferences, festivals and workshops across India, then grab a digital pass in seconds.

<br>

[![Live Demo](https://img.shields.io/badge/Live_Demo-myeventpulse.netlify.app-C6F432?style=for-the-badge&logo=netlify&logoColor=black)](https://myeventpulse.netlify.app)

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Netlify](https://img.shields.io/badge/Deployed_on-Netlify-00C7B7?style=flat-square&logo=netlify&logoColor=white)
![No Dependencies](https://img.shields.io/badge/dependencies-none-success?style=flat-square)

**[🌐 View Live Site](https://myeventpulse.netlify.app)** · **[✨ Features](#-features)** · **[🚀 Getting Started](#-getting-started)** · **[📬 Contact](#-contact)**

</div>

---

## 📖 Overview

**EventPulse** is a front-end event management platform built entirely with vanilla HTML, CSS and JavaScript. No frameworks, no build step, no backend. Visitors can explore upcoming events, filter and search them, read full agendas and speaker lineups, register through a validated booking form, and receive a printable digital ticket. Bookings, favorites and theme preferences are saved in the browser, so everything is still there when they return.

The project is a showcase of clean UI engineering: a themeable design system, a reactive client-side filter engine, accessible modals, and a complete booking flow, all in a few hundred kilobytes of static files.

🔗 **Live at:** [https://myeventpulse.netlify.app](https://myeventpulse.netlify.app)

---

## ✨ Features

### 🔎 Discovery
| Feature | Description |
|---|---|
| **Live search** | Instantly filters by title, keyword, city or speaker as you type |
| **Category pills** | Technology & AI, Music & Festivals, Business & Startups, Art & Design, Workshops, Health & Fitness |
| **Format and price filters** | In-Person, Virtual or Hybrid, and Free or Paid |
| **Smart sorting** | By upcoming date, popularity (most booked) or title A–Z |
| **Featured spotlight** | Flagship event with a **live ticking countdown timer** |
| **Seat tracker** | Each card shows how many seats are left |

### 🎟️ Booking
| Feature | Description |
|---|---|
| **Event details modal** | Full description, highlights, timed agenda and speaker profiles |
| **Multi-tier tickets** | General, VIP and Student passes with per-tier pricing |
| **Quantity stepper** | Up to 5 passes per registration, with a live total in ₹ |
| **Form validation** | Inline, field-level error and success states for name, email, phone and terms |
| **Digital ticket pass** | Unique ticket ID (`EP-2026-XXXX`), barcode and QR entry pass |
| **Print ticket** | One-click print with a dedicated print stylesheet |
| **My Passes** | Review or cancel your bookings; a badge in the nav shows the count |

### 🧰 Extras
- 📅 **Add to Calendar:** downloads a standard `.ics` file that works with Google, Apple and Outlook calendars
- ❤️ **Favorites:** bookmark events to a wishlist
- 🌗 **Dark and light themes** with the choice remembered between visits
- 📤 **Share:** uses the native Web Share API where available
- 🔔 **Toast notifications** for instant feedback on every action
- ⌨️ **Keyboard accessibility:** `Esc` closes modals, with ARIA labels and dialog roles throughout
- 📱 **Fully responsive** from phones to widescreen, with a mobile navigation menu
- ⬆️ Floating scroll-to-top button and a newsletter signup form

---

## 🗓️ Event Catalog

The platform ships with eight sample events across India:

| Event | Category | Date | Location | Format | From |
|---|---|---|---|---|---|
| India AI & Cloud Innovation Summit ⭐ | Technology & AI | Nov 24, 2026 | Bengaluru | Hybrid | ₹1,499 |
| Neon Horizon Music & Arts Festival ⭐ | Music & Festivals | Dec 05, 2026 | Goa | In-Person | ₹1,299 |
| DesignCraft: Modern UX & Product Design Conference | Art & Design | Dec 12, 2026 | Mumbai | Hybrid | ₹999 |
| VentureScale: Seed-to-Series A Startup Expo | Business & Startups | Dec 18, 2026 | New Delhi | In-Person | ₹1,999 |
| Full-Stack Modern Web & React Workshop | Workshops | Dec 22, 2026 | Online | Virtual | Free |
| Mind & Body: Holistic Wellness & Yoga Summit | Health & Fitness | Jan 09, 2027 | Rishikesh | In-Person | ₹799 |
| CyberShield: Threat Intelligence & Zero-Trust Expo | Technology & AI | Jan 16, 2027 | Hyderabad | Hybrid | ₹1,499 |
| Cinematic Visions: Independent Film & Photography Showcase | Art & Design | Jan 23, 2027 | Kolkata | In-Person | ₹599 |

> ⭐ = marked as featured in the dataset.
> All events, speakers and prices are **sample data** for demonstration purposes.

---

## 🛠️ Technologies Used

| Layer | Technology |
|---|---|
| **Markup** | Semantic HTML5 with ARIA attributes |
| **Styling** | Modern CSS3: custom properties (design tokens), Grid, Flexbox, glassmorphism, keyframe animations, `@media` breakpoints at 1024px and 768px, and `@media print` |
| **Logic** | Vanilla JavaScript (ES6+) with no frameworks or libraries |
| **Typography** | [Inter](https://fonts.google.com/specimen/Inter) and [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) via Google Fonts |
| **Imagery** | [Unsplash](https://unsplash.com) photography |
| **Persistence** | Browser `localStorage` |
| **Hosting** | [Netlify](https://www.netlify.com) |

---

## 📁 Project Structure

```
eventpulse/
├── index.html            # Page markup, modals and layout
├── css/
│   └── styles.css        # Design system, themes, components, responsive + print styles
└── js/
    ├── events-data.js    # Event dataset and category definitions
    └── app.js            # Application logic (filters, modals, booking, storage)
```

> `index.html` loads `css/styles.css`, `js/events-data.js` and `js/app.js`, so keep the files in this folder layout.

---

## 🚀 Getting Started

EventPulse is a static site, so there is nothing to install or compile.

### Prerequisites
- Any modern browser (Chrome, Firefox, Safari, Edge)
- *Optional:* [Node.js](https://nodejs.org) or Python if you want a local dev server

### Run locally

**1. Get the code**
```bash
git clone https://github.com/<your-username>/eventpulse.git
cd eventpulse
```

**2. Open it** using whichever option you prefer:

```bash
# Option A: just open the file
open index.html            # macOS
start index.html           # Windows
xdg-open index.html        # Linux

# Option B: Python dev server
python -m http.server 8000
# → http://localhost:8000

# Option C: Node dev server
npx serve .
```

### Deploy your own copy

**Netlify (drag and drop):** go to [app.netlify.com/drop](https://app.netlify.com/drop) and drop the project folder in.

**Netlify (CLI):**
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=.
```

It also works on GitHub Pages, Vercel, Cloudflare Pages or any static host.

---

## 💡 Usage

### As a visitor
1. **Browse:** scroll the Featured Spotlight or jump to *Discover Events*.
2. **Filter:** type in the search box, pick a category pill, and narrow by format or price.
3. **Explore:** click an event card to read the agenda, highlights and speakers.
4. **Book:** choose *Register*, select a ticket tier and quantity, and fill in your details.
5. **Get your pass:** receive a digital ticket with barcode and QR code. Print it or add the event to your calendar.
6. **Manage:** open **My Passes** in the header to review or cancel bookings.

### Adding or editing events

All content lives in [`js/events-data.js`](js/events-data.js). Add an object to the `INITIAL_EVENTS` array and it appears on the site automatically:

```javascript
{
  id: 'ev-my-new-event',
  title: 'My New Event',
  category: 'tech',                  // tech | music | business | design | workshop | health
  categoryLabel: 'Technology & AI',
  tagline: 'One-line hook shown on the card.',
  date: 'Feb 14, 2027',
  isoDate: '2027-02-14T10:00:00',    // drives the countdown and calendar file
  time: '10:00 AM - 05:00 PM IST',
  venue: 'Full venue address',
  locationShort: 'Pune, MH',
  format: 'In-Person',               // In-Person | Virtual | Hybrid
  price: 999,                        // 0 for free events
  priceDisplay: '\u20B9999',
  featured: false,                   // true to show in the Featured Spotlight
  image: 'https://…',
  description: `Paragraph one.\n\nParagraph two.`,
  highlights: ['Highlight one', 'Highlight two'],
  agenda: [{ time: '10:00 AM', title: 'Opening Keynote', speaker: 'Jane Doe' }],
  speakers: [{ name: 'Jane Doe', role: 'CTO', company: 'Acme', avatar: 'https://…' }],
  totalSeats: 200,
  registeredSeats: 120,
  ticketTiers: [
    { id: 'standard', name: 'General Admission', price: 999, desc: 'Full day access' }
  ]
}
```

### Theming

Colors are defined as CSS custom properties at the top of [`css/styles.css`](css/styles.css), with separate token sets for light mode (`:root`) and dark mode (`[data-theme="dark"]`). Change `--primary` and the related variables to re-skin the whole site.

### Data stored in your browser

| `localStorage` key | Purpose |
|---|---|
| `eventpulse_theme` | Selected light or dark theme |
| `eventpulse_favorites` | Bookmarked event IDs |
| `eventpulse_registrations` | Booked passes (shown in *My Passes*) |

To reset the app, clear the site's data in your browser's developer tools.

---

<div align="center">

**If you like this project, give it a ⭐ on GitHub!**

Made with ❤️ and a lot of ☕ · [myeventpulse.netlify.app](https://myeventpulse.netlify.app)

</div>