/* =========================================
   CERTIFICATES.JS
   ========================================= */

const CERTS_INITIAL = 6;
let currentData  = [];
let isExpanded   = false;

/* ── Active modal dataset (always the currently filtered set) ── */
let modalData         = [];
let modalCurrentIndex = 0;

/* ─────────────────────────────────────────
   Boot
   ───────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  currentData = certificatesData;
  renderCertificates(currentData);
  initFilters();
  initToggleBtn();
  initModal();   /* ← called ONCE, never again */
});

/* ─────────────────────────────────────────
   Render grid
   ───────────────────────────────────────── */
function renderCertificates(data) {
  const grid = document.getElementById('certificatesGrid');
  if (!grid) return;

  if (!data || !data.length) {
    grid.innerHTML = '<p class="cert-empty">No certificates found.</p>';
    updateToggleVisibility(0);
    return;
  }

  isExpanded = false;
  updateToggleBtnText();

  grid.innerHTML = data.map((cert, i) => {
    const hidden = i >= CERTS_INITIAL ? ' cert-card--hidden' : '';
    return `
    <article
      class="cert-card${hidden}"
      data-index="${i}"
      data-category="${cert.category}"
      tabindex="0"
      role="button"
      aria-label="View ${cert.title}"
    >
      <div class="cert-card__img-wrap">
        <img
          src="${cert.image}"
          alt="${cert.title}"
          loading="lazy"
          onerror="this.parentNode.innerHTML='<div class=\\'cert-card__fallback\\'><svg width=\\'40\\' height=\\'40\\' viewBox=\\'0 0 24 24\\' fill=\\'none\\' stroke=\\'currentColor\\' stroke-width=\\'1.5\\'><path d=\\'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z\\'/><polyline points=\\'14 2 14 8 20 8\\'/></svg><span>Preview unavailable</span></div>'"
        >
        <div class="cert-card__overlay"><span class="cert-card__overlay-text">View</span></div>
      </div>
      <div class="cert-card__body">
        <span class="cert-card__category">${categoryLabel(cert.category)}</span>
        <h3 class="cert-card__title">${cert.title}</h3>
        <div class="cert-card__meta">
          <span class="cert-card__issuer">${cert.issuer}</span>
          <span class="cert-card__year">${cert.year}</span>
        </div>
        <button class="cert-card__btn" data-index="${i}">View Certificate →</button>
      </div>
    </article>`;
  }).join('');

  /* Update the modal's working dataset */
  modalData = data;

  updateToggleVisibility(data.length);

  /* ── Event delegation: one listener on the grid ── */
  grid.onclick = null; /* clear previous delegation */
  grid.addEventListener('click', onGridClick);
  grid.addEventListener('keydown', onGridKeydown);
}

/* ─────────────────────────────────────────
   Grid event delegation  (replaces per-card listeners)
   ───────────────────────────────────────── */
function onGridClick(e) {
  /* Don't open if user clicked the toggle button inside cert-toggle-wrap */
  const card = e.target.closest('.cert-card');
  if (!card) return;
  const index = parseInt(card.dataset.index, 10);
  if (!isNaN(index)) openModal(index);
}

function onGridKeydown(e) {
  if (e.key !== 'Enter' && e.key !== ' ') return;
  const card = e.target.closest('.cert-card');
  if (!card) return;
  e.preventDefault();
  const index = parseInt(card.dataset.index, 10);
  if (!isNaN(index)) openModal(index);
}

/* ─────────────────────────────────────────
   Category label map
   ───────────────────────────────────────── */
function categoryLabel(cat) {
  const map = {
    programming:       'Programming',
    web:               'Web Dev',
    'problem-solving': 'Problem Solving',
    workshop:          'Workshop'
  };
  return map[cat] || cat;
}

/* ─────────────────────────────────────────
   Filter buttons
   ───────────────────────────────────────── */
function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      currentData = filter === 'all'
        ? certificatesData
        : certificatesData.filter(c => c.category === filter);
      renderCertificates(currentData);
    });
  });
}

/* ─────────────────────────────────────────
   Show More / Show Less
   ───────────────────────────────────────── */
function initToggleBtn() {
  const btn = document.getElementById('certToggleBtn');
  if (!btn) return;
  btn.addEventListener('click', () => {
    isExpanded ? collapseCards() : expandCards();
  });
}

function expandCards() {
  document.querySelectorAll('.cert-card--hidden').forEach((card, i) => {
    card.style.transitionDelay = `${i * 60}ms`;
    card.classList.remove('cert-card--hidden');
  });
  isExpanded = true;
  updateToggleBtnText();
}

