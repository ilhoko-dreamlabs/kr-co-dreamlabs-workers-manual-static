const dialog = document.getElementById('screenshot-dialog');
document.querySelectorAll('[data-capture]').forEach(button => {
  button.addEventListener('click', () => {
    const image = button.querySelector('img');
    const expanded = dialog.querySelector('img');
    expanded.src = image.src;
    expanded.alt = image.alt;
    dialog.querySelector('[data-image-title]').textContent = image.alt;
    dialog.showModal();
  });
});
dialog?.querySelector('[data-close]')?.addEventListener('click', () => dialog.close());
dialog?.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
document.querySelectorAll('[data-copy]').forEach(button => {
  button.addEventListener('click', async () => {
    const original = button.textContent;
    try {
      await navigator.clipboard.writeText(document.getElementById(button.dataset.copy).textContent);
      button.textContent = '복사했습니다';
      document.getElementById('copy-status').textContent = '예제 요청을 복사했습니다.';
    } catch {
      button.textContent = '본문을 선택해 복사하세요';
      document.getElementById('copy-status').textContent = '복사 권한이 없어 본문을 직접 선택해야 합니다.';
    }
    setTimeout(() => { button.textContent = original; }, 2500);
  });
});
