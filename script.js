const APP_DEFS = [
  { id: "ins", name: "Instagram", glyph: "IN", color: "#d97ca7", enabled: true },
  { id: "kktalk", name: "KKTalk", glyph: "K", color: "#efd35d", enabled: true },
  { id: "weibo", name: "微博", glyph: "博", color: "#ef765f", enabled: true },
  { id: "browser", name: "Safari", glyph: "◎", color: "#62c7d0", enabled: true },
  { id: "files", name: "文件", glyph: "▰", color: "#87b7dd", enabled: true },
  { id: "audio", name: "Spotify", glyph: "♫", color: "#60b883", enabled: false },
  { id: "settings", name: "设置", glyph: "⚙", color: "#8c9a98", enabled: true },
  { id: "album", name: "相册", glyph: "▧", color: "#978dc4", enabled: true },
  { id: "memo", name: "备忘录", glyph: "✎", color: "#f2ca47", enabled: true, mobileOnly: true }
];

function appIconMarkup(id) {
  const icons = {
    ins: `
      <img loading="lazy" decoding="async" width="64" height="64" class="app-icon-image app-icon-image-instagram" src="assets/instagram-icon.png" alt="">`,
    kktalk: `
      <img loading="lazy" decoding="async" width="64" height="64" class="app-icon-image app-icon-image-kktalk" src="assets/kktalk-icon.png" alt="">`,
    weibo: `
      <img loading="lazy" decoding="async" width="64" height="64" class="app-icon-image app-icon-image-weibo" src="assets/weibo-icon.png" alt="">`,
    browser: `
      <img loading="lazy" decoding="async" width="64" height="64" class="app-icon-image app-icon-image-safari" src="assets/safari-icon.png" alt="">`,
    files: `
      <img loading="lazy" decoding="async" width="64" height="64" class="app-icon-image app-icon-image-files" src="assets/files-icon.png" alt="">`,
    audio: `
      <img loading="lazy" decoding="async" width="64" height="64" class="app-icon-image app-icon-image-spotify" src="assets/spotify-icon.png" alt="">`,
    settings: `
      <img loading="lazy" decoding="async" width="64" height="64" class="app-icon-image app-icon-image-settings" src="assets/settings-icon.png" alt="">`,
    album: `
      <img loading="lazy" decoding="async" width="64" height="64" class="app-icon-image app-icon-image-photos" src="assets/photos-icon.png" alt="">`,
    memo: `
      <img loading="lazy" decoding="async" width="64" height="64" class="app-icon-image app-icon-image-notes" src="assets/notes-icon.png" alt="">`
  };
  return icons[id] || `<span class="icon-fallback">${APP_DEFS.find(app => app.id === id)?.glyph || "K"}</span>`;
}

const PAGE_NUMBER_MAP = Object.freeze({
  desktop: 1,
  weiboHome: 2,
  weiboMakeupPost: 3,
  insKLog: 4,
  insSearch: 5,
  browserHome: 6,
  kktMemo: 7,
  kktUnknown: 8,
  kktGhost: 9,
  kktXixi: 10,
  browserHZY: 11,
  insHZY: 12,
  filesHZY: 13,
  browserLXE: 14,
  kktLXE: 15,
  filesLXE: 16,
  browserCMY: 17,
  insCMY: 18,
  filesCMY: 19,
  browserYSJ: 20,
  insYSJ: 21,
  filesYSJ: 22,
  filesXixi: 23,
  browserNOVA: 24,
  filesBrowserCache: 25,
  weiboBNHImage: 26,
  hiddenBNHUnlock: 27,
  insBNH: 28,
  filesBNH: 29,
  browserIntrusion: 30,
  hiddenGESRecovery: 31,
  insGES: 32,
  backupUnlock: 33,
  backupCore: 34,
  finalChoice: 35
});

const ACCOUNTS = {
  K_Log: { label: "K_Log", code: "K", bio: "嫂子站归档员。不要相信第一条投稿。", locked: false },
  HZY: { label: "韩知妍", code: "A", bio: "Boston / Seoul · Momo 的人类", password: "HZY0509", clue: "A", hint: "姓名首字母 + Momo 的生日" },
  CMY: { label: "车敏雅", code: "C", bio: "30w 穿搭博主 · 07.04 changed everything.", password: "CMY0704", clue: "C", hint: "姓名首字母 + 账号爆红日" },
  YSJ: { label: "尹书璟", code: "D", bio: "NOVA 妆造团队。已婚，凌晨也在工作。", password: "YSJ0318", clue: "D", hint: "姓名首字母 + 本人生日" },
  BNH: { label: "白娜熙", handle: "bnh_with_jyb", code: "E", bio: "bnh with JYB\nnot fan anymore\n12.16\nonly we know", password: "BNH1216", clue: "identityLink", hidden: true, hint: "BNH = 白娜熙姓名首字母；1216 = NOVA 首尔巡演日" },
  GES: { label: "高恩瑟", handle: "ges_1216", code: "X", bio: "真实老鼠号。没有公开身份，只有嫉妒、愤怒和未被回复的消息。", password: "GES1216", clue: "identityLink", hidden: true, hint: "GES = 高恩瑟姓名首字母；1216 = NOVA 首尔巡演日" }
};

const POSTS = {
  K_Log: [
    ["NOVA_NEWS", "姜艺彬再登品牌热搜。清冷少年感与高级商业表现力兼具。"],
    ["K_FOCUS", "没图没锤，抱走姜艺彬，专注舞台。"],
    ["stage_record", "路人看了舞台都说他是天生爱豆。"],
    ["softlight", "他真的对工作人员都很温柔，喜欢他三年从没后悔过。"]
  ],
  HZY: [
    ["hzy", "Momo 五岁啦。05.09，每年都要一起过。"],
    ["hzy", "Seoul → Boston。凌晨落地，不想再坐红眼航班。"],
    ["hzy", "有些人说只有他懂你时，先问问自己：他为什么要你瞒着所有人。"]
  ],
  CMY: [
    ["cmy_daily", "07.04 changed everything. 第一条百万播放，记得比生日还清楚。"],
    ["cmy_daily", "同款不是巧合。有人只希望我们留下刚刚好的 CP 感。"],
    ["cmy_daily", "酒店窗景删掉了。互联网比我记得更久。"]
  ],
  YSJ: [
    ["ysj_makeup", "03.18。凌晨收工，丈夫送来的蛋糕已经化了。"],
    ["ysj_makeup", "明早六点 NOVA 妆发，今晚不回家。"],
    ["mr_yoon", "辛苦了，结束给我电话。我在楼下等你。"]
  ],
  BNH: [
    ["bnh_with_jyb", "12.16。看台那么多人，他偏偏看向了这里。only we know。"],
    ["bnh_with_jyb", "不需要公开，也不需要别人相信。懂的人自然会懂。"],
    ["bnh_with_jyb", "not fan anymore。粉丝不会知道他私下是什么样子。"],
    ["bnh_with_jyb", "有时候不说名字，才是对这段关系最好的保护。"]
  ],
  GES: [
    ["ges_1216", "你为什么不看我？"],
    ["ges_1216", "她们凭什么靠近你？"],
    ["ges_1216", "你不是说粉丝最重要吗？"],
    ["ges_1216", "如果你不属于任何人，那你就该属于我。"],
    ["ges_1216", "保安凭什么拦我？我只是想问他一句话。"]
  ]
};

const state = loadState();
let zCounter = 20;
let windowCounter = 0;
let currentPageKey = "desktop";
const openWindows = new Map();
const MAX_VISIBLE_WINDOWS_DESKTOP = 3;
const MAX_VISIBLE_WINDOWS_MOBILE = 1;
let showDesktopWindowIds = [];
const THEME_STORAGE_KEY = "kaleido_theme";

function isMobileViewport() {
  return window.matchMedia("(max-width: 768px)").matches;
}

function getVisibleWindows() {
  return [...openWindows.values()].filter(win => !win.hidden && win.style.display !== "none");
}

function getMaxVisibleWindows() {
  return isMobileViewport() ? MAX_VISIBLE_WINDOWS_MOBILE : MAX_VISIBLE_WINDOWS_DESKTOP;
}

function defaultState() {
  return {
    unlocked: ["K_Log"],
    clues: { A: false, B: false, C: false, D: false, identityLink: false, overlap: false },
    identityEvidence: {
      enseoSeen: false,
      surnameSeen: false,
      nova1216Seen: false,
      bnhViewed: false,
      gesViewed: false
    },
    backupUnlocked: false,
    backupUnlockVersion: 0,
    finalIdentityVerified: false,
    ghostCalmed: false,
    introAppsViewed: { weibo: false, ins: false },
    memoText: "",
    oldGhostStage: 0,
    hiddenEntrances: [],
    storyVersion: 2,
    ending: null
  };
}

function loadState() {
  try {
    const base = defaultState();
    const saved = JSON.parse(localStorage.getItem("k_case_state") || "{}");
    if (saved.storyVersion !== 2) return base;
    return {
      ...base,
      ...saved,
      clues: { ...base.clues, ...(saved.clues || {}) },
      identityEvidence: { ...base.identityEvidence, ...(saved.identityEvidence || {}) },
      introAppsViewed: { ...base.introAppsViewed, ...(saved.introAppsViewed || {}) },
      unlocked: saved.unlocked || ["K_Log"],
      hiddenEntrances: saved.hiddenEntrances || []
    };
  }
  catch { return defaultState(); }
}

