/* Reads CMS-managed content (content/*.json) and fills the page.
   The hardcoded markup in index.html is the fallback — if a fetch fails,
   the site still shows its existing content. */
(function () {
  'use strict';
  var byId = function (id) { return document.getElementById(id); };
  var esc = function (s) { return String(s == null ? '' : s).replace(/"/g, '&quot;'); };

  // ---- Studio info (contact + socials) ----
  fetch('content/info.json', { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (d) {
      if (!d) return;
      if (d.location && byId('cLocation')) byId('cLocation').textContent = d.location;
      var phone = byId('cPhone');
      if (phone) { if (d.phone) phone.textContent = d.phone; if (d.phone_link) phone.href = 'tel:' + d.phone_link; }
      var email = byId('cEmail');
      if (email && d.email) { email.textContent = d.email; email.href = 'mailto:' + d.email; }
      if (d.hours && byId('cHours')) byId('cHours').textContent = d.hours;
      var socials = { sInstagram: d.instagram, sFacebook: d.facebook, sTiktok: d.tiktok };
      Object.keys(socials).forEach(function (k) {
        var el = byId(k);
        if (el && socials[k]) el.href = socials[k];
      });
    })
    .catch(function () {});

  // ---- Gallery ----
  fetch('content/gallery.json', { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (d) {
      if (!d || !Array.isArray(d.items) || !d.items.length) return;
      var grid = document.querySelector('.gallery-grid');
      if (!grid) return;
      grid.innerHTML = d.items.map(function (it) {
        return '<div class="gallery-item reveal in"><img src="' + esc(it.image) +
          '" alt="' + esc(it.alt || 'Tattoo by Nate') + '" loading="lazy" /></div>';
      }).join('');
    })
    .catch(function () {});
})();
