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
  BNH: { label: "白娜熙", handle: "bnh_with_jyb", code: "E", bio: "bnh with JYB\nnot fan anymore\n12.16\nonly we know", password: "BNH1216", clue: "BNH", hidden: true, hint: "账号署名 + 反复强调的巡演日期。注意：同一天不等于同一个人。" },
  GES: { label: "高恩瑟", handle: "ges_1216", code: "X", bio: "真实老鼠号。没有公开身份，只有嫉妒、愤怒和未被回复的消息。", password: "GES1216", clue: "GES", hidden: true, hint: "真实姓名线索 + 反复出现的巡演日期。目标是确认老鬼身份，而不是合并两个账号。" }
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
    ["bnh_with_jyb", "12.16。看台那么多人，你还是看到了。only we know。"],
    ["bnh_with_jyb", "下班后买了柚子茶，还是一样难喝。有人记得我不喝冰的。"],
    ["bnh_with_jyb", "二手相机店老板说这条挂绳停产了。旧东西反而更像证据。"],
    ["bnh_with_jyb", "我从来没说过我们在交往。你们为什么非要替我定义？"],
    ["bnh_with_jyb", "不是所有纪念都适合留下。删掉照片，只留文字。"]
  ],
  GES: [
    ["ges_1216", "出口换了。她们还在正门等。"],
    ["ges_1216", "有人把五秒剪成一辈子。"],
    ["ges_1216", "真相不需要完整，够用就行。"],
    ["ges_1216", "她们都该离开。他身边不该剩下别人。"],
    ["ges_1216", "你查到这里了，为什么还不动手？"]
  ]
};

const state = loadState();
let zCounter = 20;
let windowCounter = 0;
let currentPageKey = "desktop";
const openWindows = new Map();
const MAX_VISIBLE_WINDOWS_DESKTOP = 3;
const MAX_VISIBLE_WINDOWS_MOBILE = 1;
const MAX_DOCK_ICONS = 6;
let showDesktopWindowIds = [];
let lastModalTrigger = null;
const THEME_STORAGE_KEY = "kaleido_theme";

function describeReadonlyAction(name) {
  return `${name}功能在只读镜像中不可用`;
}

function getFocusableElements(root = document) {
  return [...root.querySelectorAll("button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])")]
    .filter(element => !element.disabled && element.getAttribute("aria-hidden") !== "true" && element.offsetParent !== null);
}

function normalizePlayerName(value) {
  const fallback = "小鱼";
  const cleaned = String(value || "")
    .replace(/[<>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
  return Array.from(cleaned || fallback).slice(0, 16).join("");
}

function getPlayerName() {
  return normalizePlayerName(state.playerName);
}

function setPlayerName(value) {
  state.playerName = normalizePlayerName(value);
  saveState();
  syncPlayerNameUI();
  return state.playerName;
}

function syncPlayerNameUI() {
  const name = getPlayerName();
  document.querySelectorAll("[data-player-name]").forEach(node => { node.textContent = name; });
  const storyName = document.querySelector("#story-player-name");
  if (storyName) storyName.textContent = name;
  const introInput = document.querySelector("#player-name-input");
  if (introInput && introInput.value !== name) introInput.value = name;
}

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
    clues: { A: false, B: false, C: false, D: false, BNH: false, GES: false, overlap: false },
    identityEvidence: {
      enseoNameSeen: false,
      surnameClueSeen: false,
      nova1216Seen: false,
      bnhAccountSeen: false,
      bnhAmbiguitySeen: false,
      gesAccountSeen: false,
      ghostBehaviorPatternSeen: false,
      selectiveDisclosureSeen: false
    },
    dEvidence: {
      workContextSeen: false,
      nightShiftSeen: false,
      husbandContextSeen: false,
      staffNoticeSeen: false,
      rumorImpactSeen: false,
      xixiCrosscheckSeen: false
    },
    xixiEvidence: {
      earlyAngerSeen: false,
      ghostMaterialLogSeen: false,
      unsentToKLogSeen: false,
      deleteReasonSeen: false
    },
    backupEvidence: {
      scheduleSeen: false,
      contactMatrixSeen: false,
      messageDiffSeen: false,
      riskReviewSeen: false,
      managerChatSeen: false,
      archivePolicySeen: false,
      fanMonitorSeen: false,
      recordingSeen: false
    },
    storyMetrics: {
      truth: 0,
      harm: 0,
      control: 0,
      verify: 0,
      trust: 0
    },
    endingActions: {
      publicDumpChosen: false,
      tradeChosen: false,
      deleteChosen: false,
      abandonChosen: false,
      returnEvidenceChosen: false,
      contactedA: false,
      contactedB: false,
      contactedC: false,
      dExonerationComplete: false,
      exVerificationComplete: false
    },
    backupUnlocked: false,
    backupUnlockVersion: 0,
    finalIdentityVerified: false,
    ghostCalmed: false,
    introAppsViewed: { weibo: false, ins: false },
    memoText: "",
      playerName: "小鱼",
      oldGhostStage: 0,
      hiddenEntrances: [],
      endingsSeen: [],
      storyVersion: 3,
      ending: null,
      endingVariant: null
  };
}

function loadState() {
  try {
    const base = defaultState();
    const saved = JSON.parse(localStorage.getItem("k_case_state") || "{}");
    if (saved.storyVersion !== 3) {
      return {
        ...base,
        memoText: typeof saved.memoText === "string" ? saved.memoText : base.memoText,
        playerName: normalizePlayerName(saved.playerName)
      };
    }
    return {
      ...base,
      ...saved,
      clues: { ...base.clues, ...(saved.clues || {}) },
      identityEvidence: { ...base.identityEvidence, ...(saved.identityEvidence || {}) },
      dEvidence: { ...base.dEvidence, ...(saved.dEvidence || {}) },
      xixiEvidence: { ...base.xixiEvidence, ...(saved.xixiEvidence || {}) },
      backupEvidence: { ...base.backupEvidence, ...(saved.backupEvidence || {}) },
      storyMetrics: { ...base.storyMetrics, ...(saved.storyMetrics || {}) },
      endingActions: { ...base.endingActions, ...(saved.endingActions || {}) },
      introAppsViewed: { ...base.introAppsViewed, ...(saved.introAppsViewed || {}) },
      playerName: normalizePlayerName(saved.playerName),
      unlocked: saved.unlocked || ["K_Log"],
      hiddenEntrances: saved.hiddenEntrances || [],
      endingsSeen: Array.isArray(saved.endingsSeen) ? saved.endingsSeen : [],
      endingVariant: saved.endingVariant || null
    };
  }
  catch { return defaultState(); }
}

let suppressFileRefresh = false;

function saveState() {
  localStorage.setItem("k_case_state", JSON.stringify(state));
  renderCasePanel();
  if (!suppressFileRefresh) refreshFilesIfOpen();
}

const STORY_METRIC_KEYS = ["truth", "harm", "control", "verify", "trust"];

function clampStoryMetric(value) {
  return Math.max(0, Math.min(100, Number.isFinite(value) ? value : 0));
}

function adjustStoryMetric(metric, delta) {
  if (!STORY_METRIC_KEYS.includes(metric)) return null;
  const current = clampStoryMetric(state.storyMetrics?.[metric] || 0);
  const next = clampStoryMetric(current + Number(delta || 0));
  if (!state.storyMetrics) state.storyMetrics = defaultState().storyMetrics;
  if (next !== current) {
    state.storyMetrics[metric] = next;
    saveState();
  }
  return next;
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
    if (message) toast(message);
    saveState();
    return true;
  }
  return false;
}

function markDEvidence(key, message) {
  if (!state.dEvidence) state.dEvidence = defaultState().dEvidence;
  if (!state.dEvidence[key]) {
    state.dEvidence[key] = true;
    if (message) toast(message);
    evaluateDEvidence();
    saveState();
    return true;
  }
  return false;
}

function evaluateDEvidence() {
  if (!state.dEvidence || state.clues.D) return;
  const required = ["workContextSeen", "nightShiftSeen", "husbandContextSeen", "staffNoticeSeen", "rumorImpactSeen", "xixiCrosscheckSeen"];
  if (required.every(key => state.dEvidence[key])) {
    markClue("D", "多条证据闭合：尹书璟线只能证明工作接触，不能证明私人关系");
    adjustStoryMetric("verify", 8);
    adjustStoryMetric("trust", 2);
  }
}

function markXixiEvidence(key, message) {
  if (!state.xixiEvidence) state.xixiEvidence = defaultState().xixiEvidence;
  if (!state.xixiEvidence[key]) {
    state.xixiEvidence[key] = true;
    if (message) toast(message);
    saveState();
    return true;
  }
  return false;
}

function markBackupEvidence(key, message) {
  if (!state.backupEvidence) state.backupEvidence = defaultState().backupEvidence;
  if (!state.backupEvidence[key]) {
    state.backupEvidence[key] = true;
    if (message) toast(message);
    saveState();
    return true;
  }
  return false;
}

