document.addEventListener('DOMContentLoaded', () => {
    // This is a placeholder for general site-wide JavaScript.
    // For example, you could add code for a responsive mobile menu.

    const mobileMenuButton = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');

    if (mobileMenuButton && mainNav) {
        mobileMenuButton.addEventListener('click', () => {
            mainNav.classList.toggle('active');
        });
    }

    // You can add more functionality here, like form validation,
    // lightboxes for images, or interactive scroll effects.
});