function collapseCards() {
  const grid  = document.getElementById('certificatesGrid');
  const cards = grid ? Array.from(grid.querySelectorAll('.cert-card')) : [];
  cards.forEach((card, i) => {
    if (i >= CERTS_INITIAL) {
      card.style.transitionDelay = '0ms';
      card.classList.add('cert-card--hidden');
    }
  });
  isExpanded = false;
  updateToggleBtnText();
  const section = document.getElementById('certificates');
  if (section) setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
}

function updateToggleBtnText() {
  const btn = document.getElementById('certToggleBtn');
  if (!btn) return;
  btn.textContent = isExpanded ? 'Show Less ↑' : 'Show More Certificates ↓';
  btn.setAttribute('aria-expanded', isExpanded.toString());
}

function updateToggleVisibility(total) {
  const wrap = document.getElementById('certToggleWrap');
  if (!wrap) return;
  wrap.style.display = total > CERTS_INITIAL ? 'flex' : 'none';
}

/* ─────────────────────────────────────────
   Modal — initialised ONCE on DOMContentLoaded
   ───────────────────────────────────────── */
function initModal() {
  const modal    = document.getElementById('certModal');
  const closeBtn = document.getElementById('certModalClose');
  const prevBtn  = document.getElementById('certModalPrev');
  const nextBtn  = document.getElementById('certModalNext');

  if (!modal) {
    console.error('[Certificates] #certModal not found in HTML.');
    return;
  }

  /* Close on backdrop click (but not on image/button clicks) */
  modal.addEventListener('click', e => {
    if (e.target === modal) closeModal();
  });

  closeBtn?.addEventListener('click', closeModal);
  prevBtn?.addEventListener('click',  e => { e.stopPropagation(); navigate(-1); });
  nextBtn?.addEventListener('click',  e => { e.stopPropagation(); navigate(1); });

  /* Keyboard */
  document.addEventListener('keydown', e => {
    if (!modal.classList.contains('cert-modal--open')) return;
    if (e.key === 'Escape')     closeModal();
    if (e.key === 'ArrowLeft')  navigate(-1);
    if (e.key === 'ArrowRight') navigate(1);
  });
}

function openModal(index) {
  const modal   = document.getElementById('certModal');
  const img     = document.getElementById('certModalImg');
  const caption = document.getElementById('certModalCaption');
  const errMsg  = document.getElementById('certModalError');

  if (!modal || !img) return;

  modalCurrentIndex = index;
  const cert = modalData[modalCurrentIndex];
  if (!cert) return;

  /* Reset state */
  img.style.display = 'block';
  if (errMsg) errMsg.style.display = 'none';

  img.onload  = () => { img.style.display = 'block'; if (errMsg) errMsg.style.display = 'none'; };
  img.onerror = () => {
    img.style.display = 'none';
    if (errMsg) errMsg.style.display = 'flex';
    console.warn('[Certificates] Image failed to load:', cert.image);
  };

  img.src = cert.image;
  img.alt = cert.title;
  if (caption) caption.textContent = cert.title;

  updateModalNav();
  modal.classList.add('cert-modal--open');
  document.body.style.overflow = 'hidden';

  /* Focus the close button for accessibility */
  setTimeout(() => document.getElementById('certModalClose')?.focus(), 50);
}

function closeModal() {
  const modal = document.getElementById('certModal');
  if (!modal) return;
  modal.classList.remove('cert-modal--open');
  document.body.style.overflow = '';
}

function navigate(dir) {
  if (!modalData.length) return;
  modalCurrentIndex = (modalCurrentIndex + dir + modalData.length) % modalData.length;
  const cert = modalData[modalCurrentIndex];
  const img  = document.getElementById('certModalImg');
  const cap  = document.getElementById('certModalCaption');
  const err  = document.getElementById('certModalError');

  if (img) {
    img.style.display = 'block';
    if (err) err.style.display = 'none';
    img.onload  = null;
    img.onerror = () => { img.style.display = 'none'; if (err) err.style.display = 'flex'; };
    img.src = cert.image;
    img.alt = cert.title;
  }
  if (cap) cap.textContent = cert.title;
  updateModalNav();
}

function updateModalNav() {
  const prev = document.getElementById('certModalPrev');
  const next = document.getElementById('certModalNext');
  const show = modalData.length > 1;
  if (prev) prev.style.display = show ? 'flex' : 'none';
  if (next) next.style.display = show ? 'flex' : 'none';
}
