/* =========================================
   CERTIFICATES.JS — Filter & Modal Logic
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

    /* ---- Cached DOM References ---- */
    const filterButtons     = document.querySelectorAll('.filter-btn');
    const certificateCards  = document.querySelectorAll('.certificate-card');
    const certificatesGrid  = document.getElementById('certificatesGrid');
    const noResults         = document.getElementById('noResults');
    const modal             = document.getElementById('certificateModal');
    const modalImage        = document.getElementById('modalImage');
    const modalClose        = document.getElementById('modalClose');
    const modalPrev         = document.getElementById('modalPrev');
    const modalNext         = document.getElementById('modalNext');

    let currentIndex        = 0;
    let visibleCertificates = [];

    /* ---- Helpers ---- */
    function getVisibleCertificates() {
        visibleCertificates = [];

        certificateCards.forEach(card => {

            if (card.style.display === 'none') return;

            const img = card.querySelector('.certificate-image-container img');

            if (img) {
                visibleCertificates.push({
                    src: img.src,
                    alt: img.alt
                });
            }

        });
    }

    function openModal(index) {

        currentIndex = index;

        modalImage.src = visibleCertificates[currentIndex].src;
        modalImage.alt = visibleCertificates[currentIndex].alt;

        modal.classList.add('active');

        document.body.style.overflow = 'hidden';

        updateNavButtons();
    }

    function closeModal() {

        modal.classList.remove('active');

        document.body.style.overflow = '';
    }

    function navigate(dir) {

        if (!visibleCertificates.length) return;

        currentIndex =
            (currentIndex + dir + visibleCertificates.length) %
            visibleCertificates.length;

        modalImage.src = visibleCertificates[currentIndex].src;
        modalImage.alt = visibleCertificates[currentIndex].alt;

        updateNavButtons();
    }

    function updateNavButtons() {

        const show = visibleCertificates.length > 1;

        modalPrev.style.display = show ? 'flex' : 'none';
        modalNext.style.display = show ? 'flex' : 'none';
    }

    /* ---- Filter Logic ---- */

    filterButtons.forEach(btn => {

        btn.addEventListener('click', () => {

            filterButtons.forEach(b => b.classList.remove('active'));

            btn.classList.add('active');

            const filter = btn.dataset.filter;

            let count = 0;

            certificateCards.forEach(card => {

                const match =
                    filter === 'all' ||
                    card.dataset.category === filter;

                card.style.display = match ? 'flex' : 'none';

                if (match) count++;

            });

            noResults.classList.toggle('show', count === 0);

            certificatesGrid.style.display =
                count === 0 ? 'none' : 'grid';

        });

    });

    /* ---- Open Modal on Card Click ---- */

    certificateCards.forEach(card => {

        card.addEventListener('click', () => {

            getVisibleCertificates();

            const img =
                card.querySelector('.certificate-image-container img');

            if (!img || !visibleCertificates.length) return;

            const idx =
                visibleCertificates.findIndex(
                    c => c.src === img.src
                );

            openModal(idx !== -1 ? idx : 0);

        });

    });

    /* ---- Modal Controls ---- */

    modalClose.addEventListener('click', closeModal);

    modalPrev.addEventListener('click', e => {

        e.stopPropagation();

        navigate(-1);

    });

    modalNext.addEventListener('click', e => {

        e.stopPropagation();

        navigate(1);

    });

    modal.addEventListener('click', e => {

        if (e.target === modal) {

            closeModal();

        }

    });

    document.addEventListener('keydown', e => {

        if (!modal.classList.contains('active')) return;

        if (e.key === 'Escape') {

            closeModal();

        }

        if (e.key === 'ArrowLeft') {

            navigate(-1);

        }

        if (e.key === 'ArrowRight') {

            navigate(1);

        }

    });

});