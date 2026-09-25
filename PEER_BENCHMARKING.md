# STET301 — Human Computer Interaction: Peer Benchmarking & Discussion Report

**Project**: DailyToGo (VBU ⇄ Karjat Student Shuttle Transit App)  
**Author**: Rahul Purohit · Roll No: `2024sepvugp0079` · School of Science & Technology, Vijaybhoomi University  
**Date**: September 2026  
**Course Rubric Alignment**: Peer Benchmarking & Discussion (25% Weightage)  

---

## 1. Overview & Objective

In accordance with the STET301 End-Term examination requirements, this benchmarking study evaluates **DailyToGo** against three classmate projects developed across similar campus logistics and student life domains:

1. **Kunal & Ganesh**: Campus Ride-Sharing & Cab Pooling App *(Direct Transit Domain)*
2. **Prasad**: Campus Lost & Found Web Application *(Campus Administration Domain)*
3. **Neermay**: Hostel Checking & Emergency Alert Notification System *(Hostel & Security Domain)*

This report analyzes differences in **Information Architecture (IA)**, **Interaction Cost**, and **Visual Ergonomics**, documenting architectural trade-offs and reciprocal design learnings.

---

## 2. Peer 1: Kunal & Ganesh — Campus Ride Pooling & Cab Sharing

### A. Domain & Core Premise
* **Domain**: Campus Mobility & Commuter Travel *(Direct Competitor / Parallel Domain)*.
* **Their Problem Statement**: Auto-rickshaws and private cabs from Karjat Railway Station to Vijaybhoomi University cost ₹350–₹500 per ride. Individual students bear heavy financial burdens.
* **Their Solution**: A peer-to-peer ride-pooling mobile interface that matches students arriving on the same suburban train to split fares.

### B. Information Architecture Comparison

```
Kunal & Ganesh's Ride-Pooling IA:
Home ──┬── Create Ride Post (Origin, Dest, Train Arrival, Seats)
       ├── Browse Active Rides ── Filter by Train ── Request Seat ── Chat
       ├── Fare Calculator (Distance × Fare Split ÷ Passenger Count)
       └── User Profile & Contact Info

DailyToGo's Point-to-Point Shuttle IA:
Home ──┬── Screen 1 (Quick): Live Countdown + Next Bus (0-click retrieval)
       ├── Screen 2 (Live): Corridor Radar + 21-Stop Rural Index
       ├── Screen 3 (Timings): Complete Official Timetable + Reminder Alarms
       └── Screen 4 (Account): Student Bus Pass + 5MB Profile Verification
```

### C. Architectural Differences & Trade-Offs
* **Interaction Cost & Cognitive Load**:
  * *Kunal & Ganesh*: High cognitive load. Requires active negotiation, in-app messaging, waiting for confirmations, and variable coordination overhead before travel.
  * *DailyToGo*: Zero cognitive load. Designed for immediate retrieval. The student glances at the app while walking out of the lecture hall and gets an authoritative departure time in < 1 second.
* **Predictability vs. Flexibility**:
  * *Kunal & Ganesh*: Solves late-night and ad-hoc travel when government buses do not run. Highly flexible, but unpredictable (depends on other students being available).
  * *DailyToGo*: Anchored to the university's official, fixed 2-stop point-to-point shuttle schedule. Highly predictable, zero social coordination required.

### D. What Was Learned & Incorporated
* **Key Takeaway**: When the last scheduled ST shuttle leaves at 7:30 PM, students need an emergency alternative.
* **DailyToGo Iteration**: Added the **"Night Exam Direct"** quick-route chip and emergency alert card in Screen 5 (`notifications`), linking late-night library commuters to coordinated campus travel.

---

## 3. Peer 2: Prasad — Campus Lost & Found Web Application

### A. Domain & Core Premise
* **Domain**: Campus Administration & Student Support.
* **Their Problem Statement**: Items misplaced in classrooms, hostels, or campus shuttles (laptops, IDs, chargers) are lost due to scattered WhatsApp messages.
* **Their Solution**: A centralized web database where students post found items or search for lost property.

### B. Information Architecture & UX Audit
* **Interface Strengths**: Clean aesthetic cards, legible typography, clear categories (Electronics, Documents, Personal Accessories).
* **Critical Friction Point Observed**:
  * To report a lost item, a user had to click through **4 to 5 sequential buttons/pages**:
    `Home` ➔ `Services` ➔ `Campus Support` ➔ `Lost & Found Directory` ➔ `Category Selection` ➔ `Post Form`.
  * **Heuristic Violation**: **Nielsen Heuristic #7 (Flexibility and Efficiency of Use)** and **Hick's Law**. The deep task depth creates unnecessary friction for an anxious student who just lost an expensive laptop or ID card.

