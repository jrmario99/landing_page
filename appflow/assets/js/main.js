// AppFlow Landing Page JS
// Testimonial slider and FAQ accordion logic

document.addEventListener('DOMContentLoaded', () => {
	// Testimonial Carousel
	const slides = Array.from(document.querySelectorAll('.testimonial-slide'));
	if (slides.length) {
		let current = 0;
		const show = idx => {
			slides.forEach((s, i) => s.classList.toggle('hidden', i !== idx));
		};
		const next = () => { current = (current + 1) % slides.length; show(current); };
		const prev = () => { current = (current - 1 + slides.length) % slides.length; show(current); };

		let interval = setInterval(next, 5000);
		const carouselEl = document.getElementById('testimonial-carousel');
		carouselEl && carouselEl.addEventListener('mouseenter', () => clearInterval(interval));
		carouselEl && carouselEl.addEventListener('mouseleave', () => interval = setInterval(next, 5000));

		const btnNext = document.getElementById('next-testimonial');
		const btnPrev = document.getElementById('prev-testimonial');
		btnNext && btnNext.addEventListener('click', () => { next(); clearInterval(interval); });
		btnPrev && btnPrev.addEventListener('click', () => { prev(); clearInterval(interval); });
	}

	// FAQ Accordion (allow only one open)
	const faqs = document.querySelectorAll('.faq-item');
	faqs.forEach(item => {
		item.addEventListener('click', () => {
			faqs.forEach(i => { if (i !== item) i.classList.remove('active'); });
			item.classList.toggle('active');
		});
	});
});
