const FILE_EXPLORER_FOLDER_LABELS = Object.freeze({
  A_HZY: "A线｜韩知妍",
  B_LXE: "B线｜柳夏恩",
  C_CMY: "C线｜车敏雅",
  D_YSJ: "D线｜尹书璟",
  E_BNH: "E线｜白娜熙",
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
  "do_not_post_D.png": "不要发布_D.png",
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
  const title = view.querySelector(".backup-unlock .eyebrow");
  const button = view.querySelector("#unlock-backup");
  if (title) title.textContent = "K备份｜三线解密";
  if (button) button.textContent = "打开 K备份";
};
