/* ==========================================================================
   TryCall — script unique (vanilla JS, aucune dépendance externe)
   Défilement fluide façon Lenis, révélations au défilement, onglets FAQ,
   accordéons des points de contrôle, menu mobile, photos qui suivent le
   curseur. Respecte prefers-reduced-motion.
   ========================================================================== */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ------------------------------------------------------------------
     1. Défilement fluide (dérivation légère de Lenis, auto-hébergée)
        Désactivé : écrans tactiles (défilement natif conservé) et
        prefers-reduced-motion.
  ------------------------------------------------------------------ */
  var smooth = (function () {
    var target = window.scrollY;
    var current = target;
    var raf = null;
    var active = false;

    function onWheel(e) {
      if (e.defaultPrevented || e.ctrlKey) return;
      e.preventDefault();
      target = Math.max(0, Math.min(document.documentElement.scrollHeight - window.innerHeight, target + e.deltaY));
      if (!raf) loop();
    }

    function loop() {
      current += (target - current) * 0.1;
      if (Math.abs(target - current) < 0.5) { current = target; }
      window.scrollTo(0, current);
      raf = Math.abs(target - current) >= 0.5 ? requestAnimationFrame(loop) : null;
    }

    function sync() { if (raf === null) { target = current = window.scrollY; } }

    return {
      start: function () {
        if (active) return;
        active = true;
        document.documentElement.classList.add('lenis-on');
        window.addEventListener('wheel', onWheel, { passive: false });
        window.addEventListener('scroll', sync, { passive: true });
      },
      scrollTo: function (y) {
        target = Math.max(0, Math.min(document.documentElement.scrollHeight - window.innerHeight, y));
        if (!raf) loop();
      },
      isActive: function () { return active; }
    };
  })();

  if (!reduced && !('ontouchstart' in window) && window.matchMedia('(pointer:fine)').matches) {
    smooth.start();
  }

  /* ------------------------------------------------------------------
     2. Révélations au défilement (IntersectionObserver)
  ------------------------------------------------------------------ */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && !reduced) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.setAttribute('data-inview', 'true');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.setAttribute('data-inview', 'true'); });
  }

  /* ------------------------------------------------------------------
     3. Progression de défilement : pilote --x-p sur les lignes de
        chronologie, l'anneau orbital et le zoom photo du héros.
  ------------------------------------------------------------------ */
  var progressEls = document.querySelectorAll('[data-progress]');
  if (progressEls.length) {
    var ticking = false;
    var updateProgress = function () {
      ticking = false;
      var vh = window.innerHeight;
      progressEls.forEach(function (el) {
        var rect = el.getBoundingClientRect();
        var p = (vh - rect.top) / (vh + rect.height);
        el.style.setProperty('--x-p', Math.max(0, Math.min(1, p)).toFixed(4));
      });
    };
    var onScroll = function () {
      if (!ticking) { ticking = true; requestAnimationFrame(updateProgress); }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    updateProgress();
  }

  /* ------------------------------------------------------------------
     4. Onglets FAQ (accueil) — souris, clavier (flèches), ARIA complet
  ------------------------------------------------------------------ */
  document.querySelectorAll('[data-tabs]').forEach(function (widget) {
    var tabs = Array.prototype.slice.call(widget.querySelectorAll('[role=tab]'));
    var panels = Array.prototype.slice.call(widget.querySelectorAll('[role=tabpanel]'));
    if (!tabs.length) return;

    var select = function (tab, focus) {
      tabs.forEach(function (t) {
        var on = t === tab;
        t.setAttribute('aria-selected', on ? 'true' : 'false');
        t.tabIndex = on ? 0 : -1;
        if (on && focus !== false) t.focus();
      });
      panels.forEach(function (panel) {
        var on = panel.id === tab.getAttribute('aria-controls');
        panel.hidden = !on;
        if (on) { /* relance l'animation d'apparition */
          panel.style.animation = 'none';
          void panel.offsetWidth;
          panel.style.animation = '';
        }
      });
    };

    tabs.forEach(function (tab, i) {
      tab.addEventListener('click', function () { select(tab, false); });
      tab.addEventListener('keydown', function (e) {
        var next = null;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') next = tabs[(i + 1) % tabs.length];
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') next = tabs[(i - 1 + tabs.length) % tabs.length];
        if (e.key === 'Home') next = tabs[0];
        if (e.key === 'End') next = tabs[tabs.length - 1];
        if (next) { e.preventDefault(); select(next); }
      });
    });
    if (!tabs[0].hasAttribute('aria-selected')) select(tabs[0], false);
  });

  /* ------------------------------------------------------------------
     5. Accordéon « points de contrôle » (méthode) — <details> animés
  ------------------------------------------------------------------ */
  document.querySelectorAll('details.x-methode-control').forEach(function (details) {
    var summary = details.querySelector('summary');
    var body = details.querySelector('.x-methode-control-body');
    if (!summary || !body) return;

    var setExpanded = function (open) {
      summary.setAttribute('aria-expanded', open ? 'true' : 'false');
    };

    summary.addEventListener('click', function (e) {
      e.preventDefault();
      if (details.open) {
        var h = body.offsetHeight;
        body.style.overflow = 'hidden';
        if (!reduced) {
          body.style.height = h + 'px';
          requestAnimationFrame(function () {
            body.style.transition = 'height .35s cubic-bezier(.2,.7,.2,1)';
            body.style.height = '0px';
          });
          setTimeout(function () {
            details.open = false;
            body.style.cssText = '';
            setExpanded(false);
          }, 360);
        } else {
          details.open = false;
          body.style.cssText = '';
          setExpanded(false);
        }
      } else {
        details.open = true;
        setExpanded(true);
        if (!reduced) {
          var h2 = body.offsetHeight;
          body.style.overflow = 'hidden';
          body.style.height = '0px';
          requestAnimationFrame(function () {
            body.style.transition = 'height .35s cubic-bezier(.2,.7,.2,1)';
            body.style.height = h2 + 'px';
          });
          setTimeout(function () { body.style.cssText = ''; }, 360);
        }
      }
    });
    details.addEventListener('toggle', function () {
      setExpanded(details.open);
    });
    setExpanded(details.open);
  });

  /* ------------------------------------------------------------------
     6. Menu mobile
  ------------------------------------------------------------------ */
  var menuButtons = document.querySelectorAll('[data-menu-open]');
  var menu = document.getElementById('mobile-menu');
  if (menuButtons.length && menu) {
    var lastFocus = null;
    var openMenu = function () {
      lastFocus = document.activeElement;
      menu.setAttribute('data-open', 'true');
      menuButtons.forEach(function (b) { b.setAttribute('aria-expanded', 'true'); });
      document.body.style.overflow = 'hidden';
      var first = menu.querySelector('a');
      if (first) first.focus();
    };
    var closeMenu = function () {
      menu.setAttribute('data-open', 'false');
      menuButtons.forEach(function (b) { b.setAttribute('aria-expanded', 'false'); });
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    };
    var isOpen = function () { return menu.getAttribute('data-open') === 'true'; };
    menuButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (isOpen()) closeMenu(); else openMenu();
      });
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) closeMenu();
    });
  }

  /* ------------------------------------------------------------------
     7. Photos du périmètre qui suivent le curseur (accueil, > 720 px)
        L'effet visuel n'apparaît qu'au survol (CSS) ; ici on suit
        simplement la position du pointeur pour alimenter --x-mx/--x-my.
  ------------------------------------------------------------------ */
  if (window.matchMedia('(min-width:721px)').matches && !reduced) {
    document.querySelectorAll('.x-peek-list').forEach(function (list) {
      var rows = list.querySelectorAll('.x-peek-row');
      rows.forEach(function (row) {
        row.addEventListener('mousemove', function (e) {
          var rect = list.getBoundingClientRect();
          row.style.setProperty('--x-mx', ((e.clientX - rect.left) / rect.width).toFixed(4));
          row.style.setProperty('--x-my', ((e.clientY - rect.top) / rect.height).toFixed(4));
        });
      });
    });
  }

  /* ------------------------------------------------------------------
     8. Défilement doux vers les ancres de la même page
  ------------------------------------------------------------------ */
  document.querySelectorAll('a[href^="#"], a[href^="./#"], a[href^="../#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var href = a.getAttribute('href');
      var hashIndex = href.indexOf('#');
      if (hashIndex < 0) return;
      var path = href.slice(0, hashIndex);
      var here = location.pathname.replace(/\/[^/]*$/, '/') || '/';
      var targetPath = new URL(a.href, location.href).pathname;
      if (path && path !== here && targetPath !== location.pathname) return; /* lien vers une autre page : laisser naviguer */
      var id = href.slice(hashIndex + 1);
      var el = id ? document.getElementById(id) : null;
      if (el) {
        e.preventDefault();
        var top = el.getBoundingClientRect().top + window.scrollY;
        if (smooth.isActive()) {
          smooth.scrollTo(top);
        } else {
          el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' });
        }
        history.replaceState(null, '', id ? '#' + id : location.pathname + location.search);
      }
    });
  });

  /* ------------------------------------------------------------------
     9. Formulaire « Demander un devis »
        Site statique sans serveur : la soumission prépare un e-mail
        (mailto) prérempli dans le logiciel de messagerie du visiteur.
        Aucune donnée ne transite par le site (conformité RGPD / charte
        cookies : zéro requête, zéro stockage).
  ------------------------------------------------------------------ */
  document.querySelectorAll('form.x-contact-form, form.x-contact-page-form').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;

      var val = function (name) {
        var el = form.elements[name];
        return el && el.value ? el.value.trim() : '';
      };

      var lines = [];
      if (val('name')) lines.push('Nom : ' + val('name'));
      if (val('email')) lines.push('E-mail professionnel : ' + val('email'));
      if (val('entreprise')) lines.push('Entreprise : ' + val('entreprise'));
      if (val('mission')) lines.push('Mission envisagée : ' + val('mission'));
      if (val('message')) lines.push('\nVotre périmètre d\'appels :\n' + val('message'));
      lines.push('\n— Envoyé depuis le site TryCall');

      var href = 'mailto:contact@trycall.com'
        + '?subject=' + encodeURIComponent('Demande de devis - TryCall')
        + '&body=' + encodeURIComponent(lines.join('\n'));

      window.location.href = href;

      var status = form.querySelector('.x-form-status');
      if (status) status.hidden = false;
    });
  });
})();
