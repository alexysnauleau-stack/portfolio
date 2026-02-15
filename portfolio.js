document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       1. ANIMATION "CASCADE" (STAGGERING)
       Fait apparaître les éléments un par un
       ========================================= */
    const observerOptions = { threshold: 0.1 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animer le conteneur principal (la section ou la carte)
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";

                // Si l'élément contient une grille ou une liste, on anime les enfants
                const children = entry.target.querySelectorAll('.item, .contact-item, .info-list li');
                
                children.forEach((child, index) => {
                    // Petit délai mathématique : index * 100ms
                    setTimeout(() => {
                        child.classList.add('reveal-visible');
                    }, index * 100); 
                });

                // On arrête d'observer une fois animé
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // On cible les cartes et les grilles
    const animatedElements = document.querySelectorAll('.about-card, .parcours-card, .skill-card, .contact-card-white');
    animatedElements.forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s ease-out";
        observer.observe(el);
    });

    /* =========================================
       2. MENU ACTIF AU SCROLL (VERSION FINALE)
       ========================================= */
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".menu a");

    window.addEventListener("scroll", () => {
        let current = "";
        
        // 1. SI ON EST TOUT EN HAUT : On nettoie tout et on arrête
        if (window.scrollY < 100) {
            navLinks.forEach(link => link.classList.remove("active-link"));
            return;
        }

        // 2. On cherche quelle section est visible
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            // On détecte la section un peu avant d'arriver dessus (-150px)
            if (scrollY >= sectionTop - 150) {
                current = section.getAttribute("id");
            }
        });

        // 3. On allume le lien correspondant
        navLinks.forEach((link) => {
            link.classList.remove("active-link");
            
            // LA CORRECTION EST ICI : On vérifie que 'current' n'est pas vide !
            if (current && link.getAttribute("href").includes(current)) {
                link.classList.add("active-link");
            }
        });
    });

    /* =========================================
       3. EFFET PARALLAXE HÉRO (Subtil)
       Bouge la photo moins vite que le texte
       ========================================= */
    const heroImage = document.querySelector('.profile-pic');
    if(heroImage) {
        window.addEventListener('scroll', () => {
            const scrollValue = window.scrollY;
            // Ne bouge que si on est en haut de page
            if (scrollValue < 700) { 
                heroImage.style.transform = `translateY(${scrollValue * 0.2}px)`;
            }
        });
    }

    /* =========================================
       4. LOGIQUE CARROUSEL (Existante)
       ========================================= */
    let currentSlide = 0;
    const slides = document.querySelectorAll('.carto-slide');
    const dots = document.querySelectorAll('.dot');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    function updateSlider(index) {
        if (index >= slides.length) currentSlide = 0;
        else if (index < 0) currentSlide = slides.length - 1;
        else currentSlide = index;

        slides.forEach(s => s.classList.remove('active'));
        dots.forEach(d => d.classList.remove('active'));
        
        if (slides[currentSlide]) slides[currentSlide].classList.add('active');
        if (dots[currentSlide]) dots[currentSlide].classList.add('active');
    }

    if (nextBtn) nextBtn.addEventListener('click', () => updateSlider(currentSlide + 1));
    if (prevBtn) prevBtn.addEventListener('click', () => updateSlider(currentSlide - 1));

    dots.forEach((dot, i) => {
        dot.addEventListener('click', () => updateSlider(i));
    });

    if (slides.length > 0) updateSlider(0);
});

/* =========================================
   5. FONCTIONS MODAL (Hors DOMContentLoaded)
   ========================================= */
function openFullView(src) {
    const modal = document.getElementById("fullViewModal");
    const modalImg = document.getElementById("imgFull");
    if (modal && modalImg) {
        modal.style.display = "block";
        modalImg.src = src;
    }
}

function closeFullView() {
    const modal = document.getElementById("fullViewModal");
    if (modal) modal.style.display = "none";
}