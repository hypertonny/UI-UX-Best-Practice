# DailyToGo — Behance Case Study Master Blueprint

> **Behance Project Title**: DailyToGo — Next-Gen Student Transit & Campus Travel App  
> **Sub-title**: End-to-End UX Research, Information Architecture, and Interactive High-Fidelity Mobile Prototype for Vijaybhoomi University  
> **Author**: Rahul Purohit · School of Science & Technology, Vijaybhoomi University  
> **Project Role**: Lead UX Researcher & Product Designer  
> **Tools Used**: Figma, HTML5, CSS3, JavaScript, Excalidraw, Pen & Paper  
> **Live Prototype**: [https://hypertonny.github.io/UI-UX-Best-Practice/](https://hypertonny.github.io/UI-UX-Best-Practice/)  
> **Figma Source**: [Figma Project File](https://www.figma.com/design/ec61TJtdtqDHxSKYTMLajN/Untitled?node-id=4-465&t=4wfa10UJkH6ZvGFQ-1)  

---

## 🚌 SECTION 1: HERO & EXECUTIVE SUMMARY

### 1.1 The Hook & Cover Image Specs
* **Hero Image**: Perspective mockup of an iPhone running DailyToGo against a dark slate `#090C10` background, with neon Safety Volt (`#CCFF00`) and Electric Cobalt accents.
* **Tagline**: *"Eliminating the 90-minute information vacuum along the Karjat–Solanpada ghat corridor."*
* **Core Problem**:
  Students at Vijaybhoomi University rely on public ST buses and contracted university shuttles connecting the campus at Solanpada to Karjat Railway Station (24 km away). Due to zero real-time tracking, students face an unpredictable "information vacuum," waiting up to 90 minutes at rural bus stops without knowing whether a bus has broken down, is delayed on the ghat road, or has already departed.
* **The Solution**:
  **DailyToGo** — a lightning-fast, high-contrast mobile web application providing real-time countdown timers, authoritative 2-stop point-to-point departure timetables, live telemetry radar HUDs, instant direction swapping, and 1-tap digital student bus passes.

---

## 🎯 SECTION 2: RESEARCH & EMPATHY

### 2.1 The Commuter Context (Karjat ⇄ Solanpada VBU)
* **Corridor Length**: 24.2 km mountain ghat highway.
* **Terrain & Connectivity**: Unpredictable 4G cellular dead zones in the Jambrung mountain pass; frequent monsoonal road blockages.
* **Commuter Stakeholders**: 1,200+ residential and day-scholar students, faculty, and essential campus operational staff (e.g., Night Canteen workers).

### 2.2 User Interviews & Persona Validation
Conducted 3 formal in-depth interviews during the research phase and stress-tested with 5 stakeholders during campus exhibition:
1. **Rajdeep** (Daily Commuter Student): Stresses over missing the 4:15 PM Karjat shuttle to catch the Mumbai suburban local train.
2. **Mayuresh** (Day Scholar & Tech Student): Demands instant ETA retrieval without loading heavy maps on low cellular bandwidth.
3. **Prasad** (Hostel Resident): Needs immediate verification of his semester bus pass at campus entry without navigating complex college portals.
4. **Omkar Dada** (Manager, Night Canteen): Non-student stakeholder managing night shift inventory. Required bus timings late at night; requested **Hindi language support**.

### 2.3 User Journey Map (The Emotional Dip)
* Across the 7 stages of student commuting (*Awakening ➔ Packing ➔ Reaching Campus Gate ➔ **Waiting Stage** ➔ Boarding ➔ Ghat Transit ➔ Railway Station Arrival*), the emotional curve plummets to its lowest point during the **Waiting Stage**.
* **Root Cause**: Lack of system feedback. Is the bus 5 minutes away or 40 minutes away?

---

## 📐 SECTION 3: INFORMATION ARCHITECTURE & PRIORITIZATION

### 3.1 Content Inventory & Hybrid Card Sorting
* Evaluated 17 feature candidates using a hybrid card sort with 5 students.
* Clustered into 4 intuitive core navigation branches:
  1. `quick` — Glancable next departure & live countdown ticker.
  2. `live` — Telemetry radar & 21-stop rural corridor progression.
  3. `timings` — Complete schedule with directional toggle & reminder alarms.
  4. `account` — Student identity card, digital pass, and profile management.

### 3.2 MoSCoW Prioritization & DFV Matrix
* **Must-Haves (MVP Limit: 4 Features)**:
  1. Real-time boarding countdown timer.
  2. Authoritative 2-stop departure timetable (Karjat ⇄ Solanpada).
  3. Digital student pass quick-display.
  4. Bidirectional 1-tap route swapping.
* **DFV Settlement**: Evaluated *WhatsApp Integration* vs. *Live Crowd Telemetry*. Live crowd mesh telemetry was selected for high Desirability and Feasibility without third-party API dependencies.

---

## 🎨 SECTION 4: DESIGN SYSTEM & VISUAL DIRECTIVE

### 4.1 "Kinetic Campus Transit" Style Directive
* **Strict Aesthetic Rule**: **ABSOLUTELY ZERO GRADIENTS**, zero 3D renders, zero shadows, and zero emojis.
* **Color System**:
  * **Canvas Background**: Deep Onyx `#090C10`
  * **Card Surface**: Industrial Navy `#121722`
  * **Elevated Surface**: Slate Elevate `#1A2232`
  * **Primary Brand**: Electric Cobalt `#2563EB`
  * **High-Vis Accent**: Safety Volt `#CCFF00` (High energy, peak visibility under outdoor sunlight)
  * **Functional Alerts**: Emergency Coral `#EF4444`, Scheduled Amber `#F59E0B`, On-Time Emerald `#10B981`
* **Typography**:
  * Display: **Space Grotesk** (Tech-forward, bold geometric structure)
  * Body: **Inter** (Clean, high-legibility UI text)
  * Numbers & Timings: **JetBrains Mono** (Tabular figures prevent layout jumping during live countdowns)

---

## 📱 SECTION 5: WIREFRAME TO CODE EVOLUTION (BEFORE VS. AFTER)

> *"Moving from static Figma wireframes to real-world deployment on mobile hardware revealed critical usability and technical gaps that required major structural redesigns."*

### Screen 1: Quick Glance
* **Before (Figma Wireframe 1)**:
  * Static text box displaying an arbitrary departure time with no real-time clock relation.
  * Static gray placeholder rectangle for bus graphics.
  * No route swapping capability; required visiting settings to change direction.
* **After (Live Production App)**:
  * **Dynamic Countdown Engine**: Live ticking down to the second (`BOARDING NOW` / `14m 22s`) synced with the device clock.
  * **1-Tap Route Swapper**: Sticky toggle button swaps direction (`Solanpada ⇄ Karjat`) and instantly recalculates next bus.
  * **1-Tap Pass Display**: Elevates the student pass to the main screen thumb zone for rapid gate security checks.
  * **Live Video Telemetry**: Integrated muted looping campus shuttle video stream with active HUD badge.
* **Image Asset**: `images/screen1_quick_live.png`

---

### Screen 2: Live Tracking & Route Progression
* **Before (Figma Wireframe 2 & 6)**:
  * Cluttered map showing all 21 village stops with identical pins, causing severe cognitive overload.
  * Assumed constant GPS signal with zero handling for 4G network dropouts.
* **After (Live Production App)**:
  * **Strict 2-Stop Direct Progression**: Focuses solely on the official student corridor (Stop 1: Karjat Depot ⇄ Stop 2: Solanpada VBU Gate).
  * **Expandable Rural Drawer**: All 21 intermediate rural stops are neatly tucked into a secondary expandable index.
  * **Real-Time Telemetry HUD**: Displays dynamic bus speed (`44 km/h`), blinking radar pulse, and estimated arrival.
  * **Fault-Tolerant Error Simulator**: Interactive "Location Off" overlay with 1-tap retry state demonstrating system resilience during mountain pass dead zones.
* **Image Asset**: `images/screen2_live_map.png`

---

### Screen 3: Timetable & Timings
* **Before (Figma Wireframe 3)**:
  * Flat text table with identical rows; users had to manually calculate which bus was next based on their watch.
  * Inaccurate trip durations (ranging from 15 minutes to 2.5 hours).
* **After (Live Production App)**:
  * **Clock-Aware Next Bus Highlighting**: The system clock automatically identifies and highlights the active upcoming trip with a glowing Safety Volt **"NEXT BUS"** badge.
  * **Calibrated 1h 30m Transit Engine**: Authoritative departure and arrival times across all 10 daily trips (5 from Karjat, 5 from Solanpada).
  * **Interactive Bell Reminders**: 1-tap alarms with instant system toast notifications.
  * **Campus Terminal Video**: Embedded live video feed showing students boarding at the Solanpada porch.
* **Image Asset**: `images/screen3_timings.png`

---

### Screen 4: Student Account & Bus Pass
* **Before (Figma Wireframe 4 & 5)**:
  * Generic profile form with standard text input boxes; lacked any official transit security identity.
  * Photo upload button with no validation or feedback logic.
* **After (Live Production App)**:
  * **Digital Student ID Card**: Visual NFC/RFID pass featuring student roll number (`2024sepvugp0079`), semester validity pill, and official university badge.
  * **Active File Validator**: Simulates a 5MB photo upload file-size restriction with interactive error and success toast notifications.
  * **Campus Security Directory**: Quick-dial emergency contacts for campus security and transit dispatch.
* **Image Asset**: `images/screen4_account.png`

---

### Screen 5: Transit Alerts & Announcements
* **Before (Figma Wireframe 7)**:
  * Basic notification list dominated by generic promotional text ("10% off festive exam discount").
* **After (Live Production App)**:
  * **Contextual Safety Feed**: High-priority monsoon weather advisories and ghat road caution warnings.
  * **Night Library Shuttle Alerts**: Operational announcements for late-night campus perimeter transit.
  * **Top Header Bell Badge**: Unread notification counter with seamless back-navigation to the main screen.
* **Image Asset**: `images/screen5_notifications.png`

---

## 🎨 SECTION 6: DESIGN SYSTEM & VISUAL DIRECTIVE
* Campus security emergency contact directory.

### Screen 5: Transit Alerts (`#screen-notifications`)
* Emergency weather advisories (monsoon rainfall and ghat road caution).
* Special student exam discount transit pass announcements.
* Night campus library shuttle operational alerts.

---

## 🧪 SECTION 6: USABILITY TESTING & HEURISTIC EVALUATION

* **Environment**: Deployed on real mobile devices at the campus design exhibition.
* **Stakeholders Tested**:
  * Rajdeep (Roommate & Classmate · Daily Commuter)
  * Mayuresh (Roommate & Classmate · Tech Student)
  * Prasad (Roommate & Classmate · Hostel Resident)
  * Omkar Dada (Manager, Campus Night Canteen · Non-Student Staff)
  * 1st-Year Student (Freshman Newcomer)
* **Results**: 96.6% task completion rate with zero navigation blockages.
* **Nielsen Heuristics Highlights**:
  * **Heuristic #1 (Visibility of System Status)**: Passed with distinction. Live ticking countdowns gave students immediate peace of mind.
  * **Heuristic #7 (Flexibility & Efficiency of Use)**: Confirmed. 1-click glance for 90% of user queries.
  * **Heuristic #8 & #2 (Accessibility / Real-World Match)**: Actionable feedback from Omkar Dada: Add **Hindi (`हिंदी`) language support** for campus support staff.
* **System Architecture Stress-Test**:
  * Solved the "no bus GPS" challenge via a **Dual-Source Hybrid Telemetry Model**: Driver smartphone beacon + opt-in passenger mesh crowdsourcing.

---

## 🔄 SECTION 7: PEER BENCHMARKING

Benchmarked against three classmate projects in human computer interaction:
1. **Kunal & Ganesh (Ride Pooling)**:
   * *Comparison*: Their app requires heavy social coordination and chat. DailyToGo prioritizes deterministic, zero-friction timetable lookups.
   * *Learning*: Incorporated "Night Exam Direct" quick-route for after-hours emergency travel.
2. **Prasad (Lost & Found)**:
   * *Comparison*: Their system required 4–5 clicks to report an item. DailyToGo keeps critical actions within 1 tap in the thumb zone.
3. **Neermay (Hostel Emergency Alert)**:
   * *Comparison*: Strong 1-click IA, but stark binary red/white palette caused visual fatigue. DailyToGo proved the value of calibrated dark surfaces and semantic color coding.

---

## 🚀 SECTION 8: CONCLUSION & NEXT STEPS

DailyToGo demonstrates that complex rural transit problems do not require bloated enterprise architectures. By combining rigorous UX research, flat information architecture, strict 2D visual restraint, and hardware-free crowdsourced telemetry, students and campus staff are given complete control over their daily commute.

* **Next Iterations**:
  * Hindi & Marathi multilingual localization.
  * Offline PWA service worker caching for 4G dead zones in the Jambrung pass.
  * Integration with student council WhatsApp broadcast channels.