function saveState() {
  localStorage.setItem("k_case_state", JSON.stringify(state));
  renderCasePanel();
  refreshFilesIfOpen();
}

function markClue(key, message) {
  if (!state.clues[key]) {
    state.clues[key] = true;
    toast(message || `关键证据已记录：${key}`);
    saveState();
  }
}

function markIdentityEvidence(key, message) {
  if (!state.identityEvidence[key]) {
    state.identityEvidence[key] = true;
    toast(message);
    evaluateIdentityLink();
    saveState();
  }
}

function evaluateIdentityLink() {
  const evidence = state.identityEvidence;
  const accountsReady = state.unlocked.includes("BNH") && state.unlocked.includes("GES");
  if (accountsReady && evidence.nova1216Seen && evidence.bnhViewed && evidence.gesViewed) {
    markClue("identityLink", "推理成立：白娜熙是高恩瑟伪装出来的热演身份");
  }
}

function init() {
  initThemeToggle();
  renderDesktop();
  renderCasePanel();
  updateClock();
  setInterval(updateClock, 1000);
  const loginScreen = document.querySelector("#story-login");
  const desktop = document.querySelector("#desktop");
  document.querySelector("#story-login-button").addEventListener("click", () => {
    loginScreen.classList.add("leaving");
    desktop.classList.remove("desktop-locked");
    window.setTimeout(() => loginScreen.remove(), 620);
  });
  const memoInput = document.querySelector("#memo-input");
  memoInput.value = state.memoText || "";
  memoInput.addEventListener("input", () => {
    state.memoText = memoInput.value;
    localStorage.setItem("k_case_state", JSON.stringify(state));
  });
  const memo = document.querySelector(".desktop-memo");
  const memoToggle = document.querySelector("#memo-toggle-mobile");
  const closeMobileMemo = () => {
    memo.classList.remove("mobile-open");
    memoToggle.setAttribute("aria-expanded", "false");
    memoToggle.setAttribute("aria-label", "打开备忘录");
  };
  memoToggle.setAttribute("aria-expanded", "false");
  memoToggle.addEventListener("click", () => {
    const willOpen = !memo.classList.contains("mobile-open");
    memo.classList.toggle("mobile-open", willOpen);
    memoToggle.setAttribute("aria-expanded", String(willOpen));
    memoToggle.setAttribute("aria-label", willOpen ? "关闭备忘录" : "打开备忘录");
    if (willOpen) window.setTimeout(() => memoInput.focus(), 260);
  });
  document.querySelector("#memo-close-mobile").addEventListener("click", closeMobileMemo);
  document.querySelector("#start-button").addEventListener("click", minimizeAllWindows);
  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && document.querySelector(".modal-backdrop")) closeModal();
  });
}

function initThemeToggle() {
  const button = document.querySelector("#theme-toggle");
  const applyTheme = theme => {
    const resolvedTheme = theme === "night" ? "night" : "day";
    document.documentElement.dataset.theme = resolvedTheme;
    button.setAttribute("aria-pressed", String(resolvedTheme === "night"));
    button.setAttribute("aria-label", resolvedTheme === "night"
      ? "当前为夜间模式，点击切换为白天模式"
      : "当前为白天模式，点击切换为夜间模式");
  };

  applyTheme(localStorage.getItem(THEME_STORAGE_KEY));
  button.addEventListener("click", () => {
    const nextTheme = document.documentElement.dataset.theme === "night" ? "day" : "night";
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  });
}

function renderDesktop() {
  const root = document.querySelector("#desktop-icons");
  root.innerHTML = APP_DEFS.map(app => `
    <button class="desktop-icon ${app.enabled ? "" : "disabled"} ${app.mobileOnly ? "mobile-only" : ""}" data-app="${app.id}" style="--icon:${app.color}">
      <span class="icon-tile">${appIconMarkup(app.id)}</span><span>${app.name}</span>
    </button>`).join("");
  root.querySelectorAll(".desktop-icon").forEach(button => {
    const launch = () => {
      const app = APP_DEFS.find(item => item.id === button.dataset.app);
      if (app.enabled) openApp(app.id);
      else if (app.id === "audio") toast("声破天无法播放。缺失文件：1216_reverse_demo.mp3");
      else toast("应用暂不可用。");
    };
    button.addEventListener("click", launch);
  });
}

function openApp(id) {
  if ((id === "weibo" || id === "ins") && !state.introAppsViewed[id]) {
    state.introAppsViewed[id] = true;
    saveState();
  }
  if (openWindows.has(id)) {
    const existing = openWindows.get(id);
    const wasHidden = existing.hidden || existing.style.display === "none";
    if (!wasHidden && existing.classList.contains("active")) {
      minimizeWindow(existing);
      return;
    }
    existing.hidden = false;
    existing.style.display = "block";
    focusWindow(existing);
    if (wasHidden) playWindowMotion(existing, "restore");
    enforceWindowLimit(id);
    return;
  }
  const app = APP_DEFS.find(item => item.id === id);
  const fragment = document.querySelector("#window-template").content.cloneNode(true);
  const win = fragment.querySelector(".app-window");
  win.dataset.app = id;
  win.style.left = `${150 + (windowCounter % 5) * 34}px`;
  win.style.top = `${70 + (windowCounter % 5) * 28}px`;
  win.style.zIndex = ++zCounter;
  fragment.querySelector(".window-title").textContent = `${app.name.toUpperCase()} // K_LOG`;
  const content = fragment.querySelector(".window-content");
  document.querySelector("#window-layer").appendChild(fragment);
  openWindows.set(id, win);
  windowCounter += 1;
  bindWindow(win, id);
  renderApp(id, content);
  addTaskItem(app);
  focusWindow(win);
  enforceWindowLimit(id);
  playWindowMotion(win, "open");
}

function playWindowMotion(win, type) {
  if (!win?.animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return Promise.resolve();
  }
  const motions = {
    open: [
      [
        { opacity: 0, transform: "translateY(34px) scale(.88)", filter: "blur(8px)" },
        { opacity: 1, transform: "translateY(-4px) scale(1.012)", filter: "blur(0)", offset: .72 },
        { opacity: 1, transform: "translateY(0) scale(1)", filter: "blur(0)" }
      ],
      { duration: 560, easing: "cubic-bezier(.16, 1, .3, 1)" }
    ],
    minimize: [
      [
        { opacity: 1, transform: "translateY(0) scale(1)", filter: "blur(0)" },
        { opacity: .82, transform: "translateY(12px) scale(.96)", offset: .45 },
        { opacity: 0, transform: "translateY(46vh) scale(.22)", filter: "blur(5px)" }
      ],
      { duration: 420, easing: "cubic-bezier(.4, 0, .2, 1)" }
    ],
    close: [
      [
        { opacity: 1, transform: "scale(1)", filter: "blur(0)" },
        { opacity: 0, transform: "translateY(12px) scale(.9)", filter: "blur(5px)" }
      ],
      { duration: 260, easing: "cubic-bezier(.4, 0, 1, 1)" }
    ],
    restore: [
      [
        { opacity: 0, transform: "translateY(42vh) scale(.28)", filter: "blur(4px)" },
        { opacity: 1, transform: "translateY(-3px) scale(1.008)", filter: "blur(0)", offset: .78 },
        { opacity: 1, transform: "translateY(0) scale(1)", filter: "blur(0)" }
      ],
      { duration: 480, easing: "cubic-bezier(.16, 1, .3, 1)" }
    ]
  };
  const [frames, options] = motions[type] || motions.open;
  const animation = win.animate(frames, options);
  return animation.finished.catch(() => {});
}

function finishMinimizeWindow(win) {
  win.hidden = true;
  win.style.display = "none";
  const active = getVisibleWindows().sort((a, b) => Number(b.style.zIndex) - Number(a.style.zIndex))[0];
  syncPageBadgeVisibility(active || null);
  updateTasks();
}

function minimizeWindow(win, { animate = true } = {}) {
  if (!win || win.hidden || win.style.display === "none") return Promise.resolve();
  const done = () => finishMinimizeWindow(win);
  if (!animate) {
    done();
    return Promise.resolve();
  }
  return playWindowMotion(win, "minimize").then(done);
}

function enforceWindowLimit(activeId) {
  const limit = getMaxVisibleWindows();
  let visible = getVisibleWindows();
  while (visible.length > limit) {
    const candidate = visible.find(win => win.dataset.app !== activeId) || visible[0];
    if (!candidate) break;
    closeWindow(candidate.dataset.app);
    visible = getVisibleWindows();
  }
}

async function minimizeAllWindows() {
  if (showDesktopWindowIds.length) {
    const windowsToRestore = showDesktopWindowIds
      .map(id => openWindows.get(id))
      .filter(win => win && (win.hidden || win.style.display === "none"));
    showDesktopWindowIds = [];
    windowsToRestore.forEach(win => {
      win.hidden = false;
      win.style.display = "block";
    });
    await Promise.all(windowsToRestore.map(win => playWindowMotion(win, "restore")));
    const topWindow = windowsToRestore.at(-1);
    if (topWindow) focusWindow(topWindow);
    updateTasks();
    document.querySelector("#start-button").setAttribute("aria-label", "显示桌面");
    return;
  }
  const visibleWindows = [...openWindows.values()].filter(win => !win.hidden && win.style.display !== "none");
  if (!visibleWindows.length) return;
  showDesktopWindowIds = visibleWindows.map(win => win.dataset.app);
  await Promise.all(visibleWindows.map(win => playWindowMotion(win, "minimize")));
  visibleWindows.forEach(win => {
    win.hidden = true;
    win.style.display = "none";
  });
  syncPageBadgeVisibility(null);
  updateTasks();
  document.querySelector("#start-button").setAttribute("aria-label", "恢复窗口");
}

