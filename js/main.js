document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    initTypewriter();
    initScrollEffects();
    initMouseGlow();
    initRevealAnimations();
    initLazyLoad();
    initContactForm();
    renderDynamicContent();
});

/* ----- Theme Toggle ----- */
function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const saved = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);

    toggle?.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    });
}

/* ----- Navbar ----- */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');
    const navLinks = document.querySelectorAll('.navbar__link');
    const sections = document.querySelectorAll('section[id]');

    const closeMenu = () => {
        navMenu?.classList.remove('open');
        navToggle?.classList.remove('open');
        navOverlay?.classList.remove('show');
        navToggle?.setAttribute('aria-expanded', 'false');
    };

    navToggle?.addEventListener('click', () => {
        const isOpen = navMenu?.classList.toggle('open');
        navToggle.classList.toggle('open');
        navOverlay?.classList.toggle('show');
        navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navOverlay?.addEventListener('click', closeMenu);
    navLinks.forEach(link => link.addEventListener('click', closeMenu));

    window.addEventListener('scroll', () => {
        navbar?.classList.toggle('scrolled', window.scrollY > 50);

        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) current = section.id;
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
        });
    }, { passive: true });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const href = anchor.getAttribute('href');
            if (!href || href === '#') return;
            const target = document.querySelector(href);
            if (!target) return;
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });
}

/* ----- Typewriter ----- */
function initTypewriter() {
    const el = document.getElementById('typedRole');
    if (!el) return;

    const roles = ['Competitive Programmer', 'Full Stack Developer', 'Problem Solver', 'Tech Enthusiast'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const current = roles[roleIndex];
        el.textContent = isDeleting
            ? current.substring(0, charIndex--)
            : current.substring(0, charIndex++);

        if (!isDeleting && charIndex === current.length + 1) {
            setTimeout(() => { isDeleting = true; type(); }, 1500);
            return;
        }
        if (isDeleting && charIndex === -1) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            charIndex = 0;
        }

        setTimeout(type, isDeleting ? 60 : 120);
    }

    type();
}

/* ----- Scroll Progress & Back to Top ----- */
function initScrollEffects() {
    const progress = document.getElementById('scrollProgress');
    const backToTop = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

        if (progress) progress.style.width = `${pct}%`;
        backToTop?.classList.toggle('show', scrollTop > 400);
    }, { passive: true });

    backToTop?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ----- Mouse Glow ----- */
function initMouseGlow() {
    const glow = document.getElementById('mouseGlow');
    if (!glow || window.matchMedia('(max-width: 768px)').matches) return;

    document.addEventListener('mousemove', e => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
    }, { passive: true });
}

/* ----- Reveal Animations ----- */
function initRevealAnimations() {
    if (!('IntersectionObserver' in window)) {
        document.querySelectorAll('.reveal, .stagger-children').forEach(el => el.classList.add('visible'));
        return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.reveal, .stagger-children').forEach(el => observer.observe(el));
}

/* ----- Lazy Load ----- */
function initLazyLoad() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
            obs.unobserve(img);
        });
    }, { rootMargin: '200px' });

    document.querySelectorAll('img[data-src]').forEach(img => observer.observe(img));
}

