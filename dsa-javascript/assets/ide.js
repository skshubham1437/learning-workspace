/* ── ide.js ───────────────────────────────────
   Interactive In-Browser JS IDE & Test Runner
   Shared JavaScript execution engine for lessons.
   ─────────────────────────────────────────── */

(function() {
  // Load CodeMirror CDN dependencies dynamically if not already loaded
  function loadCodeMirror(callback) {
    if (window.CodeMirror) {
      return callback();
    }
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.css';
    document.head.appendChild(css);

    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/codemirror.min.js';
    script.onload = function() {
      const modeScript = document.createElement('script');
      modeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.16/mode/javascript/javascript.min.js';
      modeScript.onload = callback;
      modeScript.onerror = callback;
      document.head.appendChild(modeScript);
    };
    script.onerror = callback;
    document.head.appendChild(script);
  }

  // Deep equality check for test assertions
  function isEqual(val1, val2) {
    if (val1 === val2) return true;
    if (val1 == null || val2 == null) return false;
    if (typeof val1 !== 'object' || typeof val2 !== 'object') return false;
    if (Array.isArray(val1) !== Array.isArray(val2)) return false;

    const keys1 = Object.keys(val1);
    const keys2 = Object.keys(val2);
    if (keys1.length !== keys2.length) return false;

    for (let key of keys1) {
      if (!keys2.includes(key) || !isEqual(val1[key], val2[key])) {
        return false;
      }
    }
    return true;
  }

  // Format value for readable console/test output
  function formatVal(val) {
    if (val === undefined) return 'undefined';
    if (val === null) return 'null';
    if (typeof val === 'string') return `"${val}"`;
    if (typeof val === 'object') {
      try {
        return JSON.stringify(val);
      } catch (e) {
        return String(val);
      }
    }
    return String(val);
  }

  // Initialize a single IDE instance
  function initIDE(container, index) {
    const title = container.getAttribute('data-title') || 'Interactive Coding Challenge';
    const functionName = container.getAttribute('data-function-name') || 'solve';
    const starterCode = container.getAttribute('data-starter-code') || `function ${functionName}() {\n  // Write your code here\n}`;
    
    // Parse test cases from JSON script tag inside container or attribute
    let testCases = [];
    const scriptTag = container.querySelector('.test-cases');
    if (scriptTag) {
      try {
        testCases = JSON.parse(scriptTag.textContent.trim());
      } catch (e) {
        console.error('Failed to parse test cases for IDE:', e);
      }
    }

    // Clear container and build IDE DOM
    container.innerHTML = '';
    container.className = 'ide-container';

    // 1. Header
    const header = document.createElement('div');
    header.className = 'ide-header';
    header.innerHTML = `
      <div class="ide-title-wrap">
        <span class="ide-badge">JS Playground</span>
        <span class="ide-title">${title}</span>
      </div>
      <button class="ide-run-btn" id="run-btn-${index}">
        <span>▶ Run Code & Tests</span>
      </button>
    `;
    container.appendChild(header);

    // 2. Editor Area
    const editorWrap = document.createElement('div');
    editorWrap.className = 'ide-editor-wrap';
    const textarea = document.createElement('textarea');
    textarea.className = 'ide-textarea';
    textarea.value = starterCode;
    editorWrap.appendChild(textarea);
    container.appendChild(editorWrap);

    // 3. Output Panel (Tabs: Tests & Console)
    const outputPanel = document.createElement('div');
    outputPanel.className = 'ide-output-panel';
    outputPanel.innerHTML = `
      <div class="ide-tabs">
        <button class="ide-tab-btn active" data-tab="tests">Test Results</button>
        <button class="ide-tab-btn" data-tab="console">Console Logs <span class="console-badge" style="display:none; background:var(--accent); color:white; border-radius:10px; padding:0 6px; font-size:0.7rem;">0</span></button>
      </div>
      <div class="ide-tab-content active" id="tab-tests-${index}">
        <div class="test-suite-summary" id="summary-${index}">Click "Run Code & Tests" to evaluate your solution.</div>
        <div class="test-cases-list" id="test-list-${index}"></div>
      </div>
      <div class="ide-tab-content" id="tab-console-${index}">
        <div class="console-logs-box" id="console-box-${index}">
          <span class="console-empty">No console output yet. Use console.log() in your code to inspect variables.</span>
        </div>
      </div>
    `;
    container.appendChild(outputPanel);

    // Tab Switching Logic
    const tabBtns = outputPanel.querySelectorAll('.ide-tab-btn');
    const tabContents = outputPanel.querySelectorAll('.ide-tab-content');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        const target = btn.getAttribute('data-tab');
        outputPanel.querySelector(`#tab-${target}-${index}`).classList.add('active');
      });
    });

    // Initialize CodeMirror if available, else setup textarea Tab indentation
    let editorInstance = null;
    if (window.CodeMirror) {
      editorInstance = window.CodeMirror.fromTextArea(textarea, {
        mode: 'javascript',
        lineNumbers: true,
        tabSize: 2,
        indentWithTabs: false,
        lineWrapping: true,
        viewportMargin: Infinity
      });
    } else {
      textarea.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
          e.preventDefault();
          const start = this.selectionStart;
          const end = this.selectionEnd;
          this.value = this.value.substring(0, start) + '  ' + this.value.substring(end);
          this.selectionStart = this.selectionEnd = start + 2;
        }
      });
    }

    // Run Code & Tests Button Click Handler
    const runBtn = header.querySelector(`#run-btn-${index}`);
    runBtn.addEventListener('click', () => {
      const userCode = editorInstance ? editorInstance.getValue() : textarea.value;
      runTests(index, userCode, functionName, testCases, outputPanel);
    });
  }

  // Execute learner code and evaluate test cases
  function runTests(index, userCode, functionName, testCases, outputPanel) {
    const summaryEl = outputPanel.querySelector(`#summary-${index}`);
    const testListEl = outputPanel.querySelector(`#test-list-${index}`);
    const consoleBoxEl = outputPanel.querySelector(`#console-box-${index}`);
    const consoleBadgeEl = outputPanel.querySelector('.console-badge');
    const testsTabBtn = outputPanel.querySelector('[data-tab="tests"]');

    // Switch to Tests tab by default on run
    testsTabBtn.click();
    testListEl.innerHTML = '';
    consoleBoxEl.innerHTML = '';

    // Intercept console.log
    const capturedLogs = [];
    const origLog = console.log;
    console.log = function(...args) {
      capturedLogs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '));
      origLog.apply(console, args);
    };

    let userFunc = null;
    let evalError = null;

    try {
      // Evaluate function in browser scope
      userFunc = new Function(`
        ${userCode}
        return typeof ${functionName} !== 'undefined' ? ${functionName} : null;
      `)();
      if (typeof userFunc !== 'function') {
        throw new Error(`Function "${functionName}" was not found or is not a function.`);
      }
    } catch (err) {
      evalError = err.message || String(err);
    }

    // Restore console.log
    console.log = origLog;

    // Render console logs
    if (capturedLogs.length > 0) {
      consoleBoxEl.textContent = capturedLogs.join('\n');
      consoleBadgeEl.style.display = 'inline-block';
      consoleBadgeEl.textContent = capturedLogs.length;
    } else {
      consoleBoxEl.innerHTML = '<span class="console-empty">No console output produced during test run.</span>';
      consoleBadgeEl.style.display = 'none';
    }

    // Handle Evaluation / Syntax Error
    if (evalError) {
      summaryEl.className = 'test-suite-summary error';
      summaryEl.textContent = `❌ Execution Error: ${evalError}`;
      testListEl.innerHTML = `
        <div class="test-case-card fail">
          <div class="test-case-header">
            <span>Syntax / Compilation Error</span>
            <span class="test-status-badge">ERROR</span>
          </div>
          <div class="test-details">
            <div>Check your syntax, brackets, and ensure function <code>${functionName}</code> is defined.</div>
          </div>
        </div>
      `;
      return;
    }

    // Execute Test Cases
    let passCount = 0;
    testCases.forEach((tc, i) => {
      let actualOutput = undefined;
      let testError = null;
      
      // Clone input so function mutations don't corrupt original test display
      let inputCopy = JSON.parse(JSON.stringify(tc.input));

      try {
        actualOutput = userFunc.apply(null, inputCopy);
      } catch (err) {
        testError = err.message || String(err);
      }

      const passed = !testError && isEqual(actualOutput, tc.expected);
      if (passed) passCount++;

      const card = document.createElement('div');
      card.className = `test-case-card ${passed ? 'pass' : 'fail'}`;
      card.innerHTML = `
        <div class="test-case-header">
          <span>Test Case #${i + 1}: ${tc.desc || ''}</span>
          <span class="test-status-badge">${passed ? 'PASS ✅' : 'FAIL ❌'}</span>
        </div>
        <div class="test-details">
          <div><strong>Input:</strong> <code>${tc.input.map(formatVal).join(', ')}</code></div>
          <div><strong>Expected Output:</strong> <code>${formatVal(tc.expected)}</code></div>
          <div><strong>Actual Output:</strong> <code>${testError ? 'Error: ' + testError : formatVal(actualOutput)}</code></div>
        </div>
      `;
      testListEl.appendChild(card);
    });

    // Update Summary
    if (passCount === testCases.length) {
      summaryEl.className = 'test-suite-summary success';
      summaryEl.textContent = `🎉 All ${testCases.length} tests passed! Excellent work!`;
    } else {
      summaryEl.className = 'test-suite-summary error';
      summaryEl.textContent = `⚠️ ${passCount} of ${testCases.length} tests passed. Check the failing test cases below.`;
    }
  }

  // Scan and initialize when DOM is ready
  function initAll() {
    const containers = document.querySelectorAll('.interactive-ide');
    if (containers.length === 0) return;
    loadCodeMirror(function() {
      containers.forEach((c, idx) => initIDE(c, idx));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll);
  } else {
    initAll();
  }
})();
