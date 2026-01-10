document.addEventListener("DOMContentLoaded", () => {
    
    // přepínání témat
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
            if(logoImg) logoImg.src = isLight ? 'img/logo-light.png' : 'img/logo-dark.png';
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // Carousel galerie
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

    // Hvězdy pozadí
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

        // Vytvoření hvězdy
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
        
        setInterval(spawnSpark, 150); /*Interval jisker */

        window.addEventListener('resize', createGrid);
    }
});