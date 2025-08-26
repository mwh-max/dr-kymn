(function() {
  document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.site-nav');
    const btn = document.querySelector('.nav-toggle');
    const menu = document.getElementById('primary-menu');
    if (!nav || !btn || !menu) return;
    btn.addEventListener('click', function() {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open', !expanded);
      // Focus management: move focus to first link when opening
      if (!expanded) {
        const firstLink = menu.querySelector('a, button');
        if (firstLink) firstLink.focus({preventScroll:true});
      } else {
        btn.focus({preventScroll:true});
      }
    });
  });
})();