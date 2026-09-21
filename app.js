/**
 * DAILYTOGO — NEXT-GEN STUDENT TRANSIT APP LOGIC
 * High-performance, zero dependencies, interactive prototype engine
 * Features:
 * - Dynamic 2-stop point-to-point transit timing engine (Karjat ⇄ Solanpada VBU)
 * - Reactive direction swapping and real-time schedule synchronization
 * - 4 Muted looping campus motion video streams
 */

document.addEventListener('DOMContentLoaded', () => {

  // =========================================================================
  // 1. DATA STORE: AUTHORITATIVE TIMETABLE & STOPS
  // Strictly Point-to-Point direct 2-stop shuttle:
  // Karjat S.T. Stand (Depot) ⇄ Solanpada ST Bus Stop (VBU Campus Gate)
  // =========================================================================
  const SCHEDULE_DATA = {
    'karjat-solanpada': {
      id: 'karjat-solanpada',
      directionLabel: 'Karjat ➔ Solanpada',
      title: 'Karjat Station ➔ Solanpada Direct',
      sub: 'POINT-TO-POINT CAMPUS SHUTTLE • 2 STOPS DIRECT',
      origin: 'Karjat S.T. Stand (Depot)',
      dest: 'Solanpada (VBU Campus)',
      originBay: 'Karjat S.T. Depot Bay 4 • Railway Interchange',
      destBay: 'Solanpada VBU Main Porch Bay 1',
      video: 'bus_to_solanpada.mp4',
      videoBadge: 'FEED 2: SHUTTLE TO SOLANPADA (VBU)',
      videoCaption: 'VBU Shuttle Heading to Solanpada Campus (Direct 2-Stop)',
      trips: [
        { dep: '8:30 AM',  h: 8,  m: 30, arr: '9:45 AM',  name: '8:30 AM ➔ 9:45 AM',  sub: 'Karjat Depot Bay 4 • Arr 9:45 AM at Solanpada (VBU)' },
        { dep: '11:30 AM', h: 11, m: 30, arr: '12:45 PM', name: '11:30 AM ➔ 12:45 PM', sub: 'Midday Campus Connector • Direct to VBU Gate • Arr 12:45 PM' },
        { dep: '1:00 PM',  h: 13, m: 0,  arr: '2:15 PM',  name: '1:00 PM ➔ 2:15 PM',   sub: 'Post-Lunch Shuttle • Depot Bay 3 • Arr 2:15 PM' },
        { dep: '4:15 PM',  h: 16, m: 15, arr: '5:30 PM',  name: '4:15 PM ➔ 5:30 PM',   sub: 'Evening Campus Return • Sync with Mumbai Local • Arr 5:30 PM' },
        { dep: '7:30 PM',  h: 19, m: 30, arr: '9:00 PM',  name: '7:30 PM ➔ 9:00 PM',   sub: 'Night Campus Shuttle • Last Scheduled Return • Arr 9:00 PM' }
      ]
    },
    'solanpada-karjat': {
      id: 'solanpada-karjat',
      directionLabel: 'Solanpada ➔ Karjat',
      title: 'Solanpada (VBU) ➔ Karjat Direct',
      sub: 'POINT-TO-POINT CAMPUS SHUTTLE • 2 STOPS DIRECT',
      origin: 'Solanpada (VBU Campus)',
      dest: 'Karjat S.T. Stand (Depot)',
      originBay: 'VBU Main Porch Bay 1',
      destBay: 'Karjat S.T. Depot Bay 3 • Railway Interchange',
      video: 'bus_to_karjat.mp4',
      videoBadge: 'FEED 1: SHUTTLE TO KARJAT DEPOT',
      videoCaption: 'VBU Shuttle Cruising to Karjat (Direct 2-Stop)',
      trips: [
        { dep: '6:00 AM',  h: 6,  m: 0,  arr: '8:30 AM',  name: '6:00 AM ➔ 8:30 AM',  sub: 'Early Morning Express • Direct to Karjat Station • Arr 8:30 AM' },
        { dep: '9:45 AM',  h: 9,  m: 45, arr: '11:30 AM', name: '9:45 AM ➔ 11:30 AM', sub: 'Morning Academic Shuttle • VBU Main Porch Bay 1 • Arr 11:30 AM' },
        { dep: '12:45 PM', h: 12, m: 45, arr: '1:00 PM',  name: '12:45 PM ➔ 1:00 PM', sub: 'Mid-Day Station Connector • Direct to Karjat Depot • Arr 1:00 PM' },
        { dep: '2:15 PM',  h: 14, m: 15, arr: '4:15 PM',  name: '2:15 PM ➔ 4:15 PM',  sub: 'Afternoon Campus Exit • Solanpada Porch Bay 2 • Arr 4:15 PM' },
        { dep: '5:30 PM',  h: 17, m: 30, arr: '6:30 PM',  name: '5:30 PM ➔ 6:30 PM',  sub: 'Evening Peak Transit • Direct to Karjat Station • Arr 6:30 PM' }
      ]
    }
  };

  // State Management
  let activeDirection = 'solanpada-karjat';
  let activeTripIndex = 3; // Default 2:15 PM
  let countdownInterval = null;

  // =========================================================================
  // 2. VIDEO PLAYBACK ENGINE (SAFE LAZY-PLAY TO PREVENT BROWSER BLOCKING)
  // =========================================================================
  const heroVideo = document.getElementById('heroTransitVideo');
  const highwayVideo = document.getElementById('liveHighwayVideo');
  const boardingVideo = document.getElementById('boardingVideo');

  function safePlay(v) {
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    v.volume = 0;
    try {
      const p = v.play();
      if (p !== undefined) {
        p.catch(() => {});
      }
    } catch (_) {}
  }

  function setupVideos() {
    const allVideos = document.querySelectorAll('video');
    allVideos.forEach(v => {
      v.muted = true;
      v.defaultMuted = true;
      v.volume = 0;
      v.setAttribute('muted', '');
      v.setAttribute('playsinline', '');
      v.setAttribute('webkit-playsinline', '');
    });

    // Auto-retry when first frame is ready
    if (heroVideo) {
      heroVideo.addEventListener('canplay', () => safePlay(heroVideo), { once: true });
      heroVideo.addEventListener('loadeddata', () => safePlay(heroVideo), { once: true });
      safePlay(heroVideo);
    }
  }
  setupVideos();

  // Global user interaction unlock for strict autoplay policies
  const unlockAutoplay = () => {
    const activeScreen = document.querySelector('.app-screen.active');
    if (activeScreen && activeScreen.id === 'screen-quick' && heroVideo && heroVideo.paused) {
      safePlay(heroVideo);
    }
  };
  ['click', 'touchstart', 'pointerdown', 'keydown'].forEach(evt => {
    window.addEventListener(evt, unlockAutoplay, { once: true, passive: true });
  });

  // =========================================================================
  // 3. NAVIGATION & SCREEN SWITCHER
  // =========================================================================
  const navTabs = document.querySelectorAll('.nav-tab-item');
  const switcherBtns = document.querySelectorAll('.switcher-btn');
  const screens = document.querySelectorAll('.app-screen');
  const bellHeaderBtn = document.getElementById('headerBellBtn');
  const notifBadge = document.getElementById('notifBadge');

  function switchScreen(screenId) {
    screens.forEach(screen => {
      screen.classList.toggle('active', screen.id === `screen-${screenId}`);
    });

    navTabs.forEach(tab => {
      tab.classList.toggle('active', tab.dataset.target === screenId);
    });

    switcherBtns.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.target === screenId);
    });

    if (screenId === 'notifications' && notifBadge) {
      notifBadge.textContent = '3';
    }

    // Play ONLY the active screen's video, pause hidden ones to conserve decoder
    if (screenId === 'quick') {
      safePlay(heroVideo);
      if (highwayVideo) highwayVideo.pause();
      if (boardingVideo) boardingVideo.pause();
    } else if (screenId === 'live') {
      safePlay(highwayVideo);
      if (heroVideo) heroVideo.pause();
      if (boardingVideo) boardingVideo.pause();
    } else if (screenId === 'timings') {
      safePlay(boardingVideo);
      if (heroVideo) heroVideo.pause();
      if (highwayVideo) highwayVideo.pause();
    } else {
      if (heroVideo) heroVideo.pause();
      if (highwayVideo) highwayVideo.pause();
      if (boardingVideo) boardingVideo.pause();
    }
  }

  navTabs.forEach(tab => {
    tab.addEventListener('click', () => switchScreen(tab.dataset.target));
  });

  switcherBtns.forEach(btn => {
    btn.addEventListener('click', () => switchScreen(btn.dataset.target));
  });

  if (bellHeaderBtn) {
    bellHeaderBtn.addEventListener('click', () => switchScreen('notifications'));
  }

  const notifBackBtn = document.getElementById('notifBackBtn');
  if (notifBackBtn) {
    notifBackBtn.addEventListener('click', () => switchScreen('quick'));
  }

  // =========================================================================
  // 4. TIMING CALCULATION & SYNC ENGINE
  // =========================================================================

  // Find next upcoming trip index based on clock
  function findNextTripIndex(dirKey) {
    const dir = SCHEDULE_DATA[dirKey];
    const now = new Date();
    const currentH = now.getHours();
    const currentM = now.getMinutes();
    const currentMinutesOfDay = currentH * 60 + currentM;

    for (let i = 0; i < dir.trips.length; i++) {
      const tripMinutes = dir.trips[i].h * 60 + dir.trips[i].m;
      if (tripMinutes >= currentMinutesOfDay) {
        return i;
      }
    }
    // If all trips passed today, return first trip tomorrow morning
    return 0;
  }

  // Live Countdown ticker for active trip
  function startLiveCountdown(targetH, targetM) {
    if (countdownInterval) clearInterval(countdownInterval);

    const countdownEl = document.getElementById('liveCountdownTimer');
    if (!countdownEl) return;

    function tick() {
      const now = new Date();
      let target = new Date();
      target.setHours(targetH, targetM, 0, 0);

      // If target is in the past for today
      let diffMs = target.getTime() - now.getTime();
      if (diffMs < -10 * 60 * 1000) {
        // Departed more than 10 mins ago -> next departure tomorrow
        target.setDate(target.getDate() + 1);
        diffMs = target.getTime() - now.getTime();
      }

      if (diffMs <= 0 && diffMs >= -10 * 60 * 1000) {
        countdownEl.textContent = 'BOARDING NOW';
        countdownEl.style.color = 'var(--accent-volt)';
        return;
      }

      const totalSecs = Math.max(0, Math.floor(diffMs / 1000));
      const hours = Math.floor(totalSecs / 3600);
      const mins = Math.floor((totalSecs % 3600) / 60);
      const secs = totalSecs % 60;

      countdownEl.style.color = '';
      if (hours > 0) {
        countdownEl.textContent = `${hours}h ${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
      } else {
        countdownEl.textContent = `${mins}m ${secs < 10 ? '0' : ''}${secs}s`;
      }
    }

    tick();
    countdownInterval = setInterval(tick, 1000);
  }

  // Master function to apply trip and direction state across entire app
  function applyTripState(dirKey, tripIdx, userInitiated = false, customNotice = '') {
    activeDirection = dirKey;
    activeTripIndex = tripIdx;

    const dir = SCHEDULE_DATA[dirKey];
    const trip = dir.trips[tripIdx];

    // --- Screen 1: Quick Hero Card Update ---
    const originStation = document.getElementById('originStation');
    const destStation = document.getElementById('destStation');
    const heroRouteTitle = document.getElementById('heroRouteTitle');
    const heroRouteSub = document.getElementById('heroRouteSub');
    const nextDepVal = document.getElementById('nextDepVal');
    const estArrVal = document.getElementById('estArrVal');
    const originSubVal = document.getElementById('originSubVal');
    const destSubVal = document.getElementById('destSubVal');

    if (originStation) originStation.textContent = dir.origin;
    if (destStation) destStation.textContent = dir.dest;
    if (heroRouteTitle) heroRouteTitle.textContent = dir.title;
    if (heroRouteSub) heroRouteSub.textContent = dir.sub;
    if (nextDepVal) nextDepVal.textContent = trip.dep;
    if (estArrVal) estArrVal.textContent = trip.arr;
    if (originSubVal) originSubVal.textContent = trip.sub || dir.originBay;
    if (destSubVal) destSubVal.textContent = dir.destBay;

    // Start Live Countdown
    startLiveCountdown(trip.h, trip.m);

    // --- Screen 1: Slot 1 Video Sync ---
    const heroVideo = document.getElementById('heroTransitVideo');
    const heroSource = document.getElementById('heroVideoSource');
    const heroBadgeText = document.getElementById('heroVideoBadgeText');
    const slot1Caption = document.getElementById('slot1Caption');
    const slot1TagText = document.getElementById('slot1TagText');

    if (slot1TagText) {
      slot1TagText.textContent = `LIVE BUS FEED • ${dir.directionLabel.toUpperCase()}`;
    }

    if (heroVideo) {
      const currentSrc = heroVideo.getAttribute('src') || '';
      if (!currentSrc.includes(dir.video)) {
        heroVideo.src = dir.video;
        heroVideo.setAttribute('src', dir.video);
        heroVideo.load();
      }
      safePlay(heroVideo);
    }

    // Update Stream Chips in Slot 1
    const streamChips = document.querySelectorAll('.video-stream-selector .stream-chip');
    streamChips.forEach(chip => {
      chip.classList.toggle('active', chip.dataset.src === dir.video);
    });

    // --- Screen 1: Route Chips Highlight ---
    const routeChips = document.querySelectorAll('.route-chip');
    routeChips.forEach(chip => {
      chip.classList.toggle('active', chip.dataset.route === dirKey);
    });

    // --- Screen 2: Live Timeline Update ---
    const tOriginName = document.getElementById('timelineOriginName');
    const tOriginSub = document.getElementById('timelineOriginSub');
    const tOriginTime = document.getElementById('timelineOriginTime');
    const tDestName = document.getElementById('timelineDestName');
    const tDestSub = document.getElementById('timelineDestSub');
    const tDestTime = document.getElementById('timelineDestTime');

    if (tOriginName) tOriginName.textContent = dir.origin;
    if (tOriginSub) tOriginSub.textContent = dir.originBay;
    if (tOriginTime) tOriginTime.textContent = trip.dep;
    if (tDestName) tDestName.textContent = dir.dest;
    if (tDestSub) tDestSub.textContent = dir.destBay;
    if (tDestTime) tDestTime.textContent = trip.arr;

    // --- Screen 3: Schedule Cards Highlight ---
    const allScheduleCards = document.querySelectorAll('.schedule-card');
    allScheduleCards.forEach(card => {
      const cardDir = card.dataset.direction;
      const cardIdx = parseInt(card.dataset.index, 10);
      const isSelected = (cardDir === dirKey && cardIdx === tripIdx);

      card.classList.toggle('next-bus', isSelected);
      card.classList.toggle('active-selected-bus', isSelected);

      const statusPill = card.querySelector('.status-pill-solid');
      if (statusPill) {
        statusPill.textContent = isSelected ? 'NEXT BUS' : 'ON TIME';
      }

      const reminderBtn = card.querySelector('.bell-reminder-icon-btn');
      if (reminderBtn) {
        reminderBtn.classList.toggle('active', isSelected);
      }
    });

    // --- Studio Video Feeds Hub Highlight ---
    const studioFeedBtns = document.querySelectorAll('.studio-video-btn');
    studioFeedBtns.forEach(btn => {
      if (dirKey === 'solanpada-karjat') {
        btn.classList.toggle('active', btn.dataset.feed === 'feed1');
      } else {
        btn.classList.toggle('active', btn.dataset.feed === 'feed2');
      }
    });

    // Feedback Toast
    if (userInitiated) {
      const msg = customNotice || `Trip Updated: ${trip.dep} (${dir.directionLabel})`;
      showToastNotification(msg);
    }
  }

  // =========================================================================
  // 5. INTERACTIVE TIMING & DIRECTION CONTROLS
  // =========================================================================

  // Swap Route Button (Screen 1 & Studio Sidebar)
  const swapBtn = document.getElementById('swapRouteBtn');
  const studioSwapBtn = document.getElementById('studioSwapDirectionBtn');

  function triggerDirectionSwap() {
    const nextDir = activeDirection === 'solanpada-karjat' ? 'karjat-solanpada' : 'solanpada-karjat';
    const nextIdx = findNextTripIndex(nextDir);

    if (swapBtn) {
      swapBtn.style.transform = swapBtn.style.transform === 'rotate(180deg)' ? 'rotate(0deg)' : 'rotate(180deg)';
    }

    applyTripState(nextDir, nextIdx, true, `Swapped to: ${SCHEDULE_DATA[nextDir].directionLabel} (Next: ${SCHEDULE_DATA[nextDir].trips[nextIdx].dep})`);
  }

  if (swapBtn) swapBtn.addEventListener('click', triggerDirectionSwap);
  if (studioSwapBtn) studioSwapBtn.addEventListener('click', triggerDirectionSwap);

  // Route Selector Chips (Screen 1)
  const routeChips = document.querySelectorAll('.route-chip');
  routeChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const routeKey = chip.dataset.route;

      if (routeKey === 'solanpada-karjat') {
        const idx = findNextTripIndex('solanpada-karjat');
        applyTripState('solanpada-karjat', idx, true);
      } else if (routeKey === 'karjat-solanpada') {
        const idx = findNextTripIndex('karjat-solanpada');
        applyTripState('karjat-solanpada', idx, true);
      } else if (routeKey === 'next-shuttle') {
        // Pick the direction with the soonest upcoming bus
        const idxS = findNextTripIndex('solanpada-karjat');
        const idxK = findNextTripIndex('karjat-solanpada');
        const tripS = SCHEDULE_DATA['solanpada-karjat'].trips[idxS];
        const tripK = SCHEDULE_DATA['karjat-solanpada'].trips[idxK];

        const now = new Date();
        const minNow = now.getHours() * 60 + now.getMinutes();
        let diffS = (tripS.h * 60 + tripS.m) - minNow;
        let diffK = (tripK.h * 60 + tripK.m) - minNow;
        if (diffS < 0) diffS += 24 * 60;
        if (diffK < 0) diffK += 24 * 60;

        if (diffS <= diffK) {
          applyTripState('solanpada-karjat', idxS, true, `Soonest Departure: ${tripS.dep} (Solanpada ➔ Karjat)`);
        } else {
          applyTripState('karjat-solanpada', idxK, true, `Soonest Departure: ${tripK.dep} (Karjat ➔ Solanpada)`);
        }
      } else if (routeKey === 'night-run') {
        // Last night direct liner
        if (activeDirection === 'solanpada-karjat') {
          applyTripState('solanpada-karjat', 4, true, 'Night Exam Direct: 5:30 PM (Last Solanpada Departure)');
        } else {
          applyTripState('karjat-solanpada', 4, true, 'Night Exam Direct: 7:30 PM (Last Karjat Departure)');
        }
      }
    });
  });

  // Schedule Cards (Screen 3: Timings)
  const scheduleCards = document.querySelectorAll('.schedule-card');
  scheduleCards.forEach(card => {
    card.addEventListener('click', (e) => {
      // Don't override if bell button specifically clicked
      if (e.target.closest('.bell-reminder-icon-btn')) return;

      const dir = card.dataset.direction;
      const idx = parseInt(card.dataset.index, 10);
      if (dir && !isNaN(idx)) {
        applyTripState(dir, idx, true, `Trip Selected: ${SCHEDULE_DATA[dir].trips[idx].dep} (${SCHEDULE_DATA[dir].directionLabel}) • Synced with Quick Glance`);
      }
    });
  });

  // =========================================================================
  // 6. VIDEO STREAM SWITCHER CONTROLS (SCREEN 1 & STUDIO BAR)
  // =========================================================================
  const streamChips = document.querySelectorAll('.video-stream-selector .stream-chip');
  const heroSource = document.getElementById('heroVideoSource');
  const heroBadgeText = document.getElementById('heroVideoBadgeText');
  const slot1Caption = document.getElementById('slot1Caption');

  function setHeroVideo(src, badgeText, captionText) {
    if (!heroVideo || !heroSource) return;

    heroSource.setAttribute('src', src);
    heroVideo.load();
    heroVideo.muted = true;
    heroVideo.volume = 0;
    heroVideo.play().catch(() => {});

    if (heroBadgeText) heroBadgeText.textContent = badgeText;
    if (slot1Caption) slot1Caption.textContent = captionText;

    streamChips.forEach(c => c.classList.toggle('active', c.dataset.src === src));
  }

  streamChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const src = chip.dataset.src;
      const badge = chip.dataset.badge;
      const caption = chip.dataset.caption;
      setHeroVideo(src, badge, caption);
      showToastNotification(`Playing feed: ${badge}`);
    });
  });

  // Studio Sidebar Video Hub Buttons
  const studioFeedBtns = document.querySelectorAll('.studio-video-btn');
  studioFeedBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const feed = btn.dataset.feed;
      studioFeedBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      if (feed === 'feed1') {
        switchScreen('quick');
        setHeroVideo('bus to karjat.MP4', 'FEED 1: SHUTTLE TO KARJAT', 'VBU Shuttle Cruising to Karjat (Direct 2-Stop)');
        showToastNotification('Feed 1 Active: bus to karjat.MP4 (Muted)');
      } else if (feed === 'feed2') {
        switchScreen('quick');
        setHeroVideo('bus to solanpada.MP4', 'FEED 2: SHUTTLE TO SOLANPADA', 'VBU Shuttle Heading to Solanpada Campus');
        showToastNotification('Feed 2 Active: bus to solanpada.MP4 (Muted)');
      } else if (feed === 'feed3') {
        switchScreen('timings');
        showToastNotification('Feed 3 Active: Students_boarding_1080p.mp4 (Campus Boarding Muted)');
      }
    });
  });

  // =========================================================================
  // 7. INITIALIZE DEFAULT STATE
  // Calculate based on current clock time
  // =========================================================================
  const initialTripIdx = findNextTripIndex('solanpada-karjat');
  applyTripState('solanpada-karjat', initialTripIdx, false);

  // =========================================================================
  // 8. SCREEN 2: LIVE MAP REFRESH & ERROR STATE SIMULATION
  // =========================================================================
  const refreshBtn = document.getElementById('mapRefreshBtn');
  const liveSpeedVal = document.getElementById('liveSpeedVal');

  if (refreshBtn) {
    refreshBtn.addEventListener('click', () => {
      const originalHtml = refreshBtn.innerHTML;
      refreshBtn.innerHTML = `
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" class="spin-icon"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>
        <span>refreshing...</span>
      `;
      refreshBtn.disabled = true;

      setTimeout(() => {
        refreshBtn.classList.add('refreshed-state');
        refreshBtn.innerHTML = `
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span>refreshed</span>
        `;

        if (liveSpeedVal) {
          const newSpeed = Math.floor(Math.random() * 15) + 38;
          liveSpeedVal.textContent = `${newSpeed} km/h`;
        }

        setTimeout(() => {
          refreshBtn.classList.remove('refreshed-state');
          refreshBtn.innerHTML = originalHtml;
          refreshBtn.disabled = false;
        }, 2000);
      }, 600);
    });
  }

  // Location Off Error Overlay
  const mapDisabledOverlay = document.getElementById('mapDisabledState');
  const toggleMapErrorBtn = document.getElementById('toggleMapErrorBtn');
  const errorRetryBtn = document.getElementById('errorRetryBtn');

  function toggleMapError() {
    if (mapDisabledOverlay) {
      const isVisible = mapDisabledOverlay.classList.toggle('active');
      if (toggleMapErrorBtn) {
        toggleMapErrorBtn.classList.toggle('active-danger', isVisible);
        toggleMapErrorBtn.textContent = isVisible ? 'Location Off [ACTIVE]' : 'Toggle Map Error State';
      }
    }
  }

  if (toggleMapErrorBtn) toggleMapErrorBtn.addEventListener('click', toggleMapError);

  if (errorRetryBtn) {
    errorRetryBtn.addEventListener('click', () => {
      errorRetryBtn.textContent = 'Connecting GPS...';
      setTimeout(() => {
        if (mapDisabledOverlay) mapDisabledOverlay.classList.remove('active');
        if (toggleMapErrorBtn) {
          toggleMapErrorBtn.classList.remove('active-danger');
          toggleMapErrorBtn.textContent = 'Toggle Map Error State';
        }
        errorRetryBtn.textContent = 'Error retry';
      }, 700);
    });
  }

  // =========================================================================
  // 9. SCREEN 3: BELL REMINDERS
  // =========================================================================
  const reminderBtns = document.querySelectorAll('.bell-reminder-icon-btn');
  reminderBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      btn.classList.toggle('active');
      const isSet = btn.classList.contains('active');
      showToastNotification(isSet ? 'Departure reminder set for this shuttle' : 'Reminder cancelled');
    });
  });

  // =========================================================================
  // 10. SCREEN 4: PROFILE UPDATE & 5MB TOAST SIMULATOR
  // =========================================================================
  const updateProfileBtn = document.getElementById('updateProfileBtn');
  const profileSuccessToast = document.getElementById('profileSuccessToast');
  const profileErrorToast = document.getElementById('profileErrorToast');
  const triggerSuccessBtn = document.getElementById('triggerSuccessBtn');
  const triggerErrorBtn = document.getElementById('triggerErrorBtn');
  const avatarUpdateTrigger = document.getElementById('avatarUpdateTrigger');

  function showProfileToast(type) {
    if (profileSuccessToast) profileSuccessToast.style.display = 'none';
    if (profileErrorToast) profileErrorToast.style.display = 'none';

    if (type === 'success' && profileSuccessToast) {
      profileSuccessToast.style.display = 'flex';
      setTimeout(() => {
        profileSuccessToast.style.display = 'none';
      }, 3500);
    } else if (type === 'error' && profileErrorToast) {
      profileErrorToast.style.display = 'flex';
      setTimeout(() => {
        profileErrorToast.style.display = 'none';
      }, 3500);
    }
  }

  if (updateProfileBtn) {
    updateProfileBtn.addEventListener('click', () => {
      updateProfileBtn.textContent = 'Saving changes...';
      setTimeout(() => {
        updateProfileBtn.textContent = 'Save profile changes';
        showProfileToast('success');
      }, 500);
    });
  }

  if (triggerSuccessBtn) {
    triggerSuccessBtn.addEventListener('click', () => {
      switchScreen('account');
      showProfileToast('success');
    });
  }

  if (triggerErrorBtn) {
    triggerErrorBtn.addEventListener('click', () => {
      switchScreen('account');
      showProfileToast('error');
    });
  }

  if (avatarUpdateTrigger) {
    avatarUpdateTrigger.addEventListener('click', () => {
      const proceedWithError = confirm('Simulate upload:\nClick OK to simulate "profile upload failed max limit 5mb" error,\nor Cancel to simulate successful photo update.');
      if (proceedWithError) {
        showProfileToast('error');
      } else {
        showProfileToast('success');
      }
    });
  }

  // =========================================================================
  // 11. DYNAMIC SYSTEM FLOATING TOAST
  // =========================================================================
  function showToastNotification(msg) {
    const existing = document.getElementById('systemFloatingToast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.id = 'systemFloatingToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background-color: var(--accent-volt);
      color: var(--accent-volt-fg);
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 800;
      padding: 8px 16px;
      border-radius: var(--radius-full);
      box-shadow: 0 4px 12px rgba(0,0,0,0.7);
      border: 2px solid #000000;
      z-index: 250;
      animation: slideToast 0.25s ease-out;
      pointer-events: none;
    `;
    toast.textContent = msg;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.remove();
    }, 2800);
  }

  // =========================================================================
  // 12. ASSET SPECS MODAL & PROMPT COPY
  // =========================================================================
  const assetModal = document.getElementById('assetSpecsModal');
  const assetModalCloseBtn = document.getElementById('assetModalCloseBtn');
  const assetGuideStudioBtn = document.getElementById('assetGuideStudioBtn');
  const slotTriggers = document.querySelectorAll('.slot-info-trigger');

  const assetDetails = {
    'slot1': {
      name: 'Animation Slot #1: VBU Shuttle Cruising to Karjat (Video Stream 1 & 2)',
      location: 'Screen 1: Quick Glance (Hero Transit Section)',
      size: '340px × 140px (Responsive 16:9 MP4 frame)',
      duration: 'Seamless Muted Video Loop',
      format: 'bus to karjat.MP4 / bus to solanpada.MP4',
      brief: 'Active 2-Stop direct point-to-point shuttle connection between Karjat S.T. Stand and Solanpada (Vijaybhoomi University Campus Gate). Muted, autoplaying high-contrast transit stream with live HUD telemetry badge.'
    },
    'slot2': {
      name: 'Animation Slot #2: VBU Shuttle Highway Cruise Feed (Video Stream 2)',
      location: 'Screen 2: Live Tracking (Top Map Radar Zone)',
      size: '340px × 140px (16:9 Video Loop)',
      duration: 'Seamless Muted Corridor Cruise',
      format: 'bus to solanpada.MP4',
      brief: 'Live transit camera feed of the student shuttle cruising the scenic Karjat-Solanpada highway corridor. High visual clarity, zero gradients, zero audio.'
    },
    'slot3': {
      name: 'Animation Slot #3: Students Boarding VBU Campus Shuttle (Video Stream 3)',
      location: 'Screen 3: Timings (Between Karjat and Solanpada blocks)',
      size: '340px × 140px (16:9 Video Loop)',
      duration: 'Seamless Muted Terminal Boarding',
      format: 'Students_boarding_1080p.mp4',
      brief: 'Students boarding the campus shuttle bus at the Solanpada VBU Main Porch terminal prior to departure. Clean student campus transit aesthetic, muted autoplay loop.'
    },
    'slot5': {
      name: 'Animation Slot #5: Bell Chime / Monsoon Ghat Road Weather Warning',
      location: 'Screen 5: Notifications (Alert Feed Banner)',
      size: '340px × 80px (4.25:1 ratio)',
      duration: '2.5-second loop',
      format: 'Looping GIF or SVG micro-animation',
      brief: 'Emergency transit advisory icon with pulsing radar waves and rainfall indicator.'
    }
  };

  let activePromptText = '';

  function openAssetModal(slotKey) {
    const data = assetDetails[slotKey] || assetDetails['slot1'];
    const titleEl = document.getElementById('modalAssetTitle');
    const locEl = document.getElementById('modalAssetLoc');
    const dimEl = document.getElementById('modalAssetDimensions');
    const durEl = document.getElementById('modalAssetDuration');
    const fmtEl = document.getElementById('modalAssetFormat');
    const pEl = document.getElementById('modalAssetPrompt');

    if (titleEl) titleEl.textContent = data.name;
    if (locEl) locEl.textContent = data.location;
    if (dimEl) dimEl.textContent = data.size;
    if (durEl) durEl.textContent = data.duration;
    if (fmtEl) fmtEl.textContent = data.format;
    
    activePromptText = data.brief;
    if (pEl) pEl.textContent = activePromptText;

    if (assetModal) assetModal.classList.add('active');
  }

  const copyPromptBtn = document.getElementById('copyPromptBtn');
  if (copyPromptBtn) {
    copyPromptBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(activePromptText).then(() => {
        showToastNotification('Asset brief copied to clipboard!');
      }).catch(() => {
        showToastNotification('Asset brief copied!');
      });
    });
  }

  slotTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      openAssetModal(trigger.dataset.slot);
    });
  });

  if (assetGuideStudioBtn) {
    assetGuideStudioBtn.addEventListener('click', () => openAssetModal('slot1'));
  }

  if (assetModalCloseBtn) {
    assetModalCloseBtn.addEventListener('click', () => {
      assetModal.classList.remove('active');
    });
  }

  if (assetModal) {
    assetModal.addEventListener('click', (e) => {
      if (e.target === assetModal) assetModal.classList.remove('active');
    });
  }

  // =========================================================================
  // 13. REAL-TIME CLOCK ON PHONE STATUS BAR
  // =========================================================================
  const statusTime = document.getElementById('phoneStatusTime');
  function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    hours = hours % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    if (statusTime) statusTime.textContent = `${hours}:${minutes}`;
  }
  updateClock();
  setInterval(updateClock, 30000);
});
