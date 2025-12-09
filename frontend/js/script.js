document.addEventListener("DOMContentLoaded", () => {
    
// =======================================================
    // ZAČÁTEK TESTOVACÍHO KÓDU PRO API
    // =======================================================
    async function testApiConnection() {
        console.log("Pokouším se připojit k backendu na http://localhost:5000/api/test");
        try {
            const response = await fetch('http://localhost:5000/api/test');
            
            // Zkontrolujeme, jestli server odpověděl OK (status 200)
            if (!response.ok) {
                throw new Error(`Chyba sítě: ${response.status}`);
            }

            const data = await response.json();
            
            // Pokud se vše povedlo, vypíšeme zprávu z backendu do konzole
            console.log("ÚSPĚCH!", data.message);

        } catch (error) {
            // Pokud se spojení nepovedlo (např. backend neběží)
            console.error("CHYBA PŘIPOJENÍ K API:", error);
            console.error("Ujisti se, že backend server (python app.py) běží!");
        }
    }

    // Zavoláme naši testovací funkci hned po načtení stránky
    testApiConnection();
    // =======================================================
    // KONEC TESTOVACÍHO KÓDU PRO API
    // =======================================================







    // --- Ovládání Sidebaru (Hamburger menu) ---
    const menuBtn = document.getElementById('menu-btn');
    const closeBtn = document.getElementById('close-btn');
    const sidebar = document.querySelector('.sidebar');

    // Otevření sidebar
    if(menuBtn) {
        menuBtn.addEventListener('click', () => {
            sidebar.classList.add('show');
        });
    }

    // Zavření sidebar
    if(closeBtn) {
        closeBtn.addEventListener('click', () => {
            sidebar.classList.remove('show');
        });
    }

    // --- Ovládání podmenu (Templates) ---
    const navGroups = document.querySelectorAll('.nav-group-title');
    navGroups.forEach(group => {
        group.addEventListener('click', () => {
            group.parentElement.classList.toggle('open');
        });
    });

    // --- Dynamické načítání obsahu ---
    const contentArea = document.getElementById('main-content');
    const topbarTitle = document.getElementById('topbar-title');
    const navLinks = document.querySelectorAll('.nav-link');

    // Funkce pro načtení stránky
    async function loadPage(pageName, pageTitle) {
        try {
            // Použijeme fetch API pro načtení obsahu souboru
            const response = await fetch(`pages/${pageName}.html`);
            
            // Kontrola, zda se soubor podařilo načíst
            if (!response.ok) {
                throw new Error(`Stránka pages/${pageName}.html nenalezena.`);
            }
            
            const content = await response.text();
            contentArea.innerHTML = content;
            topbarTitle.textContent = pageTitle;

        } catch (error) {
            console.error('Chyba při načítání obsahu:', error);
            contentArea.innerHTML = `<p>Obsah se nepodařilo načíst. F12 pro více info.</p>`;
            topbarTitle.textContent = 'Chyba';
        }
    }

    // Nastavení výchozí stránky (Dashboard)
    loadPage('dashboard', 'Dashboard');

    // Přidání "click" eventů na všechny navigační odkazy
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Zabráníme výchozí akci odkazu (přechod na #)

            // Získáme data z atributů 'data-page' a 'data-title'
            const pageName = link.dataset.page;
            const pageTitle = link.dataset.title;
            
            // Načtení stránky
            loadPage(pageName, pageTitle);

            // Aktualizace aktivní třídy v menu
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            
            // Pokud je otevřené podmenu, tak jeho rodič musí být taky "aktivní"
            const parentGroup = link.closest('.nav-group');
            if (parentGroup) {
                // Toto je složitější, pro zjednodušení necháme aktivní jen odkaz
                // Ale můžeme zajistit, že nadřazená položka zůstane vizuálně "otevřená"
            }

            // Zavřeme sidebar na mobilu po kliknutí
            if (window.innerWidth <= 768) {
                sidebar.classList.remove('show');
            }
        });
    });
});