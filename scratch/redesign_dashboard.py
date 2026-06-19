import re

html_path = "fitness-tracker.html"

# Read HTML file
with open(html_path, "r", encoding="utf-8") as f:
    content = f.read()

# Define the new CSS style sheet
new_css = """  <style>
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    :root {
      --bg: #f8fafc; /* Very light cool grey */
      --surface: #ffffff;
      --card: #ffffff;
      --border: #edf2f7; /* Very clean soft border */
      --border-dark: #cbd5e1;
      --accent: #0d9488; /* Vibrant Active Teal */
      --accent-gradient: linear-gradient(135deg, #0d9488, #0f766e);
      --accent-light: rgba(13, 148, 136, 0.06);
      --accent2: #f43f5e; /* Vibrant Coral Rose for highlights */
      --accent2-gradient: linear-gradient(135deg, #f43f5e, #e11d48);
      --green: #10b981;
      --blue: #3b82f6;
      --text: #0f172a; /* Deep Slate text */
      --muted: #475569;
      --text-light: #64748b;
      --radius: 16px; /* Soft roundness */
      --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.02);
      --shadow-md: 0 4px 20px -2px rgba(15, 23, 42, 0.03), 0 2px 6px -1px rgba(15, 23, 42, 0.02);
      --shadow-lg: 0 12px 30px -4px rgba(15, 23, 42, 0.06), 0 4px 12px -2px rgba(15, 23, 42, 0.03);
    }
    body {
      background: var(--bg);
      background-image: radial-gradient(at 0% 0%, rgba(13, 148, 136, 0.03) 0px, transparent 50%),
                        radial-gradient(at 100% 0%, rgba(244, 63, 94, 0.02) 0px, transparent 50%);
      color: var(--text);
      font-family: 'Cairo', sans-serif;
      direction: rtl;
      min-height: 100vh;
      line-height: 1.6;
    }
    .app {
      max-width: 800px;
      margin: 0 auto;
      padding: 36px 16px;
    }

    /* Header */
    .header {
      text-align: center;
      padding: 40px 0 24px;
      margin-bottom: 24px;
      position: relative;
    }
    .header h1 {
      font-size: 2.2rem;
      font-weight: 900;
      color: var(--text);
      margin-bottom: 8px;
      letter-spacing: -0.5px;
    }
    .header p {
      color: var(--text-light);
      font-size: 0.95rem;
      font-weight: 600;
      background: rgba(13, 148, 136, 0.05);
      display: inline-block;
      padding: 4px 14px;
      border-radius: 100px;
      border: 1px solid rgba(13, 148, 136, 0.1);
    }

    /* Day Tabs - Mini Calendar Cards */
    .day-tabs {
      display: flex;
      gap: 10px;
      overflow-x: auto;
      padding: 4px 4px 16px;
      margin-bottom: 24px;
      scrollbar-width: none;
      -webkit-overflow-scrolling: touch;
    }
    .day-tabs::-webkit-scrollbar {
      display: none;
    }
    .day-tab {
      flex: 1;
      min-width: 85px;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 12px 8px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      color: var(--muted);
      cursor: pointer;
      font-family: 'Cairo', sans-serif;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: var(--shadow-sm);
    }
    .day-tab .day-name {
      font-size: 0.85rem;
      font-weight: 800;
    }
    .day-tab .day-sub {
      font-size: 0.7rem;
      color: var(--text-light);
      margin-top: 4px;
      font-weight: 600;
    }
    .day-tab:hover {
      border-color: var(--accent);
      color: var(--accent);
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
    }
    .day-tab.active {
      background: var(--accent-gradient);
      border-color: transparent;
      color: #ffffff;
      box-shadow: 0 8px 16px -4px rgba(13, 148, 136, 0.3);
    }
    .day-tab.active .day-sub {
      color: rgba(255, 255, 255, 0.85);
    }
    .day-tab.rest.active {
      background: linear-gradient(135deg, #64748b, #475569);
      box-shadow: 0 8px 16px -4px rgba(71, 85, 105, 0.3);
    }
    .today-dot {
      width: 5px;
      height: 5px;
      background-color: #f43f5e;
      border-radius: 50%;
      margin-top: 6px;
    }
    .day-tab.active .today-dot {
      background-color: #ffffff;
    }

    /* Tab Switcher - Segmented Control */
    .tab-row {
      display: flex;
      background: #f1f5f9;
      padding: 4px;
      border-radius: 14px;
      margin-bottom: 28px;
      border: 1px solid #e2e8f0;
    }
    .tab-btn {
      flex: 1;
      padding: 12px;
      border-radius: 10px;
      border: none;
      background: transparent;
      color: var(--muted);
      font-family: 'Cairo', sans-serif;
      font-size: 0.9rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      text-align: center;
      user-select: none;
    }
    .tab-btn.active {
      background: var(--surface);
      color: var(--accent);
      box-shadow: var(--shadow-md);
    }

    .section-title {
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--text);
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    /* Workout Header */
    .workout-header {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 20px;
      margin-bottom: 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      box-shadow: var(--shadow-md);
    }

    .workout-badge {
      display: inline-block;
      padding: 6px 14px;
      border-radius: 100px;
      font-size: 0.8rem;
      font-weight: 700;
    }
    .badge-upper {
      background: rgba(59, 130, 246, 0.08);
      color: var(--blue);
      border: 1px solid rgba(59, 130, 246, 0.15);
    }
    .badge-lower {
      background: rgba(16, 185, 129, 0.08);
      color: var(--green);
      border: 1px solid rgba(16, 185, 129, 0.15);
    }
    .badge-rest {
      background: #f1f5f9;
      color: var(--text-light);
      border: 1px solid var(--border-dark);
    }

    /* Exercise list & card */
    .ex-list {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 24px;
    }
    .ex-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      overflow: hidden;
      transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: var(--shadow-sm);
    }
    .ex-card:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-md);
      border-color: var(--border-dark);
    }
    .ex-card.open {
      border-color: var(--accent);
      box-shadow: var(--shadow-md);
    }
    .ex-header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 18px 20px;
      cursor: pointer;
      user-select: none;
    }
    .ex-num {
      width: 28px;
      height: 28px;
      border-radius: 50%;
      background: var(--accent-light);
      color: var(--accent);
      font-weight: 900;
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    .ex-info {
      flex: 1;
    }
    .ex-name {
      font-weight: 800;
      font-size: 0.95rem;
      color: var(--text);
      margin-bottom: 4px;
    }
    .ex-meta {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }
    .muscle-tag {
      font-size: 0.72rem;
      font-weight: 700;
      color: var(--accent);
      background: var(--accent-light);
      padding: 2px 8px;
      border-radius: 100px;
      border: 1px solid rgba(13, 148, 136, 0.15);
    }
    .tool-tag {
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--muted);
      background: #f1f5f9;
      padding: 2px 8px;
      border-radius: 100px;
      border: 1px solid #e2e8f0;
    }
    .ex-stats {
      display: flex;
      gap: 8px;
      flex-shrink: 0;
    }
    .stat-pill {
      background: #f8fafc;
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 6px 12px;
      text-align: center;
      font-size: 0.72rem;
      line-height: 1.3;
    }
    .stat-pill strong {
      display: block;
      font-size: 0.85rem;
      color: var(--text);
      font-weight: 800;
    }
    .stat-pill span {
      color: var(--muted);
    }
    .ex-expand-btn {
      background: var(--bg);
      border: 1px solid var(--border-dark);
      color: var(--text);
      cursor: pointer;
      font-size: 0.78rem;
      font-weight: 700;
      padding: 6px 12px;
      border-radius: 8px;
      font-family: 'Cairo', sans-serif;
      transition: all 0.2s;
    }
    .ex-expand-btn:hover {
      border-color: var(--accent);
      color: var(--accent);
    }
    .ex-expand-btn.active {
      background: var(--accent-light);
      color: var(--accent);
      border-color: var(--accent);
    }

    /* Media Tab View */
    .ex-media {
      border-top: 1px solid var(--border);
      background: #f8fafc;
      padding: 20px;
    }
    .media-tabs {
      display: flex;
      background: #e2e8f0;
      padding: 3px;
      border-radius: 10px;
      margin-bottom: 16px;
      gap: 2px;
    }
    .media-tab {
      flex: 1;
      padding: 8px;
      background: transparent;
      border: none;
      color: var(--muted);
      font-family: 'Cairo', sans-serif;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      border-radius: 8px;
      text-align: center;
    }
    .media-tab.active {
      background: var(--surface);
      color: var(--accent);
      box-shadow: var(--shadow-sm);
    }
    .gif-wrap {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: var(--shadow-sm);
      text-align: center;
      padding: 12px;
      margin-bottom: 12px;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 240px;
    }
    .gif-wrap img {
      max-height: 280px;
      object-fit: contain;
      border-radius: 8px;
    }
    .video-wrap {
      position: relative;
      padding-bottom: 56.25%;
      height: 0;
      overflow: hidden;
      border-radius: 12px;
      box-shadow: var(--shadow-sm);
      margin-bottom: 12px;
      border: 1px solid var(--border);
      background: #000;
    }
    .video-wrap iframe {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: none;
    }
    .ex-details {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 10px;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 12px;
      margin-top: 12px;
    }
    .ex-details span {
      font-size: 0.82rem;
      font-weight: 600;
      color: var(--text);
      display: flex;
      align-items: center;
      gap: 6px;
    }

    /* CSS Animations for Placeholder/Fallback */
    .ex-anim-card {
      display: flex;
      gap: 20px;
      padding: 20px;
      background: var(--surface);
      border-radius: 12px;
      border: 1px solid var(--border);
      box-shadow: var(--shadow-sm);
    }
    .anim-icon-area {
      width: 100px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #f8fafc;
      border-radius: 12px;
      padding: 16px 8px;
      border: 1px solid var(--border);
    }
    .anim-icon {
      font-size: 3.2rem;
      line-height: 1;
      display: block;
      transform-origin: bottom center;
    }
    .anim-type-lbl {
      font-size: 0.7rem;
      color: var(--muted);
      margin-top: 6px;
      text-align: center;
      font-weight: 700;
    }
    .anim-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .anim-muscles-row {
      font-size: 0.8rem;
      font-weight: 700;
      padding: 3px 12px;
      border-radius: 100px;
      display: inline-block;
      width: fit-content;
      background: var(--accent-light);
      color: var(--accent);
      border: 1px solid rgba(13, 148, 136, 0.15);
    }
    .anim-steps {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .anim-step {
      display: flex;
      gap: 8px;
      align-items: flex-start;
      font-size: 0.82rem;
      color: var(--text);
      line-height: 1.5;
    }
    .anim-step-num {
      width: 20px;
      height: 20px;
      border-radius: 50%;
      background: var(--accent-light);
      color: var(--accent);
      font-size: 0.72rem;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
      margin-top: 2px;
    }
    .anim-cues {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin-top: 4px;
    }
    .anim-cue {
      font-size: 0.72rem;
      font-weight: 600;
      color: var(--green);
      background: var(--green-light);
      border: 1px solid rgba(16, 185, 129, 0.15);
      border-radius: 100px;
      padding: 3px 10px;
    }

    /* Info Tips */
    .tip-box {
      background: var(--accent-light);
      border: 1px solid rgba(13, 148, 136, 0.12);
      border-radius: var(--radius);
      padding: 16px 20px;
      font-size: 0.85rem;
      color: var(--accent);
      font-weight: 600;
      margin-bottom: 24px;
      line-height: 1.5;
    }

    /* Rest Card */
    .rest-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 48px 24px;
      text-align: center;
      margin-bottom: 24px;
      box-shadow: var(--shadow-md);
    }
    .rest-card .icon {
      font-size: 3.5rem;
      margin-bottom: 16px;
    }
    .rest-card h2 {
      font-size: 1.4rem;
      font-weight: 800;
      margin-bottom: 8px;
    }
    .rest-card p {
      color: var(--muted);
      font-size: 0.92rem;
      line-height: 1.6;
    }

    /* Premium Summary Card & Circular SVG Ring */
    .summary-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 28px;
      box-shadow: var(--shadow-md);
      margin-bottom: 28px;
    }
    .summary-ring-area {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      flex-shrink: 0;
    }
    .progress-ring {
      transform: rotate(-90deg);
    }
    .progress-ring text {
      transform: rotate(90deg);
      transform-origin: center;
    }
    .ring-target {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--text-light);
      background: var(--bg);
      padding: 3px 12px;
      border-radius: 100px;
      border: 1px solid var(--border);
    }
    .summary-macros-area {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .macro-row {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .macro-info {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.82rem;
    }
    .macro-label {
      font-weight: 800;
      color: var(--text);
    }
    .macro-value {
      color: var(--muted);
      font-weight: 600;
    }
    .macro-value strong {
      color: var(--text);
      font-weight: 800;
    }
    .macro-progress-track {
      height: 6px;
      background: #f1f5f9;
      border-radius: 100px;
      overflow: hidden;
    }
    .macro-progress-bar {
      height: 100%;
      border-radius: 100px;
      transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Meal cards */
    .meal-card {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      margin-bottom: 16px;
      overflow: hidden;
      box-shadow: var(--shadow-md);
    }
    .meal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 16px 20px;
      background: #f8fafc;
      border-bottom: 1px solid var(--border);
      cursor: pointer;
      user-select: none;
      transition: background 0.2s;
    }
    .meal-header:hover {
      background: #f1f5f9;
    }
    .meal-title {
      font-weight: 800;
      font-size: 0.95rem;
      color: var(--text);
    }
    .meal-cals {
      font-size: 0.82rem;
      color: var(--accent);
      font-weight: 750;
      background: var(--accent-light);
      padding: 3px 12px;
      border-radius: 100px;
      border: 1px solid rgba(13, 148, 136, 0.15);
    }
    .meal-body {
      padding: 8px 20px 20px;
    }
    .food-row {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 14px 0;
      border-bottom: 1px solid #f1f5f9;
    }
    .food-row:last-child {
      border-bottom: none;
    }
    .food-name {
      flex: 1;
      font-size: 0.9rem;
      font-weight: 700;
      color: var(--text);
    }
    .food-macros {
      font-size: 0.78rem;
      color: var(--muted);
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
      margin-top: 2px;
    }
    .gram-input {
      width: 68px;
      padding: 6px 8px;
      background: #f8fafc;
      border: 1px solid var(--border-dark);
      border-radius: 8px;
      color: var(--text);
      font-family: 'Cairo', sans-serif;
      font-size: 0.85rem;
      font-weight: 600;
      text-align: center;
      transition: all 0.2s;
    }
    .gram-input:focus {
      outline: none;
      border-color: var(--accent);
      background: var(--surface);
      box-shadow: 0 0 0 3px rgba(13, 148, 136, 0.15);
    }
    .swap-btn {
      padding: 6px 12px;
      background: var(--accent-light);
      border: 1px solid rgba(13, 148, 136, 0.12);
      border-radius: 8px;
      color: var(--accent);
      font-family: 'Cairo', sans-serif;
      font-size: 0.78rem;
      font-weight: 700;
      cursor: pointer;
      transition: all 0.2s;
      white-space: nowrap;
    }
    .swap-btn:hover {
      background: var(--accent);
      color: #ffffff;
      border-color: transparent;
    }
    .meal-totals {
      display: flex;
      gap: 16px;
      padding: 14px 0 0;
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--muted);
      border-top: 1px solid #f1f5f9;
      margin-top: 8px;
      flex-wrap: wrap;
    }

    /* Modal Overlay & Modal */
    .modal-overlay {
      position: fixed;
      inset: 0;
      background: rgba(15, 23, 42, 0.3);
      backdrop-filter: blur(8px);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      padding: 16px;
    }
    .modal {
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 20px;
      padding: 24px;
      width: 100%;
      max-width: 440px;
      max-height: 80vh;
      overflow-y: auto;
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 10px 10px -5px rgba(0, 0, 0, 0.03);
    }
    .modal h3 {
      font-size: 1.1rem;
      font-weight: 800;
      color: var(--text);
      margin-bottom: 16px;
    }
    .option-btn {
      display: block;
      width: 100%;
      padding: 12px 16px;
      margin-bottom: 8px;
      background: #f8fafc;
      border: 1px solid var(--border-dark);
      border-radius: 12px;
      color: var(--text);
      font-family: 'Cairo', sans-serif;
      font-size: 0.9rem;
      font-weight: 700;
      cursor: pointer;
      text-align: right;
      transition: all 0.2s;
    }
    .option-btn:hover {
      border-color: var(--accent);
      background: var(--accent-light);
    }
    .close-btn {
      margin-top: 12px;
      display: block;
      width: 100%;
      padding: 12px;
      background: transparent;
      border: 1px solid var(--border-dark);
      border-radius: 12px;
      color: var(--muted);
      font-family: 'Cairo', sans-serif;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
    }
    .close-btn:hover {
      background: #f1f5f9;
      color: var(--text);
    }

    @media(max-width:600px){
      .macro-grid{grid-template-columns:repeat(2,1fr)}
      .ex-stats{display:none}
      .ex-header{gap:10px}
      .app { padding: 12px; }
      .ex-anim-card { flex-direction: column; }
      .anim-icon-area { width: 100%; flex-direction: row; gap: 12px; padding: 12px 16px; }
      .summary-card { flex-direction: column; gap: 20px; padding: 20px; }
      .summary-macros-area { width: 100%; }
    }
  </style>"""

