document.addEventListener("DOMContentLoaded", () => {
    
    // --- Proměnné ---
    const menuBtn = document.getElementById('menu-btn');
    const container = document.querySelector('.container');
    const sidebar = document.querySelector('aside'); // Potřebujeme pro detekci kliknutí uvnitř
    const navLinks = document.querySelectorAll('.nav-link');
    const navGroups = document.querySelectorAll('.nav-group-title');
    
    const contentArea = document.getElementById('main-content');
    const topbarTitle = document.getElementById('topbar-title');

    // --- 1. OVLÁDÁNÍ SIDEBARU (Hamburger) ---
    const toggleMenu = () => {
        container.classList.toggle('expanded-sidebar');
    };

    if(menuBtn) {
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
    }
    // (Kód pro closeBtn zde byl odstraněn)

    // --- 2. AUTO-OPEN (Pomocná funkce) ---
    const expandSidebarIfNeeded = () => {
        if (!container.classList.contains('expanded-sidebar')) {
            container.classList.add('expanded-sidebar');
        }
    };

    // --- 3. PODMENU ---
    navGroups.forEach(group => {
        group.addEventListener('click', (e) => {
            e.stopPropagation(); 
            expandSidebarIfNeeded();
            group.parentElement.classList.toggle('open');
        });
    });

    // --- 4. NAČÍTÁNÍ OBSAHU ---
    async function loadPage(pageName, pageTitle) {
        try {
            const response = await fetch(`pages/${pageName}.html`);
            if (!response.ok) throw new Error('Not found');
            const content = await response.text();
            
            contentArea.innerHTML = content;
            topbarTitle.textContent = pageTitle;
        } catch (error) {
            console.error(error);
            contentArea.innerHTML = `<p>Obsah se nepodařilo načíst.</p>`;
        }
    }

    // Výchozí stránka
    loadPage('dashboard', 'Dashboard');

    // --- 5. KLIKNUTÍ NA ODKAZY ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            expandSidebarIfNeeded();

            const pageName = link.dataset.page;
            const pageTitle = link.dataset.title;
            loadPage(pageName, pageTitle);

            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // (Kód pro zavírání na mobilu zde byl odstraněn)
        });
    });

    // --- 6. Zavření sidebaru při kliknutí mimo něj ---
    document.addEventListener('click', (event) => {
        const clickedInsideSidebar = sidebar.contains(event.target);
        const clickedHamburger = menuBtn.contains(event.target);

        // Pokud kliknul VENKU (ani v sidebaru, ani na hamburgeru)
        if (!clickedInsideSidebar && !clickedHamburger) {
            
            // Pokud je rozbalený, smrskni ho
            if (container.classList.contains('expanded-sidebar')) {
                container.classList.remove('expanded-sidebar');
                
                // Zavřít i podmenu
                const openGroups = document.querySelectorAll('.nav-group.open');
                openGroups.forEach(g => g.classList.remove('open'));
            }
            // (Kód pro 'show' třídu zde byl odstraněn)
        }
    });

});