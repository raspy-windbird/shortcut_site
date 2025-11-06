import { getShortcuts } from '../components/shortcut.js';

export function renderHome(shortcuts) {
    const container = document.createElement('div');
    container.className = 'home-container';

    const h1 = document.createElement('h1');
    h1.textContent = 'ホーム';
    container.appendChild(h1);

    const p = document.createElement('p');
    p.textContent = '登録されたショートカットを利用できます。';
    container.appendChild(p);

    if (!shortcuts || shortcuts.length === 0) {
        const msg = document.createElement('p');
        msg.textContent = 'ショートカットが登録されていません。設定画面で追加してください。';
        container.appendChild(msg);
        const link = document.createElement('a');
        link.href = '#/settings';
        link.textContent = '設定画面へ';
        container.appendChild(link);
        return container;
    }

    const ul = document.createElement('ul');
    shortcuts.forEach(s => {
        const li = document.createElement('li');
        li.textContent = `${s.key} → ${s.url}`;
        ul.appendChild(li);
    });
    container.appendChild(ul);

    const hr = document.createElement('hr');
    container.appendChild(hr);

    const info = document.createElement('p');
    info.textContent = 'ショートカットキーを押すと、それぞれのリンクが新しいタブで開きます。';
    container.appendChild(info);

    return container;
}

// ------------------------------------------------------
// Home() 本体：ショートカット登録ロジック付き
// ------------------------------------------------------
export function Home() {
    const shortcuts = getShortcuts();

    console.info('[Home] 読み込み時にショートカットを登録します:', shortcuts);

    const container = renderHome(shortcuts);

    if (window && window.shortcut) {
        shortcuts.forEach(s => {
            try {
                if (!s.key || !s.url) {
                    console.warn('[Home] 無効なショートカットをスキップ:', s);
                    return;
                }
                shortcut.add(s.key, () => {
                    console.info(`[Home] ショートカット発火: ${s.key} → ${s.url}`);
                    try {
                        window.open(s.url, '_blank');
                    } catch (err) {
                        console.error('[Home] URLを開けませんでした:', s.url, err);
                    }
                });
                console.info(`[Home] 登録完了: ${s.key} → ${s.url}`);
            } catch (err) {
                console.warn('[Home] 登録に失敗:', s.key, err);
            }
        });
    } else {
        console.warn('[Home] window.shortcut が利用できません。CDN読み込みを確認してください。');
    }

    return container;
}

// ------------------------------------------------------
// 外部からショートカットを再登録するための関数
// ------------------------------------------------------
export function reRegisterShortcuts() {
    const shortcuts = getShortcuts();
    console.info('[Home] ショートカットを再登録します:', shortcuts);

    // 既存ショートカットを一旦クリア（shortcut.js には clear APIがないのでページ再登録扱い）
    if (window.shortcut && typeof window.shortcut.remove === 'function') {
        console.info('[Home] shortcut.remove() API 検出 → 既存登録を削除します。');
        shortcuts.forEach(s => {
            try {
                window.shortcut.remove(s.key);
            } catch (err) {
                console.warn(`[Home] remove(${s.key}) に失敗:`, err);
            }
        });
    }

    // 再登録
    shortcuts.forEach(s => {
        try {
            shortcut.add(s.key, () => {
                console.info(`[Home] 再登録ショートカット発火: ${s.key} → ${s.url}`);
                window.open(s.url, '_blank');
            });
        } catch (err) {
            console.error('[Home] 再登録に失敗:', s, err);
        }
    });
}
