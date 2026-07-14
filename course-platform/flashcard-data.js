// AI-GENERATED FILE.
// Flashcards are manually curated by AI from lesson content for higher quality.
// When a new lesson is added, run `node generate.js` which calls injectNewLessonFlashcards()
// to append cards for any lessons not yet covered.

const flashcardData = [

    // ══════════════════════════════════════════════
    //  DSA JAVASCRIPT
    // ══════════════════════════════════════════════

    // --- Lesson 01: The UMPIRE Framework ---
    {
        "id": "dsajavas-001",
        "deck": "Dsa Javascript",
        "tags": ["umpire", "process", "interviews"],
        "front": "What does <b>UMPIRE</b> stand for?",
        "back": "<b>U</b>nderstand, <b>M</b>atch, <b>P</b>lan, <b>I</b>mplement, <b>R</b>eview, <b>E</b>valuate.",
        "source": "0001-the-umpire-framework.html",
        "created": "2026-07-14"
    },
    {
        "id": "dsajavas-002",
        "deck": "Dsa Javascript",
        "tags": ["umpire", "interviews"],
        "front": "What is the #1 trap most people fall into during a coding interview?",
        "back": "Jumping straight to writing code without fully understanding the problem or planning an approach — leading to spaghetti code, missed edge cases, and awkward silence.",
        "source": "0001-the-umpire-framework.html",
        "created": "2026-07-14"
    },
    {
        "id": "dsajavas-003",
        "deck": "Dsa Javascript",
        "tags": ["umpire", "interviews"],
        "front": "What is the goal of the <b>Understand</b> step in UMPIRE?",
        "back": "Prove you know exactly what the problem is asking. Ask clarifying questions (can the array be empty? are there negatives?), and create your own simple test case to confirm input/output.",
        "source": "0001-the-umpire-framework.html",
        "created": "2026-07-14"
    },
    {
        "id": "dsajavas-004",
        "deck": "Dsa Javascript",
        "tags": ["umpire", "interviews"],
        "front": "What is the goal of the <b>Match</b> step in UMPIRE?",
        "back": "Identify the <em>category</em> of the problem. Does it need a Hash Map? Two Pointers? Sliding Window? You don't need the exact solution — just the \"vibe\" of the tools needed.",
        "source": "0001-the-umpire-framework.html",
        "created": "2026-07-14"
    },
    {
        "id": "dsajavas-005",
        "deck": "Dsa Javascript",
        "tags": ["umpire", "interviews"],
        "front": "Why is <b>Plan</b> the most important step in UMPIRE?",
        "back": "Because it's far easier to fix broken logic in plain English than broken JavaScript. If the plan is solid, implementation is just typing — zero heavy thinking at the code level.",
        "source": "0001-the-umpire-framework.html",
        "created": "2026-07-14"
    },
    {
        "id": "dsajavas-006",
        "deck": "Dsa Javascript",
        "tags": ["umpire", "interviews"],
        "front": "What does the <b>Review</b> step involve in UMPIRE?",
        "back": "Pick a simple test case, then read your code line-by-line as if you are the computer. Track what every variable equals at each step. Do not just say \"looks good\" — actually trace the logic.",
        "source": "0001-the-umpire-framework.html",
        "created": "2026-07-14"
    },
    {
        "id": "dsajavas-007",
        "deck": "Dsa Javascript",
        "tags": ["umpire", "interviews"],
        "front": "What do you analyze in the <b>Evaluate</b> step of UMPIRE?",
        "back": "Time Complexity (how does it scale as input grows?) and Space Complexity (how much extra memory does it allocate?). This is where Big O notation is applied.",
        "source": "0001-the-umpire-framework.html",
        "created": "2026-07-14"
    },
    {
        "id": "dsajavas-008",
        "deck": "Dsa Javascript",
        "tags": ["umpire", "interviews"],
        "front": "Why do interviewers value UMPIRE even if you never finish writing the code?",
        "back": "Because interviewers care about <b>how you think</b>, not just the final code. A methodical, communicative engineer who follows UMPIRE is more hirable than someone who writes code silently — even if correct.",
        "source": "0001-the-umpire-framework.html",
        "created": "2026-07-14"
    },

    // --- Lesson 02: Big O Notation ---
    {
        "id": "dsajavas-009",
        "deck": "Dsa Javascript",
        "tags": ["big-o", "complexity"],
        "front": "What does <b>Big O notation</b> measure?",
        "back": "How the number of operations <em>scales</em> as the input size (<code>n</code>) grows toward infinity — ignoring hardware speeds or constant factors.",
        "source": "0002-big-o-notation.html",
        "created": "2026-07-14"
    },
    {
        "id": "dsajavas-010",
        "deck": "Dsa Javascript",
        "tags": ["big-o", "complexity"],
        "front": "What is <b>O(1) Constant Time</b>? Give 3 JavaScript examples.",
        "back": "Execution time never changes regardless of input size.<br><br><code>arr[0]</code> — index lookup<br><code>myMap.get('key')</code> — Map/Set lookup<br><code>arr.push(42)</code> — push to end of array",
        "source": "0002-big-o-notation.html",
        "created": "2026-07-14"
    },
    {
        "id": "dsajavas-011",
        "deck": "Dsa Javascript",
        "tags": ["big-o", "complexity"],
        "front": "What is <b>O(n) Linear Time</b>? Give 3 JavaScript examples.",
        "back": "If input doubles, the work doubles. You visit every item at least once.<br><br><code>for (let x of arr) {}</code> — standard loop<br><code>arr.map(x => x*2)</code> — array transformations<br><code>arr.indexOf(target)</code> — linear search",
        "source": "0002-big-o-notation.html",
        "created": "2026-07-14"
    },
    {
        "id": "dsajavas-012",
        "deck": "Dsa Javascript",
        "tags": ["big-o", "complexity"],
        "front": "What is <b>O(n²) Quadratic Time</b>? When does it appear in JavaScript?",
        "back": "For every item, you loop through the entire array again. Appears with <b>nested loops</b>:<br><br><code>for (let i ...) { for (let j ...) { } }</code><br><br>Noticeably sluggish for large inputs.",
        "source": "0002-big-o-notation.html",
        "created": "2026-07-14"
    },
    {
        "id": "dsajavas-013",
        "deck": "Dsa Javascript",
        "tags": ["big-o", "simplification"],
        "front": "What are the <b>Two Golden Rules</b> of Big O simplification?",
        "back": "<b>1. Drop Constants:</b> O(2n) → O(n). Two sequential loops are still linear, not double.<br><br><b>2. Drop Non-Dominant Terms:</b> O(n² + n) → O(n²). As n grows huge, the smaller term becomes mathematically insignificant.",
        "source": "0002-big-o-notation.html",
        "created": "2026-07-14"
    },
    {
        "id": "dsajavas-014",
        "deck": "Dsa Javascript",
        "tags": ["big-o", "space-complexity"],
        "front": "What is <b>Space Complexity</b> and how does it differ from Time Complexity?",
        "back": "Time complexity is about CPU cycles. Space complexity is about <b>RAM usage</b> (auxiliary memory your algorithm allocates).<br><br><b>O(1) Space</b>: In-place, only a few simple variables (like index pointers).<br><b>O(n) Space</b>: A new array/Map/Set grows proportionally to input (e.g., <code>arr.slice()</code>, <code>arr.filter()</code>).",
        "source": "0002-big-o-notation.html",
        "created": "2026-07-14"
    },
    {
        "id": "dsajavas-015",
        "deck": "Dsa Javascript",
        "tags": ["big-o", "analysis"],
        "front": "What is the time and space complexity of this function?<br><br><code>function hasDuplicate(arr) { const seen = new Set(); for (let n of arr) { if (seen.has(n)) return true; seen.add(n); } return false; }</code>",
        "back": "<b>Time: O(n)</b> — one loop over the array, with O(1) Set operations inside.<br><b>Space: O(n)</b> — the <code>seen</code> Set can grow up to the size of the input array.",
        "source": "0002-big-o-notation.html",
        "created": "2026-07-14"
    },

    // --- Lesson 03: JavaScript Arrays and Strings ---
    {
        "id": "dsajavas-016",
        "deck": "Dsa Javascript",
        "tags": ["arrays", "performance"],
        "front": "What is the time complexity of <code>push()</code> and <code>pop()</code> on a JavaScript array? Why?",
        "back": "<b>O(1) Constant Time.</b> Adding or removing from the <em>end</em> of an array is instantaneous — no other elements are re-indexed.",
        "source": "0003-javascript-arrays-and-strings.html",
        "created": "2026-07-14"
    },
    {
        "id": "dsajavas-017",
        "deck": "Dsa Javascript",
        "tags": ["arrays", "performance"],
        "front": "What is the time complexity of <code>shift()</code> and <code>unshift()</code>? Why are they dangerous?",
        "back": "<b>O(n) Linear Time.</b> Adding or removing from the <em>beginning</em> forces the JavaScript engine to re-index every remaining element in memory.<br><br><b>Trap:</b> Calling <code>shift()</code> inside a loop turns your O(n) loop into O(n²) quadratic time.",
        "source": "0003-javascript-arrays-and-strings.html",
        "created": "2026-07-14"
    },
    {
        "id": "dsajavas-018",
        "deck": "Dsa Javascript",
        "tags": ["arrays", "methods"],
        "front": "What is the difference between <code>slice()</code> and <code>splice()</code>?",
        "back": "<code>slice(start, end)</code>: Returns a shallow <b>copy</b>. <b>Time: O(k), Space: O(k)</b> (k = slice size). Non-destructive.<br><br><code>splice(start, count)</code>: Modifies the array <b>in-place</b>. <b>Time: O(n), Space: O(1)</b>. Destructive.",
        "source": "0003-javascript-arrays-and-strings.html",
        "created": "2026-07-14"
    },
    {
        "id": "dsajavas-019",
        "deck": "Dsa Javascript",
        "tags": ["arrays", "hidden-traps"],
        "front": "Why is calling <code>.includes()</code> or <code>.indexOf()</code> inside a loop an O(n²) trap?",
        "back": "These methods perform a <b>linear scan</b> from index 0 to the end — they don't magically jump to the answer. Calling O(n) inside an O(n) loop multiplies complexity to <b>O(n × m)</b> or O(n²).<br><br><b>Fix:</b> Convert the array to a <code>Set</code> or <code>Map</code> first, making lookups O(1).",
        "source": "0003-javascript-arrays-and-strings.html",
        "created": "2026-07-14"
    },
    {
        "id": "dsajavas-020",
        "deck": "Dsa Javascript",
        "tags": ["arrays", "two-pointers"],
        "front": "How do you check if a string is a palindrome in <b>O(1) space</b> (without reversing it)?",
        "back": "Use the <b>Two Pointer</b> technique:<br><br><code>let left = 0, right = str.length - 1;<br>while (left &lt; right) {<br>&nbsp;&nbsp;if (str[left] !== str[right]) return false;<br>&nbsp;&nbsp;left++; right--;<br>}<br>return true;</code><br><br>This avoids allocating a reversed copy, keeping space at O(1).",
        "source": "0003-javascript-arrays-and-strings.html",
        "created": "2026-07-14"
    },
    {
        "id": "dsajavas-021",
        "deck": "Dsa Javascript",
        "tags": ["arrays", "tricky"],
        "front": "A function loops over <code>n</code> words. Inside, it calls <code>vowels.includes(word[0])</code> where <code>vowels</code> is a fixed 5-element array. What is the total time complexity?",
        "back": "<b>O(n)</b> — not O(n²).<br><br>Even though <code>.includes()</code> is O(m), the <code>vowels</code> array has a <em>fixed constant size of 5</em>. O(5) simplifies to O(1). The dominant term is the outer O(n) loop.",
        "source": "0003-javascript-arrays-and-strings.html",
        "created": "2026-07-14"
    },

    // ══════════════════════════════════════════════
    //  GITHUB ACTIONS DOCKER
    // ══════════════════════════════════════════════

    // --- Lesson 01: The Big Picture (CI/CD) ---
    {
        "id": "githubac-001",
        "deck": "Github Actions Docker",
        "tags": ["cicd", "fundamentals"],
        "front": "What problem does <b>CI/CD</b> solve?",
        "back": "It automates the steps between writing code and getting it to users — eliminating human errors like forgetting to run tests, building inconsistently, or using the wrong server environment (\"works on my machine\").",
        "source": "0001-the-big-picture-what-is-cicd.html",
        "created": "2026-07-14"
    },
    {
        "id": "githubac-002",
        "deck": "Github Actions Docker",
        "tags": ["cicd", "fundamentals"],
        "front": "What is <b>CI (Continuous Integration)</b>? What does it do?",
        "back": "CI answers \"<em>does the code work?</em>\" Every time someone pushes, an automated system:<br><br>✓ Pulls the latest code<br>✓ Installs dependencies<br>✓ Runs linters<br>✓ Runs tests<br>✓ Builds the application<br><br>If any step fails, the team knows <em>immediately</em>.",
        "source": "0001-the-big-picture-what-is-cicd.html",
        "created": "2026-07-14"
    },
    {
        "id": "githubac-003",
        "deck": "Github Actions Docker",
        "tags": ["cicd", "fundamentals"],
        "front": "What is the difference between <b>Continuous Delivery</b> and <b>Continuous Deployment</b>?",
        "back": "<b>Continuous Delivery</b>: Code is always <em>ready</em> to deploy, but a human presses the button.<br><br><b>Continuous Deployment</b>: Code is deployed <em>automatically</em> after all CI checks pass — no human needed.",
        "source": "0001-the-big-picture-what-is-cicd.html",
        "created": "2026-07-14"
    },
    {
        "id": "githubac-004",
        "deck": "Github Actions Docker",
        "tags": ["cicd", "fundamentals"],
        "front": "What is a <b>CI/CD Pipeline</b>?",
        "back": "The full <em>sequence of automated stages</em> code passes through — from checkout to deployment. The shape is stack-agnostic; only the commands inside each stage change across different technologies.",
        "source": "0001-the-big-picture-what-is-cicd.html",
        "created": "2026-07-14"
    },

    // --- Lesson 02: What Docker Actually Is ---
    {
        "id": "githubac-005",
        "deck": "Github Actions Docker",
        "tags": ["docker", "fundamentals"],
        "front": "What problem does Docker solve? What is the \"works on my machine\" problem?",
        "back": "A Node.js app depends on your specific OS, Node version, native library versions, and environment variables. Docker packages the app <em>and its entire environment</em> into one portable unit, so it runs identically on your laptop, in CI, and in production.",
        "source": "0002-what-docker-actually-is.html",
        "created": "2026-07-14"
    },
    {
        "id": "githubac-006",
        "deck": "Github Actions Docker",
        "tags": ["docker", "fundamentals"],
        "front": "What is the key difference between a Docker <b>Container</b> and a <b>Virtual Machine (VM)</b>?",
        "back": "A <b>VM</b> emulates an entire computer, including its own kernel. It's fully isolated but extremely heavy (minutes to boot).<br><br>A <b>Container</b> shares the host's kernel but isolates processes, networking, and filesystem. It's lightweight and starts in milliseconds.",
        "source": "0002-what-docker-actually-is.html",
        "created": "2026-07-14"
    },
    {
        "id": "githubac-007",
        "deck": "Github Actions Docker",
        "tags": ["docker", "fundamentals"],
        "front": "What is a Docker <b>Image</b> vs a <b>Container</b>?",
        "back": "An <b>Image</b> is the read-only blueprint containing the OS, runtime, code, and dependencies. It never changes once built.<br><br>A <b>Container</b> is a <em>running instance</em> of an image. You can start 10 containers from a single image.<br><br><em>You <b>build</b> an image. You <b>run</b> a container.</em>",
        "source": "0002-what-docker-actually-is.html",
        "created": "2026-07-14"
    },
    {
        "id": "githubac-008",
        "deck": "Github Actions Docker",
        "tags": ["docker", "dockerfile"],
        "front": "What do these Dockerfile instructions do: <code>FROM</code>, <code>WORKDIR</code>, <code>RUN</code>, <code>CMD</code>?",
        "back": "<code>FROM</code>: Base image (e.g., <code>node:20-alpine</code>). Always first.<br><code>WORKDIR</code>: Sets the working directory inside the container (like <code>cd /app</code>).<br><code>RUN</code>: Executes during the <em>build process</em> (e.g., <code>npm install</code>).<br><code>CMD</code>: Default command to run <em>when a container starts</em> (e.g., <code>node server.js</code>).",
        "source": "0002-what-docker-actually-is.html",
        "created": "2026-07-14"
    },
    {
        "id": "githubac-009",
        "deck": "Github Actions Docker",
        "tags": ["docker", "layer-caching"],
        "front": "What is the <b>Golden Rule</b> of Dockerfile layer ordering for build caching?",
        "back": "Put things that change <b>least often at the top</b>, and things that change <b>most often at the bottom</b>.<br><br>This is why we <code>COPY package.json</code> and <code>RUN npm install</code> <em>before</em> copying source code — dependencies rarely change, but source code changes constantly.",
        "source": "0002-what-docker-actually-is.html",
        "created": "2026-07-14"
    },
    {
        "id": "githubac-010",
        "deck": "Github Actions Docker",
        "tags": ["docker", "dockerfile"],
        "front": "What is the difference between <code>RUN</code> and <code>CMD</code> in a Dockerfile?",
        "back": "<code>RUN</code> executes commands <em>during the build</em> to assemble the image (e.g., <code>npm install</code>).<br><br><code>CMD</code> specifies the default command that runs <em>when a container is started</em> (e.g., <code>node server.js</code>).",
        "source": "0002-what-docker-actually-is.html",
        "created": "2026-07-14"
    },

    // --- Lesson 03: Anatomy of a GitHub Actions Workflow ---
    {
        "id": "githubac-011",
        "deck": "Github Actions Docker",
        "tags": ["github-actions", "workflow-anatomy"],
        "front": "What is the 4-level hierarchy of a GitHub Actions workflow?",
        "back": "<b>Workflow</b> → triggered by an event, defined in a YAML file<br><b>Job</b> → runs on a Runner (VM), jobs run in <em>parallel</em> by default<br><b>Step</b> → runs sequentially inside a job<br>Each step uses either <code>uses:</code> (pre-built Action) or <code>run:</code> (shell command)",
        "source": "0003-anatomy-of-a-workflow.html",
        "created": "2026-07-14"
    },
    {
        "id": "githubac-012",
        "deck": "Github Actions Docker",
        "tags": ["github-actions", "workflow-anatomy"],
        "front": "Where must a GitHub Actions workflow file be placed in a repository?",
        "back": "In the <code>.github/workflows/</code> directory at the root of the repository. The filename can be anything (e.g., <code>ci.yml</code>). One repository can have many workflow files.",
        "source": "0003-anatomy-of-a-workflow.html",
        "created": "2026-07-14"
    },
    {
        "id": "githubac-013",
        "deck": "Github Actions Docker",
        "tags": ["github-actions", "workflow-anatomy"],
        "front": "What is a <b>Runner</b> in GitHub Actions? What is crucial to understand about it?",
        "back": "A Runner is a fresh, ephemeral virtual machine (usually Ubuntu) that GitHub spins up to execute a job.<br><br><b>Crucial:</b> Every job starts on a <em>completely brand new, clean machine</em> — your code is not there, Node.js is not there, nothing is pre-installed. You must explicitly set everything up.",
        "source": "0003-anatomy-of-a-workflow.html",
        "created": "2026-07-14"
    },
    {
        "id": "githubac-014",
        "deck": "Github Actions Docker",
        "tags": ["github-actions", "workflow-anatomy"],
        "front": "What does <code>actions/checkout@v4</code> do, and why is it almost always the first step?",
        "back": "It runs <code>git clone</code> and downloads your repository code onto the runner. Because the runner is a fresh, empty VM, <em>your code is not there yet</em>. Without this step, all subsequent commands fail with \"file not found\".",
        "source": "0003-anatomy-of-a-workflow.html",
        "created": "2026-07-14"
    },

    // --- Lesson 04: Your First CI Pipeline ---
    {
        "id": "githubac-015",
        "deck": "Github Actions Docker",
        "tags": ["github-actions", "job-dependencies"],
        "front": "What is the difference between <code>uses:</code> and <code>needs:</code> in GitHub Actions?",
        "back": "<code>uses:</code> is a <b>step-level</b> keyword that invokes a pre-built Action (e.g., <code>uses: actions/checkout@v4</code>).<br><br><code>needs:</code> is a <b>job-level</b> keyword that makes one job wait for another to succeed before starting (e.g., <code>needs: lint</code>).",
        "source": "0004-your-first-ci-pipeline.html",
        "created": "2026-07-14"
    },
    {
        "id": "githubac-016",
        "deck": "Github Actions Docker",
        "tags": ["github-actions", "job-dependencies"],
        "front": "Job A installs all dependencies with <code>npm ci</code>. Job B has <code>needs: A</code>. Does Job B start with the dependencies already installed?",
        "back": "<b>No.</b> <code>needs:</code> controls <em>ordering</em>, not <em>sharing</em>. Job B gets its own completely fresh, isolated runner and must set up its environment from scratch — including checkout and installing dependencies.",
        "source": "0004-your-first-ci-pipeline.html",
        "created": "2026-07-14"
    },
    {
        "id": "githubac-017",
        "deck": "Github Actions Docker",
        "tags": ["github-actions", "best-practices"],
        "front": "In CI, should you use <code>npm install</code> or <code>npm ci</code>? Why?",
        "back": "Always use <code>npm ci</code> in CI pipelines.<br><br>It does a <em>clean, deterministic</em> install strictly from <code>package-lock.json</code>, is faster, and <em>never modifies</em> the lockfile — guaranteeing reproducible builds.",
        "source": "0004-your-first-ci-pipeline.html",
        "created": "2026-07-14"
    },
    {
        "id": "githubac-018",
        "deck": "Github Actions Docker",
        "tags": ["github-actions", "triggers"],
        "front": "Why should a CI workflow trigger on both <code>push</code> and <code>pull_request</code>?",
        "back": "<code>pull_request</code>: Runs CI <em>before</em> merging — acts as a gate to reject bad code from entering main.<br><br><code>push</code>: Runs CI <em>after</em> code lands on main — catches anything that slipped through.<br><br>Together, they form a comprehensive safety net.",
        "source": "0004-your-first-ci-pipeline.html",
        "created": "2026-07-14"
    },

    // --- Lesson 05: Matrix Builds & Caching ---
    {
        "id": "githubac-019",
        "deck": "Github Actions Docker",
        "tags": ["github-actions", "matrix"],
        "front": "What does <code>strategy.matrix</code> do in GitHub Actions?",
        "back": "It runs the same job multiple times <em>in parallel</em>, once per value (or combination of values) in a list.<br><br>Example: <code>matrix: { node-version: [18, 20, 22] }</code> creates 3 independent parallel jobs, each testing a different Node version.",
        "source": "0005-matrix-builds-and-caching.html",
        "created": "2026-07-14"
    },
    {
        "id": "githubac-020",
        "deck": "Github Actions Docker",
        "tags": ["github-actions", "matrix"],
        "front": "A matrix has <code>node-version: [18, 20]</code> and <code>os: [ubuntu, windows]</code>. How many jobs are created?",
        "back": "<b>4 jobs</b> — one for every combination:<br>(18 + ubuntu), (18 + windows), (20 + ubuntu), (20 + windows).<br><br>The matrix computes the <em>cross-product</em> of all variable values.",
        "source": "0005-matrix-builds-and-caching.html",
        "created": "2026-07-14"
    },
    {
        "id": "githubac-021",
        "deck": "Github Actions Docker",
        "tags": ["github-actions", "matrix"],
        "front": "What does <code>fail-fast: false</code> do in a matrix strategy, and when should you use it?",
        "back": "By default (<code>fail-fast: true</code>), if any matrix job fails, all other running jobs are cancelled.<br><br>Setting <code>fail-fast: false</code> lets every job run to completion — useful for <em>debugging cross-version compatibility</em> so you can see which versions pass and which fail.",
        "source": "0005-matrix-builds-and-caching.html",
        "created": "2026-07-14"
    },
    {
        "id": "githubac-022",
        "deck": "Github Actions Docker",
        "tags": ["github-actions", "caching"],
        "front": "What does <code>cache: 'npm'</code> on <code>actions/setup-node</code> actually cache — <code>node_modules/</code> or something else?",
        "back": "It caches <code>~/.npm</code> — npm's <em>download cache</em>, not <code>node_modules/</code>.<br><br><code>npm ci</code> still creates <code>node_modules/</code>, but reads packages from the local cache instead of downloading from the internet — much faster.",
        "source": "0005-matrix-builds-and-caching.html",
        "created": "2026-07-14"
    },
    {
        "id": "githubac-023",
        "deck": "Github Actions Docker",
        "tags": ["github-actions", "caching"],
        "front": "What determines a cache <b>hit</b> vs a cache <b>miss</b> in GitHub Actions?",
        "back": "The <b>cache key</b>. For npm, it's typically built from the runner OS + a hash of <code>package-lock.json</code>.<br><br>If the key matches a stored cache → <b>hit</b> (restored instantly).<br>If the lockfile changed → hash changes → key mismatches → <b>miss</b> (fresh download).",
        "source": "0005-matrix-builds-and-caching.html",
        "created": "2026-07-14"
    },

    // --- Lesson 06: Secrets, Env Variables & Permissions ---
    {
        "id": "githubac-024",
        "deck": "Github Actions Docker",
        "tags": ["github-actions", "security"],
        "front": "What is the safest way to pass a secret into a <code>run:</code> step in GitHub Actions?",
        "back": "Map the secret to an <b>environment variable</b> using the <code>env:</code> block:<br><br><code>env:<br>&nbsp;&nbsp;DB_PASSWORD: ${{ secrets.DB_PASSWORD }}</code><br><br>Never inject directly into the shell command — that can lead to script injection vulnerabilities.",
        "source": "0006-secrets-env-permissions.html",
        "created": "2026-07-14"
    },
    {
        "id": "githubac-025",
        "deck": "Github Actions Docker",
        "tags": ["github-actions", "security"],
        "front": "Can you view the value of a GitHub Secret after saving it in repository settings?",
        "back": "<b>No.</b> Once saved, the secret is encrypted and cannot be viewed, even by the repository owner. You can only <em>update</em>, <em>delete</em>, or <em>use it in workflows</em>.",
        "source": "0006-secrets-env-permissions.html",
        "created": "2026-07-14"
    },
    {
        "id": "githubac-026",
        "deck": "Github Actions Docker",
        "tags": ["github-actions", "security"],
        "front": "What is <code>GITHUB_TOKEN</code> and why is it useful?",
        "back": "A temporary secret GitHub automatically creates for every workflow run. It allows your workflow to interact with GitHub itself (e.g., commenting on PRs, creating releases) without needing a personal access token.",
        "source": "0006-secrets-env-permissions.html",
        "created": "2026-07-14"
    },
    {
        "id": "githubac-027",
        "deck": "Github Actions Docker",
        "tags": ["github-actions", "security"],
        "front": "Why should you use a <code>permissions:</code> block with <code>GITHUB_TOKEN</code>?",
        "back": "To follow the <b>principle of least privilege</b>. Explicitly declaring what the token can do (e.g., <code>contents: read</code>) ensures that if a step is compromised, it cannot perform unintended actions on your repository.",
        "source": "0006-secrets-env-permissions.html",
        "created": "2026-07-14"
    },

    // ══════════════════════════════════════════════
    //  MICROSERVICES NODEJS
    // ══════════════════════════════════════════════

    // --- Lesson 1: What Microservices Actually Are ---
    {
        "id": "microser-001",
        "deck": "Microservices Nodejs",
        "tags": ["fundamentals", "architecture"],
        "front": "What is the core <b>promise</b> of microservices architecture?",
        "back": "Independent deployability — each service can be deployed, scaled, and restarted without touching other services. A crash in the Payments service should not bring down the Campaign service.",
        "source": "0001-what-microservices-actually-are.html",
        "created": "2026-07-14"
    },
    {
        "id": "microser-002",
        "deck": "Microservices Nodejs",
        "tags": ["fundamentals", "architecture"],
        "front": "What are the key <b>costs</b> that microservices introduce that a monolith does not have?",
        "back": "• Network latency (every call can fail or be slow)<br>• Distributed transactions (no simple DB rollback)<br>• Distributed tracing becomes mandatory<br>• Operational complexity (many services to deploy, monitor, and secure)<br>• Every inter-service call is a potential failure point",
        "source": "0001-what-microservices-actually-are.html",
        "created": "2026-07-14"
    },
    {
        "id": "microser-003",
        "deck": "Microservices Nodejs",
        "tags": ["fundamentals", "architecture"],
        "front": "What is a <b>Modular Monolith</b> and why is it criminally underrated?",
        "back": "A monolith internally organized into well-defined modules with clear boundaries — but deployed as one unit.<br><br>Gives most of the code-organization benefits of microservices with <em>almost none of the operational cost</em>. If your team is small (&lt;10 engineers) or early-stage, this is almost certainly the right call.",
        "source": "0001-what-microservices-actually-are.html",
        "created": "2026-07-14"
    },
    {
        "id": "microser-004",
        "deck": "Microservices Nodejs",
        "tags": ["fundamentals", "conways-law"],
        "front": "What is <b>Conway's Law</b> and why does it matter for microservices?",
        "back": "\"Any organisation that designs a system will produce a design whose structure is a copy of the organisation's communication structure.\" — Melvin Conway, 1968<br><br>Implication: If you split code into microservices, your teams <em>must</em> also be split accordingly. Structure your teams first, then derive service boundaries.",
        "source": "0001-what-microservices-actually-are.html",
        "created": "2026-07-14"
    },

    // --- Lesson 2: Bounded Contexts & DDD ---
    {
        "id": "microser-005",
        "deck": "Microservices Nodejs",
        "tags": ["ddd", "bounded-contexts"],
        "front": "What is a <b>Bounded Context</b> in Domain-Driven Design?",
        "back": "A logical boundary within which a particular domain model applies and all terms have precise, unambiguous meaning.<br><br>Example: \"Campaign\" means something different in the Campaign Management context vs. the Finance context. A Bounded Context draws the line so models don't bleed into each other.",
        "source": "0002-bounded-contexts-and-ddd.html",
        "created": "2026-07-14"
    },
    {
        "id": "microser-006",
        "deck": "Microservices Nodejs",
        "tags": ["ddd", "bounded-contexts"],
        "front": "What are the 3 heuristics for drawing <b>service boundaries</b> (Bounded Contexts)?",
        "back": "<b>1. Language divergence</b>: Where does the same word mean different things?<br><b>2. Rate of change</b>: Which parts change together vs. independently?<br><b>3. Team ownership</b>: Who \"owns\" this business capability?",
        "source": "0002-bounded-contexts-and-ddd.html",
        "created": "2026-07-14"
    },
    {
        "id": "microser-007",
        "deck": "Microservices Nodejs",
        "tags": ["ddd", "bounded-contexts"],
        "front": "Why is grouping modules by <b>business capability</b> better than grouping by <b>code structure</b>?",
        "back": "Code folders like <code>/models</code>, <code>/controllers</code>, <code>/services</code> reflect technical layers, not business concepts. Business capabilities group things that change for the same business reason — making each service's boundaries stable, independently deployable, and team-ownable.",
        "source": "0002-bounded-contexts-and-ddd.html",
        "created": "2026-07-14"
    },

    // ══════════════════════════════════════════════
    //  REACT ADVANCED
    // ══════════════════════════════════════════════

    // --- Lesson 01: Read a React Feature From the Outside In ---
    {
        "id": "reactadv-001",
        "deck": "React Advanced",
        "tags": ["code-reading", "mental-model"],
        "front": "What are the 3 questions in the <b>Outside-In</b> React code reading approach?",
        "back": "<b>1. What renders?</b> — Find the component hierarchy and feature boundary.<br><b>2. What changes?</b> — Identify state and what is derived from it.<br><b>3. Who owns it?</b> — Find the component that defines and manages the changing state.",
        "source": "0001-read-a-react-feature-from-the-outside-in.html",
        "created": "2026-07-14"
    },
    {
        "id": "reactadv-002",
        "deck": "React Advanced",
        "tags": ["state", "derived-data"],
        "front": "What is the difference between <b>state</b> and <b>derived data</b> in React?",
        "back": "<b>State</b>: A value stored with <code>useState</code> that React tracks and re-renders on change.<br><br><b>Derived Data</b>: A value <em>computed from</em> existing props or state during render. It does not need to be stored — just recalculate it.<br><br>Example: <code>const visibleOrders = orders.filter(...)</code> is derived, not state.",
        "source": "0001-read-a-react-feature-from-the-outside-in.html",
        "created": "2026-07-14"
    },
    {
        "id": "reactadv-003",
        "deck": "React Advanced",
        "tags": ["state", "ownership"],
        "front": "Who should <b>own</b> a piece of state in React?",
        "back": "The <em>lowest common ancestor</em> — the component that is the parent of all components that need to read or modify that state.<br><br>If both <code>OrderFilters</code> and <code>OrderList</code> depend on <code>searchText</code>, then their parent <code>OrdersPage</code> should own it.",
        "source": "0001-read-a-react-feature-from-the-outside-in.html",
        "created": "2026-07-14"
    },
    {
        "id": "reactadv-004",
        "deck": "React Advanced",
        "tags": ["state", "anti-patterns"],
        "front": "A filtered list <code>visibleOrders</code> is shown in the UI. Should it be stored in <code>useState</code>?",
        "back": "<b>No.</b> Ask: \"Can this value be computed from existing props or state?\" If yes — compute it during render. <code>visibleOrders</code> is derived from <code>orders</code>, <code>searchText</code>, and <code>status</code>. Storing it as state creates duplicate truth and sync bugs.",
        "source": "0001-read-a-react-feature-from-the-outside-in.html",
        "created": "2026-07-14"
    }
,

    // --- Lesson 07: Essential Docker CLI ---
    {
        "id": "githubac-028",
        "deck": "Github Actions Docker",
        "tags": ["docker", "cli"],
        "front": "What does the <code>-d</code> flag do in <code>docker run -d</code>?",
        "back": "Runs the container in <b>detached mode</b> (in the background), freeing up your terminal while the container keeps running.",
        "source": "0007-essential-docker-cli.html",
        "created": "2026-07-14"
    },
    {
        "id": "githubac-029",
        "deck": "Github Actions Docker",
        "tags": ["docker", "cli"],
        "front": "What is the command to list <b>all</b> containers, including stopped ones?",
        "back": "<code>docker ps -a</code>",
        "source": "0007-essential-docker-cli.html",
        "created": "2026-07-14"
    },
    {
        "id": "githubac-030",
        "deck": "Github Actions Docker",
        "tags": ["docker", "cli"],
        "front": "How do you execute a shell inside an already running container named <code>my_web</code>?",
        "back": "<code>docker exec -it my_web sh</code> (or <code>bash</code>). This is effectively how you \"SSH\" into a running container.",
        "source": "0007-essential-docker-cli.html",
        "created": "2026-07-14"
    },

    // --- Lesson 08: Writing your first Dockerfile ---
    {
        "id": "githubac-031",
        "deck": "Github Actions Docker",
        "tags": ["docker", "dockerfile"],
        "front": "Why is the <code>FROM</code> instruction required in every Dockerfile?",
        "back": "It defines the <b>base image</b> (the starting point) for your container, such as <code>node:20-alpine</code>. Every image must be built on top of an existing one.",
        "source": "0008-writing-your-first-dockerfile.html",
        "created": "2026-07-14"
    },
    {
        "id": "githubac-032",
        "deck": "Github Actions Docker",
        "tags": ["docker", "dockerfile"],
        "front": "What is the difference between <code>RUN</code> and <code>CMD</code> in a Dockerfile?",
        "back": "<code>RUN</code> executes a command <b>during the build process</b> (like <code>npm install</code>).<br><br><code>CMD</code> defines the default command that runs <b>when the container starts</b> (like <code>npm start</code>).",
        "source": "0008-writing-your-first-dockerfile.html",
        "created": "2026-07-14"
    },

    // --- Lesson 09: Docker Volumes & Persistent Data ---
    {
        "id": "githubac-033",
        "deck": "Github Actions Docker",
        "tags": ["docker", "volumes"],
        "front": "Why are Docker volumes necessary for databases?",
        "back": "Containers are <b>ephemeral</b>. Any data written inside a container is lost when the container is deleted. Volumes persist data outside the container's lifecycle on the host machine.",
        "source": "0009-docker-volumes-persistent-data.html",
        "created": "2026-07-14"
    },
    {
        "id": "githubac-034",
        "deck": "Github Actions Docker",
        "tags": ["docker", "volumes"],
        "front": "What is the difference between a <b>Named Volume</b> and a <b>Bind Mount</b>?",
        "back": "A <b>Named Volume</b> is managed entirely by Docker in its internal storage (best for databases).<br><br>A <b>Bind Mount</b> maps a specific folder from your host machine into the container (best for local development, like syncing source code).",
        "source": "0009-docker-volumes-persistent-data.html",
        "created": "2026-07-14"
    },

    // --- Lesson 10: Docker Networks & Container Communication ---
    {
        "id": "githubac-035",
        "deck": "Github Actions Docker",
        "tags": ["docker", "networking"],
        "front": "Why can't a Node.js container connect to a PostgreSQL container using <code>localhost</code>?",
        "back": "Because each container has its own isolated network namespace. Inside the Node.js container, <code>localhost</code> points to itself, not the host machine or other containers.",
        "source": "0010-docker-networks-container-communication.html",
        "created": "2026-07-14"
    },
    {
        "id": "githubac-036",
        "deck": "Github Actions Docker",
        "tags": ["docker", "networking"],
        "front": "Why should you create a <b>user-defined bridge network</b> instead of using the default bridge?",
        "back": "User-defined networks provide <b>automatic DNS resolution</b>. Containers can talk to each other using their container names (e.g., <code>http://api_server</code>), which is impossible on the default bridge.",
        "source": "0010-docker-networks-container-communication.html",
        "created": "2026-07-14"
    },
    {
        "id": "githubac-037",
        "deck": "Github Actions Docker",
        "tags": ["docker", "networking", "security"],
        "front": "What is the security risk of publishing a database port (e.g., <code>-p 5432:5432</code>) in production?",
        "back": "It exposes the database directly to the internet. Containers on the same Docker network can communicate with each other automatically without publishing ports to the host.",
        "source": "0010-docker-networks-container-communication.html",
        "created": "2026-07-14"
    }
];
