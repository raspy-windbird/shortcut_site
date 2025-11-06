// shortcut.js を使ってショートカット登録・実行を管理
// localStorageを使って永続化＋読み込み時に再登録

const STORAGE_KEY = "shortcuts";

// デバッグモードフラグ
const DEBUG = true;

// ログ関数
function log(...args) {
    if (DEBUG) console.log("[ShortcutManager]", ...args);
}

// ショートカットデータをlocalStorageに保存
export function saveShortcuts(shortcuts) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(shortcuts));
    log("保存完了:", shortcuts);
}

// localStorageから読み込み
export function loadShortcuts() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (!data) return [];
        const parsed = JSON.parse(data);
        if (!Array.isArray(parsed)) throw new Error("不正なデータ形式");
        log("ロード完了:", parsed);
        return parsed;
    } catch (e) {
        console.error("ショートカット読み込みエラー:", e);
        return [];
    }
}

// 全ショートカットを登録
export function registerAllShortcuts(shortcuts) {
    if (!window.shortcut) {
        console.error("shortcut.js が読み込まれていません。");
        return;
    }

    // まず既存ショートカットを解除
    window.shortcut.removeAll();
    log("全ショートカット解除");

    shortcuts.forEach(({ key, url }) => {
        if (!key || !url) return;
        try {
            window.shortcut.add(key, () => {
                window.open(url, "_blank");
                log(`ショートカット実行: ${key} → ${url}`);
            });
            log(`登録完了: ${key} → ${url}`);
        } catch (e) {
            console.error(`ショートカット登録失敗 (${key}):`, e);
        }
    });
}

// 新しいショートカットを追加
export function addShortcut(key, url) {
    if (!key || !url) {
        alert("キーとURLを入力してください。");
        return;
    }

    const shortcuts = loadShortcuts();
    const existing = shortcuts.find(s => s.key === key);
    if (existing) {
        if (!confirm(`「${key}」は既に登録されています。上書きしますか？`)) return;
        existing.url = url;
    } else {
        shortcuts.push({ key, url });
    }

    saveShortcuts(shortcuts);
    registerAllShortcuts(shortcuts);
}