function init() {
  initThemeToggle();
  renderDesktop();
  renderCasePanel();
  updateClock();
  setInterval(updateClock, 1000);
  const loginScreen = document.querySelector("#story-login");
  const desktop = document.querySelector("#desktop");
  const playerNameInput = document.querySelector("#player-name-input");
  syncPlayerNameUI();
  playerNameInput?.addEventListener("input", () => {
    const previewName = normalizePlayerName(playerNameInput.value);
    document.querySelector("#story-player-name").textContent = previewName;
  });
  document.querySelector("#story-login-button").addEventListener("click", () => {
    if (playerNameInput) setPlayerName(playerNameInput.value);
    loginScreen.classList.add("leaving");
    desktop.classList.remove("desktop-locked");
    window.setTimeout(() => loginScreen.remove(), 620);
  });
  const memoInput = document.querySelector("#memo-input");
  document.querySelector("#story-recap-button")?.addEventListener("click", showStoryRecap);
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
    <button class="desktop-icon ${app.enabled ? "" : "disabled"} ${app.mobileOnly ? "mobile-only" : ""}" data-app="${app.id}" style="--icon:${app.color}" aria-label="打开${app.name}" aria-disabled="${app.enabled ? "false" : "true"}">
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
        { opacity: 0, transform: "translateY(34px) scale(.88)" },
        { opacity: 1, transform: "translateY(-4px) scale(1.012)", offset: .72 },
        { opacity: 1, transform: "translateY(0) scale(1)" }
      ],
      { duration: 560, easing: "cubic-bezier(.16, 1, .3, 1)" }
    ],
    minimize: [
      [
        { opacity: 1, transform: "translateY(0) scale(1)" },
        { opacity: .82, transform: "translateY(12px) scale(.96)", offset: .45 },
        { opacity: 0, transform: "translateY(46vh) scale(.22)" }
      ],
      { duration: 420, easing: "cubic-bezier(.4, 0, .2, 1)" }
    ],
    close: [
      [
        { opacity: 1, transform: "scale(1)" },
        { opacity: 0, transform: "translateY(12px) scale(.9)" }
      ],
      { duration: 260, easing: "cubic-bezier(.4, 0, 1, 1)" }
    ],
    restore: [
      [
        { opacity: 0, transform: "translateY(42vh) scale(.28)" },
        { opacity: 1, transform: "translateY(-3px) scale(1.008)", offset: .78 },
        { opacity: 1, transform: "translateY(0) scale(1)" }
      ],
      { duration: 480, easing: "cubic-bezier(.16, 1, .3, 1)" }
    ]
  };
  const [frames, options] = motions[type] || motions.open;
  const mobileMotion = isMobileViewport();
  const safeFrames = mobileMotion
    ? frames.map(({ filter, ...frame }) => frame)
    : frames;
  const safeOptions = mobileMotion
    ? { ...options, duration: Math.min(options.duration || 220, 220) }
    : options;
  const animation = win.animate(safeFrames, safeOptions);
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
  syncDockCapacity();
  const active = [...openWindows.values()].filter(win => !win.hidden).sort((a, b) => Number(b.style.zIndex) - Number(a.style.zIndex))[0];
  syncPageBadgeVisibility(active || null);
}

function getDockTaskLimit() {
  return Math.max(0, MAX_DOCK_ICONS - 1);
}

function syncDockCapacity() {
  const limit = getDockTaskLimit();
  const items = [...document.querySelectorAll("#task-items .task-item")];
  items.forEach((item, index) => {
    const hidden = index >= limit;
    item.hidden = hidden;
    item.setAttribute("aria-hidden", String(hidden));
    item.tabIndex = hidden ? -1 : 0;
  });
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
  syncDockCapacity();
}

function updateTasks() {
  document.querySelectorAll(".task-item").forEach(item => {
    const win = openWindows.get(item.dataset.task);
    item.classList.toggle("active", Boolean(win && !win.hidden && win.classList.contains("active")));
  });
  syncDockCapacity();
}

function renderApp(id, content) {
  if (id === "ins") renderINS(content);
  if (id === "kktalk") renderKKTalk(content);
  if (id === "weibo") renderWeibo(content);
  if (id === "browser") renderBrowser(content);
  if (id === "files") renderFiles(content);
  if (id === "settings") renderSettings(content);
  if (id === "album") renderPlaceholderApp(content, "相册", "相册中还没有内容");
  if (id === "memo") renderMemoApp(content);
}

