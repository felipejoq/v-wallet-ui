export function loading({location, timeMs, callback}) {
  const loader = document.getElementById('loader');
  const overlay = document.getElementById('overlay');

  overlay.style.display = 'block';
  loader.style.display = 'block';

  setTimeout(function () {
    loader.style.display = 'none';
    overlay.style.display = 'none';
    if (location && callback) callback({path: location})
  }, timeMs);
}