function bindWindow(win, id) {
  const bar = win.querySelector(".window-titlebar");
  let drag = null;
  bar.addEventListener("pointerdown", event => {
    if (event.target.closest("button") || isMobileViewport()) return;
    drag = { x: event.clientX, y: event.clientY, left: win.offsetLeft, top: win.offsetTop, dx: 0, dy: 0 };
    bar.setPointerCapture(event.pointerId);
    focusWindow(win);
  });
  bar.addEventListener("pointermove", event => {
    if (!drag) return;
    drag.dx = event.clientX - drag.x;
    drag.dy = event.clientY - drag.y;
    win.style.transform = `translate3d(${drag.dx}px, ${drag.dy}px, 0)`;
  });
  bar.addEventListener("pointerup", () => {
    if (!drag) return;
    const left = Math.max(0, Math.min(innerWidth - 240, drag.left + drag.dx));
    const top = Math.max(34, Math.min(innerHeight - 90, drag.top + drag.dy));
    win.style.left = `${left}px`;
    win.style.top = `${top}px`;
    win.style.transform = "";
    drag = null;
  });
  win.addEventListener("pointerdown", () => focusWindow(win));
  win.querySelector(".window-close").addEventListener("click", async () => {
    await playWindowMotion(win, "close");
    closeWindow(id);
  });
  win.querySelector(".window-minimize").addEventListener("click", () => {
    minimizeWindow(win);
  });
}

function focusWindow(win) {
  document.querySelectorAll(".app-window").forEach(item => item.classList.remove("active"));
  win.classList.add("active");
  win.style.zIndex = ++zCounter;
  syncPageBadgeVisibility(win);
  updateTasks();
}

function closeWindow(id) {
  openWindows.get(id)?.remove();
  openWindows.delete(id);
  showDesktopWindowIds = showDesktopWindowIds.filter(appId => appId !== id);
  document.querySelector(`[data-task="${id}"]`)?.remove();
  const active = [...openWindows.values()].filter(win => !win.hidden).sort((a, b) => Number(b.style.zIndex) - Number(a.style.zIndex))[0];
  syncPageBadgeVisibility(active || null);
}

function addTaskItem(app) {
  const button = document.createElement("button");
  button.className = "task-item";
  button.dataset.task = app.id;
  button.setAttribute("aria-label", app.name);
  button.title = app.name;
  button.innerHTML = `<span class="task-icon">${appIconMarkup(app.id)}</span>`;
  button.addEventListener("click", () => {
    const win = openWindows.get(app.id);
    if (win.style.display === "none") {
      win.style.display = "block";
      win.hidden = false;
      focusWindow(win);
      enforceWindowLimit(app.id);
      playWindowMotion(win, "restore");
    }
    else if (win.classList.contains("active")) {
      minimizeWindow(win);
    }
    else focusWindow(win);
  });
  document.querySelector("#task-items").appendChild(button);
}

function updateTasks() {
  document.querySelectorAll(".task-item").forEach(item => {
    const win = openWindows.get(item.dataset.task);
    item.classList.toggle("active", Boolean(win && !win.hidden && win.classList.contains("active")));
  });
}

function renderApp(id, content) {
  if (id === "ins") renderINS(content);
  if (id === "kktalk") renderKKTalk(content);
  if (id === "weibo") renderWeibo(content);
  if (id === "browser") renderBrowser(content);
  if (id === "files") renderFiles(content);
  if (id === "settings") renderPlaceholderApp(content, "设置", "系统设置暂未配置");
  if (id === "album") renderPlaceholderApp(content, "相册", "相册中还没有内容");
}

function renderPlaceholderApp(root, title, message) {
  root.innerHTML = `
    <div class="placeholder-app">
      <div class="placeholder-app-mark">K</div>
      <p class="eyebrow">KALEIDO SYSTEM APP</p>
      <h2>${title}</h2>
      <p>${message}</p>
      <span>RESERVED FOR FUTURE UPDATE</span>
    </div>`;
}

function renderMemoApp(root) {
  root.innerHTML = `
    <div class="memo-app-shell">
      <p class="eyebrow">KALEIDO QUICK NOTE</p>
      <h2>???</h2>
      <textarea class="memo-app-input" aria-label="?????" placeholder="???????????????">${escapeHtml(state.memoText || "")}</textarea>
    </div>`;
  const input = root.querySelector(".memo-app-input");
  input.addEventListener("input", () => {
    state.memoText = input.value;
    saveState();
    const desktopMemo = document.querySelector("#memo-input");
    if (desktopMemo) desktopMemo.value = input.value;
  });
}

function renderINS(root, accountId = "K_Log", tab = "home") {
  const accountPages = {
    K_Log: "insKLog",
    HZY: "insHZY",
    CMY: "insCMY",
    YSJ: "insYSJ",
    BNH: "insBNH",
    GES: "insGES"
  };
  const pageKey = tab === "search"
    ? "insSearch"
    : (tab === "dm" && accountId === "K_Log" ? "kktGhost" : accountPages[accountId]);
  setPageNumber(pageKey, root);
  const account = ACCOUNTS[accountId];
  root.innerHTML = `
    <div class="app-shell">
      <div class="app-toolbar">
        <b>INS://ARCHIVE</b>
        <nav class="ins-nav">
          ${["home:首页","dm:私信","search:搜索","profile:我的主页"].map(x => {
            const [key,label] = x.split(":"); return `<button class="btn ${tab === key ? "primary" : ""}" data-ins-tab="${key}">${label}</button>`;
          }).join("")}
        </nav>
        <span class="spacer"></span>
        <span class="pill">当前账号：${account.label}</span>
        <button class="btn" data-switch>切换账号</button>
      </div>
      <div class="app-main" id="ins-main"></div>
    </div>`;
  root.querySelectorAll("[data-ins-tab]").forEach(btn => btn.addEventListener("click", () => renderINS(root, accountId, btn.dataset.insTab)));
  root.querySelector("[data-switch]").addEventListener("click", () => showAccountSwitcher(root));
  const main = root.querySelector("#ins-main");
  if (tab === "search") renderINSSearch(main, root);
  else if (tab === "dm") renderINSDM(main, accountId);
  else renderINSProfile(main, accountId);
}

function renderINSProfile(main, accountId) {
  const account = ACCOUNTS[accountId];
  const privateNotes = {
    HZY: "酒店小票与后台合照的日期重叠。聊天里反复出现“不要告诉别人”。",
    CMY: "语音备份：可以留一点 CP 感，但别发得太明显。",
    YSJ: "丈夫探班记录与妆造排班完整。D 是误伤对象。\n\n与朋友的聊天：\n“我真的不想再接这个人了。他私下脾气很差，动不动就发火。而且他粉丝也有点吓人。上次有个女孩子跑到化妆室门口发疯，好像叫什么恩瑟。保安都来了，真的无语。”",
    BNH: "热演号：用模棱两可的恋爱暗示假装自己是嫂子。她只是普通粉丝，却把看台饭撒解释成命运。",
    GES: "真实老鼠号：倾倒黑泥、辱骂疑似嫂子，反复质问姜艺彬为什么不爱自己。\n\n置顶草稿：\n“我要毁了姜艺彬，然后独占他。”\n\n刚刚发布：\n“你到底还要查多久？再不快点，我就亲自动手。”"
  };
  main.innerHTML = `
    <div class="ins-layout">
      <aside class="ins-sidebar">
        <div class="profile-mini"><div class="avatar">${account.code}</div><h3>${account.label}</h3>${account.handle ? `<div class="eyebrow">@${account.handle}</div>` : ""}<p class="muted">${account.bio}</p></div>
        ${accountId !== "K_Log" ? `<p class="eyebrow">PRIVATE ARCHIVE</p><p>${privateNotes[accountId] || "公开资料归档。"}</p>` : ""}
      </aside>
      <section class="ins-feed">
        ${(POSTS[accountId] || []).map(([user,text]) => postCard(user,text)).join("")}
      </section>
    </div>`;
  if (["HZY","CMY"].includes(accountId)) markClue(accountId === "HZY" ? "A" : "C", `已确认 ${account.label} 的关键证据`);
  if (accountId === "YSJ") {
    markClue("D", "反证成立：尹书璟是误伤对象");
    markIdentityEvidence("enseoSeen", "尹书璟的聊天透露了闯入者名字：恩瑟");
  }
  if (accountId === "BNH") markIdentityEvidence("bnhViewed", "已确认白娜熙账号是虚构恋爱关系的热演号");
  if (accountId === "GES") markIdentityEvidence("gesViewed", "已确认高恩瑟账号是倾倒嫉妒与占有欲的真实老鼠号");
}

function postCard(user, text) {
  return `<article class="post-card"><div class="post-head"><div class="avatar">${user.slice(0,2)}</div><div><b>@${user}</b><div class="post-meta">已归档 · 来源校验中</div></div></div><p>${text}</p><div class="post-actions">♡ 2,418　⌁ 归档　···</div></article>`;
}

