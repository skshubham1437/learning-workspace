function initApp() {
    const sidebarNav = document.getElementById('sidebar-nav');
    const iframe = document.getElementById('content-frame');
    const iframeContainer = document.getElementById('iframe-container');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const markCompleteBtn = document.getElementById('mark-complete-btn');
    const progressEl = document.getElementById('lesson-progress');
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const breadcrumbsEl = document.getElementById('breadcrumbs');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    const footerNav = document.getElementById('footer-nav');

    // Command Palette Elements
    const paletteOverlay = document.getElementById('command-palette-overlay');
    const paletteInput = document.getElementById('palette-search-input');
    const paletteResults = document.getElementById('palette-results');
    const headerSearchBtn = document.getElementById('header-search-btn');
    const sidebarSearchBtn = document.getElementById('sidebar-search-btn');

    // Flashcard Elements
    const flashcardView = document.getElementById('flashcard-view');
    const deckListEl = document.getElementById('deck-list');
    const fcCard = document.getElementById('fc-card');
    const fcCardWrapper = document.getElementById('fc-card-wrapper');
    const fcFrontContent = document.getElementById('fc-front-content');
    const fcBackContent = document.getElementById('fc-back-content');
    const fcCardBadge = document.getElementById('fc-card-badge');
    const fcCardBadgeBack = document.getElementById('fc-card-badge-back');
    const fcCardSource = document.getElementById('fc-card-source');
    const fcCardCounter = document.getElementById('fc-card-counter');
    const fcActions = document.getElementById('fc-actions');
    const fcEmptyState = document.getElementById('fc-empty-state');
    const fcDeckFilter = document.getElementById('fc-deck-filter');
    const fcTagFilter = document.getElementById('fc-tag-filter');
    const fcExportBtn = document.getElementById('fc-export-btn');
    const fcDueCount = document.getElementById('fc-due-count');
    const fcReviewedCount = document.getElementById('fc-reviewed-count');
    const fcMasteredCount = document.getElementById('fc-mastered-count');
    const fcTotalCount = document.getElementById('fc-total-count');
    const fcProgressFill = document.getElementById('fc-progress-fill');

    // Flatten lessons into a single array for easy next/prev navigation
    let flatLessons = [];
    courseData.forEach((course, courseIndex) => {
        course.lessons.forEach((lesson, lessonIndex) => {
            flatLessons.push({
                ...lesson,
                courseIndex,
                courseTitle: course.title,
                folder: course.folder,
                globalIndex: flatLessons.length
            });
        });
    });

    let currentLessonIndex = 0;
    let completedLessons = JSON.parse(localStorage.getItem('completedLessons') || '[]');
    let paletteOpen = false;
    let selectedPaletteIndex = 0;
    let filteredPaletteLessons = [];

    // ── App Mode: 'lessons' or 'flashcards' ──────────────
    let appMode = 'lessons';

    // ── Theme Management ───────────────────────────────
    function getInitialTheme() {
        const saved = localStorage.getItem('theme');
        if (saved) return saved;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        syncIframeTheme();
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme') || 'light';
            setTheme(current === 'dark' ? 'light' : 'dark');
        });
    }

    // Initialize Theme
    setTheme(getInitialTheme());

    function syncIframeTheme() {
        try {
            const doc = iframe.contentDocument || iframe.contentWindow.document;
            if (!doc || !doc.head) return;
            let styleEl = doc.getElementById('injected-theme-style');
            if (!styleEl) {
                styleEl = doc.createElement('style');
                styleEl.id = 'injected-theme-style';
                doc.head.appendChild(styleEl);
            }
            const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
            if (isDark) {
                styleEl.textContent = `
                    :root {
                        --bg: #0f1117 !important;
                        --fg: #f3f4f6 !important;
                        --code-bg: #1e212b !important;
                        --border: #262a36 !important;
                        --muted: #9ca3af !important;
                        --accent-light: rgba(59, 130, 246, 0.15) !important;
                        --callout-bg: #1e212b !important;
                        --success-bg: rgba(16, 185, 129, 0.15) !important;
                        --danger-bg: rgba(239, 68, 68, 0.15) !important;
                        --warn-bg: rgba(245, 158, 11, 0.15) !important;
                    }
                    body { background-color: #0f1117 !important; color: #f3f4f6 !important; transition: background-color 0.3s ease, color 0.3s ease; }
                    .code-bg, pre, code { background-color: #1e212b !important; color: #e5e7eb !important; border-color: #323746 !important; }
                    .callout, .step-box, .retrieval { background-color: #1e212b !important; border-color: #3b82f6 !important; color: #f3f4f6 !important; }
                    a { color: #60a5fa !important; }
                    h1, h2, h3, h4, h5, h6, strong, b { color: #ffffff !important; }
                    table, th, td { border-color: #323746 !important; }
                `;
            } else {
                styleEl.textContent = '';
            }
        } catch (e) {
            // Same-origin restrictions or iframe not ready yet
        }
    }

    iframe.addEventListener('load', () => {
        syncIframeTheme();
    });

    // ── Sidebar & Mobile Drawer ────────────────────────
    function toggleSidebar(forceClose = false) {
        if (window.innerWidth <= 768) {
            if (forceClose) {
                sidebar.classList.remove('open');
                sidebarOverlay.classList.remove('active');
            } else {
                sidebar.classList.toggle('open');
                sidebarOverlay.classList.toggle('active');
            }
            if (menuToggleBtn) {
                menuToggleBtn.setAttribute('aria-expanded', sidebar.classList.contains('open'));
            }
        } else {
            sidebar.classList.toggle('closed');
            if (menuToggleBtn) {
                menuToggleBtn.setAttribute('aria-expanded', !sidebar.classList.contains('closed'));
            }
        }
    }

    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', () => toggleSidebar());
    }
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => toggleSidebar(true));
    }

    // ══════════════════════════════════════════════════════
    //  MODE SWITCHING: Lessons ↔ Flashcards
    // ══════════════════════════════════════════════════════

    function switchToLessons() {
        appMode = 'lessons';
        if (iframeContainer) iframeContainer.style.display = '';
        if (flashcardView) flashcardView.style.display = 'none';
        if (footerNav) footerNav.style.display = '';

        // Deactivate deck items in sidebar
        document.querySelectorAll('.deck-item').forEach(el => el.classList.remove('active'));

        updateUI();
    }

    function switchToFlashcards(deckName) {
        appMode = 'flashcards';
        if (iframeContainer) iframeContainer.style.display = 'none';
        if (flashcardView) flashcardView.style.display = 'flex';
        if (footerNav) footerNav.style.display = 'none';

        // Deactivate lesson items in sidebar
        document.querySelectorAll('.lesson-item').forEach(el => el.classList.remove('active'));

        // Activate deck item
        document.querySelectorAll('.deck-item').forEach(el => {
            el.classList.toggle('active', el.dataset.deck === deckName || (deckName === 'all' && el.dataset.deck === 'all'));
        });

        // Update breadcrumbs
        if (breadcrumbsEl) {
            const displayName = deckName === 'all' ? 'All Decks' : deckName;
            breadcrumbsEl.innerHTML = `
                <span class="breadcrumb-item">Flashcards</span>
                <span class="breadcrumb-sep">›</span>
                <span class="breadcrumb-item active">${displayName}</span>
            `;
        }

        document.title = `Flashcard Review — Learning Hub`;

        // Set deck filter
        if (fcDeckFilter) fcDeckFilter.value = deckName === 'all' ? 'all' : deckName;

        fcEngine.startSession(deckName);
    }

    // ── 1. Generate Sidebar DOM ────────────────────────
    function renderSidebar() {
        if (!sidebarNav) return;
        sidebarNav.innerHTML = '';

        courseData.forEach((course, cIndex) => {
            const group = document.createElement('div');
            group.className = 'course-group expanded';
            group.dataset.courseIndex = cIndex;

            // Header wrap
            const headerWrap = document.createElement('div');
            headerWrap.className = 'course-header-wrap';

            const header = document.createElement('div');
            header.className = 'course-title';
            header.innerHTML = `
                <span>${course.title}</span>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            `;
            
            // Progress Bar
            const progBar = document.createElement('div');
            progBar.className = 'course-progress-bar';
            const progFill = document.createElement('div');
            progFill.className = 'course-progress-fill';
            progFill.style.width = '0%';
            progBar.appendChild(progFill);

            headerWrap.appendChild(header);
            headerWrap.appendChild(progBar);

            headerWrap.addEventListener('click', () => {
                group.classList.toggle('expanded');
            });

            const list = document.createElement('ul');
            list.className = 'lesson-list';

            let currentSection = null;

            course.lessons.forEach((lesson) => {
                const globalIdx = flatLessons.findIndex(fl => fl.path === lesson.path);
                
                // Add section label if section changed
                if (lesson.section && lesson.section !== currentSection) {
                    currentSection = lesson.section;
                    const sectionEl = document.createElement('li');
                    sectionEl.className = 'section-label';
                    sectionEl.textContent = currentSection;
                    list.appendChild(sectionEl);
                }
                
                const item = document.createElement('li');
                item.className = 'lesson-item';
                item.dataset.index = globalIdx;
                item.dataset.path = lesson.path;

                item.innerHTML = `
                    <div class="lesson-item-left">
                        <span class="completed-icon" title="Completed">✓</span>
                        <span class="lesson-title-text" title="${lesson.title}">${lesson.title}</span>
                    </div>
                    <span class="lesson-badge">${lesson.duration || ''}</span>
                `;

                item.addEventListener('click', () => {
                    switchToLessons();
                    loadLesson(globalIdx);
                    if (window.innerWidth <= 768) toggleSidebar(true);
                });

                list.appendChild(item);
            });

            group.appendChild(headerWrap);
            group.appendChild(list);
            sidebarNav.appendChild(group);
        });

        updateProgressUI();
    }

    // ── Render Deck List in Sidebar ────────────────────
    function renderDeckList() {
        if (!deckListEl || typeof flashcardData === 'undefined') return;

        deckListEl.innerHTML = '';

        // Collect unique decks
        const deckNames = [...new Set(flashcardData.map(c => c.deck))];

        // "All Decks" item
        const allItem = document.createElement('li');
        allItem.className = 'deck-item';
        allItem.dataset.deck = 'all';
        const totalDue = fcEngine.getDueCount('all');
        allItem.innerHTML = `
            <div class="deck-item-left">
                <span class="deck-item-icon">📚</span>
                <span class="deck-item-name">All Decks</span>
            </div>
            <span class="deck-due-badge ${totalDue === 0 ? 'empty' : ''}">${totalDue} due</span>
        `;
        allItem.addEventListener('click', () => {
            switchToFlashcards('all');
            if (window.innerWidth <= 768) toggleSidebar(true);
        });
        deckListEl.appendChild(allItem);

        // Per-deck items
        deckNames.forEach(name => {
            const due = fcEngine.getDueCount(name);
            const item = document.createElement('li');
            item.className = 'deck-item';
            item.dataset.deck = name;
            item.innerHTML = `
                <div class="deck-item-left">
                    <span class="deck-item-icon">🃏</span>
                    <span class="deck-item-name">${name}</span>
                </div>
                <span class="deck-due-badge ${due === 0 ? 'empty' : ''}">${due} due</span>
            `;
            item.addEventListener('click', () => {
                switchToFlashcards(name);
                if (window.innerWidth <= 768) toggleSidebar(true);
            });
            deckListEl.appendChild(item);
        });
    }

    // ── 2. Load Lesson & Stable Routing ────────────────
    function loadLesson(index) {
        if (index < 0 || index >= flatLessons.length) return;
        
        currentLessonIndex = index;
        const lesson = flatLessons[index];

        // Update iframe source
        iframe.src = lesson.path;
        iframe.setAttribute('title', lesson.title);

        // Stable Slug URL Hash
        const newHash = `#${lesson.folder}/${lesson.slug || lesson.globalIndex}`;
        if (window.location.hash !== newHash) {
            history.replaceState(null, null, newHash);
        }

        // Update Document Title
        document.title = `${lesson.title} — Learning Hub`;

        // Update Breadcrumbs
        if (breadcrumbsEl) {
            breadcrumbsEl.innerHTML = `
                <span class="breadcrumb-item">${lesson.courseTitle}</span>
                <span class="breadcrumb-sep">›</span>
                ${lesson.section ? `<span class="breadcrumb-item">${lesson.section}</span><span class="breadcrumb-sep">›</span>` : ''}
                <span class="breadcrumb-item active" title="${lesson.title}">${lesson.title}</span>
            `;
        }

        updateUI();
    }

    // ── 3. Progress Tracking & UI Updates ──────────────
    function toggleLessonCompletion(path) {
        const idx = completedLessons.indexOf(path);
        if (idx > -1) {
            completedLessons.splice(idx, 1);
        } else {
            completedLessons.push(path);
        }
        localStorage.setItem('completedLessons', JSON.stringify(completedLessons));
        updateProgressUI();
    }

    if (markCompleteBtn) {
        markCompleteBtn.addEventListener('click', () => {
            const currentLesson = flatLessons[currentLessonIndex];
            if (currentLesson) {
                toggleLessonCompletion(currentLesson.path);
            }
        });
    }

    function updateProgressUI() {
        const currentLesson = flatLessons[currentLessonIndex];

        // Update sidebar items completion state
        document.querySelectorAll('.lesson-item').forEach(el => {
            const path = el.dataset.path;
            const isCompleted = completedLessons.includes(path);
            if (isCompleted) {
                el.classList.add('completed');
            } else {
                el.classList.remove('completed');
            }
        });

        // Update course group progress bars
        courseData.forEach((course, cIdx) => {
            if (!sidebarNav) return;
            const groupEl = sidebarNav.children[cIdx];
            if (!groupEl) return;
            const totalInCourse = course.lessons.length;
            const completedInCourse = course.lessons.filter(l => completedLessons.includes(l.path)).length;
            const pct = totalInCourse > 0 ? Math.round((completedInCourse / totalInCourse) * 100) : 0;
            const fillEl = groupEl.querySelector('.course-progress-fill');
            if (fillEl) fillEl.style.width = `${pct}%`;
        });

        // Update Mark Complete Button
        if (markCompleteBtn && currentLesson) {
            const isCurrentCompleted = completedLessons.includes(currentLesson.path);
            markCompleteBtn.classList.toggle('completed', isCurrentCompleted);
            const textEl = markCompleteBtn.querySelector('.complete-text');
            if (textEl) {
                textEl.textContent = isCurrentCompleted ? 'Completed' : 'Mark Complete';
            }
        }
    }

    function updateUI() {
        // Update active class in sidebar
        document.querySelectorAll('.lesson-item').forEach(el => {
            el.classList.remove('active');
            if (parseInt(el.dataset.index) === currentLessonIndex && appMode === 'lessons') {
                el.classList.add('active');
                const group = el.closest('.course-group');
                if (group) group.classList.add('expanded');
                el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });

        // Update Navigation Buttons
        if (prevBtn) prevBtn.disabled = currentLessonIndex === 0;
        if (nextBtn) nextBtn.disabled = currentLessonIndex === flatLessons.length - 1;

        // Update Progress Text
        if (progressEl) {
            progressEl.textContent = `Lesson ${currentLessonIndex + 1} of ${flatLessons.length}`;
        }

        updateProgressUI();
    }

    // Event Listeners for Nav Buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentLessonIndex > 0) loadLesson(currentLessonIndex - 1);
        });
    }
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentLessonIndex < flatLessons.length - 1) loadLesson(currentLessonIndex + 1);
        });
    }

    // ── 4. Command Palette Search (`Cmd+K` / `Ctrl+K`) ──
    function togglePalette(show) {
        paletteOpen = show;
        if (paletteOpen) {
            paletteOverlay.classList.add('active');
            paletteInput.value = '';
            renderPaletteResults('');
            setTimeout(() => paletteInput.focus(), 50);
        } else {
            paletteOverlay.classList.remove('active');
            paletteInput.blur();
        }
    }

    if (headerSearchBtn) headerSearchBtn.addEventListener('click', () => togglePalette(true));
    if (sidebarSearchBtn) sidebarSearchBtn.addEventListener('click', () => togglePalette(true));
    if (paletteOverlay) {
        paletteOverlay.addEventListener('click', (e) => {
            if (e.target === paletteOverlay) togglePalette(false);
        });
    }

    function renderPaletteResults(query) {
        if (!paletteResults) return;
        paletteResults.innerHTML = '';
        const q = query.toLowerCase().trim();

        if (!q) {
            filteredPaletteLessons = flatLessons.slice(0, 8); // show first 8 as default
        } else {
            filteredPaletteLessons = flatLessons.filter(l => {
                return (
                    l.title.toLowerCase().includes(q) ||
                    l.courseTitle.toLowerCase().includes(q) ||
                    (l.description && l.description.toLowerCase().includes(q))
                );
            }).slice(0, 15);
        }

        if (filteredPaletteLessons.length === 0) {
            paletteResults.innerHTML = '<div class="palette-empty">No matching lessons found. Try a different search term.</div>';
            return;
        }

        selectedPaletteIndex = 0;

        filteredPaletteLessons.forEach((lesson, idx) => {
            const item = document.createElement('div');
            item.className = `palette-item ${idx === 0 ? 'selected' : ''}`;
            item.dataset.idx = idx;

            item.innerHTML = `
                <div class="palette-item-left">
                    <span class="palette-item-title">${lesson.title}</span>
                    <span class="palette-item-course">${lesson.courseTitle} ${lesson.section ? `· ${lesson.section}` : ''}</span>
                </div>
                <span class="lesson-badge">${lesson.duration || ''}</span>
            `;

            item.addEventListener('mouseenter', () => {
                document.querySelectorAll('.palette-item').forEach(el => el.classList.remove('selected'));
                item.classList.add('selected');
                selectedPaletteIndex = idx;
            });

            item.addEventListener('click', () => {
                switchToLessons();
                loadLesson(lesson.globalIndex);
                togglePalette(false);
            });

            paletteResults.appendChild(item);
        });
    }

    if (paletteInput) {
        paletteInput.addEventListener('input', (e) => {
            renderPaletteResults(e.target.value);
        });
    }

    // ── 5. Safe Keyboard Navigation & Shortcuts ────────
    document.addEventListener('keydown', (e) => {
        // Toggle Command Palette (Cmd+K / Ctrl+K)
        if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
            e.preventDefault();
            togglePalette(!paletteOpen);
            return;
        }

        // Close Palette on ESC
        if (e.key === 'Escape' && paletteOpen) {
            togglePalette(false);
            return;
        }

        // Palette Navigation
        if (paletteOpen) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (filteredPaletteLessons.length > 0) {
                    selectedPaletteIndex = (selectedPaletteIndex + 1) % filteredPaletteLessons.length;
                    updatePaletteSelection();
                }
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (filteredPaletteLessons.length > 0) {
                    selectedPaletteIndex = (selectedPaletteIndex - 1 + filteredPaletteLessons.length) % filteredPaletteLessons.length;
                    updatePaletteSelection();
                }
            } else if (e.key === 'Enter') {
                e.preventDefault();
                const selectedLesson = filteredPaletteLessons[selectedPaletteIndex];
                if (selectedLesson) {
                    switchToLessons();
                    loadLesson(selectedLesson.globalIndex);
                    togglePalette(false);
                }
            }
            return;
        }

        // Guard: do not intercept keys if typing inside form inputs
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

        // ── Flashcard Mode Shortcuts ──
        if (appMode === 'flashcards') {
            if (e.key === ' ' || e.code === 'Space') {
                e.preventDefault();
                fcEngine.flipCard();
                return;
            }
            if (['1', '2', '3', '4'].includes(e.key)) {
                e.preventDefault();
                fcEngine.rateCard(parseInt(e.key));
                return;
            }
            // ESC exits flashcard mode
            if (e.key === 'Escape') {
                switchToLessons();
                return;
            }
            return;
        }

        // Lesson Navigation (Left/Right Arrows)
        if (e.key === 'ArrowLeft') {
            if (currentLessonIndex > 0) loadLesson(currentLessonIndex - 1);
        } else if (e.key === 'ArrowRight') {
            if (currentLessonIndex < flatLessons.length - 1) loadLesson(currentLessonIndex + 1);
        }
    });

    function updatePaletteSelection() {
        if (!paletteResults) return;
        const items = paletteResults.querySelectorAll('.palette-item');
        items.forEach((el, idx) => {
            if (idx === selectedPaletteIndex) {
                el.classList.add('selected');
                el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            } else {
                el.classList.remove('selected');
            }
        });
    }

    // ── 6. Hash Matching & Initialization ──────────────
    function handleHashNavigation() {
        const hash = window.location.hash.slice(1); // remove leading #
        if (!hash) return false;

        // Check for flashcard hash
        if (hash === 'flashcards' || hash.startsWith('flashcards/')) {
            const deckPart = decodeURIComponent(hash.split('/').slice(1).join('/') || 'all');
            switchToFlashcards(deckPart === '' ? 'all' : deckPart);
            return true;
        }

        // Try matching folder/slug
        let foundIdx = flatLessons.findIndex(fl => `${fl.folder}/${fl.slug}` === hash);
        if (foundIdx !== -1) {
            if (appMode !== 'lessons') switchToLessons();
            if (foundIdx !== currentLessonIndex) loadLesson(foundIdx);
            return true;
        }

        // Fallback: match old index-based hash (#lesson-5)
        const matchOld = hash.match(/^lesson-(\d+)$/);
        if (matchOld) {
            const idx = parseInt(matchOld[1]);
            if (!isNaN(idx) && idx >= 0 && idx < flatLessons.length) {
                loadLesson(idx);
                return true;
            }
        }
        return false;
    }

    window.addEventListener('hashchange', () => {
        handleHashNavigation();
    });

    // ══════════════════════════════════════════════════════
    //  FLASHCARD ENGINE (SM-2 Spaced Repetition)
    // ══════════════════════════════════════════════════════

    const fcEngine = (() => {
        const STORAGE_KEY = 'flashcardSRS';
        let srsState = {}; // { cardId: { interval, repetitions, easeFactor, dueDate } }
        let sessionCards = [];
        let sessionIndex = 0;
        let reviewedThisSession = 0;
        let isFlipped = false;
        let currentDeck = 'all';

        // Load SRS state from localStorage
        function loadState() {
            try {
                srsState = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
            } catch (e) {
                srsState = {};
            }
        }

        function saveState() {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(srsState));
        }

        function getCardState(cardId) {
            if (!srsState[cardId]) {
                srsState[cardId] = {
                    interval: 0,      // days until next review
                    repetitions: 0,   // consecutive correct answers
                    easeFactor: 2.5,  // SM-2 ease factor
                    dueDate: new Date().toISOString().split('T')[0] // due today
                };
            }
            return srsState[cardId];
        }

        function isDue(cardId) {
            const state = getCardState(cardId);
            const today = new Date().toISOString().split('T')[0];
            return state.dueDate <= today;
        }

        function isMastered(cardId) {
            const state = srsState[cardId];
            return state && state.interval >= 21; // 21+ day interval = mastered
        }

        function getDueCount(deckName) {
            if (typeof flashcardData === 'undefined') return 0;
            return flashcardData.filter(card => {
                if (deckName !== 'all' && card.deck !== deckName) return false;
                return isDue(card.id);
            }).length;
        }

        // SM-2 Algorithm
        function sm2(cardId, quality) {
            // quality: 1=Again, 2=Hard, 3=Good, 4=Easy
            const state = getCardState(cardId);
            const q = quality >= 3 ? quality : 0; // SM-2 uses 0-5, we map our 1-4

            if (quality < 3) {
                // Failed: reset
                state.repetitions = 0;
                state.interval = quality === 1 ? 0 : 1; // Again = <1min (same session), Hard = 1 day
            } else {
                // Passed
                state.repetitions += 1;
                if (state.repetitions === 1) {
                    state.interval = 1;
                } else if (state.repetitions === 2) {
                    state.interval = 6;
                } else {
                    state.interval = Math.round(state.interval * state.easeFactor);
                }

                // Easy bonus
                if (quality === 4) {
                    state.interval = Math.max(state.interval, 4);
                    state.easeFactor += 0.15;
                }
            }

            // Adjust ease factor (SM-2 formula)
            state.easeFactor = Math.max(1.3,
                state.easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))
            );

            // Calculate next due date
            const next = new Date();
            next.setDate(next.getDate() + state.interval);
            state.dueDate = next.toISOString().split('T')[0];

            srsState[cardId] = state;
            saveState();
        }

        function getFilteredCards() {
            if (typeof flashcardData === 'undefined') return [];
            let cards = flashcardData;

            // Filter by deck
            if (currentDeck !== 'all') {
                cards = cards.filter(c => c.deck === currentDeck);
            }

            // Filter by tag
            const tagFilter = fcTagFilter ? fcTagFilter.value : 'all';
            if (tagFilter !== 'all') {
                cards = cards.filter(c => c.tags && c.tags.includes(tagFilter));
            }

            return cards;
        }

        function startSession(deckName) {
            currentDeck = deckName || 'all';
            loadState();
            reviewedThisSession = 0;

            const filtered = getFilteredCards();

            // Get due cards first
            const dueCards = filtered.filter(c => isDue(c.id));
            
            // Shuffle due cards for variety
            for (let i = dueCards.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [dueCards[i], dueCards[j]] = [dueCards[j], dueCards[i]];
            }

            sessionCards = dueCards;
            sessionIndex = 0;
            isFlipped = false;

            updateFilters();
            updateStats();
            showCurrentCard();
        }

        function updateFilters() {
            if (!fcDeckFilter || typeof flashcardData === 'undefined') return;

            // Populate deck filter
            const deckNames = [...new Set(flashcardData.map(c => c.deck))];
            fcDeckFilter.innerHTML = '<option value="all">All Decks</option>';
            deckNames.forEach(name => {
                const opt = document.createElement('option');
                opt.value = name;
                opt.textContent = name;
                fcDeckFilter.appendChild(opt);
            });
            fcDeckFilter.value = currentDeck;

            // Populate tag filter
            const allTags = [...new Set(flashcardData.flatMap(c => c.tags || []))].sort();
            fcTagFilter.innerHTML = '<option value="all">All Tags</option>';
            allTags.forEach(tag => {
                const opt = document.createElement('option');
                opt.value = tag;
                opt.textContent = tag;
                fcTagFilter.appendChild(opt);
            });
        }

        function updateStats() {
            const filtered = getFilteredCards();
            const due = filtered.filter(c => isDue(c.id)).length;
            const mastered = filtered.filter(c => isMastered(c.id)).length;
            const total = filtered.length;

            if (fcDueCount) fcDueCount.textContent = due;
            if (fcReviewedCount) fcReviewedCount.textContent = reviewedThisSession;
            if (fcMasteredCount) fcMasteredCount.textContent = mastered;
            if (fcTotalCount) fcTotalCount.textContent = total;

            // Update progress bar
            if (fcProgressFill && total > 0) {
                const reviewedPct = Math.round(((total - due) / total) * 100);
                fcProgressFill.style.width = `${reviewedPct}%`;
            }

            // Update sidebar deck due counts
            renderDeckList();
        }

        function showCurrentCard() {
            if (sessionCards.length === 0 || sessionIndex >= sessionCards.length) {
                // No more cards
                if (fcCardWrapper) fcCardWrapper.style.display = 'none';
                if (fcEmptyState) fcEmptyState.style.display = 'block';
                if (fcActions) fcActions.classList.remove('visible');
                if (fcCardCounter) fcCardCounter.textContent = '';
                return;
            }

            const card = sessionCards[sessionIndex];

            if (fcCardWrapper) fcCardWrapper.style.display = '';
            if (fcEmptyState) fcEmptyState.style.display = 'none';

            // Reset flip
            isFlipped = false;
            if (fcCard) fcCard.classList.remove('flipped');
            if (fcActions) fcActions.classList.remove('visible');

            // Set content
            if (fcFrontContent) fcFrontContent.innerHTML = card.front;
            if (fcBackContent) fcBackContent.innerHTML = card.back;
            if (fcCardBadge) fcCardBadge.textContent = (card.tags && card.tags[0]) || 'card';
            if (fcCardBadgeBack) fcCardBadgeBack.textContent = 'answer';
            if (fcCardSource) fcCardSource.textContent = `Source: ${card.source || 'unknown'}`;

            // Counter
            if (fcCardCounter) {
                fcCardCounter.textContent = `Card ${sessionIndex + 1} of ${sessionCards.length}`;
            }

            // Update interval labels on buttons
            updateIntervalLabels(card.id);

            // Slide-in animation
            if (fcCardWrapper) {
                fcCardWrapper.classList.remove('animate-in');
                void fcCardWrapper.offsetWidth; // force reflow
                fcCardWrapper.classList.add('animate-in');
            }
        }

        function updateIntervalLabels(cardId) {
            const state = getCardState(cardId);
            const intervals = computePreviewIntervals(state);

            const btnLabels = fcActions ? fcActions.querySelectorAll('.fc-btn-interval') : [];
            if (btnLabels.length >= 4) {
                btnLabels[0].textContent = formatInterval(intervals[1]);
                btnLabels[1].textContent = formatInterval(intervals[2]);
                btnLabels[2].textContent = formatInterval(intervals[3]);
                btnLabels[3].textContent = formatInterval(intervals[4]);
            }
        }

        function computePreviewIntervals(state) {
            return {
                1: 0,   // Again = < 1 min
                2: 1,   // Hard = 1 day
                3: state.repetitions === 0 ? 1 : (state.repetitions === 1 ? 6 : Math.round(state.interval * state.easeFactor)),
                4: Math.max(4, state.repetitions === 0 ? 4 : Math.round(state.interval * (state.easeFactor + 0.15)))
            };
        }

        function formatInterval(days) {
            if (days === 0) return '< 1 min';
            if (days === 1) return '1 day';
            if (days < 30) return `${days} days`;
            if (days < 365) return `${Math.round(days / 30)} mo`;
            return `${(days / 365).toFixed(1)} yr`;
        }

        function flipCard() {
            if (sessionCards.length === 0 || sessionIndex >= sessionCards.length) return;

            isFlipped = !isFlipped;
            if (fcCard) fcCard.classList.toggle('flipped', isFlipped);
            if (fcActions) fcActions.classList.toggle('visible', isFlipped);
        }

        function rateCard(rating) {
            if (!isFlipped || sessionCards.length === 0 || sessionIndex >= sessionCards.length) return;

            const card = sessionCards[sessionIndex];
            sm2(card.id, rating);
            reviewedThisSession++;

            // If "Again", re-add to end of session
            if (rating === 1) {
                sessionCards.push(card);
            }

            sessionIndex++;
            updateStats();
            showCurrentCard();
        }

        // Public API
        return { startSession, flipCard, rateCard, getDueCount, loadState };
    })();

    // ── Flashcard Event Listeners ──────────────────────
    if (fcCardWrapper) {
        fcCardWrapper.addEventListener('click', () => {
            fcEngine.flipCard();
        });
    }

    if (fcActions) {
        fcActions.querySelectorAll('.fc-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const rating = parseInt(btn.dataset.rating);
                fcEngine.rateCard(rating);
            });
        });
    }

    if (fcDeckFilter) {
        fcDeckFilter.addEventListener('change', () => {
            const deck = fcDeckFilter.value;
            switchToFlashcards(deck);
        });
    }

    if (fcTagFilter) {
        fcTagFilter.addEventListener('change', () => {
            fcEngine.startSession(fcDeckFilter ? fcDeckFilter.value : 'all');
        });
    }

    if (fcExportBtn) {
        fcExportBtn.addEventListener('click', () => {
            const link = document.createElement('a');
            link.href = 'anki-export.txt';
            link.download = 'anki-export.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }

    // ── Initialize Application ─────────────────────────
    fcEngine.loadState();

    if (flatLessons.length > 0) {
        renderSidebar();
        renderDeckList();
        
        const loadedFromHash = handleHashNavigation();
        if (!loadedFromHash) {
            loadLesson(0);
        }
    } else {
        if (sidebarNav) sidebarNav.innerHTML = '<div style="padding: 1.5rem; color: var(--text-muted);">No lessons found. Run node generate.js to populate data.js.</div>';
        renderDeckList();
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
