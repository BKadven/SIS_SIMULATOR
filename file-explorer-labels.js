const CHARACTER_DISPLAY_NAMES = Object.freeze({
  A: "韩知妍",
  B: "柳夏恩",
  C: "车敏雅",
  D: "尹书璟",
  E: "白娜熙"
});

const OTHER_CHARACTER_DISPLAY_NAMES = Object.freeze({
  GES: "高恩瑟"
});

const FILE_EXPLORER_FOLDER_LABELS = Object.freeze({
  A_HZY: CHARACTER_DISPLAY_NAMES.A,
  B_LXE: CHARACTER_DISPLAY_NAMES.B,
  C_CMY: CHARACTER_DISPLAY_NAMES.C,
  D_YSJ: CHARACTER_DISPLAY_NAMES.D,
  E_BNH: CHARACTER_DISPLAY_NAMES.E,
  Xixi_deleted: "西西｜已删除",
  browser_cache: "浏览器缓存",
  K_BACKUP: "K备份"
});

const FILE_EXPLORER_FILE_LABELS = Object.freeze({
  "hotel_receipt_YB.png": "酒店收据_YB.png",
  "backstage_private.jpg": "后台私照.jpg",
  "chat_export.txt": "聊天导出.txt",
  "momo_0509.jpg": "Momo生日照_0509.jpg",
  "kkt_backup.txt": "KKTalk聊天备份.txt",
  "practice_room.jpg": "练习室照片.jpg",
  "voice_transcript.txt": "语音转写.txt",
  "lucy_debut_1120.png": "LUCY出道日_1120.png",
  "first_million_0704.png": "首条百万播放_0704.png",
  "same_ring.jpg": "同款戒指.jpg",
  "hotel_window_compare.png": "酒店窗景对比.png",
  "voice_backup.txt": "语音备份.txt",
  "makeup_schedule.pdf": "妆造排班表.pdf",
  "friend_chat_enseo.txt": "好友聊天_恩瑟.txt",
  "night_shift_log.txt": "夜班记录.txt",
  "birthday_0318.jpg": "生日照片_0318.jpg",
  "bnh_with_jyb_profile.png": "白娜熙账号主页.png",
  "stand_fansign_1216.jpg": "看台签售照片_1216.jpg",
  "ambiguous_posts.txt": "暧昧动态记录.txt",
  "account_roleplay_notes.txt": "账号角色扮演备注.txt",
  "do_not_post_D.png": "不要发布_尹书璟.png",
  "timeline_overlap_final.xlsx": "时间线重叠_最终版.xlsx",
  "K_memo_screenshot_blur.png": "K备忘截图_模糊.png",
  "he_is_not_who_you_think.txt": "他并非你想象的那个人.txt",
  "404_not_found_k.html": "404未找到_K.html",
  "backstage_intrusion_news.html": "后台闯入新闻.html",
  "deleted_search_log.txt": "已删除搜索记录.txt",
  "memo.txt": "备忘.txt",
  "value_list.csv": "名单记录.csv",
  "recording_transcript.txt": "录音文字稿.txt",
  "WHO_ARE_YOU_PROTECTING.locked": "你在保护谁.locked"
});

function getFileExplorerFolderLabel(folder, locked = false) {
  const label = FILE_EXPLORER_FOLDER_LABELS[folder] || folder;
  return folder === "K_BACKUP" && locked ? `${label}｜已锁定` : label;
}

function getFileExplorerFileLabel(file) {
  return FILE_EXPLORER_FILE_LABELS[file] || file;
}