function renderINSSearch(main, root) {
  main.innerHTML = `<div class="ins-feed"><div class="search-row"><input class="input" id="ins-search" placeholder="搜索姓名或缩写"><button class="btn primary" id="ins-search-btn">搜索</button></div><div id="ins-results" class="empty">输入人物姓名或缩写。部分账号不会出现在公开搜索中。</div></div>`;
  const run = () => {
    const q = main.querySelector("#ins-search").value.trim().toLowerCase();
    const aliases = {
      HZY: ["韩知妍","hzy"], CMY: ["车敏雅","cmy"], YSJ: ["尹书璟","ysj"],
      BNH: ["白娜熙","bnh","bnh_with_jyb","bnh.with.jyb"], GES: ["高恩瑟","ges","老鬼"], LXE: ["柳夏恩","lxe","lucy 柳夏恩"]
    };
    const id = Object.keys(aliases).find(key => aliases[key].some(x => x.toLowerCase() === q));
    const target = main.querySelector("#ins-results");
    if (!id) { target.className = "empty"; target.textContent = "未找到相关账号。"; return; }
    if (id === "BNH") {
      target.className = "empty";
      target.innerHTML = "未找到公开结果。该用户可能不存在，或从未公开使用过此身份。";
      return;
    }
    if (id === "GES") {
      const canRecover = state.identityEvidence.enseoSeen && state.identityEvidence.surnameSeen;
      target.className = "empty";
      target.innerHTML = `无法搜索匿名用户。${canRecover ? '<br><br><button class="btn" id="recover-ges">使用“高姓 + 恩瑟”恢复匿名缓存</button>' : ""}`;
      target.querySelector("#recover-ges")?.addEventListener("click", () => revealHiddenAccount("GES", "你将“高姓女粉丝”与“恩瑟”拼合为高恩瑟，定位到匿名老鼠号"));
      return;
    }
    if (id === "LXE") {
      target.className = "result-card"; target.innerHTML = `<h3>柳夏恩 · LUCY</h3><p>新人女团成员。出道日：11.20。</p><p class="muted">核心私密记录不在 INS。尝试 KKTalk。</p>`;
      return;
    }
    const a = ACCOUNTS[id];
    target.className = "result-card";
    target.innerHTML = `<div class="account-card"><div><span class="eyebrow">PUBLIC ACCOUNT</span><h3>${a.label}</h3><p>${a.bio}</p><small class="muted">密码提示：${a.hint}</small><div class="password-box"><input class="input" type="password" placeholder="输入私密账号密码"><button class="btn primary">解锁</button></div></div><div class="avatar">${a.code}</div></div>`;
    const submit = () => tryUnlockAccount(id, target.querySelector("input").value, root);
    target.querySelector("button").addEventListener("click", submit);
    target.querySelector("input").addEventListener("keydown", event => {
      if (event.key === "Enter") submit();
    });
  };
  main.querySelector("#ins-search-btn").addEventListener("click", run);
  main.querySelector("#ins-search").addEventListener("keydown", e => { if (e.key === "Enter") run(); });
}

function tryUnlockAccount(id, password, root) {
  if (password.trim().toUpperCase() !== ACCOUNTS[id].password) return toast("密码错误。公开资料里应该留有日期。");
  if (!state.unlocked.includes(id)) state.unlocked.push(id);
  saveState();
  toast(`${ACCOUNTS[id].label} 的私密账号已加入切换列表`);
  renderINS(root, id, "profile");
}

function showAccountSwitcher(root) {
  const choices = state.unlocked.map(id => `<button class="btn" data-account="${id}">${ACCOUNTS[id].label}</button>`).join("");
  showModal("切换 INS 账号", "仅显示已解锁的本地会话。", choices, modal => {
    modal.querySelectorAll("[data-account]").forEach(btn => btn.addEventListener("click", () => {
      closeModal(); renderINS(root, btn.dataset.account, "home");
    }));
  });
}

function renderINSDM(main, accountId) {
  if (accountId !== "K_Log") {
    main.innerHTML = `<div class="ins-feed"><div class="empty">该账号没有可恢复的私信记录。</div></div>`; return;
  }
  const messages = [
    "西西不是跑路，是被捂嘴了。姜艺彬身边至少有 A 韩知妍、B 柳夏恩、C 车敏雅，第一条投稿还指向化妆师 D。",
    "继续查。别停。第一条投稿不一定是真的。",
    "D 不干净。化妆师最容易进出宿舍楼。",
    "微博上那些自称嫂子的账号，大半都是演的。",
    "12.16 只是一次巡演。别把普通粉丝的幻想也算进来。"
  ];
  const shown = Math.min(state.oldGhostStage + 1, messages.length);
  main.innerHTML = `<div class="ins-feed"><p class="eyebrow">来自：老鬼 // 匿名用户</p>${messages.slice(0, shown).map((m,i) => `<div class="dm-message ${i === shown-1 ? "new" : ""}">${m}</div>`).join("")}${shown < messages.length ? `<button class="btn primary" id="next-ghost">下一条</button>` : `<p class="muted">对方没有留下任何可追踪的账号链接。</p>`}</div>`;
  main.querySelector("#next-ghost")?.addEventListener("click", () => { state.oldGhostStage += 1; saveState(); renderINSDM(main, accountId); });
}

function revealHiddenAccount(id, message) {
  if (!state.hiddenEntrances.includes(id)) state.hiddenEntrances.push(id);
  saveState();
  showPasswordModal(id, message);
}

function showPasswordModal(id, message) {
  const a = ACCOUNTS[id];
  showModal(`隐藏账号：${a.label}`, `${message}\n密码提示：${a.hint}`, `<input class="input" type="password" placeholder="输入密码"><button class="btn primary" data-unlock>解锁账号</button><button class="btn" data-back>返回</button>`, modal => {
    setPageNumber(id === "GES" ? "hiddenGESRecovery" : "hiddenBNHUnlock", modal);
    const submit = () => {
      const value = modal.querySelector("input").value.trim().toUpperCase();
      if (value !== a.password) return toast("密码错误。注意重复出现的日期。");
      if (!state.unlocked.includes(id)) state.unlocked.push(id);
      saveState(); closeModal(); toast(`${a.label} 已解锁，可在 INS 中切换`);
      openApp("ins");
    };
    modal.querySelector("[data-unlock]").addEventListener("click", submit);
    modal.querySelector("[data-back]").addEventListener("click", closeModal);
    modal.querySelector("input").addEventListener("keydown", event => {
      if (event.key === "Enter") submit();
    });
    modal.querySelector("input").focus();
  });
}

function renderKKTalk(root, contact = "xixi") {
  const pages = {
    memo: "kktMemo",
    unknown: "kktUnknown",
    ghost: "kktGhost",
    xixi: "kktXixi",
    lxe: "kktLXE"
  };
  setPageNumber(pages[contact], root);
  const contacts = [
    ["xixi","西西","别信第一条投稿。","2","西"],
    ["ghost","老鬼","12.16 只是一次巡演。","1","鬼"],
    ["unknown","未知账号","[消息已撤回]","","?"],
    ["memo","自己的小号 / 备忘","05.09 / 11.20 / 07.04...","","K"]
  ];
  if (state.unlocked.includes("LXE")) contacts.push(["lxe","柳夏恩","欧巴说只喜欢我一个，对吗？","3","柳"]);
  root.innerHTML = `
    <div class="kkt-app">
      <header class="kkt-topbar">
        <div class="kkt-brand"><span class="kkt-logo">K</span><b>KKTalk</b></div>
        <div class="kkt-top-actions">
          <button data-kkt-action="搜索">⌕</button>
          <button data-kkt-action="添加好友">＋</button>
          <button id="kkt-switch" aria-label="登录账号">⚙</button>
        </div>
      </header>
      <div class="kkt-workspace">
        <aside class="chat-list">
          <div class="kkt-list-head">
            <div><h2>聊天</h2><small>K_Log · 本地备份</small></div>
            <button data-kkt-action="新建聊天">＋</button>
          </div>
          <label class="kkt-search"><span>⌕</span><input placeholder="搜索聊天"></label>
          <div class="kkt-contacts">
            ${contacts.map(([id,name,preview,badge,glyph], index) => `
              <button class="chat-contact ${id===contact?"active":""}" data-chat="${id}">
                <span class="kkt-contact-avatar tone-${index % 4}">${glyph}</span>
                <span class="kkt-contact-copy"><b>${name}</b><small>${preview}</small></span>
                <span class="kkt-contact-meta"><time>${index < 2 ? "00:" + (18 - index * 4) : "昨天"}</time>${badge ? `<i>${badge}</i>` : ""}</span>
              </button>`).join("")}
          </div>
        </aside>
        <section class="chat-view" id="chat-view"></section>
      </div>
      <nav class="kkt-bottom-nav">
        <button data-kkt-nav="好友"><span>♟</span><small>好友</small></button>
        <button class="active" data-kkt-nav="聊天"><span>●</span><small>聊天</small><i>3</i></button>
        <button data-kkt-nav="发现"><span>⌗</span><small>发现</small></button>
        <button data-kkt-nav="更多"><span>•••</span><small>更多</small></button>
      </nav>
    </div>`;
  root.querySelectorAll("[data-chat]").forEach(btn => btn.addEventListener("click", () => renderKKTalk(root, btn.dataset.chat)));
  root.querySelectorAll("[data-kkt-action], [data-kkt-nav]").forEach(button => button.addEventListener("click", () => {
    if (button.id === "kkt-switch") return;
    toast(`${button.dataset.kktAction || button.dataset.kktNav}功能在备份模式下不可用。`);
  }));
  root.querySelector("#kkt-switch").addEventListener("click", () => {
    showModal("KKTalk 账号登录", "输入账号密码。柳夏恩的日期藏在 LUCY 公开资料中。", `<input class="input" type="password" placeholder="密码"><button class="btn primary" data-login>登录</button><button class="btn" data-back>返回</button>`, modal => {
      const submit = () => {
        const p = modal.querySelector("input").value.trim().toUpperCase();
        const id = p === "LXE1120" ? "LXE" : null;
        if (!id) return toast("登录失败。");
        if (!state.unlocked.includes(id)) state.unlocked.push(id);
        if (id === "LXE") markClue("B", "已恢复柳夏恩与姜艺彬的聊天记录");
        saveState(); closeModal(); renderKKTalk(root, "lxe");
      };
      modal.querySelector("[data-login]").addEventListener("click", submit);
      modal.querySelector("[data-back]").addEventListener("click", closeModal);
      modal.querySelector("input").addEventListener("keydown", event => {
        if (event.key === "Enter") submit();
      });
      modal.querySelector("input").focus();
    });
  });
  renderChat(root.querySelector("#chat-view"), contact);
}

