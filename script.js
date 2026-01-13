document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. PŘEPÍNÁNÍ TÉMAT (Dark/Light Mode) ---
    const toggleBtn = document.getElementById('theme-toggle-btn');
    const body = document.body;
    const logoImg = document.getElementById('hero-logo');

    // Načtení uloženého tématu
    if(localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        if(toggleBtn) toggleBtn.textContent = '☀';
        if(logoImg) logoImg.src = 'img/logo-light.png';
    }

    if(toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            const isLight = body.classList.toggle('light-mode');
            toggleBtn.textContent = isLight ? '☀' : '☾';
            // Změna loga podle režimu
            if(logoImg) logoImg.src = isLight ? 'img/logo-light.png' : 'img/logo-dark.png';
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // --- 2. CAROUSEL GALERIE (Posouvání šipkami) ---
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

    // --- 3. BACKGROUND HVĚZDY (Efekt jisker) ---
    const gridContainer = document.getElementById('grid-container');

    if (gridContainer) {
        let cols, rows;
        let gridItems = []; 

        function createGrid() {
            gridContainer.innerHTML = '';
            const width = gridContainer.clientWidth;
            const height = gridContainer.clientHeight;
            const size = 35; 

            cols = Math.ceil(width / size);
            rows = Math.ceil(height / size);
            
            gridItems = [];
            for (let r = 0; r < rows; r++) {
                gridItems[r] = [];
            }

            for (let r = 0; r < rows; r++) {
                for (let c = 0; c < cols; c++) {
                    const gridItem = document.createElement('div');
                    gridItem.classList.add('grid-item');
                    gridContainer.appendChild(gridItem);
                    gridItems[r][c] = gridItem;
                }
            }
        }

        function spawnSpark() {
            const r = Math.floor(Math.random() * rows);
            const c = Math.floor(Math.random() * cols);

            if (gridItems[r] && gridItems[r][c]) {
                const item = gridItems[r][c];
                item.classList.add('spark');
                setTimeout(() => {
                    item.classList.remove('spark');
                }, 2000); 
            }
        }

        createGrid();
        setInterval(spawnSpark, 150); /* Interval jisker */
        window.addEventListener('resize', createGrid);
    }

    // --- 5. SCROLL ANIMACE PRO HERO ODKAZY ---
    
    // Najdeme všechny odkazy, které chceme animovat
    const hiddenElements = document.querySelectorAll('.hover-link-item');

    // Vytvoříme "pozorovatele" (Intersection Observer)
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            console.log(entry); // Pro kontrolu
            // Pokud je prvek vidět na obrazovce
            if (entry.isIntersecting) {
                // Přidáme třídu .show (spustí CSS animaci)
                entry.target.classList.add('show');
            } 
            // Pokud chceš, aby zmizeli když vyjedeš nahoru, odkomentuj else:
            // else {
            //    entry.target.classList.remove('show');
            // }
        });
    }, {
        threshold: 0.1 // Spustí se, když je vidět alespoň 10% prvku
    });

    // Řekneme pozorovateli, ať sleduje všechny naše odkazy
    hiddenElements.forEach((el) => observer.observe(el));
});