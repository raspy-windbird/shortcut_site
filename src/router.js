console.log('[Router] initialized');

import { loadShortcuts, saveShortcut, handleShortcutKey } from './shortcutManager.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('[Router] DOM loaded');
    loadShortcuts();
    document.addEventListener('keydown', handleShortcutKey);
});