function renderChat(view, id) {
  const chats = {
    xixi: [
      ["them","别信第一条投稿。","昨天 23:41"],["them","A、B、C 的日期是重叠的。","昨天 23:42"],
      ["me","D 也在投稿里。","昨天 23:43"],["them","D 可能只是被推出来挡枪。","昨天 23:43"],
      ["them","不要替她们决定人生。","00:17"],["them","你也会知道的。","00:18"]
    ],
    ghost: [
      ["them","继续查。","00:03"],["them","D 最可疑。","00:04"],
      ["me","你到底是谁？","00:05"],["them","E 不重要。别再查她。","00:06"]
    ],
    unknown: [["them","[消息已撤回]","昨天 22:10"],["them","你打开备份以后，就不能假装没看见。","昨天 22:11"]],
    memo: [["me","05.09 / 11.20 / 07.04 / 03.18 / 12.16","昨天 18:30"],["me","谁在保护谁？","昨天 18:31"]],
    lxe: [
      ["them","姜艺彬：你公司不会懂你。","06-28 01:12"],["them","姜艺彬：只有我懂你，不要告诉经纪人。","06-28 01:13"],
      ["me","柳夏恩：欧巴说只喜欢我一个，对吗？","06-28 01:15"],["them","姜艺彬：当然。你不要乱想。","06-28 01:16"]
    ]
  };
  const names = {xixi:"西西",ghost:"老鬼",unknown:"未知账号",memo:"备忘录",lxe:"柳夏恩"};
  const glyphs = {xixi:"西",ghost:"鬼",unknown:"?",memo:"K",lxe:"柳"};
  view.innerHTML = `
    <div class="chat-head">
      <div class="kkt-chat-person"><span>${glyphs[id]}</span><div><b>${names[id]}</b><small>本地聊天备份 · 只读</small></div></div>
      <div class="kkt-chat-actions"><button data-kkt-chat-action="搜索">⌕</button><button data-kkt-chat-action="菜单">☰</button></div>
    </div>
    <div class="bubbles">
      <div class="kkt-date-divider"><span>2026年6月10日 星期三</span></div>
      ${(chats[id]||[]).map(([side,message,time]) => `
        <div class="kkt-message-row ${side === "me" ? "me" : ""}">
          ${side === "them" ? `<span class="kkt-message-avatar">${glyphs[id]}</span>` : ""}
          <div class="kkt-message-stack">${side === "them" ? `<b>${names[id]}</b>` : ""}<div class="kkt-bubble-line"><div class="bubble ${side === "me" ? "me" : ""}">${message}</div><time>${time}</time></div></div>
        </div>`).join("")}
    </div>
    <div class="kkt-inputbar">
      <button data-kkt-chat-action="附件">＋</button>
      <div class="kkt-input-fake">备份模式下无法发送消息 <span>☺</span></div>
      <button class="kkt-send" data-kkt-chat-action="发送">发送</button>
    </div>`;
  view.querySelectorAll("[data-kkt-chat-action]").forEach(button => button.addEventListener("click", () => {
    toast(`${button.dataset.kktChatAction}功能在备份模式下不可用。`);
  }));
  requestAnimationFrame(() => {
    const bubbles = view.querySelector(".bubbles");
    bubbles.scrollTop = bubbles.scrollHeight;
  });
  if (id === "xixi") markClue("overlap", "西西确认 A / B / C 时间线重叠");
  if (id === "lxe") markClue("B", "柳夏恩聊天记录已确认");
}

function renderWeibo(root) {
  setPageNumber("weiboHome", root);
  const posts = [
    {
      pinned: true,
      title: "【置顶】投稿请入群#群链接",
      text: "🈲粉尸挽尊控评安利\n🈲转发艾特人身攻击\n\n不看置顶直接拉嘿",
      comments: [],
      time: "今天 00:12",
      shares: "136",
      likes: "521"
    },
    {
      title: "【🧹】五代某主唱大哥哥就那么敬业以至于天天和工作人员形影不离吗？",
      text: "偷偷藏不住是吧。我请问一个化妆师三天两头跑你们宿舍楼什么意思🙄🙄我说为啥最近媚女友粉那么勤原来是真的有女朋友了，把粉丝当套很好玩吗😂😂",
      comments: [
        ["用户1", "文字料张口就来😂坤续热演吖"],
        ["用户2", "他不一直这样子？出道以来没断过好吧"],
        ["用户3", "第一次苗姐"],
        ["用户4", "我靠到底是谁有没有人ccw"],
        ["用户5", "@xx 嫂嫂模拟器操作中"],
        ["用户6", "之前在推上面刷到过那个化妆师好像…不过感觉不太像啊"],
        ["用户7", "额直接发名字不行吗"],
        ["用户8", "n字团的姜吗…？"],
        ["用户9", "下家丝最好捂好你心肝🤭"],
        ["用户10", "高柱你和我对对我有预感…"]
      ],
      time: "昨天 23:48",
      shares: "2.1万",
      likes: "4.8万"
    },
    {
      title: "【🧹】六代某男豆疑似与嫂子同游大阪",
      text: "不过嫂子似乎不是yhm",
      comments: [
        ["用户1", "姐妹你坤续吧，这是他姐"],
        ["用户2", "又耽误我第八秒"],
        ["用户3", "fe"]
      ],
      time: "昨天 22:51",
      shares: "869",
      likes: "4,203"
    },
    {
      title: "【🧹】坤美们我刷ins似乎无意发现了某嫂",
      text: "不过刚刚重新搜索显示已经销号了",
      comments: [
        ["用户1", "苗姐"],
        ["用户2", "怎么感觉是玩嫂嫂模拟器上头了"],
        ["用户3", "可惜为时已晚，P图痕迹已经被发现了🙄"],
        ["用户4", "@xxx 查"],
        ["用户5", "姐妹你走错了这个应该投嫂病站，指路@烧饼站"]
      ],
      action: "bnh",
      time: "昨天 22:16",
      shares: "3,204",
      likes: "1.7万"
    },
    {
      title: "【🧹】哥哥嫂嫂情人节祝福楼💅🏻",
      text: "",
      comments: [
        ["用户1", "提cp的素在？😓"],
        ["用户2", "没有祝福的义务🙄🙄"],
        ["用户3", "哥嫂别法"]
      ],
      time: "02-14 13:14",
      shares: "520",
      likes: "1,314"
    },
    {
      title: "【🧹】vj已解除恋爱限制",
      text: "",
      comments: [
        ["用户1", "谁谈了？"],
        ["用户2", "如果是他们那很正常了…"],
        ["用户3", "抱走vj不约"]
      ],
      time: "昨天 18:05",
      shares: "1,103",
      likes: "8,466"
    }
  ];
  root.innerHTML = `
    <div class="weibo-app">
      <header class="weibo-topbar">
        <button class="weibo-round-button" data-weibo-action="扫一扫">⌗</button>
        <div class="weibo-title-tabs">
          <button data-weibo-tab="follow">关注</button>
          <button class="active" data-weibo-tab="hot">热门</button>
        </div>
        <button class="weibo-round-button" data-weibo-action="设置">⚙</button>
      </header>
      <div class="weibo-story-row">
        <div class="weibo-story add"><span>＋</span><small>发微博</small></div>
        <div class="weibo-story"><span>嫂</span><small>老嫂站</small></div>
        <div class="weibo-story"><span>西</span><small>西西</small></div>
        <div class="weibo-story"><span>N</span><small>NOVA</small></div>
        <div class="weibo-story"><span>反</span><small>反黑组</small></div>
      </div>
      <main class="weibo-feed">
        ${posts.map((p, postIndex) => `
          <article class="weibo-card ${p.pinned ? "pinned" : ""}">
            <div class="weibo-post-head">
              <div class="weibo-avatar">嫂</div>
              <div class="weibo-author"><b>老嫂站重生版 <span class="weibo-v">V</span></b><small>${p.time} · 来自 Web 客户端</small></div>
              <button class="weibo-more">•••</button>
            </div>
            ${p.pinned ? '<div class="weibo-pinned-label">置顶</div>' : ""}
            <div class="weibo-post-body">
              <h3>${p.title}</h3>
              ${p.text ? `<p>${p.text}</p>` : ""}
              ${p.action === "bnh" ? `
                <button class="weibo-image-card" id="open-bnh-screenshot">
                  <span class="weibo-image-avatar">B</span>
                  <span><b>bnh_with_jyb</b><small>bnh with JYB<br>not fan anymore · 12.16<br>only we know</small></span>
                  <em>查看原图</em>
                </button>` : ""}
            </div>
            ${p.comments.length ? `<div class="weibo-comments-preview">
              <b>热门评论</b>
              ${p.comments.slice(0, postIndex === 1 ? 6 : 3).map(([user, comment]) => `<div class="comment"><b>@${user}</b>：${comment}</div>`).join("")}
              ${p.comments.length > (postIndex === 1 ? 6 : 3) ? `<button class="weibo-view-comments" data-comments="${postIndex}">查看全部 ${p.comments.length} 条评论</button>` : ""}
            </div>` : ""}
            <footer class="weibo-actions">
              <button data-weibo-action="转发">↗ <span>${p.shares}</span></button>
              <button data-weibo-action="评论">◇ <span>${p.comments.length}</span></button>
              <button data-weibo-action="点赞">♡ <span>${p.likes}</span></button>
            </footer>
          </article>`).join("")}
      </main>
      <nav class="weibo-bottom-nav">
        <button class="active" data-weibo-nav="首页"><span>⌂</span><small>首页</small></button>
        <button data-weibo-nav="发现"><span>⌕</span><small>发现</small></button>
        <button class="weibo-compose" data-weibo-nav="发布"><span>＋</span></button>
        <button data-weibo-nav="消息"><span>✉</span><small>消息</small><i></i></button>
        <button data-weibo-nav="我"><span>♙</span><small>我</small></button>
      </nav>
    </div>`;
  root.querySelector("#open-bnh-screenshot")?.addEventListener("click", () => {
    setPageNumber("weiboBNHImage", root);
    revealHiddenAccount("BNH", "微博配图保留了热演号 bnh_with_jyb 的本地登录缓存");
  });
  root.querySelectorAll("[data-weibo-action], [data-weibo-nav]").forEach(button => button.addEventListener("click", () => {
    toast(`${button.dataset.weiboAction || button.dataset.weiboNav}功能在只读镜像中不可用。`);
  }));
  root.querySelectorAll("[data-weibo-tab]").forEach(button => button.addEventListener("click", () => {
    root.querySelectorAll("[data-weibo-tab]").forEach(tab => tab.classList.remove("active"));
    button.classList.add("active");
    toast(button.dataset.weiboTab === "follow" ? "关注流缓存不完整，当前仍显示热门归档。" : "已切换到热门归档。");
  }));
  root.querySelectorAll(".weibo-view-comments").forEach(button => button.addEventListener("click", () => {
    const post = posts[Number(button.dataset.comments)];
    showModal("全部评论", post.title, post.comments.map(([user, comment]) => `<div class="comment"><b>@${user}</b>：${comment}</div>`).join(""), modal => {
      setPageNumber(Number(button.dataset.comments) === 1 ? "weiboMakeupPost" : "weiboHome", modal);
    });
  }));
}

