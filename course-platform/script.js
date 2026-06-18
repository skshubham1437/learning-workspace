function initApp() {
    const sidebarNav = document.getElementById('sidebar-nav');
    const iframe = document.getElementById('content-frame');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressEl = document.getElementById('lesson-progress');
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    // Flatten lessons into a single array for easy next/prev navigation
    let flatLessons = [];
    courseData.forEach((course, courseIndex) => {
        course.lessons.forEach((lesson, lessonIndex) => {
            flatLessons.push({
                ...lesson,
                courseIndex,
                courseTitle: course.title,
                globalIndex: flatLessons.length
            });
        });
    });

    let currentLessonIndex = 0;

    // Sidebar Toggle (Mobile & Desktop)
    function toggleSidebar() {
        if (window.innerWidth <= 768) {
            sidebar.classList.toggle('open');
            sidebarOverlay.classList.toggle('active');
            menuToggleBtn.setAttribute('aria-expanded', sidebar.classList.contains('open'));
        } else {
            sidebar.classList.toggle('closed');
            menuToggleBtn.setAttribute('aria-expanded', !sidebar.classList.contains('closed'));
        }
    }

    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', toggleSidebar);
    }
    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            if (window.innerWidth <= 768) toggleSidebar();
        });
    }

    // 1. Generate Sidebar DOM
    function renderSidebar() {
        sidebarNav.innerHTML = '';

        courseData.forEach((course, cIndex) => {
            const group = document.createElement('div');
            group.className = 'course-group expanded'; // expanded by default

            const header = document.createElement('div');
            header.className = 'course-title';
            header.innerHTML = `
                <span>${course.title}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
            `;
            
            header.addEventListener('click', () => {
                group.classList.toggle('expanded');
            });

            const list = document.createElement('ul');
            list.className = 'lesson-list';

            course.lessons.forEach((lesson) => {
                const globalIdx = flatLessons.findIndex(fl => fl.path === lesson.path);
                
                const item = document.createElement('li');
                item.className = 'lesson-item';
                item.textContent = lesson.title;
                item.dataset.index = globalIdx;

                item.addEventListener('click', () => {
                    loadLesson(globalIdx);
                    // Close sidebar on mobile after selection
                    if (window.innerWidth <= 768 && sidebar.classList.contains('open')) {
                        toggleSidebar();
                    }
                });

                list.appendChild(item);
            });

            group.appendChild(header);
            group.appendChild(list);
            sidebarNav.appendChild(group);
        });
    }

    // 2. Load Lesson
    function loadLesson(index) {
        if (index < 0 || index >= flatLessons.length) return;
        
        currentLessonIndex = index;
        const lesson = flatLessons[index];

        // Update iframe source
        iframe.src = lesson.path;

        // Update URL hash without causing recursive loop
        const newHash = `#lesson-${index}`;
        if (window.location.hash !== newHash) {
            // Use replaceState to avoid cluttering history back button
            history.replaceState(null, null, newHash);
        }

        // Update Document Title
        document.title = `${lesson.title} - Learning Hub`;

        updateUI();
    }

    // 3. Update UI (Active state & Buttons)
    function updateUI() {
        // Update active class in sidebar
        document.querySelectorAll('.lesson-item').forEach(el => {
            el.classList.remove('active');
            if (parseInt(el.dataset.index) === currentLessonIndex) {
                el.classList.add('active');
                el.closest('.course-group').classList.add('expanded');
                el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }
        });

        // Update Navigation Buttons
        prevBtn.disabled = currentLessonIndex === 0;
        nextBtn.disabled = currentLessonIndex === flatLessons.length - 1;

        // Update Progress Text
        progressEl.textContent = `Lesson ${currentLessonIndex + 1} of ${flatLessons.length}`;
    }

    // Event Listeners for Nav Buttons
    prevBtn.addEventListener('click', () => {
        if (currentLessonIndex > 0) loadLesson(currentLessonIndex - 1);
    });

    nextBtn.addEventListener('click', () => {
        if (currentLessonIndex < flatLessons.length - 1) loadLesson(currentLessonIndex + 1);
    });

    // Keyboard Navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            if (currentLessonIndex > 0) loadLesson(currentLessonIndex - 1);
        } else if (e.key === 'ArrowRight') {
            if (currentLessonIndex < flatLessons.length - 1) loadLesson(currentLessonIndex + 1);
        }
    });

    // Handle Hash on Load/Change (Bookmarking)
    window.addEventListener('hashchange', () => {
        const hashMatch = window.location.hash.match(/#lesson-(\d+)/);
        if (hashMatch) {
            const hashIdx = parseInt(hashMatch[1]);
            if (!isNaN(hashIdx) && hashIdx !== currentLessonIndex && hashIdx >= 0 && hashIdx < flatLessons.length) {
                loadLesson(hashIdx);
            }
        }
    });

    // Initialize
    if (flatLessons.length > 0) {
        renderSidebar();
        
        // Check hash
        const hashMatch = window.location.hash.match(/#lesson-(\d+)/);
        if (hashMatch) {
            const initialHashIdx = parseInt(hashMatch[1]);
            if (!isNaN(initialHashIdx) && initialHashIdx >= 0 && initialHashIdx < flatLessons.length) {
                loadLesson(initialHashIdx);
            } else {
                loadLesson(0);
            }
        } else {
            loadLesson(0); // Load first lesson
        }
    } else {
        sidebarNav.innerHTML = '<div style="padding: 1.5rem; color: #9ca3af;">No lessons found.</div>';
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}
