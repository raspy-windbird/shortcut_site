import { getShortcuts, saveShortcuts } from '../components/shortcut.js';
import { reRegisterShortcuts } from './home.js';

export function renderSettings(shortcuts) {
    const container = document.createElement('div');
    container.className = 'settings-container';

    const h1 = document.createElement('h1');
    h1.textContent = '設定';
    container.appendChild(h1);

    const desc = document.createElement('p');
    desc.textContent = 'ショートカット配列を編集してください。例: [{"key":"Ctrl+G","url":"https://example.com"}]';
    container.appendChild(desc);

    const textarea = document.createElement('textarea');
    textarea.id = 'shortcut-json';
    textarea.rows = 10;
    textarea.cols = 60;
    textarea.placeholder = '[{"key":"Ctrl+G","url":"https://example.com"}]';
    textarea.value = JSON.stringify(shortcuts, null, 2);
    container.appendChild(textarea);

    container.appendChild(document.createElement('br'));

    const saveBtn = document.createElement('button');
    saveBtn.id = 'save';
    saveBtn.textContent = '保存';
    container.appendChild(saveBtn);

    const msg = document.createElement('p');
    msg.id = 'message';
    container.appendChild(msg);

    const gotoHome = document.createElement('a');
    gotoHome.href = '#/';
    gotoHome.textContent = 'ホームへ戻る';
    container.appendChild(gotoHome);

    return container;
}

export function Settings() {
    const shortcuts = getShortcuts();
    console.info('[Settings] 現在のショートカット:', shortcuts);

    const container = renderSettings(shortcuts);

    const textarea = container.querySelector('#shortcut-json');
    const saveBtn = container.querySelector('#save');
    const message = container.querySelector('#message');

    function showMessage(txt, isError = false) {
        message.textContent = txt;
        message.style.color = isError ? 'crimson' : 'green';
        if (!isError) setTimeout(() => (message.textContent = ''), 2000);
    }

    saveBtn.addEventListener('click', () => {
        const raw = textarea.value.trim();
        console.info('[Settings] 保存ボタン押下: 入力値 =', raw);

        if (!raw) {
            showMessage('入力が空です。', true);
            console.warn('[Settings] 空入力。');
            return;
        }

        let parsed;
        try {
            parsed = JSON.parse(raw);
        } catch (err) {
            showMessage('JSON構文エラーです。', true);
            console.error('[Settings] JSON構文エラー:', err);
            return;
        }

        if (!Array.isArray(parsed)) {
            showMessage('配列形式で入力してください。', true);
            console.warn('[Settings] JSONは配列ではありません。');
            return;
        }

        // 要素チェック
        const invalid = parsed.find((item, i) => !item || typeof item.key !== 'string' || typeof item.url !== 'string' || item.key.trim() === '' || item.url.trim() === '');
        if (invalid) {
            showMessage('不正な項目があります。key と url は文字列で必須です。', true);
            console.warn('[Settings] 無効な要素検出:', invalid);
            return;
        }

        // URLチェック
        for (const [i, item] of parsed.entries()) {
            try {
                new URL(item.url);
            } catch {
                showMessage(`URLが無効です (${item.url})`, true);
                console.warn(`[Settings] URL不正: index=${i}`, item.url);
                return;
            }
        }

        try {
            saveShortcuts(parsed);
            showMessage('保存しました。');
            console.info('[Settings] 保存完了:', parsed);

            // 保存後にショートカットを再登録
            reRegisterShortcuts();
            console.info('[Settings] 保存完了後にショートカット再登録を実行しました。');

        } catch (err) {
            console.error('[Settings] 保存エラー:', err);
            showMessage('保存に失敗しました。', true);
        }
    });

    return container;
}