/* ----- Contact Form ----- */
function initContactForm() {
    const SERVICE_ID  = 'service_mqgcn3s';
    const TEMPLATE_ID = 'template_f26hz7n';
    const PUBLIC_KEY  = 'kycitYbLlrEYX4CFA';

    emailjs.init(PUBLIC_KEY);

    const form       = document.getElementById('contactForm');
    const submitBtn  = form?.querySelector('button[type="submit"]');
    const successEl  = document.getElementById('formSuccess');
    const sendErrEl  = document.getElementById('formSendError');
    if (!form) return;

    const fields = [
        { id: 'name',    errorId: 'nameError',    validate: v => v.trim().length > 0 },
        { id: 'email',   errorId: 'emailError',   validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
        { id: 'message', errorId: 'messageError', validate: v => v.trim().length > 0 },
    ];

    function validate() {
        let valid = true;
        fields.forEach(({ id, errorId, validate }) => {
            const input = document.getElementById(id);
            const error = document.getElementById(errorId);
            const ok = validate(input.value);
            input.classList.toggle('error', !ok);
            error?.classList.toggle('show', !ok);
            if (!ok) valid = false;
        });
        return valid;
    }

    form.addEventListener('submit', e => {
        e.preventDefault();
        successEl.classList.remove('show');
        sendErrEl.style.display = 'none';

        if (!validate()) return;

        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending…';

        emailjs.send(SERVICE_ID, TEMPLATE_ID, {
            name:    document.getElementById('name').value.trim(),
            email:   document.getElementById('email').value.trim(),
            message: document.getElementById('message').value.trim(),
        })
        .then(() => {
            successEl.classList.add('show');
            form.reset();
            setTimeout(() => successEl.classList.remove('show'), 5000);
        })
        .catch(err => {
            sendErrEl.textContent = 'Something went wrong. Please try again.';
            sendErrEl.style.display = 'block';
            console.error('EmailJS error:', err);
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        });
    });
}

/* ----- Animated Counter ----- */
function animateCounter(el, target, suffix = '') {
    const duration = 2000;
    const start = performance.now();

    function update(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(target * eased) + suffix;
        if (progress < 1) requestAnimationFrame(update);
    }

    requestAnimationFrame(update);
}

/* ----- Render Dynamic Content ----- */
function renderDynamicContent() {
    renderSkills();
    renderTimeline();
    renderProjects();
    renderAchievements();
    renderProfiles();
    renderLearning();
    renderStats();
}

function renderSkills() {
    const grid = document.getElementById('skillsGrid');
    if (!grid) return;

    grid.innerHTML = SITE_DATA.skills.map(cat => `
        <div class="skill-category glass-card">
            <div class="skill-category__header">
                <div class="skill-category__icon">${cat.icon}</div>
                <h3 class="skill-category__title">${cat.title}</h3>
            </div>
            <div class="skill-tags">
                ${cat.items.map(item => `<span class="skill-tag">${item}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function renderTimeline() {
    const el = document.getElementById('timeline');
    if (!el) return;

    el.innerHTML = SITE_DATA.timeline.map(item => {
        const body = Array.isArray(item.desc)
            ? `<ul class="timeline__bullets">${item.desc.map(pt => `<li>${pt}</li>`).join('')}</ul>`
            : `<p>${item.desc}</p>`;
        return `
        <div class="timeline__item">
            <div class="timeline__dot" aria-hidden="true"></div>
            <div class="timeline__card glass-card">
                <h3>${item.title}</h3>
                ${body}
            </div>
        </div>`;
    }).join('');
}

function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;

    grid.innerHTML = SITE_DATA.projects.map(p => {
        const demoBtn = p.demo
            ? `<a href="${p.demo}" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--sm">Live Demo</a>`
            : `<button class="btn btn--primary btn--sm project-card__coming-soon" disabled title="Coming Soon" aria-label="No live demo yet">Coming Soon</button>`;

        const badge = p.featured ? '<span class="project-card__badge">Featured</span>' : '';
        const tags  = p.tags.map(t => `<span class="badge">${t}</span>`).join('');

        return `
        <article class="project-card glass-card${p.featured ? ' project-card--featured' : ''}">
            <div class="project-card__image">
                ${badge}
                <img data-src="${p.image}" alt="${p.title}" loading="lazy">
            </div>
            <div class="project-card__body">
                <h3 class="project-card__title">${p.title}</h3>
                <p class="project-card__desc">${p.desc}</p>
                <div class="project-card__tags">${tags}</div>
                <div class="project-card__actions">
                    <a href="${p.github}" target="_blank" rel="noopener noreferrer" class="btn btn--ghost btn--sm">GitHub</a>
                    ${demoBtn}
                </div>
            </div>
        </article>`;
    }).join('');

    initLazyLoad();
}

function renderAchievements() {
    const grid = document.getElementById('achievementsGrid');
    if (!grid) return;

    grid.innerHTML = SITE_DATA.achievements.map(a => `
        <div class="achievement-card glass-card">
            <span class="achievement-card__icon">${a.icon}</span>
            <div class="achievement-card__text">
                <h3>${a.title}</h3>
                <p>${a.desc}</p>
            </div>
        </div>
    `).join('');
}

function renderProfiles() {
    const grid = document.getElementById('profilesGrid');
    if (!grid) return;

    grid.innerHTML = SITE_DATA.profiles.map(p => `
        <a href="${p.link}" target="_blank" rel="noopener" class="profile-card glass-card">
            <div class="profile-card__header">
                <div class="profile-card__icon">${p.icon}</div>
                <h3 class="profile-card__title">${p.title}</h3>
            </div>
            <ul class="profile-card__list">
                ${p.items.map(item => `<li>${item}</li>`).join('')}
            </ul>
        </a>
    `).join('');
}

function renderLearning() {
    const grid = document.getElementById('learningGrid');
    if (!grid) return;

    grid.innerHTML = SITE_DATA.learning.map(l => `
        <div class="learning-card glass-card">
            <div class="learning-card__header">
                <div class="profile-card__icon">${l.icon}</div>
                <h3 class="learning-card__title">${l.title}</h3>
            </div>
            <ul class="learning-card__list">
                <li>${l.desc}</li>
            </ul>
        </div>
    `).join('');
}

function renderStats() {
    const grid = document.getElementById('statsGrid');
    if (!grid) return;

    grid.innerHTML = SITE_DATA.stats.map((s, i) => `
        <div class="stat-card glass-card" data-stat="${i}">
            <div class="stat-card__number" data-target="${s.value}" data-suffix="${s.suffix}">0${s.suffix}</div>
            <div class="stat-card__label">${s.label}</div>
        </div>
    `).join('');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;
                const numEl = entry.target.querySelector('.stat-card__number');
                const target = parseInt(numEl.dataset.target, 10);
                const suffix = numEl.dataset.suffix || '';
                animateCounter(numEl, target, suffix);
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.5 });

        grid.querySelectorAll('.stat-card').forEach(card => observer.observe(card));
    }
}

