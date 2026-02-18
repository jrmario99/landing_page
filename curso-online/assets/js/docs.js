function switchLang(lang) {
  document.getElementById('lang-en').classList.toggle('hidden', lang !== 'en');
  document.getElementById('lang-pt').classList.toggle('hidden', lang !== 'pt');
  document.getElementById('tab-en').classList.toggle('active', lang === 'en');
  document.getElementById('tab-pt').classList.toggle('active', lang === 'pt');
}
