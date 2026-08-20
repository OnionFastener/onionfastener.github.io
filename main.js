const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.navbar__menu');
const navLogo = document.querySelector('#navbar__logo');

const setMenuState = (isOpen) => {
    menu.classList.toggle('is-active', isOpen);
    menuLinks.classList.toggle('active', isOpen);
    menu.setAttribute('aria-expanded', String(isOpen));
    menu.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
};

menu.addEventListener('click', () => {
    setMenuState(menu.getAttribute('aria-expanded') !== 'true');
});

const closeMobileMenu = () => {
    if (window.innerWidth <= 960) setMenuState(false);
};

menuLinks.addEventListener('click', closeMobileMenu);
navLogo.addEventListener('click', closeMobileMenu);

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenuState(false);
});

const navLinks = [...document.querySelectorAll('.navbar__links')];
const sections = [...document.querySelectorAll('#home, #about, #projects')];

const sectionObserver = new IntersectionObserver((entries) => {
    if (window.innerWidth <= 960) {
        navLinks.forEach(link => link.classList.remove('highlight'));
        return;
    }

    const visibleSection = entries
        .filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visibleSection) return;

    navLinks.forEach(link => {
        link.classList.toggle(
            'highlight',
            link.getAttribute('href') === `#${visibleSection.target.id}`
        );
    });
}, { rootMargin: '-20% 0px -55%', threshold: [0, 0.25, 0.5] });

sections.forEach(section => sectionObserver.observe(section));
