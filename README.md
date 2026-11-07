# 🎟️ EventPulse - Modern Responsive Event Management Platform

A modern, responsive, and interactive event management web platform designed to discover upcoming global events, explore detailed agendas and speakers, and seamlessly register for events with real-time client-side form validation and instant digital pass generation.

Built with **HTML5**, **CSS3 (Custom Properties & Glassmorphism)**, and **Vanilla JavaScript (ES6+)**.

---

## 🌟 Key Features

### 1. 🚀 Engaging Hero & Live Metrics
- High-impact visual hero section introducing the platform.
- Live statistics banner displaying verified events, active attendees, and global reach.
- Quick CTA buttons linking to the event catalog and spotlight highlights.

### 2. ⏳ Featured Spotlight with Live Countdown Timer
- Handpicked flagship event spotlight banner.
- **Ticking countdown timer** displaying remaining Days, Hours, Minutes, and Seconds until event start time or registration cutoff.
- Quick registration and full details access directly from the spotlight card.

### 3. 🔍 Smart Discovery, Live Search & Multi-Level Filtering
- **Instant Search**: Real-time filtering matching title, description, venue, and tags.
- **Category Filter Pills**: Filter across *Technology & AI, Music & Festivals, Business & Startups, Art & Design, Workshops, and Health & Fitness*.
- **Secondary Filters**: Filter by event format (*In-Person, Virtual, Hybrid*) and price (*Free vs. Paid*).
- **Sort Options**: Sort by *Date (Upcoming First), Popularity (Seats Filled), or Alphabetical (A-Z)*.
- **Empty State Handling**: Friendly recovery message with a 1-click filter reset button.

### 4. 📇 Comprehensive Event Cards & Wishlist
- Responsive grid layout adapting seamlessly across mobile, tablet, and desktop devices.
- Dynamic category badges and remaining capacity progress bars.
- Interactive **Wishlist / Bookmark** toggle button that saves favorite events to `localStorage`.

### 5. 📖 Rich Event Details Modal
- Modal dialog with smooth backdrop blur and entry animations.
- Detailed event synopsis, key agenda timeline, and featured speaker avatars.
- **One-Click Calendar Sync**: Generates and downloads standard `.ics` calendar invitation files for Google, Apple, and Outlook calendars.
- **Share Event**: Direct sharing via Web Share API or 1-click URL clipboard copying.

### 6. 📝 Interactive Registration Form & Real-Time Validation
- Dynamic event pre-selection with thumbnail preview.
- **Ticket Tier Selection**: Radio selector cards for Standard, VIP, or Student tiers.
- **Ticket Quantity Stepper**: Increments/decrements tickets (1 to 5) with live total cost calculation.
- **Strict JavaScript Form Validation**:
  - Full Name: Minimum 3 letters, alphabetic validation.
  - Email: RFC regex validation.
  - Phone: Standard international/domestic pattern check.
  - Mandatory Terms & Conditions acceptance.
  - Real-time inline feedback (visual green checkmarks for valid fields, red alerts and descriptive error prompts on invalid input or blur).

### 7. 🎫 Digital Ticket Pass & Confirmation Receipt
- Generates a unique, verifiable Ticket Reference ID (e.g. `EP-2026-4821`).
- Renders an official digital pass complete with simulated barcode, QR code graphic, attendee information, tier, and seat count.
- **Print / PDF Save**: Built-in print trigger optimized with `@media print` styling.

### 8. 💾 LocalStorage Registration Data Management ("My Passes")
- **Full CRUD Management**:
  - **Create**: Bookings are saved into browser `localStorage`.
  - **Read**: Header button displays real-time badge count; opens a slide-out modal listing all booked passes.
  - **View Pass**: Re-open and print any past ticket pass anytime.
  - **Cancel Booking**: Allows users to cancel a registration with confirmation prompt, restoring available seats.
  - **Export JSON**: Download registration records in JSON format.

### 9. 🌓 Bonus Challenges Fully Implemented
- **Dark & Light Mode Toggle**: Seamless theme transition using CSS custom variables with persistent `localStorage` preference and automatic fallback to system color scheme.
- **Live Event Countdown Timers**: Real-time ticking timers on both the featured spotlight and individual modal views.
- **Micro-Animations & Transitions**: Smooth card hover lifts, modal animations, pulsating indicators, and floating toast notifications.

---

## 📁 Project Structure

```text
eventpulse-website/
├── index.html            # Main semantic HTML5 markup
├── css/
│   └── styles.css        # CSS3 variables, dark/light themes, animations & responsive queries
├── js/
│   ├── events-data.js    # Curated events dataset with speakers, agenda & ticket tiers
│   └── app.js            # App logic (theme, search, filters, validation, countdown, localStorage)
├── .gitignore            # Git exclusion rules
└── README.md             # Documentation and GitHub submission guide
```

---

## 🚀 How to Run the Website Locally

You can run this project with zero dependencies using any modern browser:

### Option 1: Direct Browser Launch
Simply double-click `index.html` or right-click and choose **Open with > Google Chrome / Microsoft Edge / Firefox / Safari**.

### Option 2: Using VS Code Live Server
1. Open the `eventpulse-website` folder in VS Code.
2. If installed, right-click `index.html` and click **"Open with Live Server"**.

### Option 3: Using Python HTTP Server
Run the following command inside the `eventpulse-website` folder:
```bash
python -m http.server 8000
```
Then visit [http://localhost:8000](http://localhost:8000) in your web browser.

### Option 4: Using Node.js
```bash
npx serve .
```

---

## 🛠️ Git & GitHub Submission Guide

Follow these steps to submit this repository to your GitHub account:

### 1. Stage and Commit Your Local Files
```bash
git add .
git commit -m "feat: initial commit - responsive event management website with validation and local storage"
```

### 2. Create a New Repository on GitHub
1. Log in to [GitHub](https://github.com).
2. Click **New Repository** (or visit [https://github.com/new](https://github.com/new)).
3. Name your repository (e.g., `eventpulse-management-website`).
4. Keep it **Public** and do not initialize with README (since we already have one).
5. Click **Create repository**.

### 3. Link Remote and Push
Copy your repository URL from GitHub and run:
```bash
git remote add origin https://github.com/<YOUR-USERNAME>/<YOUR-REPO-NAME>.git
git branch -M main
git push -u origin main
```

---

## 📱 Responsive Breakpoints Tested
- **Mobile (< 768px)**: Optimized single-column grid, compact drawer modals, touch-friendly touch targets, mobile hamburger menu.
- **Tablet (768px - 1024px)**: 2-column adaptive event grid, adjusted hero typography.
- **Desktop (> 1024px)**: Multi-column grid, expanded spotlight banner, sticky glassmorphic navigation.

---

## 📜 License
This project is open-source and available under the [MIT License](LICENSE).
