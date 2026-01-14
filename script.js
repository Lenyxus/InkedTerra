document.addEventListener("DOMContentLoaded", () => {
    
    const toggleBtns = document.querySelectorAll('.theme-toggle');
    const body = document.body;
    const logoImg = document.getElementById('hero-logo');

    if(localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        if(logoImg) logoImg.src = 'img/logo-light.png';
        toggleBtns.forEach(btn => btn.textContent = '☀');
    }

    toggleBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isLight = body.classList.toggle('light-mode');
            
            toggleBtns.forEach(b => b.textContent = isLight ? '☀' : '☾');
            
            if(logoImg) logoImg.src = isLight ? 'img/logo-light.png' : 'img/logo-dark.png';
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    });

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
            else {
                entry.target.classList.remove('show');
            }
        });
    }, {
        threshold: 0.1 // Spustí se, když je vidět alespoň 10% prvku
    });

    // Řekneme pozorovateli, ať sleduje všechny naše odkazy
    hiddenElements.forEach((el) => observer.observe(el));
});

// --- 6. MULTI BAR PARALLAX EFEKT ---
    const parallaxSection = document.getElementById('multibar-parallax');
    const bars = document.querySelectorAll('.bar-inner');

    if (parallaxSection && bars.length > 0) {
        window.addEventListener('scroll', () => {
            // Zjistíme, kde se sekce nachází vůči oknu
            const sectionTop = parallaxSection.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;

            // Efekt se spustí jen, když je sekce vidět
            if (sectionTop < screenHeight && sectionTop > -parallaxSection.offsetHeight) {
                
                // Vypočítáme posun (čím víc scrolluješ, tím větší číslo)
                // Dělíme 5ti, aby to nebylo moc rychlé
                const scrollProgress = (screenHeight - sectionTop) / 5;

                bars.forEach((bar, index) => {
                    // Sudé pruhy (index 1, 3) jedou dolů, Liché (0, 2, 4) jedou nahoru
                    // Používáme modulo (%) pro zjištění sudá/lichá
                    const direction = index % 2 === 0 ? -1 : 1; 
                    
                    // Aplikujeme posun
                    const movement = scrollProgress * direction * 0.5; // 0.5 je rychlost
                    
                    bar.style.transform = `translateY(${movement}px)`;
                });
            }
        });
    }