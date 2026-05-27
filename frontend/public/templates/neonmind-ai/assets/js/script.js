// assets/js/script.js

document.addEventListener('DOMContentLoaded', () => {
    
    // ==========================================
    // 1. Typewriter Effect Logic
    // ==========================================
    const words = ["Marketing Copy", "Python Code", "Blog Posts", "Viral Tweets"];
    const typewriterElement = document.getElementById('typewriter');
    
    // Verifica se o elemento existe para evitar erros
    if (typewriterElement) {
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50; // Deletar é mais rápido
            } else {
                typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100; // Digitar normal
            }

            // Lógica de pausa e troca de estado
            if (!isDeleting && charIndex === currentWord.length) {
                isDeleting = true;
                typeSpeed = 2000; // Pausa longa ao terminar a palavra
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500; // Pausa antes de começar a próxima
            }

            setTimeout(type, typeSpeed);
        }

        // Inicia o efeito
        type();
    }

    // ==========================================
    // 2. Before/After Slider Logic
    // ==========================================
    const sliderContainer = document.getElementById('comparison-container');
    const sliderHandle = document.getElementById('slider-handle');
    const originalImageWrapper = document.getElementById('original-image-wrapper');

    if (sliderContainer && sliderHandle && originalImageWrapper) {
        let isDragging = false;

        function moveSlider(e) {
            if (!isDragging) return;
            
            // Pega a posição X relativa ao container
            const rect = sliderContainer.getBoundingClientRect();
            // Suporte para Mouse e Touch
            const pageX = e.touches ? e.touches[0].pageX : e.pageX;
            
            let x = pageX - rect.left;

            // Limites (Boundaries)
            if (x < 0) x = 0;
            if (x > rect.width) x = rect.width;

            // Calcula porcentagem e aplica
            const percentage = (x / rect.width) * 100;
            
            sliderHandle.style.left = `${percentage}%`;
            originalImageWrapper.style.width = `${percentage}%`;
        }

        // Event Listeners: Mouse
        sliderHandle.addEventListener('mousedown', (e) => {
            isDragging = true;
            e.preventDefault(); // Evita seleção de texto
        });
        window.addEventListener('mouseup', () => isDragging = false);
        window.addEventListener('mousemove', moveSlider);

        // Event Listeners: Touch (Mobile)
        sliderHandle.addEventListener('touchstart', (e) => {
            isDragging = true;
            // Não usamos preventDefault aqui para permitir scroll vertical se necessário,
            // mas no handle é bom prevenir comportamentos estranhos
        }, { passive: true });
        
        window.addEventListener('touchend', () => isDragging = false);
        window.addEventListener('touchmove', moveSlider, { passive: false });
    }
});