function renderBrowser(root, initial = "") {
  setPageNumber("browserHome", root);
  root.innerHTML = `<div class="app-shell"><div class="browser-bar"><button class="btn">←</button><input class="input" id="browser-search" placeholder="搜索公开资料" value="${initial}"><button class="btn primary" id="browser-go">千度一下</button></div><div class="browser-page" id="browser-page"><div class="browser-logo">千度</div><p>公开网页存档。可搜索人物、NOVA、LUCY。</p></div></div>`;
  const run = () => browserSearch(root.querySelector("#browser-page"), root.querySelector("#browser-search").value.trim());
  root.querySelector("#browser-go").addEventListener("click", run);
  root.querySelector("#browser-search").addEventListener("keydown", e => { if(e.key==="Enter") run(); });
  if (initial) run();
}

function browserSearch(page, query) {
  const q = query.toLowerCase();
  const searchPages = [
    [["韩知妍", "hzy"], "browserHZY"],
    [["柳夏恩", "lxe", "lucy"], "browserLXE"],
    [["车敏雅", "cmy"], "browserCMY"],
    [["尹书璟", "ysj"], "browserYSJ"],
    [["nova"], "browserNOVA"],
    [["后台闯入", "粉丝闯入", "化妆室", "安保"], "browserIntrusion"],
    [["高恩瑟", "老鬼", "ges"], "hiddenGESRecovery"],
    [["白娜熙", "bnh", "bnh_with_jyb"], "weiboBNHImage"]
  ];
  const searchPage = searchPages.find(([keys]) => keys.some(key => q.includes(key)))?.[1] || "browserHome";
  setPageNumber(searchPage, page);
  const data = [
    { keys:["韩知妍","hzy"], title:"韩知妍相关资料整理", text:"哈佛留学生，美籍韩裔。NOVA 签售常客。宠物猫 Momo，生日 05.09。Seoul / Boston。" },
    { keys:["柳夏恩","lxe"], title:"柳夏恩 - 千度千科", text:"LUCY 成员，19 岁，出道日 11.20。合作舞台期间曾称姜艺彬为“前辈”。" },
    { keys:["车敏雅","cmy"], title:"车敏雅 - 网红资料页", text:"30 万粉穿搭博主。账号爆红日 07.04，第一条百万浏览视频发布于同日。" },
    { keys:["尹书璟","ysj"], title:"未找到对应百科词条", text:"NOVA 妆造团队名单截图；@ysj_makeup；生日 03.18；丈夫多次在评论区留言。" },
    { keys:["白娜熙","bnh","bnh_with_jyb"], title:"没有找到可靠结果", text:"没有找到与“白娜熙”相关的公开信息。该身份可能从未被公开使用。" },
    { keys:["姜艺彬"], title:"姜艺彬 - NOVA 主唱", text:"清纯少年感，品牌合作与舞台表现力广受好评。公开报道常称其对工作人员温柔。" },
    { keys:["nova"], title:"NOVA 男团资料", text:"男子组合。首尔巡演日期：12.16。该日期在多个删除记录中重复出现。", evidence:"nova1216Seen" },
    { keys:["lucy"], title:"LUCY 女团资料", text:"新人女团，出道日 11.20。成员：柳夏恩等。" },
    { keys:["后台闯入","粉丝闯入","化妆室","安保"], title:"【小新闻】某男团活动后台发生粉丝闯入事件", text:"据现场工作人员透露，一名高姓女粉丝曾试图靠近化妆室，被安保人员带离。", evidence:"surnameSeen" },
    { keys:["高恩瑟","老鬼","ges"], title:"未找到公开账号", text:"无法搜索匿名用户。" }
  ];
  const hit = data.find(x => x.keys.some(k => q.includes(k.toLowerCase())));
  if (hit?.evidence === "surnameSeen") markIdentityEvidence("surnameSeen", "后台闯入新闻透露：闯入者是一名高姓女粉丝");
  if (hit?.evidence === "nova1216Seen") markIdentityEvidence("nova1216Seen", "公开资料确认：12.16 是 NOVA 首尔巡演日");
  const canRecoverGES = hit?.keys.includes("高恩瑟") && state.identityEvidence.enseoSeen && state.identityEvidence.surnameSeen;
  page.innerHTML = `<div class="browser-logo">千度</div><p class="muted">搜索：${escapeHtml(query)}</p>${hit ? `<article class="result-card"><a>${hit.title}</a><p>${hit.text}</p>${canRecoverGES ? '<button class="btn" id="cache-entry">用“高姓 + 恩瑟”检索删除缓存</button>' : ""}</article>` : `<div class="result-card">未找到相关公开信息。</div>`}`;
  page.querySelector("#cache-entry")?.addEventListener("click", () => revealHiddenAccount("GES", "你将新闻里的“高姓女粉丝”与尹书璟提到的“恩瑟”拼合为高恩瑟"));
}

const FILES = {
  A_HZY: ["hotel_receipt_YB.png","backstage_private.jpg","chat_export.txt","momo_0509.jpg"],
  B_LXE: ["kkt_backup.txt","practice_room.jpg","voice_transcript.txt","lucy_debut_1120.png"],
  C_CMY: ["first_million_0704.png","same_ring.jpg","hotel_window_compare.png","voice_backup.txt"],
  D_YSJ: ["makeup_schedule.pdf","friend_chat_enseo.txt","night_shift_log.txt","birthday_0318.jpg"],
  E_BNH: ["bnh_with_jyb_profile.png","stand_fansign_1216.jpg","ambiguous_posts.txt","account_roleplay_notes.txt"],
  Xixi_deleted: ["do_not_post_D.png","timeline_overlap_final.xlsx","K_memo_screenshot_blur.png","he_is_not_who_you_think.txt"],
  browser_cache: ["404_not_found_k.html","backstage_intrusion_news.html","deleted_search_log.txt"],
  K_BACKUP: ["memo.txt","value_list.csv","recording_transcript.txt","WHO_ARE_YOU_PROTECTING.locked"]
};

