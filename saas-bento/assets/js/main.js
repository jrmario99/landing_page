document.addEventListener('DOMContentLoaded', () => {
    
    // Configuração do Intersection Observer para animações de entrada
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Anima apenas uma vez
            }
        });
    }, observerOptions);

    const sections = document.querySelectorAll('.fade-in-section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Efeito de Parallax suave no Hero (Opcional, mas adiciona o toque "Premium")
    const heroImage = document.querySelector('.dashboard-tilt');
    if (heroImage) {
        document.addEventListener('mousemove', (e) => {
            const { clientX, clientY } = e;
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            // Movimento muito sutil
            const rotateX = ((clientY - centerY) / centerY) * 2; 
            const rotateY = ((clientX - centerX) / centerX) * 2;

            heroImage.style.transform = `
                rotateX(${10 - rotateX}deg) 
                rotateY(${rotateY}deg)
                scale(0.95)
            `;
        });
    }
});