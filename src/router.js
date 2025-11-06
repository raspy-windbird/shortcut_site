import { Home } from './pages/home.js';
import { Settings } from './pages/settings.js';

export function router() {
  const path = location.hash.slice(1) || '/';
  const app = document.getElementById('app');
  app.innerHTML = ''; // 先にクリア

  switch (path) {
    case '/':
      app.appendChild(Home());
      break;
    case '/settings':
      app.appendChild(Settings());
      break;
    default:
      const notFound = document.createElement('div');
      notFound.innerHTML = '<h2>404 - ページが見つかりません</h2>';
      app.appendChild(notFound);
  }
}