function renderFiles(root, folder = "A_HZY") {
  const folderPages = {
    A_HZY: "filesHZY",
    B_LXE: "filesLXE",
    C_CMY: "filesCMY",
    D_YSJ: "filesYSJ",
    Xixi_deleted: "filesXixi",
    browser_cache: "filesBrowserCache",
    E_BNH: "filesBNH",
    K_BACKUP: state.backupUnlocked && state.backupUnlockVersion === 1 ? "backupCore" : "backupUnlock"
  };
  setPageNumber(folderPages[folder], root);
  const backupReady = state.clues.A && state.clues.B && state.clues.C;
  const folders = Object.keys(FILES);
  root.innerHTML = `<div class="app-shell"><div class="app-toolbar"><b>FILE EXPLORER</b><span class="muted">C:\\Users\\K_Log\\Archive</span><span class="spacer"></span><span class="pill">${backupReady ? "A / B / C 线索已收集" : "等待 A / B / C 线索"}</span></div><div class="app-main"><div class="files-layout"><aside class="folder-list">${folders.map(name => {
    const locked = (name === "E_BNH" && !state.unlocked.includes("BNH")) || (name === "K_BACKUP" && !backupReady);
    return `<button class="folder ${name===folder?"active":""} ${locked?"locked":""}" data-folder="${name}">${locked?"▣":"▰"} ${name}${name==="K_BACKUP"&&!backupReady?".locked":""}</button>`;
  }).join("")}</aside><section class="file-view" id="file-view"></section></div></div></div>`;
  root.querySelectorAll("[data-folder]").forEach(btn => btn.addEventListener("click", () => {
    const name = btn.dataset.folder;
    if (name === "E_BNH" && !state.unlocked.includes("BNH")) return toast("E_BNH 目录缺少账号令牌。嫂子站微博的爆料配图可能保留了入口。");
    if (name === "K_BACKUP" && !backupReady) return toast("K_BACKUP 仍被锁定。需要先收集 A / B / C 三条关键线索。");
    renderFiles(root, name);
  }));
  renderFolder(root.querySelector("#file-view"), folder);
}

function renderFolder(view, folder) {
  const isLocked = (folder === "E_BNH" && !state.unlocked.includes("BNH"));
  if (isLocked) { view.innerHTML = `<div class="empty">该目录已加密。</div>`; return; }
  if (folder === "K_BACKUP" && (!state.backupUnlocked || state.backupUnlockVersion !== 1)) {
    renderBackupUnlock(view);
    return;
  }
  const finalButton = folder === "K_BACKUP"
    ? `<button class="btn primary backup-final-button" id="open-final-gate">打开 WHO_ARE_YOU_PROTECTING</button>`
    : "";
  view.innerHTML = `<p class="eyebrow">${folder}</p>${FILES[folder].map(file => `<div class="file-row" data-file="${file}"><span>▤ ${file}</span><span class="muted">双击预览</span></div>`).join("")}${finalButton}<div id="file-preview"></div>`;
  view.querySelectorAll("[data-file]").forEach(row => row.addEventListener("dblclick", () => previewFile(view.querySelector("#file-preview"), folder, row.dataset.file)));
  view.querySelector("#open-final-gate")?.addEventListener("click", () => renderPreEndingVerification(view.querySelector("#file-preview")));
}

function renderBackupUnlock(view) {
  setPageNumber("backupUnlock", view);
  view.innerHTML = `
    <div class="file-preview backup-unlock">
      <p class="eyebrow">K_BACKUP // THREE-LINE DECRYPTION</p>
      <p>A / B / C 三条关键线索已收集。输入各线档案密码以打开备份。</p>
      <label>A 线密码<input class="input" id="backup-a" autocomplete="off" placeholder="HZY + 日期"></label>
      <label>B 线密码<input class="input" id="backup-b" autocomplete="off" placeholder="LXE + 日期"></label>
      <label>C 线密码<input class="input" id="backup-c" autocomplete="off" placeholder="CMY + 日期"></label>
      <button class="btn primary" id="unlock-backup">打开 K_BACKUP</button>
    </div>`;
  view.querySelector("#unlock-backup").addEventListener("click", () => {
    const values = ["a", "b", "c"].map(key => view.querySelector(`#backup-${key}`).value.trim().toUpperCase());
    if (values[0] !== "HZY0509" || values[1] !== "LXE1120" || values[2] !== "CMY0704") {
      return toast("K_BACKUP 解密失败：至少一条线路密码不正确。");
    }
    state.backupUnlocked = true;
    state.backupUnlockVersion = 1;
    saveState();
    toast("三条线路验证通过：K_BACKUP 已打开");
  });
}

function previewFile(preview, folder, file) {
  const folderPageKeys = {
    A_HZY: "filesHZY",
    B_LXE: "filesLXE",
    C_CMY: "filesCMY",
    D_YSJ: "filesYSJ",
    Xixi_deleted: "filesXixi",
    browser_cache: "filesBrowserCache",
    E_BNH: "filesBNH",
    K_BACKUP: "backupCore"
  };
  setPageNumber(folderPageKeys[folder], preview);
  if (folder === "browser_cache" && file === "backstage_intrusion_news.html") {
    setPageNumber("browserIntrusion", preview);
  }
  const texts = {
    "timeline_overlap_final.xlsx": "A / B / C 三条时间线在 06.28 - 07.06 重叠。\n同一晚，姜艺彬向三人发送了近似措辞。",
    "do_not_post_D.png": "西西批注：D 有丈夫、有完整排班。第一条投稿把工作人员身份当成了证据。",
    "friend_chat_enseo.txt": "尹书璟：我真的不想再接这个人了。他私下脾气很差，动不动就发火。而且他粉丝也有点吓人。上次有个女孩子跑到化妆室门口发疯，好像叫什么恩瑟。保安都来了，真的无语。",
    "backstage_intrusion_news.html": "【小新闻】某男团活动后台发生粉丝闯入事件。\n据现场工作人员透露，一名高姓女粉丝曾试图靠近化妆室，被安保人员带离。",
    "bnh_with_jyb_profile.png": "账号：bnh_with_jyb\n简介：\nbnh with JYB\nnot fan anymore\n12.16\nonly we know",
    "ambiguous_posts.txt": "热演号内容归档：\n“不需要别人相信。”\n“有些关系不能公开。”\n“12.16，只有我们知道。”\n\n没有任何真实恋爱证据，只有对看台饭撒的反复解释。",
    "account_roleplay_notes.txt": "站内批注：该账号是热演号。账号主人假装自己是嫂子，以模棱两可的恋爱暗示满足虚荣心和梦女幻想；实际身份只是普通粉丝。",
    "memo.txt": "A：家庭背景，可置换资源。\nB：新人女爱豆，可制造话题。\nC：网红，可带流量。\n粉丝：会原谅。\n原则：不承认，不回应，不留下原件。",
    "recording_transcript.txt": "经纪人：三边日期已经撞了。\n姜艺彬：没事，粉丝会原谅我的。\n姜艺彬：只要不承认，她们拿我没办法。\n姜艺彬：不要留下原件，先把粉丝稳住。"
  };
  if (file === "value_list.csv") {
    preview.innerHTML = `<div class="file-preview"><table class="csv-table"><tr><th>code</th><th>value</th><th>risk</th><th>emotional_hook</th><th>handle_method</th></tr><tr><td>A</td><td>family resources</td><td>medium</td><td>唯一感</td><td>maintain</td></tr><tr><td>B</td><td>topic crossover</td><td>high</td><td>保护欲</td><td>isolate</td></tr><tr><td>C</td><td>traffic</td><td>medium</td><td>互利关系</td><td>guide</td></tr></table></div>`;
  } else if (file === "WHO_ARE_YOU_PROTECTING.locked") {
    preview.innerHTML = `<div class="file-preview"><p class="eyebrow">WHO_ARE_YOU_PROTECTING.locked</p><p>该文件需要从文件列表下方的验证入口打开。</p></div>`;
  } else {
    preview.innerHTML = `<div class="file-preview">${texts[file] || `[预览缓存]\n${folder}\\${file}\n\n文件内容已归档。时间戳与对应人物资料一致。`}</div>`;
  }
  if (folder === "A_HZY") markClue("A", "已查看韩知妍关键证据");
  if (folder === "B_LXE") markClue("B", "已查看柳夏恩关键证据");
  if (folder === "C_CMY") markClue("C", "已查看车敏雅关键证据");
  if (folder === "D_YSJ") markClue("D", "D 的排班与丈夫记录构成反证");
  if (file === "friend_chat_enseo.txt") markIdentityEvidence("enseoSeen", "尹书璟的聊天透露了闯入者名字：恩瑟");
  if (file === "timeline_overlap_final.xlsx") markClue("overlap", "A / B / C 时间线重叠已确认");
  if (folder === "E_BNH") markIdentityEvidence("bnhViewed", "文件归档确认 bnh_with_jyb 是热演号，而非真实嫂子");
  if (file === "backstage_intrusion_news.html") markIdentityEvidence("surnameSeen", "缓存新闻透露：闯入者是一名高姓女粉丝");
}