const VISIBLE_CHARACTER_TEXT_REPLACEMENTS = Object.freeze([
  ["K_BACKUP", "K备份"],
  ["A / B / C", "韩知妍 / 柳夏恩 / 车敏雅"],
  ["A、B、C", "韩知妍、柳夏恩、车敏雅"],
  ["A 韩知妍、B 柳夏恩、C 车敏雅", "韩知妍、柳夏恩、车敏雅"],
  ["化妆师 D", "化妆师尹书璟"],
  ["D 是误伤对象", "尹书璟是误伤对象"],
  ["D 不干净", "尹书璟不干净"],
  ["D 也在投稿里", "尹书璟也在投稿里"],
  ["D 可能只是", "尹书璟可能只是"],
  ["D 有丈夫", "尹书璟有丈夫"],
  ["D 的排班", "尹书璟的排班"],
  ["被误伤的 D", "被误伤的尹书璟"],
  ["A 线密码", "韩知妍密码"],
  ["B 线密码", "柳夏恩密码"],
  ["C 线密码", "车敏雅密码"],
  ["A：家庭背景", "韩知妍：家庭背景"],
  ["B：新人女爱豆", "柳夏恩：新人女爱豆"],
  ["C：网红", "车敏雅：网红"],
  ["A 回国", "韩知妍回国"],
  ["B 转型演员", "柳夏恩转型演员"],
  ["C 开始讲述", "车敏雅开始讲述"]
]);

function replaceVisibleCharacterText(text) {
  return VISIBLE_CHARACTER_TEXT_REPLACEMENTS.reduce(
    (result, [codeText, displayText]) => result.split(codeText).join(displayText),
    text
  );
}

function localizeCharacterText(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);
  textNodes.forEach(node => {
    const localized = replaceVisibleCharacterText(node.nodeValue);
    if (localized !== node.nodeValue) node.nodeValue = localized;
  });
}

function localizeCharacterAvatars(root) {
  const selector = ".profile-mini .avatar, .result-card .account-card > .avatar";
  const avatars = [
    ...(root instanceof Element && root.matches(selector) ? [root] : []),
    ...root.querySelectorAll(selector)
  ];
  avatars.forEach(avatar => {
    const code = avatar.textContent.trim();
    const profileName = avatar.closest(".profile-mini")?.querySelector("h3")?.textContent.trim();
    const displayName = profileName === OTHER_CHARACTER_DISPLAY_NAMES.GES
      ? OTHER_CHARACTER_DISPLAY_NAMES.GES
      : CHARACTER_DISPLAY_NAMES[code];
    if (!displayName) return;
    avatar.textContent = displayName;
    avatar.classList.add("character-name-avatar");
  });
}

function localizeValueList(root) {
  const selector = ".csv-table tr:not(:first-child) td:first-child";
  const cells = [
    ...(root instanceof Element && root.matches(selector) ? [root] : []),
    ...root.querySelectorAll(selector)
  ];
  cells.forEach(cell => {
    const displayName = CHARACTER_DISPLAY_NAMES[cell.textContent.trim()];
    if (displayName) cell.textContent = displayName;
  });
}

function localizeCharacterDisplay(root = document) {
  localizeCharacterText(root);
  localizeCharacterAvatars(root);
  localizeValueList(root);
}

function localizeFileExplorerShell(root) {
  const toolbar = root.querySelector(".app-toolbar");
  const title = toolbar?.querySelector("b");
  const path = toolbar?.querySelector(".muted");
  if (title) title.textContent = "文件管理器";
  if (path) path.textContent = "档案库｜C:\\Users\\K_Log\\Archive";

  root.querySelectorAll("[data-folder]").forEach(button => {
    const folder = button.dataset.folder;
    const locked = button.classList.contains("locked");
    button.textContent = `${locked ? "▣" : "▰"} ${getFileExplorerFolderLabel(folder, locked)}`;
  });
}

function localizeFileExplorerFolder(view, folder) {
  const folderTitle = view.querySelector(":scope > .eyebrow");
  if (folderTitle) folderTitle.textContent = getFileExplorerFolderLabel(folder);

  view.querySelectorAll("[data-file]").forEach(row => {
    const fileName = row.querySelector("span");
    if (fileName) fileName.textContent = `▤ ${getFileExplorerFileLabel(row.dataset.file)}`;
  });

  const finalButton = view.querySelector("#open-final-gate");
  if (finalButton) finalButton.textContent = "打开「你在保护谁」";
}

const originalRenderFilesForLabels = renderFiles;
const originalRenderFolderForLabels = renderFolder;
const originalRenderBackupUnlockForLabels = renderBackupUnlock;

