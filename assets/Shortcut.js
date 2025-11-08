"use strict"; 

export function registerShortcut(key, handler, options = {}) {
  shortcut.remove(key);
  shortcut.add(key, handler, {
    ...options,
    disable_in_input: true,
  });
}