function renderPreEndingVerification(preview) {
  setPageNumber("finalChoice", preview);
  preview.innerHTML = `
    <div class="file-preview final-verification">
      <p class="eyebrow">IDENTITY CHECK</p>
      <h3>你知道“老鬼”是谁吗？</h3>
      <label>老鬼真实姓名<input class="input" id="ghost-name" autocomplete="off" placeholder="输入真实姓名"></label>
      <label>老鬼真实老鼠号密码<input class="input" id="ghost-password" autocomplete="off" placeholder="输入账号密码"></label>
      <div class="modal-actions">
        <button class="btn primary" id="verify-ghost">验证身份</button>
        <button class="btn" id="skip-ghost">暂不验证，继续选择</button>
      </div>
      <div id="verification-result"></div>
    </div>`;

  preview.querySelector("#verify-ghost").addEventListener("click", () => {
    const nameCorrect = preview.querySelector("#ghost-name").value.trim() === "高恩瑟";
    const passwordCorrect = preview.querySelector("#ghost-password").value.trim().toUpperCase() === "GES1216";
    const accountDiscovered = state.unlocked.includes("GES") && state.identityEvidence.gesViewed;
    if (!nameCorrect || !passwordCorrect || !accountDiscovered) {
      state.finalIdentityVerified = false;
      saveState();
      toast(accountDiscovered ? "身份验证失败。结局 5 将保持锁定。" : "答案无法替代调查：你还没有真正进入老鬼的真实老鼠号。");
      renderFinalChoice(preview, "验证未通过。你仍可选择结局 1 / 2 / 3 / 4。");
      return;
    }
    state.finalIdentityVerified = true;
    saveState();
    renderGhostContact(preview);
  });
  preview.querySelector("#skip-ghost").addEventListener("click", () => renderFinalChoice(preview, "你没有完成身份验证。结局 5 将保持锁定。"));
}

function renderGhostContact(preview) {
  setPageNumber("finalChoice", preview);
  preview.innerHTML = `
    <div class="file-preview">
      <p class="eyebrow">IDENTITY CONFIRMED // 高恩瑟</p>
      <p>真实老鼠号验证成功。她已经失去耐心，你可以主动联系她争取额外时间。</p>
      <div class="modal-actions">
        <button class="btn primary" id="calm-ghost">联系老鬼安抚</button>
        <button class="btn" id="continue-without-calming">不联系，直接选择</button>
      </div>
    </div>`;
  preview.querySelector("#calm-ghost").addEventListener("click", () => {
    state.ghostCalmed = true;
    saveState();
    preview.innerHTML = `
      <div class="file-preview">
        <p class="eyebrow">ENCRYPTED CONTACT // CONNECTED</p>
        <div class="dm-message">玩家：“再等等，我正在查。”</div>
        <div class="dm-message new">老鬼：“那快点，我等不了太久。”</div>
        <p>安抚成功。你获得了处理证据的额外时间窗口。</p>
        <button class="btn primary" id="continue-after-calming">进入结局选择</button>
      </div>`;
    preview.querySelector("#continue-after-calming").addEventListener("click", () => renderFinalChoice(preview, "老鬼暂时被安抚，你获得了额外时间。"));
  });
  preview.querySelector("#continue-without-calming").addEventListener("click", () => renderFinalChoice(preview, "你没有安抚老鬼。她不会继续等待。"));
}

function renderFinalChoice(preview, statusText = "") {
  setPageNumber("finalChoice", preview);
  const choices = [
    ["1","公开全部"],["2","和团队交易"],["3","删除证据，继续当站姐"],["4","关闭文件夹，停止调查"],["5","把证据交给 A / B / C，让她们自己决定"]
  ];
  preview.innerHTML = `<div class="file-preview"><p class="eyebrow">WHO_ARE_YOU_PROTECTING?</p><p>${statusText || "选择会写入本地结局记录。"}</p><div class="modal-actions">${choices.map(([id,label])=>`<button class="btn ${id==="5"?"primary":""}" data-ending="${id}">${label}</button>`).join("")}</div></div>`;
  preview.querySelectorAll("[data-ending]").forEach(btn => btn.addEventListener("click", () => showEnding(btn.dataset.ending)));
}

function showEnding(id) {
  const endings = {
    1:["愤怒曝光","姜艺彬塌房、退圈并被封杀。A / B / C 与被误伤的 D 一同被拖进舆论。高恩瑟发来最后一条消息：谢谢你，现在他只有我了。"],
    2:["威胁换钱","你与团队完成交易。签售会上，高恩瑟划伤姜艺彬后被拘留。匿名录音说：你也学会把人当资源了。"],
    3:["帮哥哥隐藏","证据被删除，站子继续运转。后来姜艺彬遭高恩瑟泼硫酸毁容。你看着新闻，终于明白沉默没有保护任何人。"],
    4:["她替我动手了","调查在半途停止。真相没有被妥善处理，高恩瑟独自行刺，姜艺彬死亡。K_BACKUP 的修改时间停在你离开的那一分钟。"],
    5:["四人联手","证据分别交还 A / B / C，她们选择共同公开。姜艺彬退圈并被封杀；A 回国，B 转型演员，C 开始讲述情感操控。西西回信：不要替她们决定人生。"]
  };
  const resolvedId = resolveEndingId(id);
  state.ending = resolvedId; saveState();
  const [title, copy] = endings[resolvedId];
  const timeoutCopy = id === "5" && resolvedId === "4"
    ? `<p class="ending-copy warning-copy">你试图把证据交还给 A / B / C，但老鬼没有等到你完成。她提前动手了。</p>`
    : "";
  showModal(`结局 ${resolvedId}`, "", `<div class="ending"><div class="ending-code">CASE CLOSED</div><h2>${title}</h2>${timeoutCopy}<p class="ending-copy">${copy}</p><button class="btn primary" data-close-ending>返回桌面</button></div>`, modal => {
    modal.querySelector("[data-close-ending]").addEventListener("click", closeModal);
  });
}

function resolveEndingId(id) {
  const endingFiveReady = state.identityEvidence.enseoSeen
    && state.unlocked.includes("GES")
    && state.identityEvidence.gesViewed
    && state.finalIdentityVerified
    && state.ghostCalmed;
  return id === "5" && !endingFiveReady ? "4" : id;
}

function renderCasePanel() {
  syncPageBadgeVisibility(
    [...openWindows.values()].find(win => !win.hidden && win.classList.contains("active")) || null
  );
}

function formatPageNumber(pageKey) {
  const pageNumber = PAGE_NUMBER_MAP[pageKey] || PAGE_NUMBER_MAP.desktop;
  return `${String(pageNumber).padStart(3, "0")} / 035`;
}

function getOrCreatePageBadge(container) {
  let badge = container.querySelector(":scope > .page-number-badge");
  if (!badge) {
    badge = document.createElement("div");
    badge.className = "page-number-badge";
    badge.setAttribute("aria-label", "线索页面编号");
    container.appendChild(badge);
  }
  return badge;
}

function setPageNumber(pageKey, context = null) {
  const resolvedKey = PAGE_NUMBER_MAP[pageKey] ? pageKey : "desktop";
  const win = context?.closest?.(".app-window");
  const modal = context?.closest?.(".modal");
  const container = modal || win;
  if (container) {
    container.dataset.pageKey = resolvedKey;
    getOrCreatePageBadge(container).textContent = formatPageNumber(resolvedKey);
  }
  if (win) {
    win.dataset.pageKey = resolvedKey;
    syncPageBadgeVisibility(win.classList.contains("active") ? win : null);
    return;
  }
  if (modal) return;
  currentPageKey = resolvedKey;
  const desktopBadge = document.querySelector("#page-number-badge");
  if (desktopBadge) desktopBadge.textContent = formatPageNumber(resolvedKey);
}

function syncPageBadgeVisibility(activeWindow) {
  const desktopBadge = document.querySelector("#page-number-badge");
  if (desktopBadge) {
    desktopBadge.hidden = Boolean(activeWindow);
    desktopBadge.textContent = formatPageNumber(currentPageKey);
  }
  document.querySelectorAll(".app-window").forEach(win => {
    const badge = win.querySelector(":scope > .page-number-badge");
    if (badge) badge.hidden = win !== activeWindow || win.hidden;
  });
}

function refreshFilesIfOpen() {
  const win = openWindows.get("files");
  if (win && !win.hidden) {
    const active = win.querySelector(".folder.active")?.dataset.folder || "A_HZY";
    renderFiles(win.querySelector(".window-content"), active);
  }
}

function showModal(title, text, actionsHtml, binder) {
  const layer = document.querySelector("#modal-layer");
  layer.innerHTML = `<div class="modal-backdrop"><div class="modal"><div class="modal-head"><h2>${title}</h2><button class="modal-close" aria-label="关闭">×</button></div>${text?`<p>${text}</p>`:""}<div class="modal-actions">${actionsHtml}</div></div></div>`;
  const backdrop = layer.querySelector(".modal-backdrop");
  backdrop.addEventListener("click", event => {
    if (event.target === backdrop) closeModal();
  });
  layer.querySelector(".modal-close").addEventListener("click", closeModal);
  binder?.(layer.querySelector(".modal"));
}
function closeModal() {
  document.querySelector("#modal-layer").innerHTML = "";
  const active = [...openWindows.values()].find(win => !win.hidden && win.classList.contains("active"));
  syncPageBadgeVisibility(active || null);
}

function toast(message) {
  const node = document.createElement("div");
  node.className = "toast"; node.textContent = message;
  document.querySelector("#toast-layer").appendChild(node);
  setTimeout(() => node.remove(), 3600);
}

function updateClock() {
  const now = new Date();
  const time = now.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
  document.querySelector("#clock").textContent = now.toLocaleString("zh-CN", { month:"2-digit", day:"2-digit", hour:"2-digit", minute:"2-digit" });
  document.querySelector("#taskbar-time").textContent = time;
}

function escapeHtml(text) {
  return text.replace(/[&<>"']/g, c => ({ "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;" }[c]));
}

init();
