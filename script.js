document.addEventListener("DOMContentLoaded", () => {
    const toggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;
    const logoImg = document.getElementById('hero-logo');

    if(localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        if(toggleBtn) toggleBtn.textContent = '☀';
        if(logoImg) logoImg.src = 'img/logo-light.png';
    }

    if(toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isLight = body.classList.toggle('light-mode');
            toggleBtn.textContent = isLight ? '☀' : '☾';
            
            if(logoImg) {
                logoImg.src = isLight ? 'img/logo-light.png' : 'img/logo-dark.png';
            }
            
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    const scrollContainer = document.getElementById('gallery-scroll');
    const btnLeft = document.getElementById('btn-left');
    const btnRight = document.getElementById('btn-right');

    if (scrollContainer && btnLeft && btnRight) {
        btnLeft.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: -330, behavior: 'smooth' });
        });
        btnRight.addEventListener('click', () => {
            scrollContainer.scrollBy({ left: 330, behavior: 'smooth' });
        });
    }
});