# Replace CSS block
content = re.sub(r'<style>.*?</style>', new_css, content, flags=re.DOTALL)

# Define the new day-tabs rendering script chunk
old_day_tabs = """        <div class="day-tabs">
          ${DAYS.map(d => `
            <button class="day-tab ${WORKOUT_PLAN[d].type === "rest" ? "rest" : ""} ${activeDay === d ? "active" : ""}" onclick="setActiveDay('${d}')">
              ${d}${d === DAYS[todayIdx] ? " 🔴" : ""}
            </button>
          `).join("")}
        </div>"""

new_day_tabs = """        <div class="day-tabs">
          ${DAYS.map(d => {
            const isToday = d === DAYS[todayIdx];
            const plan = WORKOUT_PLAN[d];
            return `
              <div class="day-tab ${plan.type === "rest" ? "rest" : ""} ${activeDay === d ? "active" : ""}" onclick="setActiveDay('${d}')">
                <span class="day-name">${d}</span>
                <span class="day-sub">${plan.type === "rest" ? "استراحة" : plan.label}</span>
                ${isToday ? '<span class="today-dot"></span>' : ''}
              </div>
            `;
          }).join("")}
        </div>"""

content = content.replace(old_day_tabs, new_day_tabs)

# Define the new nutrition summary card rendering script chunk
old_summary = """          <div class="section-title">📊 ملخص اليوم</div>
          <div style="margin-bottom:24px">
            <div class="macro-grid">
              ${[
                { cls:"cal", val: totals.cal,        lbl:"سعرات",  tgt: TARGETS.cal,  fill:"fill-cal",  unit:"" },
                { cls:"pro", val: Math.round(totals.p), lbl:"بروتين", tgt: TARGETS.p,   fill:"fill-pro",  unit:"غ" },
                { cls:"carb",val: Math.round(totals.c), lbl:"كارب",   tgt: TARGETS.c,   fill:"fill-carb", unit:"غ" },
                { cls:"fat", val: Math.round(totals.f), lbl:"دهون",   tgt: TARGETS.f,   fill:"fill-fat",  unit:"غ" },
              ].map(m => `
                <div class="macro-card ${m.cls}">
                  <div class="val">${m.val}${m.unit}</div>
                  <div class="lbl">${m.lbl}</div>
                  <div class="tgt">الهدف: ${m.tgt}${m.unit}</div>
                  <div class="progress-bar">
                    <div class="progress-fill ${m.fill}" style="width: ${pct(m.val, m.tgt)}%"></div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>"""

