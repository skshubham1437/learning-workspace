function initApp() {
    const sidebarNav = document.getElementById('sidebar-nav');
    const iframe = document.getElementById('content-frame');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const markCompleteBtn = document.getElementById('mark-complete-btn');
    const progressEl = document.getElementById('lesson-progress');
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const breadcrumbsEl = document.getElementById('breadcrumbs');
    const themeToggleBtn = document.getElementById('theme-toggle-btn');

    // Command Palette Elements
    const paletteOverlay = document.getElementById('command-palette-overlay');
    const paletteInput = document.getElementById('palette-search-input');
    const paletteResults = document.getElementById('palette-results');
    const headerSearchBtn = document.getElementById('header-search-btn');
    const sidebarSearchBtn = document.getElementById('sidebar-search-btn');

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

    // ── 1. Generate Sidebar DOM ────────────────────────
    function renderSidebar() {
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
            if (parseInt(el.dataset.index) === currentLessonIndex) {
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
                    loadLesson(selectedLesson.globalIndex);
                    togglePalette(false);
                }
            }
            return;
        }

        // Guard: do not intercept arrow keys if typing inside form inputs
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

        // Lesson Navigation (Left/Right Arrows)
        if (e.key === 'ArrowLeft') {
            if (currentLessonIndex > 0) loadLesson(currentLessonIndex - 1);
        } else if (e.key === 'ArrowRight') {
            if (currentLessonIndex < flatLessons.length - 1) loadLesson(currentLessonIndex + 1);
        }
    });

    function updatePaletteSelection() {
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

        // Try matching folder/slug
        let foundIdx = flatLessons.findIndex(fl => `${fl.folder}/${fl.slug}` === hash);
        if (foundIdx !== -1) {
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

    // Initialize Application
    if (flatLessons.length > 0) {
        renderSidebar();
        
        const loadedFromHash = handleHashNavigation();
        if (!loadedFromHash) {
            loadLesson(0);
        }
    } else {
        sidebarNav.innerHTML = '<div style="padding: 1.5rem; color: var(--text-muted);">No lessons found. Run node generate.js to populate data.js.</div>';
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
