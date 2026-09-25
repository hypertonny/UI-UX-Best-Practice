# DailyToGo (BusTrack) — Student Transit & Campus Travel App

> **Human Computer Interaction · STET301 End-Term & Mid-Term UX Case Study**  
> **Author:** Rahul Purohit · Roll No: `2024sepvugp0079` · School of Science & Technology, Vijaybhoomi University  
> **Course Faculty:** Vijaybhoomi School of Science & Technology  

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live%20Demo-brightgreen?style=for-the-badge&logo=github)](https://hypertonny.github.io/UI-UX-Best-Practice/)
[![Figma](https://img.shields.io/badge/Figma-Prototype%20Wireframes-F24E1E?style=for-the-badge&logo=figma)](https://www.figma.com/design/ec61TJtdtqDHxSKYTMLajN/Untitled?node-id=4-465&t=4wfa10UJkH6ZvGFQ-1)
[![Behance](https://img.shields.io/badge/Behance-Case%20Study%20Pack-1769FF?style=for-the-badge&logo=behance)](https://hypertonny.github.io/UI-UX-Best-Practice/behance_showcase.html)

---

## 🚀 Quick Deliverable Navigation (Professor's Checklist)

| Deliverable | Description | Direct Link |
| :--- | :--- | :--- |
| 📱 **Live Production Web App** | Fully interactive student transit app with videos, countdowns, and language toggle. | [Launch DailyToGo App](https://hypertonny.github.io/UI-UX-Best-Practice/) |
| 📊 **5-Minute Presentation Deck** | 7-slide 16:9 presentation deck pre-formatted with pitch cues and 1-click PDF export. | [Open Presentation Deck](https://hypertonny.github.io/UI-UX-Best-Practice/presentation.html) |
| 🎨 **Behance 1400px Showcase Board** | Full visual presentation board formatted to Behance dimensions with embedded screenshots and quotes. | [Open Behance Showcase](https://hypertonny.github.io/UI-UX-Best-Practice/behance_showcase.html) |
| 📝 **Behance Markdown Blueprint** | Exhaustive case study narrative formatted for Behance project publication. | [Read Behance Blueprint](BEHANCE_CASE_STUDY.md) |
| 📋 **Behance Metadata & Tags** | Copy-paste project title, summary, creative fields, tags, and publishing steps. | [Read Behance Metadata](BEHANCE_METADATA.txt) |
| 🧪 **Usability Testing Report (25%)** | Think-aloud testing logs across 5 campus stakeholders and 10 Nielsen Heuristics evaluation. | [Read Usability Report](USABILITY_TESTING.md) |
| 👥 **Peer Benchmarking Report (25%)** | Comparative analysis against 3 classmates (Kunal/Ganesh, Prasad, Neermay). | [Read Peer Benchmarking](PEER_BENCHMARKING.md) |
| 📑 **Mid-Term Research Case Study** | Original academic paper covering Personas, Empathy Map, Card Sort, and IA Trees V1/V2. | [Read Research Paper](https://hypertonny.github.io/UI-UX-Best-Practice/research.html) |
| 📐 **Figma Design Source** | Original UI wireframes and interactive flows. | [View Figma File](https://www.figma.com/design/ec61TJtdtqDHxSKYTMLajN/Untitled?node-id=4-465&t=4wfa10UJkH6ZvGFQ-1) |

---

## 📌 Project Overview & The Core Problem

Students, faculty, and essential campus staff at Vijaybhoomi University face severe transportation anxiety. The campus is located in Jambrung, **24.2 km away from Karjat Railway Station** along an isolated mountain ghat highway with frequent cellular dead zones.

Commuters depend on state-run ST buses and contracted campus shuttles that **completely lack real-time GPS tracking**. As a result, students endure an unpredictable **45 to 90-minute "information vacuum"** at rural bus stops, without knowing if a shuttle has broken down, is stuck in mountain traffic, or has already departed.

### The Solution: DailyToGo
**DailyToGo** is a lightweight, zero-dependency, mobile web application that brings arrival certainty in **1 click**:
* **Live Clock-Synced Countdown**: Down-to-the-second countdown (`14m 22s` / `BOARDING NOW`) calculating target departure against device clock.
* **1-Tap Direction Inverter**: Sticky toggle button swaps direction (`Solanpada ⇄ Karjat`) and instantly recalculates the next upcoming bus.
* **1-Tap Pass Display**: Elevates the student ID pass directly to the main screen thumb zone for rapid campus gate checks.
* **7 Key Corridor Halts**: Clear progression through major stops with live relative ETAs (+12m, +45m, +65m, +78m, arrival time).
* **Multilingual Localization**: 1-tap live switcher for **English, Hindi (`हिंदी`), and Marathi (`मराठी`)** for campus operational staff.
* **Muted Video Telemetry**: Live looping transit camera feeds demonstrating corridor status without battery drain.

---

## 🗺️ 7 Key Corridor Halts & 1h 30m Transit Schedule

The transit corridor spans 24.2 km with a realistic travel time of **1 hour 30 minutes**:

```
[1] Karjat S.T. Depot (Train Interchange)
       ↕ (+12m)
[2] Char Rasta (Char Phata)
       ↕ (+13m)
[3] D-Mart / Wanjale Phata
       ↕ (+23m)
[4] Bhivpuri Road Station Phata (Suburban Train Feeder)
       ↕ (+17m)
[5] Kashele Village / Market Phata (Mid-Route Student Junction)
       ↕ (+15m)
[6] Jambrung Village Stop (Ghat Base Halt)
       ↕ (+10m)
[7] Solanpada ST Bus Stop (VBU Main Campus Gate)
```

### Daily Timetable (Synchronized in App Logic)

#### Karjat S.T. Depot ➔ Solanpada (VBU Campus)
1. **08:30 AM ➔ 10:00 AM** — Morning Rail Feeder (Depot Bay 4 • Arr 10:00 AM)
2. **11:30 AM ➔ 01:00 PM** — Midday Campus Connector (Depot Bay 2 • Arr 1:00 PM)
3. **01:00 PM ➔ 02:30 PM** — Post-Lunch Station Return (Depot Bay 3 • Arr 2:30 PM)
4. **04:15 PM ➔ 05:45 PM** — Evening Campus Return (Sync with Mumbai Local • Arr 5:45 PM)
5. **07:30 PM ➔ 09:00 PM** — Night Campus Shuttle (Last Scheduled Return • Arr 9:00 PM)

#### Solanpada (VBU Campus) ➔ Karjat S.T. Depot
1. **06:00 AM ➔ 07:30 AM** — Early Morning Express (VBU Porch Bay 1 • Arr 7:30 AM)
2. **09:45 AM ➔ 11:15 AM** — Morning Academic Shuttle (VBU Porch Bay 2 • Arr 11:15 AM)
3. **12:45 PM ➔ 02:15 PM** — Mid-Day Town Express (VBU Porch Bay 1 • Arr 2:15 PM)
4. **02:15 PM ➔ 03:45 PM** — Afternoon Campus Exit (VBU Porch Bay 1 • Arr 3:45 PM)
5. **05:30 PM ➔ 07:00 PM** — Evening Peak Transit (Direct to Karjat Station • Arr 7:00 PM)

---

## 🧪 Usability Testing & Real Stakeholder Feedback

Tested with real campus stakeholders on mobile viewports during the university exhibition:

1. **Rajdeep** (Roommate & Classmate · Daily Commuter):
   > *"I checked the next departure to Karjat in under 20 seconds. The 1-click glance gives immediate confidence."*
2. **Mayuresh** (Roommate & Classmate · Tech Student):
   > Verified live telemetry refresh and confirmed that the static fallback prevents UI crashes in cellular dead zones.
3. **Prasad** (Roommate & Classmate · Hostel Resident):
   > *"Having the pass right on the main screen saves me from fumbling with college portals while security guards are rushing the line at the gate."*
4. **Omkar Dada** (Manager, Campus Night Canteen · Operational Stakeholder):
   > *"The timetable numbers are very clear. If you add Hindi, all our night canteen workers and drivers can use it directly without asking students."*
   > **Implemented:** Instant `[EN | हिं | म]` multilingual engine in the header.
5. **1st-Year Student** (Freshman Newcomer):
   > Relied on the depot bay numbers (`Karjat Depot Bay 4`) to navigate the busy station interchange without boarding the wrong bus.

Detailed findings and 10 Nielsen Heuristics breakdown: **[USABILITY_TESTING.md](USABILITY_TESTING.md)**.

---

## 👥 Peer Benchmarking Summary

Evaluated against three classmate projects in human computer interaction:

| Dimension | DailyToGo (Our Project) | Kunal & Ganesh (Ride Pool) | Prasad (Lost & Found) | Neermay (Hostel Alert) |
| :--- | :--- | :--- | :--- | :--- |
| **Domain** | Campus Bus Transit | Cab/Auto Fare Splitting | Campus Admin Directory | Hostel Security Broadcast |
| **Interaction Cost** | **Ultra-Low (1 Click)** | High (Chat, matching, fares) | Moderate-High (4-5 clicks to post) | **Ultra-Low (1 Tap broadcast)** |
| **Visual Ergonomics** | High-Contrast Dark + Volt | Standard Light SaaS Theme | Clean Card Layout | Binary Red/White High-Alarm |
| **Key Takeaway** | Zero-friction glance wins | Added "Night Exam Direct" backup | Elevated pass to 1-tap thumb zone | Reserved red/coral strictly for error alerts |

Complete comparative analysis and IA tree contrast: **[PEER_BENCHMARKING.md](PEER_BENCHMARKING.md)**.

---

## 🎨 Visual Identity: "Kinetic Campus Transit"

* **Strict Directive**: **ABSOLUTELY ZERO GRADIENTS**, zero 3D renders, zero shadows, zero emojis.
* **Palette**:
  * Canvas Dark: `#090C10`
  * Surface Navy: `#121722`
  * Electric Cobalt: `#2563EB`
  * High-Vis Safety Volt: `#CCFF00` (Peak sunlight readability)
  * Functional Semantics: Coral (`#EF4444` Error), Amber (`#F59E0B` Scheduled), Emerald (`#10B981` On-Time).
* **Typography**: Space Grotesk (display), Inter (UI body), JetBrains Mono (fixed tabular numbers preventing layout jitter).

---

## 📦 How to Upload the Case Study to Behance (Step-by-Step)

Follow these steps to publish on **Behance** (`behance.net`):

### Step 1: Export Visual Showcase Images
1. Open the live showcase canvas:  
   [https://hypertonny.github.io/UI-UX-Best-Practice/behance_showcase.html](https://hypertonny.github.io/UI-UX-Best-Practice/behance_showcase.html)
2. Press `Ctrl + Shift + I` (Open DevTools) ➔ Press `Ctrl + Shift + P` ➔ Type **"Capture full size screenshot"** and press Enter.
3. This downloads a high-resolution, 1400px wide master PNG with all your wireframe comparisons, screenshots, and quotes.

### Step 2: Create Project on Behance
1. Go to [https://www.behance.net](https://www.behance.net) and log into your account.
2. Click the blue **"Share Your Work"** button (top right) ➔ Select **"Project"**.
3. Click **"Image"** and upload:
   * The master full-size screenshot from Step 1 (or upload the individual screenshots from the `images/` directory).
4. Click **"Text"** and copy-paste the problem and solution narrative from **[BEHANCE_CASE_STUDY.md](BEHANCE_CASE_STUDY.md)**.

### Step 3: Project Settings & Metadata
1. Click the **"Settings"** tab (top right of the editor):
   * **Project Title**: `DailyToGo — Next-Gen Student Transit & Campus Travel App`
   * **Project Tags**: Paste from **[BEHANCE_METADATA.txt](BEHANCE_METADATA.txt)**:  
     `DailyToGo, Vijaybhoomi University, Campus Transit, Bus Tracking, UX Case Study, UIUX, Public Transit, Nielsen Heuristics, Information Architecture, Heuristic Evaluation, Rural Transit, India Transit`
   * **Creative Fields**: Select `Interaction Design`, `UI/UX`, and `Product Design`.
   * **Tools Used**: `Figma`, `HTML5`, `CSS3`, `JavaScript`, `Excalidraw`.
2. Upload a cover thumbnail (use `images/screen1_quick_live.png` or the hero banner).
3. Click **"Publish"**!
4. Copy your live Behance URL for your professor's submission checklist.

---

## 🌿 Repository Branch Architecture

* **`main`**: The clean production deployment served live via GitHub Pages. Contains the web app, videos, presentation deck, Behance showcase board, and screenshots.
* **`uiux`**: Complete academic archive containing raw research drafts, Question Paper PDF (`STET301_ET_QP-1.pdf`), and the standalone `UIUX/` development directory.

---

*Submitted for STET301 Human Computer Interaction End-Term Examination · September 2026 · Rahul Purohit*
