/* Groupe Nouvel Horizon — interactions du site */
(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  /* ---------- Verrouillage du défilement (compatible iOS) ---------- */
  let lockY = 0, lockCount = 0;
  const lockScroll = () => {
    if (lockCount++ > 0) return;
    lockY = window.scrollY || window.pageYOffset;
    document.documentElement.classList.add('lock');
    document.body.style.top = `-${lockY}px`;
    document.body.classList.add('lock');
  };
  const unlockScroll = () => {
    if (--lockCount > 0) return;
    lockCount = 0;
    document.documentElement.classList.remove('lock');
    document.body.classList.remove('lock');
    document.body.style.top = '';
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, lockY);
    html.style.scrollBehavior = prev;
  };

  /* ---------- En-tête ---------- */
  const hdr = $('[data-header]');
  if (hdr) {
    let ticking = false;
    const onScroll = () => {
      const y = window.scrollY;
      hdr.classList.toggle('is-compact', y > 40);
      hdr.classList.toggle('is-solid', y > 20);
      ticking = false;
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();
  }

  /* ---------- Indicateur des onglets de navigation ---------- */
  const tabs = $('[data-navtabs]');
  if (tabs) {
    const ind = $('.nav-ind', tabs);
    const links = $$('a', tabs);
    const current = links.find(a => a.getAttribute('aria-current') === 'page');
    const moveTo = (a) => {
      if (!a) { ind.classList.remove('on'); return; }
      ind.style.width = a.offsetWidth + 'px';
      ind.style.transform = `translateX(${a.offsetLeft}px)`;
      ind.classList.add('on');
    };
    const reset = () => moveTo(current);
    links.forEach(a => { a.addEventListener('mouseenter', () => moveTo(a)); a.addEventListener('focus', () => moveTo(a)); });
    tabs.addEventListener('mouseleave', reset);
    tabs.addEventListener('focusout', (e) => { if (!tabs.contains(e.relatedTarget)) reset(); });
    window.addEventListener('resize', reset);
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => {
      ind.style.transition = 'none'; reset(); void ind.offsetWidth; ind.style.transition = '';
    });
    reset();
  }

  /* ---------- Menu mobile ---------- */
  const burger = $('[data-burger]');
  const menu = $('[data-mmenu]');
  if (burger && menu) {
    let open = false;
    const focusables = () => [burger, ...$$('a, button', menu)];
    const setOpen = (v) => {
      if (v === open) return;
      open = v;
      burger.setAttribute('aria-expanded', String(v));
      burger.setAttribute('aria-label', v ? 'Fermer le menu' : 'Ouvrir le menu');
      menu.classList.toggle('open', v);
      menu.setAttribute('aria-hidden', String(!v));
      hdr && hdr.classList.toggle('menu-on', v);
      if (v) { lockScroll(); setTimeout(() => { const f = $('a', menu); f && f.focus({ preventScroll: true }); }, 350); }
      else { unlockScroll(); }
    };
    burger.addEventListener('click', () => setOpen(!open));
    $$('a', menu).forEach(a => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => {
      if (!open) return;
      if (e.key === 'Escape') { setOpen(false); burger.focus(); }
      if (e.key === 'Tab') {
        const f = focusables(); const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    window.matchMedia('(min-width: 1181px)').addEventListener('change', (m) => { if (m.matches) setOpen(false); });
    // liens hors menu inaccessibles au clavier quand le menu est fermé
    const syncTab = () => $$('a, button', menu).forEach(el => el.tabIndex = open ? 0 : -1);
    burger.addEventListener('click', () => setTimeout(syncTab, 0));
    syncTab();
  }

  /* ---------- Transitions entre les pages ---------- */
  if (!reduce) {
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a');
      if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const href = a.getAttribute('href');
      if (!href || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:') || a.target === '_blank' || a.hasAttribute('download')) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.hash) return;
      e.preventDefault();
      document.body.classList.add('is-leaving');
      setTimeout(() => { location.href = url.href; }, 260);
    });
    window.addEventListener('pageshow', (e) => { if (e.persisted) document.body.classList.remove('is-leaving'); });
  }

  /* ---------- Découpage des titres en mots ---------- */
  if (!reduce) {
    $$('[data-split]').forEach((el) => {
      let i = 0;
      const walk = (node) => {
        Array.from(node.childNodes).forEach((n) => {
          if (n.nodeType === 3) {
            const parts = n.textContent.split(/(\s+)/);
            const frag = document.createDocumentFragment();
            parts.forEach((p) => {
              if (!p) return;
              if (/^\s+$/.test(p)) { frag.appendChild(document.createTextNode(' ')); return; }
              const w = document.createElement('span'); w.className = 'split-w';
              const s = document.createElement('span'); s.textContent = p;
              s.style.setProperty('--d', (i++ * 0.045) + 's');
              w.appendChild(s); frag.appendChild(w);
            });
            n.replaceWith(frag);
          } else if (n.nodeType === 1 && n.tagName !== 'BR' && n.tagName !== 'svg') { walk(n); }
        });
      };
      el.setAttribute('aria-label', el.textContent.replace(/\s+/g, ' ').trim());
      walk(el);
      $$('.split-w', el).forEach(w => w.setAttribute('aria-hidden', 'true'));
    });
  }

  /* ---------- Apparitions au défilement ---------- */
  const revealEls = $$('[data-reveal], [data-split], [data-mask], [data-draw], .months, [data-stagger]');
  // décalage automatique entre éléments frères
  $$('[data-stagger]').forEach((p) => {
    Array.from(p.children).forEach((c, i) => { c.setAttribute('data-reveal', ''); c.style.setProperty('--d', (i * 0.08) + 's'); });
  });
  const all = $$('[data-reveal], [data-split], [data-mask], [data-draw], .months');
  if ('IntersectionObserver' in window && !reduce) {
    // les éléments masqués (clip-path) sont observés via leur parent, car leur surface visible est nulle
    const targets = new Map();
    all.forEach((el) => {
      const t = el.hasAttribute('data-mask') ? el.parentElement : el;
      if (!targets.has(t)) targets.set(t, []);
      targets.get(t).push(el);
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) { (targets.get(en.target) || []).forEach(e => e.classList.add('is-in')); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
    targets.forEach((_, t) => io.observe(t));
    // sécurité : tout afficher si l'observateur ne s'est pas déclenché
    window.addEventListener('load', () => setTimeout(() => {
      all.forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-in'); });
    }, 400));
  } else {
    all.forEach(el => el.classList.add('is-in'));
  }
  void revealEls;

  /* ---------- Boutons magnétiques ---------- */
  if (fine && !reduce) {
    $$('[data-magnetic]').forEach((b) => {
      b.addEventListener('mousemove', (e) => {
        const r = b.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2, y = e.clientY - r.top - r.height / 2;
        b.style.setProperty('--bx', (x * 0.22).toFixed(1) + 'px');
        b.style.setProperty('--by', (y * 0.3).toFixed(1) + 'px');
      });
      b.addEventListener('mouseleave', () => { b.style.setProperty('--bx', '0px'); b.style.setProperty('--by', '0px'); });
    });
  }

  /* ---------- Carrousel ---------- */
  $$('[data-carousel]').forEach((root) => {
    const track = $('.car-track', root);
    const items = Array.from(track.children);
    const prev = $('.car-btn.prev', root), next = $('.car-btn.next', root);
    const dotsWrap = $('.car-dots', root);
    const step = () => items[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).columnGap || 22);
    const perView = () => Math.max(1, Math.round(track.clientWidth / step()));
    let dots = [];
    const buildDots = () => {
      dotsWrap.innerHTML = '';
      const pages = Math.max(1, items.length - perView() + 1);
      dots = [];
      for (let i = 0; i < pages; i++) {
        const d = document.createElement('button');
        d.type = 'button'; d.setAttribute('aria-label', `Afficher le témoignage ${i + 1}`);
        d.addEventListener('click', () => track.scrollTo({ left: i * step(), behavior: reduce ? 'auto' : 'smooth' }));
        dotsWrap.appendChild(d); dots.push(d);
      }
      update();
    };
    const update = () => {
      const idx = Math.round(track.scrollLeft / step());
      dots.forEach((d, i) => d.setAttribute('aria-current', String(i === idx)));
      prev.disabled = track.scrollLeft < 4;
      next.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    };
    prev.addEventListener('click', () => track.scrollBy({ left: -step(), behavior: reduce ? 'auto' : 'smooth' }));
    next.addEventListener('click', () => track.scrollBy({ left: step(), behavior: reduce ? 'auto' : 'smooth' }));
    let t; track.addEventListener('scroll', () => { cancelAnimationFrame(t); t = requestAnimationFrame(update); }, { passive: true });
    let rw; window.addEventListener('resize', () => { clearTimeout(rw); rw = setTimeout(buildDots, 150); });
    track.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') { e.preventDefault(); next.click(); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev.click(); }
    });
    buildDots();
  });

  /* ---------- Accordéons ---------- */
  $$('[data-acc]').forEach((acc) => {
    $$('.acc-item', acc).forEach((item, i) => {
      const btn = $('.acc-btn', item), panel = $('.acc-panel', item);
      const id = `acc-${Math.random().toString(36).slice(2, 8)}-${i}`;
      panel.id = id; btn.setAttribute('aria-controls', id); btn.setAttribute('aria-expanded', 'false');
      panel.setAttribute('role', 'region'); panel.setAttribute('aria-labelledby', id + '-b'); btn.id = id + '-b';
      panel.inert = true;
      btn.addEventListener('click', () => {
        const isOpen = item.classList.toggle('open');
        btn.setAttribute('aria-expanded', String(isOpen));
        panel.inert = !isOpen;
      });
    });
  });

  /* ---------- Onglets ---------- */
  $$('[data-tabs]').forEach((root) => {
    const list = $('[role="tablist"]', root);
    const tbs = $$('[role="tab"]', root);
    const ind = $('.tab-ind', root);
    const panels = tbs.map(t => document.getElementById(t.getAttribute('aria-controls')));
    const place = (t) => { if (!ind) return; ind.style.width = t.offsetWidth + 'px'; ind.style.transform = `translateX(${t.offsetLeft - list.scrollLeft}px)`; };
    const select = (t, focus) => {
      tbs.forEach((x, i) => {
        const on = x === t;
        x.setAttribute('aria-selected', String(on)); x.tabIndex = on ? 0 : -1;
        panels[i].hidden = !on;
        if (on && !reduce) { panels[i].classList.remove('anim'); void panels[i].offsetWidth; panels[i].classList.add('anim'); }
      });
      place(t);
      if (focus) t.focus();
    };
    tbs.forEach((t, i) => {
      t.addEventListener('click', () => select(t));
      t.addEventListener('keydown', (e) => {
        let n = null;
        if (e.key === 'ArrowRight') n = tbs[(i + 1) % tbs.length];
        if (e.key === 'ArrowLeft') n = tbs[(i - 1 + tbs.length) % tbs.length];
        if (e.key === 'Home') n = tbs[0];
        if (e.key === 'End') n = tbs[tbs.length - 1];
        if (n) { e.preventDefault(); select(n, true); }
      });
    });
    const cur = () => tbs.find(t => t.getAttribute('aria-selected') === 'true') || tbs[0];
    window.addEventListener('resize', () => place(cur()));
    list.addEventListener('scroll', () => place(cur()), { passive: true });
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => place(cur()));
    place(cur());
  });

  /* ---------- Portfolio : filtres + visionneuse ---------- */
  const gallery = $('[data-gallery]');
  if (gallery) {
    const items = $$('.m-item', gallery);
    const filters = $$('[data-filter]');
    filters.forEach((f) => {
      const k = f.dataset.filter;
      const n = k === 'all' ? items.length : items.filter(i => i.dataset.cat === k).length;
      const s = document.createElement('span'); s.className = 'n'; s.textContent = `(${n})`; f.appendChild(s);
      f.addEventListener('click', () => {
        filters.forEach(x => x.setAttribute('aria-pressed', String(x === f)));
        items.forEach((it) => {
          const show = k === 'all' || it.dataset.cat === k;
          if (show) { it.classList.remove('hide'); requestAnimationFrame(() => requestAnimationFrame(() => it.classList.remove('fade'))); }
          else { it.classList.add('fade'); setTimeout(() => { if (it.classList.contains('fade')) it.classList.add('hide'); }, reduce ? 0 : 320); }
        });
      });
    });

    // Visionneuse
    const lb = $('[data-lightbox]');
    const strip = $('.lb-strip', lb), stage = $('.lb-stage', lb);
    const cap = $('.lb-cap', lb), count = $('.lb-count', lb);
    const btnClose = $('.lb-close', lb), btnPrev = $('.lb-prev', lb), btnNext = $('.lb-next', lb);
    let list = [], idx = 0, lastFocus = null, isOpen = false;

    const render = () => {
      strip.innerHTML = '';
      list.forEach((it, i) => {
        const b = $('button', it);
        const s = document.createElement('div'); s.className = 'lb-slide';
        s.setAttribute('role', 'group'); s.setAttribute('aria-roledescription', 'diapositive'); s.setAttribute('aria-label', `${i + 1} sur ${list.length}`);
        const img = document.createElement('img');
        img.alt = $('img', it).alt; img.decoding = 'async';
        if (Math.abs(i - idx) <= 1) img.src = b.dataset.full; else img.dataset.src = b.dataset.full;
        s.appendChild(img); strip.appendChild(s);
      });
    };
    const go = (i, animate = true) => {
      idx = Math.max(0, Math.min(list.length - 1, i));
      strip.style.transition = animate && !reduce ? '' : 'none';
      strip.style.transform = `translate3d(${-idx * 100}%,0,0)`;
      $$('.lb-slide img', strip).forEach((im, k) => { if (Math.abs(k - idx) <= 1 && im.dataset.src) { im.src = im.dataset.src; delete im.dataset.src; } });
      const it = list[idx];
      cap.innerHTML = `<small>${it.dataset.label}</small>${$('.cap strong', it).textContent}`;
      count.textContent = `${idx + 1} / ${list.length}`;
      btnPrev.disabled = idx === 0; btnNext.disabled = idx === list.length - 1;
    };
    const openLb = (item) => {
      list = items.filter(i => !i.classList.contains('hide'));
      idx = list.indexOf(item);
      render(); go(idx, false);
      lastFocus = document.activeElement;
      lb.classList.add('open'); lb.setAttribute('aria-hidden', 'false'); isOpen = true;
      lockScroll();
      setTimeout(() => btnClose.focus({ preventScroll: true }), 50);
    };
    const closeLb = () => {
      if (!isOpen) return;
      isOpen = false;
      lb.classList.remove('open'); lb.setAttribute('aria-hidden', 'true');
      unlockScroll();
      lastFocus && lastFocus.focus({ preventScroll: true });
    };
    items.forEach(it => $('button', it).addEventListener('click', () => openLb(it)));
    btnClose.addEventListener('click', closeLb);
    btnPrev.addEventListener('click', () => go(idx - 1));
    btnNext.addEventListener('click', () => go(idx + 1));
    document.addEventListener('keydown', (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowRight') go(idx + 1);
      if (e.key === 'ArrowLeft') go(idx - 1);
      if (e.key === 'Tab') {
        const f = [btnClose, btnPrev, btnNext].filter(b => !b.disabled && b.offsetParent);
        const p = f.indexOf(document.activeElement);
        e.preventDefault();
        f[(p + (e.shiftKey ? -1 : 1) + f.length) % f.length].focus();
      }
    });
    // glissement tactile / souris
    let sx = 0, sy = 0, dx = 0, dragging = false, axis = null;
    stage.addEventListener('pointerdown', (e) => {
      if (e.target.closest('button')) return;
      dragging = true; axis = null; sx = e.clientX; sy = e.clientY; dx = 0;
      strip.style.transition = 'none';
      stage.setPointerCapture && stage.setPointerCapture(e.pointerId);
    });
    stage.addEventListener('pointermove', (e) => {
      if (!dragging) return;
      dx = e.clientX - sx; const dy = e.clientY - sy;
      if (!axis && (Math.abs(dx) > 6 || Math.abs(dy) > 6)) axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (axis === 'x') {
        const edge = (idx === 0 && dx > 0) || (idx === list.length - 1 && dx < 0) ? 0.35 : 1;
        strip.style.transform = `translate3d(calc(${-idx * 100}% + ${dx * edge}px),0,0)`;
      }
    });
    const end = (e) => {
      if (!dragging) return; dragging = false;
      const dy = e.clientY - sy;
      if (axis === 'y' && dy > 90) { closeLb(); return; }
      if (axis === 'x' && Math.abs(dx) > Math.min(80, stage.clientWidth * 0.15)) go(idx + (dx < 0 ? 1 : -1));
      else go(idx);
    };
    stage.addEventListener('pointerup', end);
    stage.addEventListener('pointercancel', end);
    lb.addEventListener('click', (e) => { if (e.target === stage || e.target.classList.contains('lb-slide')) { if (Math.abs(dx) < 5) closeLb(); } });
  }

  /* ---------- Formulaire de soumission en plusieurs étapes ---------- */
  const form = $('[data-qform]');
  if (form) {
    const steps = $$('.qf-step', form);
    const bar = $('.qf-bar i', form);
    const stepLabel = $('[data-steplabel]', form);
    const stepCount = $('[data-stepcount]', form);
    const pills = $$('.qf-steps li', form);
    const btnPrev = $('[data-prev]', form), btnNext = $('[data-next]', form), btnSend = $('[data-send]', form);
    const done = $('.qf-done');
    let cur = 0;

    // pré-sélection via ?division=
    const params = new URLSearchParams(location.search);
    const pre = params.get('division');
    if (pre) { const r = $(`input[name="division"][value="${pre}"]`, form); if (r) r.checked = true; }

    const syncServices = () => {
      const div = ($('input[name="division"]:checked', form) || {}).value;
      $$('[data-for]', form).forEach((g) => {
        const on = g.dataset.for === div;
        g.hidden = !on;
        $$('input', g).forEach((i) => { i.disabled = !on; if (!on) i.checked = false; });
      });
      const none = $('[data-nodiv]', form); if (none) none.hidden = !!div;
    };
    $$('input[name="division"]', form).forEach(r => r.addEventListener('change', syncServices));
    syncServices();

    const msgs = {
      valueMissing: 'Ce champ est requis.',
      typeMismatch: 'Le format ne semble pas valide.',
      patternMismatch: 'Le format ne semble pas valide.',
      tooShort: 'Veuillez préciser un peu plus.',
    };
    const fieldMsg = (input) => {
      const v = input.validity;
      if (v.valid) return '';
      if (input.type === 'email' && (v.typeMismatch || v.patternMismatch)) return 'Entrez un courriel valide (ex. nom@entreprise.ca).';
      if (input.type === 'tel' && (v.patternMismatch || v.tooShort)) return 'Entrez un numéro à 10 chiffres (ex. 438-336-5063).';
      for (const k in msgs) if (v[k]) return msgs[k];
      return 'Valeur invalide.';
    };
    const checkField = (input, show = true) => {
      const wrap = input.closest('.field'); if (!wrap) return input.checkValidity();
      const m = fieldMsg(input); const msg = $('.msg', wrap);
      if (show) {
        wrap.classList.toggle('err', !!m);
        wrap.classList.toggle('ok', !m && input.value.trim() !== '' && input.type !== 'checkbox');
        if (msg) msg.textContent = m;
        input.setAttribute('aria-invalid', String(!!m));
      }
      return !m;
    };
    $$('.field input, .field select, .field textarea', form).forEach((inp) => {
      inp.addEventListener('blur', () => { if (inp.value !== '' || inp.dataset.touched) checkField(inp); inp.dataset.touched = '1'; });
      inp.addEventListener('input', () => { if (inp.dataset.touched || inp.closest('.field').classList.contains('err')) checkField(inp); });
      inp.addEventListener('change', () => checkField(inp));
    });
    // format téléphone
    const tel = $('input[type="tel"]', form);
    if (tel) tel.addEventListener('input', () => {
      const d = tel.value.replace(/\D/g, '').replace(/^1(?=\d{10})/, '').slice(0, 10);
      let out = d;
      if (d.length > 6) out = `${d.slice(0, 3)}-${d.slice(3, 6)}-${d.slice(6)}`;
      else if (d.length > 3) out = `${d.slice(0, 3)}-${d.slice(3)}`;
      tel.value = out;
    });
    // date minimale = aujourd'hui
    const date = $('input[type="date"]', form);
    if (date) { const t = new Date(); t.setMinutes(t.getMinutes() - t.getTimezoneOffset()); date.min = t.toISOString().slice(0, 10); }

    const validateStep = (i) => {
      const step = steps[i]; let ok = true; let firstBad = null;
      // groupes radio requis
      $$('[data-required-group]', step).forEach((g) => {
        if (g.hidden) return;
        const name = g.dataset.requiredGroup;
        const has = $$(`input[name="${name}"]:not(:disabled)`, step).some(r => r.checked);
        const err = $(`[data-err="${name}"]`, step);
        if (err) err.textContent = has ? '' : (g.dataset.msg || 'Veuillez faire un choix.');
        if (!has) { ok = false; firstBad = firstBad || $('input:not(:disabled)', g); }
      });
      $$('.field input, .field select, .field textarea', step).forEach((inp) => {
        if (inp.disabled) return;
        if (!checkField(inp)) { ok = false; firstBad = firstBad || inp; }
      });
      const consent = $('input[name="consentement"]', step);
      if (consent) {
        const e = $('[data-err="consentement"]', step);
        if (!consent.checked) { ok = false; e.textContent = 'Veuillez accepter d\'être contacté pour recevoir votre soumission.'; firstBad = firstBad || consent; }
        else e.textContent = '';
      }
      if (firstBad) firstBad.focus({ preventScroll: false });
      return ok;
    };
    // effacer l'erreur de groupe au choix
    form.addEventListener('change', (e) => {
      if (e.target.type === 'radio') { const er = $(`[data-err="${e.target.name}"]`, form); if (er) er.textContent = ''; }
      if (e.target.name === 'consentement' && e.target.checked) { const er = $('[data-err="consentement"]', form); if (er) er.textContent = ''; }
    });

    const show = (i, focus = true) => {
      steps.forEach((s, k) => { s.hidden = k !== i; s.classList.remove('enter'); });
      if (!reduce) { void steps[i].offsetWidth; steps[i].classList.add('enter'); }
      cur = i;
      const pct = ((i + 1) / steps.length) * 100;
      bar.style.width = pct + '%';
      stepCount.textContent = `Étape ${i + 1} sur ${steps.length}`;
      stepLabel.textContent = steps[i].dataset.title;
      pills.forEach((p, k) => { p.classList.toggle('done', k < i); p.classList.toggle('cur', k === i); });
      btnPrev.hidden = i === 0;
      btnNext.hidden = i === steps.length - 1;
      btnSend.hidden = i !== steps.length - 1;
      if (focus) {
        const top = form.getBoundingClientRect().top + window.scrollY - 90;
        if (window.scrollY > top) window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
        const lg = $('legend', steps[i]); lg && (lg.tabIndex = -1, lg.focus({ preventScroll: true }));
      }
    };
    btnNext.addEventListener('click', () => { if (validateStep(cur)) show(cur + 1); });
    btnPrev.addEventListener('click', () => show(cur - 1));
    // Entrée = étape suivante (sauf textarea)
    form.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && e.target.type !== 'submit' && cur < steps.length - 1) { e.preventDefault(); btnNext.click(); }
    });

    // téléversement
    const drop = $('.drop', form);
    if (drop) {
      const input = $('input[type="file"]', drop); const list = $('.files', form);
      const refresh = () => {
        list.innerHTML = '';
        const files = Array.from(input.files || []);
        const tooBig = files.some(f => f.size > 8 * 1024 * 1024);
        const er = $('[data-err="photos"]', form);
        er.textContent = files.length > 5 ? 'Maximum de 5 photos.' : tooBig ? 'Chaque photo doit faire moins de 8 Mo.' : '';
        files.slice(0, 5).forEach((f) => { const li = document.createElement('li'); li.textContent = f.name; list.appendChild(li); });
      };
      input.addEventListener('change', refresh);
      ['dragenter', 'dragover'].forEach(ev => drop.addEventListener(ev, () => drop.classList.add('over')));
      ['dragleave', 'drop'].forEach(ev => drop.addEventListener(ev, () => drop.classList.remove('over')));
    }

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (!validateStep(cur)) return;
      const er = $('[data-err="photos"]', form); if (er && er.textContent) return;
      btnSend.disabled = true; const lbl = $('span', btnSend); const old = lbl.textContent; lbl.textContent = 'Envoi en cours…';
      const local = true; // Standalone demonstration: never transmit form data.
      let ok = local;
      if (!local) {
        try { const r = await fetch(form.getAttribute('action') || '/', { method: 'POST', body: new FormData(form) }); ok = r.ok; }
        catch (_) { ok = false; }
      } else { await new Promise(r => setTimeout(r, 700)); }
      if (ok) {
        const name = ($('input[name="nom"]', form).value || '').trim().split(' ')[0];
        const n = $('[data-name]', done); if (n && name) n.textContent = `, ${name}`;
        $('.qf-head', form).hidden = true; $('.qf-body', form).hidden = true; $('.qf-nav', form).hidden = true;
        done.hidden = false; done.tabIndex = -1; done.focus();
        const top = form.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
      } else {
        btnSend.disabled = false; lbl.textContent = old;
        const fe = $('[data-err="envoi"]', form); fe.textContent = 'L\'envoi n\'a pas fonctionné. Réessayez ou appelez-nous au 438-336-5063.';
      }
    });
    show(0, false);
  }
})();