### C. Contrast with DailyToGo's UI Logic
* In DailyToGo, the primary student intent (showing a bus pass or checking the next bus) is **elevated to the zero-state hero screen**:
  * **"Show Pass"**: Available at thumb-reach without opening menus.
  * **Direction Swap (`Solanpada ⇄ Karjat`)**: 1-tap sticky toggle with instant reactive timetable inversion.
  * **Task Depth**: Max 1 tap for 95% of daily use cases.

### D. What Was Learned & Incorporated
* **Design Confirmation**: Validated DailyToGo's decision to avoid nested sub-menus. Critical operational tools (e.g., student bus pass, next countdown, live radar) must remain flat and accessible directly from the bottom tab bar.

---

## 4. Peer 3: Neermay — Hostel Checking & Emergency Alert System

### A. Domain & Core Premise
* **Domain**: Hostel Administration & Student Security.
* **Their Problem Statement**: Students lack immediate broadcast notifications during hostel room inspections or campus emergencies.
* **Their Solution**: A campus safety portal featuring a prominent, single-touch emergency alert broadcast button.

### B. Information Architecture & UX Audit
* **Interface Strengths**:
  * Exceptional task efficiency: The 1-click broadcast button triggers alerts instantly without confirmation friction.
  * Strong alignment with **Nielsen Heuristic #1 (Visibility of System Status)**.
* **Critical Friction Point Observed**:
  * **Visual Design & Ergonomics**: The entire UI was rendered in an uncalibrated, binary **White and Red palette** (`#FFFFFF` background, solid `#FF0000` buttons and text borders).
  * **Heuristic Violation**: **Nielsen Heuristic #8 (Aesthetic and Minimalist Design)**. The lack of visual hierarchy, card surface elevation, or intermediate tone created severe visual fatigue and made non-urgent information look like a catastrophic alarm.

### C. Contrast with DailyToGo's Visual Design System
* **Kinetic Campus Transit Theme**:
  * Uses a calibrated solid dark surface architecture (`#090C10` canvas, `#121722` card surface, `#1A2232` elevated surface).
  * High-visibility **Safety Volt (`#CCFF00`)** directs eye attention to the primary countdown without causing harsh glare.
  * Semantic colors are reserved for functional states only:
    * **Emerald (`#10B981`)**: On-time transit.
    * **Amber (`#F59E0B`)**: Scheduled departure.
    * **Coral (`#EF4444`)**: Real emergencies and network error retry states.
  * **Zero Gradients & Zero Emojis**: Enforces a raw, authentic, high-legibility transport HUD.

### D. What Was Learned & Incorporated
* **Design Confirmation**: Color intensity must match information priority. DailyToGo reserves red/coral strictly for error alerts (such as the GPS Location Disabled overlay and monsoon landslide advisories), keeping daily transit viewing calm and functional.

---

## 5. Comprehensive Peer Benchmarking Matrix

| Evaluation Dimension | DailyToGo (Our Project) | Kunal & Ganesh (Ride Pool) | Prasad (Lost & Found) | Neermay (Hostel Alert) |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Domain** | Campus Bus Transit | Shared Cab/Auto Pooling | Campus Admin Services | Hostel Security & Alerts |
| **Primary User Goal** | Check bus ETA & board | Split travel costs with peers | Recover misplaced belongings | Broadcast/receive safety alerts |
| **Information Architecture** | Flat 4-Tab Mobile Layout | Complex P2P Ride Matching | Deep 4-5 Tier Web Hierarchy | Single-Screen Focused Modal |
| **Interaction Cost** | **Ultra-Low (0 to 1 Tap)** | High (Posting, chatting, booking) | Moderate-High (4+ clicks to post) | **Ultra-Low (1 Tap broadcast)** |
| **Visual Design Philosophy** | Solid Dark + Volt Contrast (Flat 2D) | Standard Light SaaS Theme | Clean Card Layout (Neutral) | Binary White/Red High-Alarm |
| **Friction / Failure Point** | Users questioned hardware GPS source | Social coordination drop-off | Deep navigation fatigue | Visual fatigue & flat hierarchy |
| **Key Heuristic Championed** | **#1 Visibility of Status** & **#7 Efficiency** | **#3 User Freedom** | **#2 Match Real World** | **#1 Visibility of Status** |

---

## 6. Synthesis & Final Takeaways for Defense

1. **Simplicity Beats Feature Bloat**:
   * While Kunal & Ganesh created an ambitious ride-matching engine, student commuter retention relies on speed. DailyToGo’s refusal to add social feeds or chatting keeps the app lightning fast.
2. **Thumb Zone Ergonomics**:
   * Prasad’s 5-click flow reinforced that mobile campus tools must put primary calls-to-action within the natural thumb arc.
3. **Calibrated Color Semantics**:
   * Neermay’s high-contrast red UI demonstrated that alert states must be used sparingly. High-Vis Volt with calibrated semantic pills creates urgency without panic.