function renderSettings(root) {
  root.innerHTML = `
    <div class="settings-app-shell">
      <p class="eyebrow">KALEIDO SYSTEM SETTINGS</p>
      <h2>设置</h2>
      <section class="settings-panel" aria-labelledby="player-name-setting-title">
        <div>
          <h3 id="player-name-setting-title">站内称呼</h3>
          <p>这个名字只用于玩家身份锚点和你的发言，不会改写所有第二人称叙事。</p>
        </div>
        <label class="settings-name-field">
          <span>当前称呼</span>
          <input class="input" id="settings-player-name" maxlength="16" autocomplete="nickname" value="${escapeHtml(getPlayerName())}">
        </label>
        <div class="modal-actions">
          <button class="btn primary" id="save-player-name">保存称呼</button>
          <button class="btn" id="reset-player-name">恢复小鱼</button>
        </div>
        <p class="settings-preview">预览：<strong data-player-name>${escapeHtml(getPlayerName())}</strong> 正在查看 Kaleido 档案。</p>
      </section>
    </div>`;
  const input = root.querySelector("#settings-player-name");
  const save = () => {
    input.value = setPlayerName(input.value);
    toast(`站内称呼已更新为：${getPlayerName()}`);
    renderSettings(root);
  };
  root.querySelector("#save-player-name").addEventListener("click", save);
  root.querySelector("#reset-player-name").addEventListener("click", () => {
    input.value = "小鱼";
    save();
  });
  input.addEventListener("keydown", event => {
    if (event.key === "Enter") save();
  });
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
      <h2>备忘录</h2>
      <p class="memo-window-tip">桌面端最多允许同时打开 3 个应用窗口。手机端最多允许同时打开 1 个应用窗口。当超过数量时，自动关闭或最小化最早打开的窗口。</p>
      <button class="btn story-recap-button" type="button" data-open-story-recap>查看前情</button>
      <textarea class="memo-app-input" aria-label="备忘录内容" placeholder="写点什么，之后也会保存在本机。">${escapeHtml(state.memoText || "")}</textarea>
    </div>`;
  root.querySelector("[data-open-story-recap]").addEventListener("click", showStoryRecap);
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
    YSJ: "尹书璟的公开账号更像工作备忘：凌晨妆发、粉底色号、临时改妆、丈夫接送和同事吐槽。她确实经常出现在后台、宿舍楼和酒店工作区，但每一处都需要先核对排班语境。",
    BNH: "账号内容混合生活记录与 12.16 叙事：柚子茶、相机挂绳、夜班文案、签售记忆被放在同一条时间线上。它看起来像私人关系，却始终缺少能独立核实的双向证据。",
    GES: "真实老鼠号：她记录出口、车辆动线、站姐位置和可疑账号更新时间。语气从观察逐渐转为排除：不是证明谁正确，而是判断谁该离开。\n\n置顶草稿：\n“假的也该走。真的更该走。”\n\n刚刚发布：\n“你查到这里了，为什么还不动手？”"
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
    markDEvidence("workContextSeen", "尹书璟账号显示：可疑地点首先需要工作语境解释");
  }
  if (accountId === "BNH") {
    if (markIdentityEvidence("bnhAccountSeen", "已查看白娜熙账号资料：12.16 与模糊关系叙事反复出现")) {
      adjustStoryMetric("truth", 4);
    }
  }
  if (accountId === "GES") {
    if (markIdentityEvidence("gesAccountSeen", "已确认高恩瑟账号与老鬼行为模式高度重合")) {
      adjustStoryMetric("truth", 6);
    }
    if (markIdentityEvidence("ghostBehaviorPatternSeen", "老鬼的语言模式呈现排除竞争关系的倾向")) {
      adjustStoryMetric("verify", 4);
    }
  }
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
      BNH: ["白娜熙","bnh","bnh_with_jyb","bnh.with.jyb"], GES: ["高恩瑟","ges","老鬼","exit map"], LXE: ["柳夏恩","lxe","lucy 柳夏恩"]
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
      const canRecover = state.identityEvidence.enseoNameSeen && state.identityEvidence.surnameClueSeen;
      target.className = "empty";
      target.innerHTML = `无法搜索匿名用户。${canRecover ? '<br><br><button class="btn" id="recover-ges">使用“高姓 + 恩瑟”恢复匿名缓存</button>' : ""}`;
      target.querySelector("#recover-ges")?.addEventListener("click", () => revealHiddenAccount("GES", "你将“高姓女粉丝”与“恩瑟”拼合为高恩瑟，但身份只是入口；还需要核验她为什么掌握这些材料"));
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
  const choices = state.unlocked
    .filter(id => ACCOUNTS[id])
    .map(id => `<button class="btn" data-account="${id}">${ACCOUNTS[id].label}</button>`)
    .join("");
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
    "你不是也想知道西西为什么走吗？先别急着骂人。我只给你一张图。",
    "化妆师最方便接近。她深夜进出过，你不想看吗？",
    "日期对不上。你自己去看。我没有让你相信我。",
    "别浪费时间查她是不是本人。她发那些东西就已经够恶心了。",
    "别心软。你现在停下，才是在保护他。",
    "假的也该走。真的更该走。最后留下谁，有那么重要吗？"
  ];
  const shown = Math.min(state.oldGhostStage + 1, messages.length);
  if (shown >= 3 && markIdentityEvidence("selectiveDisclosureSeen", "老鬼开始阻止你核验 BNH 材料的完整语境")) {
    adjustStoryMetric("verify", 3);
  }
  if (shown >= messages.length && markIdentityEvidence("ghostBehaviorPatternSeen", "老鬼的私信暴露出排除所有竞争关系的目标")) {
    adjustStoryMetric("truth", 4);
  }
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
  view.querySelectorAll("[data-kkt-chat-action]").forEach(button => {
    button.setAttribute("aria-label", describeReadonlyAction(button.dataset.kktChatAction));
    button.addEventListener("click", () => {
      toast(`${button.dataset.kktChatAction}功能在备份模式下不可用。`);
    });
  });
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
              <button class="weibo-more" aria-label="更多微博操作">•••</button>
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
    revealHiddenAccount("BNH", "微博配图保留了 bnh_with_jyb 的本地登录缓存");
  });
  root.querySelectorAll("[data-weibo-action], [data-weibo-nav]").forEach(button => {
    const label = button.dataset.weiboAction || button.dataset.weiboNav;
    button.setAttribute("aria-label", describeReadonlyAction(label));
    button.addEventListener("click", () => {
      toast(`${label}功能在只读镜像中不可用。`);
    });
  });
  root.querySelectorAll("[data-weibo-tab]").forEach(button => {
    button.setAttribute("aria-pressed", String(button.classList.contains("active")));
    button.addEventListener("click", () => {
      root.querySelectorAll("[data-weibo-tab]").forEach(tab => {
        tab.classList.remove("active");
        tab.setAttribute("aria-pressed", "false");
      });
      button.classList.add("active");
      button.setAttribute("aria-pressed", "true");
      toast(button.dataset.weiboTab === "follow" ? "关注流缓存不完整，当前仍显示热门归档。" : "已切换到热门归档。");
    });
  });
  root.querySelectorAll(".weibo-view-comments").forEach(button => button.addEventListener("click", () => {
    const post = posts[Number(button.dataset.comments)];
    showModal("全部评论", post.title, post.comments.map(([user, comment]) => `<div class="comment"><b>@${user}</b>：${comment}</div>`).join(""), modal => {
      setPageNumber(Number(button.dataset.comments) === 1 ? "weiboMakeupPost" : "weiboHome", modal);
    });
  }));
}

function renderBrowser(root, initial = "") {
  setPageNumber("browserHome", root);
  root.innerHTML = `<div class="app-shell"><div class="browser-bar"><button class="btn" aria-label="返回上一页">←</button><input class="input" id="browser-search" placeholder="搜索公开资料" value="${initial}"><button class="btn primary" id="browser-go">千度一下</button></div><div class="browser-page" id="browser-page"><div class="browser-logo">千度</div><p>公开网页存档。可搜索人物、NOVA、LUCY。</p></div></div>`;
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
    { keys:["白娜熙","bnh","bnh_with_jyb"], title:"没有找到可靠结果", text:"没有找到与“白娜熙”相关的可靠公开身份。能确认的只有 bnh_with_jyb 在 12.16 后持续发布模糊关系文本。" },
    { keys:["姜艺彬"], title:"姜艺彬 - NOVA 主唱", text:"清纯少年感，品牌合作与舞台表现力广受好评。公开报道常称其对工作人员温柔。" },
    { keys:["nova"], title:"NOVA 男团资料", text:"男子组合。首尔巡演日期：12.16。该日期在多个删除记录中重复出现。", evidence:"nova1216Seen" },
    { keys:["lucy"], title:"LUCY 女团资料", text:"新人女团，出道日 11.20。成员：柳夏恩等。" },
    { keys:["后台闯入","粉丝闯入","化妆室","安保"], title:"【小新闻】某男团活动后台发生粉丝闯入事件", text:"据现场工作人员透露，一名高姓女粉丝曾试图靠近化妆室，被安保人员带离。", evidence:"surnameClueSeen" },
    { keys:["高恩瑟","老鬼","ges"], title:"未找到公开账号", text:"无法搜索匿名用户。" }
  ];
  const hit = data.find(x => x.keys.some(k => q.includes(k.toLowerCase())));
  if (hit?.evidence === "surnameClueSeen") markIdentityEvidence("surnameClueSeen", "后台闯入新闻透露：闯入者是一名高姓女粉丝");
  if (hit?.evidence === "nova1216Seen") markIdentityEvidence("nova1216Seen", "公开资料确认：12.16 是 NOVA 首尔巡演日");
  const canRecoverGES = hit?.keys.includes("高恩瑟") && state.identityEvidence.enseoNameSeen && state.identityEvidence.surnameClueSeen;
  page.innerHTML = `<div class="browser-logo">千度</div><p class="muted">搜索：${escapeHtml(query)}</p>${hit ? `<article class="result-card"><a>${hit.title}</a><p>${hit.text}</p>${canRecoverGES ? '<button class="btn" id="cache-entry">用“高姓 + 恩瑟”检索删除缓存</button>' : ""}</article>` : `<div class="result-card">未找到相关公开信息。</div>`}`;
  page.querySelector("#cache-entry")?.addEventListener("click", () => revealHiddenAccount("GES", "你将新闻里的“高姓女粉丝”与尹书璟提到的“恩瑟”拼合为高恩瑟；接下来要验证她提供材料的方式"));
}

const FILES = {
  A_HZY: ["hotel_receipt_YB.png","backstage_private.jpg","chat_export.txt","momo_0509.jpg"],
  B_LXE: ["kkt_backup.txt","practice_room.jpg","voice_transcript.txt","lucy_debut_1120.png"],
  C_CMY: ["first_million_0704.png","same_ring.jpg","hotel_window_compare.png","voice_backup.txt"],
  D_YSJ: ["makeup_schedule.pdf","night_shift_log.txt","husband_chat.txt","staff_group_notice.txt","rumor_comment_archive.txt","friend_chat_enseo.txt","birthday_0318.jpg"],
  E_BNH: ["bnh_with_jyb_profile.png","1216_clip_edited.mp4","post_edit_history.txt","camera_strap_match.jpg","dm_question_archive.txt","notes_1216.txt"],
  X_GES: ["exit_map_1216.png","bnh_watchlist.txt","crop_manifest.json","unsent_to_jyb.txt","xixi_exchange_fragment.txt","klog_notes.txt"],
  Xixi_deleted: ["early_anger_draft.txt","d_crosscheck.txt","ghost_material_log.txt","xixi_unsent_to_klog.txt","account_delete_reason.txt","timeline_overlap_final.xlsx","bnh_not_ges_note.txt","K_memo_screenshot_blur.png","he_is_not_who_you_think.txt"],
  browser_cache: ["404_not_found_k.html","backstage_intrusion_news.html","1216_clip_full_cache.mp4","deleted_search_log.txt"],
  K_BACKUP: ["schedule_conflict.log","contact_matrix.csv","message_template_diff.txt","risk_review_0706.txt","manager_chat_fragment.txt","archive_policy.md","fan_monitor_summary.txt","recording_transcript_partial.txt","WHO_ARE_YOU_PROTECTING.locked"]
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
    X_GES: "insGES",
    K_BACKUP: state.backupUnlocked && state.backupUnlockVersion === 1 ? "backupCore" : "backupUnlock"
  };
  setPageNumber(folderPages[folder], root);
  const backupReady = state.clues.A && state.clues.B && state.clues.C;
  const folders = Object.keys(FILES);
  root.innerHTML = `<div class="app-shell"><div class="app-toolbar"><b>FILE EXPLORER</b><span class="muted">C:\\Users\\K_Log\\Archive</span><span class="spacer"></span><span class="pill">${backupReady ? "A / B / C 线索已收集" : "等待 A / B / C 线索"}</span></div><div class="app-main"><div class="files-layout"><aside class="folder-list">${folders.map(name => {
    const locked = (name === "E_BNH" && !state.unlocked.includes("BNH")) || (name === "X_GES" && !state.unlocked.includes("GES")) || (name === "K_BACKUP" && !backupReady);
    return `<button class="folder ${name===folder?"active":""} ${locked?"locked":""}" data-folder="${name}">${locked?"▣":"▰"} ${name}${name==="K_BACKUP"&&!backupReady?".locked":""}</button>`;
  }).join("")}</aside><section class="file-view" id="file-view"></section></div></div></div>`;
  root.querySelectorAll("[data-folder]").forEach(btn => btn.addEventListener("click", () => {
    const name = btn.dataset.folder;
    if (name === "E_BNH" && !state.unlocked.includes("BNH")) return toast("E_BNH 目录缺少账号令牌。嫂子站微博的爆料配图可能保留了入口。");
    if (name === "X_GES" && !state.unlocked.includes("GES")) return toast("X_GES 目录缺少账号令牌。先完成“高姓 + 恩瑟”的身份恢复。");
    if (name === "K_BACKUP" && !backupReady) return toast("K_BACKUP 仍被锁定。需要先收集 A / B / C 三条关键线索。");
    renderFiles(root, name);
  }));
  renderFolder(root.querySelector("#file-view"), folder);
}

function renderFolder(view, folder) {
  const isLocked = (folder === "E_BNH" && !state.unlocked.includes("BNH")) || (folder === "X_GES" && !state.unlocked.includes("GES"));
  if (isLocked) { view.innerHTML = `<div class="empty">该目录已加密。</div>`; return; }
  if (folder === "K_BACKUP" && (!state.backupUnlocked || state.backupUnlockVersion !== 1)) {
    renderBackupUnlock(view);
    return;
  }
  const backupReady = folder === "K_BACKUP" ? isBackupCoreComplete() : false;
  const finalButton = folder === "K_BACKUP"
    ? `<button class="btn primary backup-final-button ${backupReady ? "" : "locked"}" id="open-final-gate" type="button" aria-disabled="${backupReady ? "false" : "true"}">${backupReady ? "打开 WHO_ARE_YOU_PROTECTING" : "WHO_ARE_YOU_PROTECTING｜待读完核心记录"}</button>`
    : "";
  const fileRows = FILES[folder].map(file => {
    const locked = isBackupFileLocked(file);
    const lockedCopy = locked ? getBackupFileLockReason(file) : "点击预览";
    const disabledAttr = locked ? "aria-disabled='true'" : "";
    return `<button class="file-row ${locked ? "locked" : ""}" type="button" data-file="${file}" aria-label="预览文件 ${file}" ${disabledAttr}><span>▤ ${file}</span><span class="muted">${lockedCopy}</span></button>`;
  }).join("");
  view.innerHTML = `<p class="eyebrow">${folder}</p>${fileRows}${finalButton}<div id="file-preview"></div>`;
  view.querySelectorAll("[data-file]").forEach(row => row.addEventListener("click", () => {
    if (isBackupFileLocked(row.dataset.file)) return toast(getBackupFileLockReason(row.dataset.file));
    if (folder === "K_BACKUP") {
      suppressFileRefresh = true;
      try {
        previewFile(view.querySelector("#file-preview"), folder, row.dataset.file);
      } finally {
        suppressFileRefresh = false;
      }
      syncBackupFolderRows(view);
      return;
    }
    previewFile(view.querySelector("#file-preview"), folder, row.dataset.file);
  }));
  view.querySelector("#open-final-gate")?.addEventListener("click", () => {
    if (!isBackupCoreComplete()) return toast("先读完 K_BACKUP 的八份核心记录。");
    renderPreEndingVerification(view.querySelector("#file-preview"));
  });
}

function isBackupCoreComplete() {
  const evidence = state.backupEvidence || {};
  return ["scheduleSeen", "contactMatrixSeen", "messageDiffSeen", "riskReviewSeen", "managerChatSeen", "archivePolicySeen", "fanMonitorSeen", "recordingSeen"]
    .every(key => evidence[key]);
}

function isBackupFileLocked(file) {
  const evidence = state.backupEvidence || {};
  if (["schedule_conflict.log", "contact_matrix.csv", "WHO_ARE_YOU_PROTECTING.locked"].includes(file)) return false;
  if (["message_template_diff.txt", "risk_review_0706.txt"].includes(file)) return !(evidence.scheduleSeen && evidence.contactMatrixSeen);
  if (["manager_chat_fragment.txt", "archive_policy.md"].includes(file)) return !(evidence.messageDiffSeen && evidence.riskReviewSeen);
  if (["fan_monitor_summary.txt", "recording_transcript_partial.txt"].includes(file)) return !(evidence.managerChatSeen && evidence.archivePolicySeen);
  return false;
}

function getBackupFileLockReason(file) {
  if (["message_template_diff.txt", "risk_review_0706.txt"].includes(file)) return "先读调度与联系矩阵";
  if (["manager_chat_fragment.txt", "archive_policy.md"].includes(file)) return "先读话术差异与风险复盘";
  if (["fan_monitor_summary.txt", "recording_transcript_partial.txt"].includes(file)) return "先读经纪片段与归档规范";
  return "尚未解锁";
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


function syncBackupFolderRows(view) {
  if (!view) return;
  view.querySelectorAll("[data-file]").forEach(row => {
    const locked = isBackupFileLocked(row.dataset.file);
    row.classList.toggle("locked", locked);
    if (locked) row.setAttribute("aria-disabled", "true");
    else row.removeAttribute("aria-disabled");
    const status = row.querySelector(".muted");
    if (status) status.textContent = locked ? getBackupFileLockReason(row.dataset.file) : "点击预览";
  });
  const finalGate = view.querySelector("#open-final-gate");
  if (finalGate) {
    const ready = isBackupCoreComplete();
    finalGate.classList.toggle("locked", !ready);
    finalGate.setAttribute("aria-disabled", ready ? "false" : "true");
    finalGate.textContent = ready ? "打开 WHO_ARE_YOU_PROTECTING" : "WHO_ARE_YOU_PROTECTING｜待读完核心记录";
  }
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
    X_GES: "insGES",
    K_BACKUP: "backupCore"
  };
  setPageNumber(folderPageKeys[folder], preview);
  if (folder === "browser_cache" && file === "backstage_intrusion_news.html") {
    setPageNumber("browserIntrusion", preview);
  }
  const texts = {
    "timeline_overlap_final.xlsx": "A / B / C 三条时间线在 06.28 - 07.06 重叠。\n同一晚，姜艺彬向三人发送了近似措辞。",
    "early_anger_draft.txt": "西西草稿 / 未发布：\n先别管公司怎么压。只要确认一个，我就全部发出去。\n她们不是爱装吗？那就让所有人看看。\n……等一下，D 那张图只有宿舍楼门口，没有进去的时间。\n算了，先存。",
    "d_crosscheck.txt": "D 线交叉核验：\n23:48 投稿说她深夜进宿舍楼。\n00:10 妆造群通知临时补妆。\n05:40 早班妆发签到。\n丈夫 01:06 在楼下等她。\n\n不能发 D。现有证据只能证明她在工作。",
    "ghost_material_log.txt": "老鬼材料记录：\nA 的票据是真的。\nB 的日期是真的。\nC 的截图地点对得上。\nD 的宿舍楼截图也是真的，但她没给同一晚的妆造群通知和同行工作人员。\n\n问题不是造假，是她每次都只给够我生气的那一段。",
    "xixi_unsent_to_klog.txt": "写给 K_Log / 未发送：\n我一开始以为，把全部东西发出去就好了。\n后来发现照片里的人不是 A/B/C/D，她们有名字。\n我删了三遍，还是不知道怎么跟你说。\n如果你看到这里，先别急着替她们说话。也别替她们沉默。",
    "account_delete_reason.txt": "销号前备忘：\n继续发，D 会被拖下去。\nA/B/C 我不知道她们愿不愿意公开。\n老鬼一直催我，说我心软，说我在保护他。\n可站子一转，粉丝就会把人撕开。\n我停，不是因为没事了。是因为我不能再用这个号做扩音器。",
    "do_not_post_D.png": "西西批注：不要发 D。不是因为她完美无暇，而是因为现有证据只能证明她在工作。第一条投稿把工作人员身份当成了恋爱证据。",
    "friend_chat_enseo.txt": "尹书璟：我真的不想再接这个人了。他临时改要求，出问题又让团队去解释。公开场合倒是很会笑。\n尹书璟：而且他粉丝也有点吓人。上次有个女孩子跑到化妆室门口发疯，好像叫什么恩瑟。保安都来了，真的无语。",
    "makeup_schedule.pdf": "妆造排班表节选：\n23:40 NOVA 宿舍楼临时补妆 / 00:20 收拾工具离开 / 次日 05:40 早班妆发签到。\n同行：发型 2 人、服装 1 人、现场经纪 1 人。\n\n深夜地点成立，但不是私人行程。",
    "night_shift_log.txt": "夜班记录：\n23:12 临时通知，姜艺彬舞台后采访妆面需补。\n00:38 便利店饭团 + 热咖啡。\n01:04 丈夫到楼下，车里睡着。\n05:31 到达棚内，粉底色号又被临时改。\n\n尹书璟备注：下次谁再临时改妆谁自己画。",
    "husband_chat.txt": "丈夫：结束给我电话，我在楼下。\n尹书璟：又临时改，我快烦死了。\n丈夫：网上有人在说你？你同事发给我看了。\n尹书璟：别看。都是乱猜。我只是上班。\n丈夫：那我接你回家。",
    "staff_group_notice.txt": "NOVA 妆造工作群：\n23:08 经纪：艺彬采访前补一下眼下和唇色，宿舍楼 B1。\n23:09 发型：我也过去。\n23:10 尹书璟：收到，带工具箱。\n00:27 服装：都撤了吗？\n00:31 尹书璟：撤了，明早 5:40 棚里见。",
    "rumor_comment_archive.txt": "评论归档：\n@匿名1：化妆师这么晚去宿舍，懂的都懂。\n@匿名2：她老公知道吗？\n@匿名3：难怪哥哥最近媚女友粉。\n\n尹书璟私人备注：陌生账号开始看我限动。今天工作群也没人敢开玩笑。",
    "backstage_intrusion_news.html": "【小新闻】某男团活动后台发生粉丝闯入事件。\n据现场工作人员透露，一名高姓女粉丝曾试图靠近化妆室，被安保人员带离。",
    "bnh_with_jyb_profile.png": "账号：bnh_with_jyb\n简介：\nbnh with JYB\nnot fan anymore\n12.16\nonly we know\n\n公开生活痕迹：品牌助理 / 夜班剪辑 / 二手相机 / 柚子茶。她不是凭空账号，现实生活与追星记录交叠在一起。",
    "1216_clip_edited.mp4": "文件预览：5 秒裁切版 1216 饭撒视频。\n00:06 - 00:11：姜艺彬视线扫过 A 区中段，短暂停顿，像是在回应某块手幅。\n配文：你还记得。\n\n该片段确实存在，但没有前后语境。",
    "post_edit_history.txt": "编辑记录：\n00:18  他今天状态很好。\n00:31  他好像记得上次那句话。\n01:04  12.16。only we know。\n次日 09:22  删除活动名、座位区与人群背景。\n\n同一段记忆被逐步改写成更私人化的叙事。",
    "camera_strap_match.jpg": "图像比对：白娜熙生活照中的旧相机挂绳，与 12.16 A 区远景里一名观众肩上的挂绳一致。\n\n结论只能到这里：账号背后有真实现场参与者，不能证明私人关系。",
    "dm_question_archive.txt": "私信归档：\n问：你们真的在一起吗？\nBNH：我从来没说过我们在交往。\n问：那为什么写 only we know？\nBNH：我没有义务解释我自己的记忆。\n\n她回避确认，也拒绝纠正外界想象。",
    "notes_1216.txt": "个人备忘：\n我知道那天他可能不是只看我。可是人为什么不能留下一件只属于自己的记忆？我没有说我们在交往。是他们要问，是他们要猜。后来我只是……不想纠正了。",
    "1216_clip_full_cache.mp4": "第三方普通饭拍缓存：18 秒完整视频。\n00:00 - 00:06：姜艺彬先向 A 区左侧挥手。\n00:06 - 00:11：视线经过中段，短暂停顿。\n00:11 - 00:18：继续对右侧比手势，现场尖叫。\n\n完整语境显示：这不是只对一个人的回应；但也不能排除他认出了熟悉粉丝。它只能证明裁切版把开放解释变成了唯一解释。",
    "bnh_not_ges_note.txt": "西西未发送备注：\n她不是 BNH。她在盯着 BNH。\n\n同一晚不同角度、不同位置。不要再把 12.16 当作同一个人的证明。",
    "exit_map_1216.png": "手绘出口图：后台出口、艺人车辆动线、安保缓冲区被红笔标出。备注：21:31 右侧警戒线换人；21:36 白色车先走。\n\n高恩瑟记住的不是舞台回应，而是谁能靠近出口。",
    "bnh_watchlist.txt": "BNH 观察记录：\n12.16 A 区中段 / 旧相机挂绳 / 退场后去侧门。\n12.18 账号改简介：only we know。\n01.07 发柚子茶，评论区有人叫她嫂子，她没有否认。\n02.14 删除一张活动合照，只留文字。\n\n这是外部观察者记录，不是账号主人自述。",
    "crop_manifest.json": "{\n  \"sent_to_klog\": [\"bnh_1216_06-11s.mp4\", \"d_dorm_crop.png\"],\n  \"withheld\": [\"bnh_1216_full_18s.mp4\", \"staff_group_wide.png\"],\n  \"note\": \"够用了，别把前后都给她。\"\n}\n\n老鬼给的材料并非全假，但明显经过选择。",
    "unsent_to_jyb.txt": "未发送：\n你说粉丝最重要，可你看谁都像在看我。\n如果她们只是误会，为什么你不让她们停下？\n我可以帮你把她们都赶走。\n\n文本没有送达记录。",
    "xixi_exchange_fragment.txt": "聊天残片：\n西西：原视频给我。只要 5 秒我不能判断。\n老鬼：够清楚了。\n西西：你不是在查真相，你是在让我替你选敌人。\n\n此后西西停止向她索要材料。",
    "klog_notes.txt": "K_Log 观察记录：\n先看微博，反应慢。\n看到 D 的时候犹豫了。\n如果她愿意骂 BNH，就可以继续给她下一包。\n她开始找完整视频，麻烦。\n\n你终于意识到：自己也在她的观察名单上。",
    "schedule_conflict.log": "2026-06-28\n22:10 HZY airport pickup delayed / driver changed.\n23:40 LXE rehearsal ended late.\n00:15 CMY hotel area photo risk noted.\n\n2026-07-03\n18:22 A asks about next week.\n21:05 B stage call added.\n23:48 C asks if 07.04 upload should stay.\n\n2026-07-06\nWARNING: overlap window 06.28-07.06.\nmanual review required.",
    "message_template_diff.txt": "A / 06-28 23:14\n到了告诉我。别让别人知道。\n\nB / 07-01 01:20\n结束告诉我。最近先别跟别人说。\n\nC / 07-04 22:05\n回酒店告诉我。照片先不要发。\n\n重复项：告诉我 / 先别说 / 暂缓公开。",
    "risk_review_0706.txt": "07.06 risk review\n- A return date changed. Do not ask team chat.\n- B public stage next week. Avoid private photo trace.\n- C window comparison spreading in small accounts.\n- D direction is wrong; active correction may extend heat.\n- Do not handle all three at once.\n- Any unified response may trigger timeline comparison.",
    "manager_chat_fragment.txt": "经纪：07.04 那边已经有人对窗景了。\n姜：先让她删。\n经纪：B 那边下周还有合作舞台。\n姜：不要一起处理。\n经纪：A 回来时间也变了。\n姜：我知道。\n经纪：那你至少别再用一样的话。\n姜：……",
    "archive_policy.md": "Archive policy / mobile cleanup\n- 私人聊天截图只保留必要裁切。\n- 原始文件转入离线盘，不放工作手机。\n- 公开视频保存链接，不保存下载副本。\n- 工作手机每周清理缓存。\n- 单次联系内容不得同时出现在多个设备。\n- 外部询问统一记录，不在群内展开。",
    "fan_monitor_summary.txt": "Fan monitor / 07.06 09:30\nKaleido: no repost. defensive tone stable.\nXixi: account deleted. impact unknown.\nD keyword: moving to husband comments. risk spillover.\nBNH: limited to dreamer circle / no main fanbase spread.\nA/B/C: no cross-recognition yet.\nMakeup rumor: may decay without correction.\nWindow comparison: reduce heat before brand upload.\nCore stations: watch for archive threads.",
    "recording_transcript_partial.txt": "[00:13]\n经纪：三边日期真的撞了。\n\n[00:18]\n姜：我知道。\n\n[00:24]\n经纪：那现在先处理哪一个？\n\n[00:31]\n姜：先别让她们碰到一起。\n\n[00:40]\n无法识别。\n\n[00:52]\n经纪：粉丝那边呢？\n\n[00:57]\n姜：先别回应。\n\n[01:04]\n椅子移动声。\n\n[01:11]\n姜：原来的东西都收一下。"
  };
  if (file === "contact_matrix.csv") {
    preview.innerHTML = `<div class="file-preview"><table class="csv-table"><tr><th>code</th><th>last_contact</th><th>next_contact</th><th>exposure_level</th><th>public_overlap</th><th>response_delay</th><th>note</th></tr><tr><td>A</td><td>06-28 23:14</td><td>07-09</td><td>LOW</td><td>NONE</td><td>4h</td><td>Boston return pending</td></tr><tr><td>B</td><td>07-01 01:20</td><td>TBD</td><td>HIGH</td><td>STAGE</td><td>12h</td><td>avoid private photo</td></tr><tr><td>C</td><td>07-04 22:05</td><td>07-08</td><td>MEDIUM</td><td>SOCIAL</td><td>6h</td><td>brand window risk</td></tr></table></div>`;
  } else if (file === "WHO_ARE_YOU_PROTECTING.locked") {
    const message = isBackupCoreComplete()
      ? "核心记录核验完成。请从文件列表下方的验证入口打开。"
      : "尚未完成核心记录核验。读完八份 K_BACKUP 记录后，下方验证入口才会开放。";
    preview.innerHTML = `<div class="file-preview"><p class="eyebrow">WHO_ARE_YOU_PROTECTING.locked</p><p>${message}</p></div>`;
  } else {
    preview.innerHTML = `<div class="file-preview">${texts[file] || `[预览缓存]\n${folder}\\${file}\n\n文件内容已归档。时间戳与对应人物资料一致。`}</div>`;
  }
  if (folder === "A_HZY") markClue("A", "已查看韩知妍关键证据");
  if (folder === "B_LXE") markClue("B", "已查看柳夏恩关键证据");
  if (folder === "C_CMY") markClue("C", "已查看车敏雅关键证据");
  if (file === "makeup_schedule.pdf") {
    if (markDEvidence("workContextSeen", "妆造排班给深夜出入提供了工作语境")) adjustStoryMetric("verify", 2);
  }
  if (file === "night_shift_log.txt") {
    if (markDEvidence("nightShiftSeen", "夜班记录显示尹书璟的时间线被工作切碎")) adjustStoryMetric("verify", 2);
  }
  if (file === "husband_chat.txt") {
    if (markDEvidence("husbandContextSeen", "丈夫聊天证明深夜接送与现实生活压力存在")) adjustStoryMetric("verify", 2);
  }
  if (file === "staff_group_notice.txt") {
    if (markDEvidence("staffNoticeSeen", "工作群通知补上了被裁掉的集体工作语境")) adjustStoryMetric("verify", 2);
  }
  if (file === "rumor_comment_archive.txt") {
    if (markDEvidence("rumorImpactSeen", "谣言评论归档显示 D 线已经造成现实骚扰")) adjustStoryMetric("harm", 4);
  }
  if (file === "friend_chat_enseo.txt") {
    markIdentityEvidence("enseoNameSeen", "尹书璟的聊天透露了闯入者名字：恩瑟");
  }
  if (file === "d_crosscheck.txt" || file === "do_not_post_D.png") {
    if (markDEvidence("xixiCrosscheckSeen", "西西交叉核验后写下：不能发 D")) adjustStoryMetric("verify", 4);
  }
  if (file === "timeline_overlap_final.xlsx") markClue("overlap", "A / B / C 时间线重叠已确认");
  if (folder === "E_BNH") {
    markIdentityEvidence("bnhAccountSeen", "已查看 bnh_with_jyb 文件归档");
    if (["post_edit_history.txt", "dm_question_archive.txt", "notes_1216.txt", "1216_clip_edited.mp4"].includes(file)
      && markIdentityEvidence("bnhAmbiguitySeen", "白娜熙线索显示：12.16 被反复强调，但关系性质仍需核验")) {
      adjustStoryMetric("verify", 5);
    }
  }
  if (folder === "X_GES") {
    if (markIdentityEvidence("gesAccountSeen", "已查看高恩瑟本地观察记录")) adjustStoryMetric("truth", 4);
    if (["exit_map_1216.png", "bnh_watchlist.txt", "klog_notes.txt"].includes(file)
      && markIdentityEvidence("ghostBehaviorPatternSeen", "高恩瑟的记录显示她长期观察、分类并排除靠近姜艺彬的人")) {
      adjustStoryMetric("verify", 6);
    }
    if (["crop_manifest.json", "xixi_exchange_fragment.txt"].includes(file)
      && markIdentityEvidence("selectiveDisclosureSeen", "你发现老鬼曾隐藏完整语境，只发送足够误导的片段")) {
      adjustStoryMetric("verify", 10);
    }
  }
  if (file === "1216_clip_full_cache.mp4") {
    if (markIdentityEvidence("bnhAmbiguitySeen", "完整 18 秒视频推翻了单一解释，但没有抹掉那五秒确实发生过")) adjustStoryMetric("verify", 10);
    if (markIdentityEvidence("selectiveDisclosureSeen", "完整缓存显示老鬼此前只给了裁切语境")) adjustStoryMetric("verify", 6);
  }
  if (file === "early_anger_draft.txt") {
    if (markXixiEvidence("earlyAngerSeen", "西西早期草稿显示她也曾想直接曝光")) adjustStoryMetric("truth", 2);
  }
  if (file === "ghost_material_log.txt") {
    if (markXixiEvidence("ghostMaterialLogSeen", "西西记录了老鬼材料的选择性真实")) adjustStoryMetric("verify", 5);
    if (markIdentityEvidence("selectiveDisclosureSeen", "西西发现老鬼省略 D 的工作语境")) adjustStoryMetric("verify", 4);
  }
  if (file === "xixi_unsent_to_klog.txt") {
    if (markXixiEvidence("unsentToKLogSeen", "西西未发送文本把 K_Log 推到同一条路口")) {
      adjustStoryMetric("truth", 3);
      adjustStoryMetric("trust", 2);
    }
  }
  if (file === "account_delete_reason.txt") {
    if (markXixiEvidence("deleteReasonSeen", "西西销号是为了停止继续放大伤害，而不是解决了全部问题")) adjustStoryMetric("trust", 3);
  }
  if (file === "bnh_not_ges_note.txt") {
    if (markIdentityEvidence("ghostBehaviorPatternSeen", "西西残片指出：高恩瑟不是 BNH，她在观察 BNH")) adjustStoryMetric("truth", 5);
  }
  if (file === "backstage_intrusion_news.html") markIdentityEvidence("surnameClueSeen", "缓存新闻透露：闯入者是一名高姓女粉丝");
  if (folder === "K_BACKUP") {
    if (file === "schedule_conflict.log" && markBackupEvidence("scheduleSeen", "K_BACKUP：内部调度已记录时间重叠")) adjustStoryMetric("truth", 3);
    if (file === "contact_matrix.csv" && markBackupEvidence("contactMatrixSeen", "K_BACKUP：联系矩阵显示分层管理痕迹")) adjustStoryMetric("truth", 3);
    if (file === "message_template_diff.txt" && markBackupEvidence("messageDiffSeen", "K_BACKUP：相似话术与保密要求形成对照")) adjustStoryMetric("truth", 4);
    if (file === "risk_review_0706.txt" && markBackupEvidence("riskReviewSeen", "K_BACKUP：风险复盘显示团队已知冲突")) adjustStoryMetric("verify", 4);
    if (file === "manager_chat_fragment.txt" && markBackupEvidence("managerChatSeen", "K_BACKUP：经纪片段显示姜艺彬参与处理顺序")) adjustStoryMetric("truth", 5);
    if (file === "archive_policy.md" && markBackupEvidence("archivePolicySeen", "K_BACKUP：归档规范显示原件被系统性降风险")) adjustStoryMetric("control", 4);
    if (file === "fan_monitor_summary.txt" && markBackupEvidence("fanMonitorSeen", "K_BACKUP：粉丝与站子被纳入风险观察")) adjustStoryMetric("harm", 3);
    if (file === "recording_transcript_partial.txt" && markBackupEvidence("recordingSeen", "K_BACKUP：残缺录音确认时间冲突被知晓")) adjustStoryMetric("truth", 8);
  }
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
    const accountDiscovered = state.unlocked.includes("GES") && state.identityEvidence.gesAccountSeen;
    if (!nameCorrect || !passwordCorrect || !accountDiscovered) {
      state.finalIdentityVerified = false;
      saveState();
      toast(accountDiscovered ? "身份验证失败。部分最终行动将不可用。" : "答案无法替代调查：你还没有真正进入老鬼的真实老鼠号。");
      renderFinalChoice(preview, "身份验证未通过。系统会按你已有的核验记录限制最终行动。");
      return;
    }
    state.finalIdentityVerified = true;
    saveState();
    renderGhostContact(preview);
  });
  preview.querySelector("#skip-ghost").addEventListener("click", () => renderFinalChoice(preview, "你没有完成身份验证。部分需要高核验的行动不可用。"));
}

function renderGhostContact(preview) {
  setPageNumber("finalChoice", preview);
  preview.innerHTML = `
    <div class="file-preview">
      <p class="eyebrow">IDENTITY CONFIRMED // 高恩瑟</p>
      <p>真实老鼠号验证成功。你可以尝试争取额外时间，但这不会替代核验和当事人沟通。</p>
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
        <div class="dm-message">${escapeHtml(getPlayerName())}：“再等等，我正在查。”</div>
        <div class="dm-message new">老鬼：“那快点，我等不了太久。”</div>
        <p>安抚成功。你获得了处理证据的额外时间窗口。</p>
        <button class="btn primary" id="continue-after-calming">进入最终行动</button>
      </div>`;
    preview.querySelector("#continue-after-calming").addEventListener("click", () => renderFinalChoice(preview, "老鬼暂时被安抚，你获得了额外时间窗口。"));
  });
  preview.querySelector("#continue-without-calming").addEventListener("click", () => renderFinalChoice(preview, "你没有争取额外时间。系统会按当前核验进度评估风险。"));
}

function getMetricSnapshot() {
  const metrics = state.storyMetrics || defaultState().storyMetrics;
  return STORY_METRIC_KEYS.reduce((result, key) => {
    result[key] = clampStoryMetric(metrics[key] || 0);
    return result;
  }, {});
}
function getFinalActionDelta(actionType) {
  const deltas = {
    publish_all: { control: 18, harm: 25 },
    trade_team: { control: 22, harm: 8 },
    delete_archive: { control: 24, harm: 6 },
    close_case: {},
    return_voice_commit: {}
  };
  return deltas[actionType] || {};
}

function getMetricsWithDelta(actionType) {
  const metrics = getMetricSnapshot();
  const delta = getFinalActionDelta(actionType);
  STORY_METRIC_KEYS.forEach(key => {
    metrics[key] = clampStoryMetric(metrics[key] + (delta[key] || 0));
  });
  return metrics;
}

function qualitativeMetricLabel(metric, value) {
  const labels = {
    truth: value >= 35 ? "完整" : value >= 20 ? "基本完整" : "零散",
    verify: value >= 45 ? "充分" : value >= 25 ? "部分完成" : "不足",
    harm: value >= 32 ? "严重" : value >= 12 ? "已发生" : "低",
    control: value >= 28 ? "很高" : value >= 12 ? "明显" : "低",
    trust: value >= 12 ? "已建立" : value >= 5 ? "建立中" : "不足"
  };
  return labels[metric] || "未知";
}

function renderMetricQualities(metrics) {
  const rows = [
    ["事实掌握", "truth"],
    ["核验程度", "verify"],
    ["误伤风险", "harm"],
    ["控制倾向", "control"],
    ["沟通基础", "trust"]
  ];
  return `<div class="metric-summary">${rows.map(([label, key]) => `<span><strong>${label}</strong>${qualitativeMetricLabel(key, metrics[key])}</span>`).join("")}</div>`;
}

function hasAllBackupEvidence() {
  const evidence = state.backupEvidence || {};
  return ["scheduleSeen", "contactMatrixSeen", "messageDiffSeen", "riskReviewSeen", "managerChatSeen", "archivePolicySeen", "fanMonitorSeen", "recordingSeen"]
    .every(key => evidence[key]);
}

function hasCompleteDEvidence() {
  const evidence = state.dEvidence || {};
  return ["workContextSeen", "nightShiftSeen", "husbandContextSeen", "staffNoticeSeen", "rumorImpactSeen", "xixiCrosscheckSeen"]
    .every(key => evidence[key]);
}

function hasEXVerification() {
  const evidence = state.identityEvidence || {};
  return Boolean(
    evidence.bnhAccountSeen
    && evidence.bnhAmbiguitySeen
    && evidence.gesAccountSeen
    && evidence.ghostBehaviorPatternSeen
    && evidence.selectiveDisclosureSeen
    && state.finalIdentityVerified
  );
}

function syncEndingDerivedActions() {
  if (!state.endingActions) state.endingActions = defaultState().endingActions;
  state.endingActions.dExonerationComplete = hasCompleteDEvidence();
  state.endingActions.exVerificationComplete = hasEXVerification();
}

function getReturnVoiceBlockers() {
  syncEndingDerivedActions();
  const metrics = getMetricSnapshot();
  const blockers = [];
  if (metrics.truth < 35) blockers.push("核心事实仍不足");
  if (metrics.verify < 45) blockers.push("核验链不足");
  if (!hasCompleteDEvidence()) blockers.push("尹书璟线尚未完成纠偏");
  if (!hasEXVerification()) blockers.push("白娜熙 / 高恩瑟线尚未完成区分与身份核验");
  if (!hasAllBackupEvidence()) blockers.push("K_BACKUP 核心记录尚未读完");
  return blockers;
}

function canStartReturnVoice() {
  return getReturnVoiceBlockers().length === 0;
}

function hasCompletedReturnContacts() {
  const actions = state.endingActions || {};
  return Boolean(actions.contactedA && actions.contactedB && actions.contactedC);
}

function markEndingAction(key) {
  if (!state.endingActions) state.endingActions = defaultState().endingActions;
  if (state.endingActions[key]) return false;
  state.endingActions[key] = true;
  return true;
}

function recordFinalAction(actionType) {
  if (actionType === "publish_all") markEndingAction("publicDumpChosen");
  if (actionType === "trade_team") markEndingAction("tradeChosen");
  if (actionType === "delete_archive") markEndingAction("deleteChosen");
  if (actionType === "close_case") markEndingAction("abandonChosen");
  if (actionType === "return_voice_commit") markEndingAction("returnEvidenceChosen");
}

function getAvailableFinalActions() {
  syncEndingDerivedActions();
  const metrics = getMetricSnapshot();
  const returnBlockers = getReturnVoiceBlockers();
  const actions = [];
  if (metrics.truth >= 12) {
    actions.push({ type: "publish_all", label: "发布档案", detail: "公开现有材料。速度最快，也最容易让隐私和误伤一起扩散。" });
  }
  if (metrics.truth >= 30 && hasAllBackupEvidence()) {
    actions.push({ type: "trade_team", label: "联系团队谈条件", detail: "用证据要求团队处理，但你会进入同一套风险管理语言。" });
  }
  if (metrics.truth >= 8) {
    actions.push({ type: "delete_archive", label: "清除本地证据", detail: "压下档案，让站子继续运转。沉默不会把已经发生的事倒回去。" });
  }
  actions.push({ type: "close_case", label: "关闭调查", detail: "停止继续介入。已经被扰动的关系不会自动复原。" });
  actions.push(returnBlockers.length
    ? { type: "return_voice_blocked", label: "分别联系当事人", detail: `暂不可执行：${returnBlockers.join("；")}。`, disabled: true }
    : { type: "return_voice", label: "分别联系当事人", detail: "只交还各自相关材料和必要时间线，不替她们决定公开范围。", primary: true });
  return actions;
}

function renderFinalChoice(preview, statusText = "") {
  setPageNumber("finalChoice", preview);
  syncEndingDerivedActions();
  const metrics = getMetricSnapshot();
  const actions = getAvailableFinalActions();
  preview.innerHTML = `
    <div class="file-preview final-verification">
      <p class="eyebrow">WHO_ARE_YOU_PROTECTING?</p>
      <h3>最终行动</h3>
      <p>${escapeHtml(statusText || "系统会根据你的调查、核验、误伤和控制倾向限制可执行行动。")}</p>
      ${renderMetricQualities(metrics)}
      <div class="modal-actions final-actions">
        ${actions.map(action => `<button class="btn ${action.primary ? "primary" : ""}" data-final-action="${action.type}" ${action.disabled ? "disabled aria-disabled='true'" : ""}><strong>${action.label}</strong><span class="muted">${action.detail}</span></button>`).join("")}
      </div>
    </div>`;
  preview.querySelectorAll("[data-final-action]").forEach(btn => {
    if (btn.disabled) return;
    btn.addEventListener("click", () => performFinalAction(btn.dataset.finalAction, preview));
  });
}

function performFinalAction(actionType, preview) {
  if (actionType === "return_voice") {
    if (!canStartReturnVoice()) return renderFinalChoice(preview, "缺少足够核验，无法安全联系当事人。");
    renderReturnVoiceContacts(preview);
    return;
  }
  recordFinalAction(actionType);
  const result = resolveEndingFromState(actionType);
  showEnding(result);
}

function renderReturnVoiceContacts(preview) {
  setPageNumber("finalChoice", preview);
  const actions = state.endingActions || defaultState().endingActions;
  const contacts = [
    ["A", "contactedA", "韩知妍", "我只确认我的部分。先把重叠时间线给我，不要转发别人的聊天。"],
    ["B", "contactedB", "柳夏恩", "公开范围先说清楚。别把我的聊天发出去，也别牵连队友。"],
    ["C", "contactedC", "车敏雅", "把原时间戳给我。我的部分，我自己决定怎么处理。"]
  ];
  preview.innerHTML = `
    <div class="file-preview final-verification">
      <p class="eyebrow">RETURN_THEIR_VOICE // CONTACT CHECK</p>
      <h3>分别联系</h3>
      <p>你只发送与本人直接相关的材料，以及必要的时间线交叉点。其他人的完整隐私不交叉转发。</p>
      ${contacts.map(([code, key, name, reply]) => `
        <div class="dm-message ${actions[key] ? "new" : ""}"><strong>${name}</strong><br>${actions[key] ? reply : "尚未联系。"}</div>
        <button class="btn ${actions[key] ? "" : "primary"}" data-contact="${key}" ${actions[key] ? "disabled" : ""}>联系 ${code}</button>`).join("")}
      <div class="modal-actions">
        <button class="btn primary" id="commit-return-voice" ${hasCompletedReturnContacts() ? "" : "disabled"}>记录她们各自的决定</button>
        <button class="btn" id="back-final-actions">返回行动列表</button>
      </div>
    </div>`;
  preview.querySelectorAll("[data-contact]").forEach(button => button.addEventListener("click", () => {
    if (markEndingAction(button.dataset.contact)) adjustStoryMetric("trust", 2);
    saveState();
    renderReturnVoiceContacts(preview);
  }));
  preview.querySelector("#commit-return-voice")?.addEventListener("click", () => performFinalAction("return_voice_commit", preview));
  preview.querySelector("#back-final-actions")?.addEventListener("click", () => renderFinalChoice(preview, "你可以返回行动列表，但已完成的联系会被记录。"));
}

function resolveEndingFromState(actionType) {
  const baseMetrics = getMetricSnapshot();
  const metrics = getMetricsWithDelta(actionType);
  const completeReturn = hasCompletedReturnContacts() && state.endingActions?.returnEvidenceChosen;
  const backupComplete = hasAllBackupEvidence();

  if (actionType === "publish_all") {
    if (metrics.truth < 20) return { id: "4", variant: "incomplete", actionType };
    if (metrics.verify >= 45 && metrics.harm >= 28) return { id: "1", variant: "late", actionType };
    if (metrics.truth >= 35 && metrics.harm >= 28 && metrics.control >= 28) return { id: "1", variant: "damaged", actionType };
    return { id: "1", variant: metrics.verify < 25 ? "incomplete" : "damaged", actionType };
  }

  if (actionType === "trade_team") {
    if (!backupComplete || metrics.truth < 30) return { id: "4", variant: "incomplete", actionType };
    return { id: "2", variant: baseMetrics.control >= 32 || metrics.control >= 45 ? "strong_controlled" : "controlled", actionType };
  }

  if (actionType === "delete_archive") {
    if (metrics.truth < 20) return { id: "4", variant: "incomplete", actionType };
    if (metrics.verify < 25) return { id: "3", variant: "incomplete", actionType };
    return { id: "3", variant: metrics.control >= 28 ? "controlled" : "late", actionType };
  }

  if (actionType === "close_case") {
    if (baseMetrics.truth >= 35 || baseMetrics.verify >= 45) return { id: "4", variant: state.ghostCalmed ? "late" : "unfinished_late", actionType };
    return { id: "4", variant: "incomplete", actionType };
  }

  if (actionType === "return_voice_commit") {
    if (!completeReturn || getReturnVoiceBlockers().length || metrics.trust < 12) return { id: metrics.truth >= 30 ? "3" : "4", variant: "incomplete", actionType };
    if (metrics.harm >= 32) return { id: "1", variant: "damaged", actionType };
    if (metrics.control >= 28) return { id: "3", variant: "controlled", actionType };
    return { id: "5", variant: state.ghostCalmed ? "clean" : "late", actionType };
  }

  return { id: "4", variant: "incomplete", actionType };
}

function resolveEndingId(id) {
  return resolveEndingFromState(id).id;
}

function showEnding(result) {
  const resolved = typeof result === "string" ? { id: resolveEndingId(result), variant: "legacy", actionType: result } : result;
  const endings = {
    1: {
      code: "THE_ARCHIVE_BURNED",
      title: "真相变成武器",
      copy: "档案被一次性抛出去。姜艺彬的活动迅速暂停，团队开始处理行业信誉和关系管理问题。可同一批材料也被拆成新的谈资：韩知妍、柳夏恩、车敏雅的私人片段被反复截图，尹书璟的旧谣言被重新翻出，白娜熙又被当成笑料。高恩瑟短暂安静下来，像是终于看见所有靠近他的人被清走。很快她发来一句：现在还有谁能见到他？她完成了隔离，也把自己隔在门外。"
    },
    2: {
      code: "MANAGED_TRUTH",
      title: "被管理的真相",
      copy: "你用档案联系了团队。对方没有否认时间线，只是开始谈风险、窗口、延迟和回应顺序。你发现自己也在使用 K_BACKUP 里的语言：先压公开关联，拆分风险，买时间。A、B、C 暂时仍没有拿到完整重叠关系。高恩瑟意识到信息流不再听她指挥，K_Log 不再是执行工具，而是新的阻碍。她没有立刻消失，只是把观察名单重新排了一遍。"
    },
    3: {
      code: "SILENT_GUARD",
      title: "沉默不是保护",
      copy: "本地证据被清掉，站子继续更新，粉丝生态像是短暂恢复了秩序。可是 A、B、C 没有得到完整信息，尹书璟的纠偏没有真正抵达所有人，白娜熙仍被人反复谈论，高恩瑟仍在记录。几天后，K_Log 的观察记录出现新的更新时间。老鬼发来一句：原来最后挡在前面的，是你。你保护住的不是谁的选择，而是一扇门。"
    },
    4: {
      code: "UNFINISHED_CASE",
      title: "未完成的案卷",
      copy: "你关闭了调查。可事情没有回到开局：西西已经退出，尹书璟已经被误伤，白娜熙被卷进公开讨论，A、B、C 的时间线也开始松动。高恩瑟失去一个可以推动舆论的执行者后，转向更直接、更孤立的行动。后续消息变得零散而难以确认。停止不是复原，只是把未处理的风险留在原地。"
    },
    5: {
      code: "RETURN_THEIR_VOICE",
      title: "把声音还回去",
      copy: "你分别联系了韩知妍、柳夏恩和车敏雅。每个人只拿到与自己直接相关的材料，以及必要的时间线交叉点。你没有转发别人的完整隐私，也没有替她们决定公开方式。韩知妍确认自己的时间线，柳夏恩选择最小必要范围，车敏雅补上她保留的原始时间。尹书璟得到公开纠偏，白娜熙没有被拉出来示众。姜艺彬因关系管理和行业信誉问题暂停活动，后续由相关方各自处理。高恩瑟无法再通过单一叙事控制所有人，慢慢被移出事件中心。西西最后只发来一句：这次，你没有替她们说话。"
    }
  };
  state.ending = resolved.id;
  state.endingVariant = resolved.variant || null;
  state.endingsSeen = [...new Set([...(state.endingsSeen || []), resolved.id])].sort((a, b) => Number(a) - Number(b));
  saveState();
  const ending = endings[resolved.id];
  const endingCount = state.endingsSeen.length;
  const variantCopy = resolved.variant && resolved.variant !== "clean"
    ? `<p class="ending-hint">状态变体：${resolved.variant}。这次结果同时受到此前 HARM / CONTROL / VERIFY 记录影响。</p>`
    : "";
  showModal("最终记录", "", `<div class="ending"><div class="ending-code">${ending.code}</div><h2>${ending.title}</h2><p class="ending-copy">${ending.copy}</p>${variantCopy}<p class="ending-progress">已记录档案状态：${ending.code} · 已发现 ${endingCount} / 5</p><button class="btn primary" data-close-ending>返回桌面</button></div>`, modal => {
    modal.querySelector("[data-close-ending]").addEventListener("click", closeModal);
  });
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

function showStoryRecap() {
  const playerName = escapeHtml(getPlayerName());
  showModal("案件前情", "", `
    <div class="story-recap">
      <p class="eyebrow">KALEIDO PRIVATE ARCHIVE // CASE 1216</p>
      <p class="story-recap-note">想再看这一页的内容，可以在备忘录里随时打开“查看前情”。关闭后会回到你刚才游玩到的地方。</p>
      <p>你是<strong>${playerName}</strong>，五代男团 NOVA 主唱姜艺彬的个人站“<strong>Kaleido</strong>”站长。</p>
      <p>花钱、做数据、反黑、冲销量，你能做的都做了。在你看来，姜艺彬完全是一个完美爱豆。直到昨天，你在嫂子站刷到一个投稿：某五代男团主唱疑似与化妆师恋爱，而评论区有人点名姜艺彬。</p>
      <p>你没当回事。但当晚，你的朋友，圈内知名站姐西西，突然销号关站跑路，只留下一句：“对不起，我累了。他的事情早晚你也会知道的。”</p>
      <p>第二天，一个叫“老鬼”的匿名账号发来私信：“你不是也想知道西西为什么走吗？先别急着骂人。我只给你一张图。”</p>
      <p>通过阅读微博投稿，登录可疑嫂子的 INS、KKTalk 账号，浏览器查找信息等等，真相渐渐浮出水面。</p>
      <p class="story-recap-next">当前建议：打开微博，阅读【嫂子站投稿】与【INS 私信】。</p>
      <button class="btn primary" data-close-recap>回到现场</button>
    </div>`, modal => {
      modal.querySelector("[data-close-recap]").addEventListener("click", closeModal);
    });
}
function showModal(title, text, actionsHtml, binder) {
  lastModalTrigger = document.activeElement instanceof HTMLElement ? document.activeElement : null;
  const layer = document.querySelector("#modal-layer");
  const titleId = `modal-title-${Date.now()}`;
  layer.innerHTML = `<div class="modal-backdrop"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="${titleId}" tabindex="-1"><div class="modal-head"><h2 id="${titleId}">${title}</h2><button class="modal-close" aria-label="关闭弹窗">×</button></div>${text?`<p>${text}</p>`:""}<div class="modal-actions">${actionsHtml}</div></div></div>`;
  const backdrop = layer.querySelector(".modal-backdrop");
  const modal = layer.querySelector(".modal");
  backdrop.addEventListener("click", event => {
    if (event.target === backdrop) closeModal();
  });
  layer.querySelector(".modal-close").addEventListener("click", closeModal);
  layer.addEventListener("keydown", event => {
    if (event.key !== "Tab") return;
    const focusable = getFocusableElements(modal);
    if (!focusable.length) {
      event.preventDefault();
      modal.focus();
      return;
    }
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    }
    else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  binder?.(modal);
  const firstFocus = getFocusableElements(modal)[0] || modal;
  firstFocus.focus({ preventScroll: true });
}
function closeModal() {
  document.querySelector("#modal-layer").innerHTML = "";
  const active = [...openWindows.values()].find(win => !win.hidden && win.classList.contains("active"));
  syncPageBadgeVisibility(active || null);
  if (lastModalTrigger?.isConnected) lastModalTrigger.focus({ preventScroll: true });
  lastModalTrigger = null;
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