renderFiles = function localizedRenderFiles(root, folder = "A_HZY") {
  originalRenderFilesForLabels(root, folder);
  localizeFileExplorerShell(root);
  localizeFileExplorerFolder(root.querySelector("#file-view"), folder);
};

renderFolder = function localizedRenderFolder(view, folder) {
  originalRenderFolderForLabels(view, folder);
  localizeFileExplorerFolder(view, folder);
};

renderBackupUnlock = function localizedRenderBackupUnlock(view) {
  originalRenderBackupUnlockForLabels(view);
  const panel = view.querySelector(".backup-unlock");
  const title = panel.querySelector(".eyebrow");
  const intro = panel.querySelector("p:not(.eyebrow)");
  const button = view.querySelector("#unlock-backup");
  const linePrompts = [
    {
      id: "backup-a",
      title: "韩知妍线",
      description: "她以为自己是唯一，直到唯一变成模板。",
      placeholder: "输入韩知妍线索引码"
    },
    {
      id: "backup-b",
      title: "柳夏恩线",
      description: "她以为那是保护，直到保护变成控制。",
      placeholder: "输入柳夏恩线索引码"
    },
    {
      id: "backup-c",
      title: "车敏雅线",
      description: "她以为自己也在利用他，直到发现自己被写进表格。",
      placeholder: "输入车敏雅线索引码"
    }
  ];

  title.textContent = "K备份 / INDEX CHECK";
  intro.className = "backup-index-intro";
  intro.innerHTML = `
    <span>三条线都不是孤立事件。<br>她们被记录、分类、标价，然后压进同一个备份里。</span>
    <span>韩知妍线不是“礼物”。<br>柳夏恩线不是“照顾”。<br>车敏雅线不是“合作”。</span>
    <strong>输入三条线的索引码。<br>如果你真的读懂了她们，就知道该输入什么。</strong>
  `;

  linePrompts.forEach(prompt => {
    const input = panel.querySelector(`#${prompt.id}`);
    const label = input.closest("label");
    [...label.childNodes].forEach(node => {
      if (node !== input) node.remove();
    });

    const labelTitle = document.createElement("strong");
    labelTitle.className = "backup-index-label";
    labelTitle.textContent = prompt.title;

    const description = document.createElement("span");
    description.className = "backup-index-description";
    description.textContent = prompt.description;

    label.insertBefore(labelTitle, input);
    label.insertBefore(description, input);
    input.placeholder = prompt.placeholder;
  });

  button.textContent = "校验三线索引";
};

const originalMarkClueForCharacterNames = markClue;
markClue = function displayNamedClue(key, message) {
  const displayName = CHARACTER_DISPLAY_NAMES[key];
  return originalMarkClueForCharacterNames(
    key,
    message || (displayName ? `关键证据已记录：${displayName}` : message)
  );
};

const characterDisplayObserver = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    const root = mutation.target.nodeType === Node.TEXT_NODE
      ? mutation.target.parentElement
      : mutation.target;
    if (root) localizeCharacterDisplay(root);
  });
});

characterDisplayObserver.observe(document.querySelector("#desktop"), {
  childList: true,
  characterData: true,
  subtree: true
});

const characterAvatarStyle = document.createElement("style");
characterAvatarStyle.textContent = `
  .avatar.character-name-avatar {
    width: auto;
    min-width: 68px;
    padding: 0 10px;
    border-radius: 999px;
    font-size: 12px;
    white-space: nowrap;
  }

  .backup-index-intro {
    display: grid;
    gap: 14px;
    line-height: 1.8;
  }

  .backup-index-intro span,
  .backup-index-intro strong {
    display: block;
  }

  .backup-index-intro strong {
    padding: 12px 14px;
    border: 1px solid rgba(255, 255, 255, .7);
    border-radius: 14px;
    background: rgba(120, 73, 84, .06);
    box-shadow: inset 0 2px 5px rgba(120, 73, 84, .08);
  }

  .backup-index-label {
    color: #755760;
    letter-spacing: .04em;
  }

  .backup-index-description {
    color: #786b70;
    font-size: 13px;
    font-weight: 500;
    line-height: 1.65;
  }
`;
document.head.appendChild(characterAvatarStyle);
localizeCharacterDisplay(document);
