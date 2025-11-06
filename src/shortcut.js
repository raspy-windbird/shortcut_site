console.log('[ShortcutManager] loaded');

const STORAGE_KEY = 'shortcutData';

export function loadShortcuts() {
    const data = localStorage.getItem(STORAGE_KEY);
    console.log('[ShortcutManager] loadShortcuts', data);
    if (!data) return;
    try {
        const shortcuts = JSON.parse(data);
        console.log('[ShortcutManager] loaded shortcuts:', shortcuts);
    } catch (e) {
        console.error('[ShortcutManager] JSON parse error', e);
    }
}

export function saveShortcut(key, url) {
    const data = localStorage.getItem(STORAGE_KEY);
    let shortcuts = {};
    if (data) {
        try {
            shortcuts = JSON.parse(data);
        } catch (e) {
            console.error('[ShortcutManager] JSON parse error on save', e);
        }
    }
    shortcuts[key] = url;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(shortcuts));
    console.log(`[ShortcutManager] Saved shortcut: ${key} → ${url}`);
}

export function handleShortcutKey(e) {
    const key = [];
    if (e.ctrlKey) key.push('Ctrl');
    if (e.shiftKey) key.push('Shift');
    if (e.altKey) key.push('Alt');
    key.push(e.key.toUpperCase());
    const combo = key.join('+');
    console.log('[ShortcutManager] Key pressed:', combo);

    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return;
    try {
        const shortcuts = JSON.parse(data);
        if (shortcuts[combo]) {
            console.log(`[ShortcutManager] Opening link for ${combo}: ${shortcuts[combo]}`);
            window.open(shortcuts[combo], '_blank');
        }
    } catch (e) {
        console.error('[ShortcutManager] JSON parse error on keypress', e);
    }
}