new_summary = """          <div class="section-title">📊 ملخص اليوم</div>
          <div class="summary-card">
            <div class="summary-ring-area">
              <svg class="progress-ring" width="120" height="120">
                <circle class="progress-ring__background" stroke="#f1f5f9" stroke-width="8" fill="transparent" r="50" cx="60" cy="60"/>
                <circle class="progress-ring__circle" stroke="url(#accentGrad)" stroke-width="8" stroke-dasharray="314.16" stroke-dashoffset="${314.16 - (pct(totals.cal, TARGETS.cal) / 100) * 314.16}" stroke-linecap="round" fill="transparent" r="50" cx="60" cy="60"/>
                <defs>
                  <linearGradient id="accentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stop-color="#0d9488" />
                    <stop offset="100%" stop-color="#2dd4bf" />
                  </linearGradient>
                </defs>
                <text x="50%" y="46%" dominant-baseline="middle" text-anchor="middle" font-size="1.25rem" font-weight="900" fill="var(--text)">${totals.cal}</text>
                <text x="50%" y="68%" dominant-baseline="middle" text-anchor="middle" font-size="0.75rem" font-weight="700" fill="var(--muted)">سعرة</text>
              </svg>
              <div class="ring-target">الهدف: ${TARGETS.cal}</div>
            </div>
            <div class="summary-macros-area">
              ${[
                { label: "بروتين", val: Math.round(totals.p), tgt: TARGETS.p, color: "#3b82f6", unit: "غ" },
                { label: "كاربوهيدرات", val: Math.round(totals.c), tgt: TARGETS.c, color: "#10b981", unit: "غ" },
                { label: "دهون", val: Math.round(totals.f), tgt: TARGETS.f, color: "#f43f5e", unit: "غ" }
              ].map(m => `
                <div class="macro-row">
                  <div class="macro-info">
                    <span class="macro-label">${m.label}</span>
                    <span class="macro-value"><strong>${m.val}</strong> / ${m.tgt}${m.unit}</span>
                  </div>
                  <div class="macro-progress-track">
                    <div class="macro-progress-bar" style="width: ${pct(m.val, m.tgt)}%; background-color: ${m.color}"></div>
                  </div>
                </div>
              `).join("")}
            </div>
          </div>"""

content = content.replace(old_summary, new_summary)

# Write back HTML file
with open(html_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Dashboard Redesign Script Completed Successfully.")
