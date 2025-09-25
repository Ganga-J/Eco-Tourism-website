

document.addEventListener('DOMContentLoaded', () => {

    const counters = document.querySelectorAll('.counter');
    const options = {
        root: null, // use the viewport as the root
        threshold: 0.5 // trigger when 50% of the element is visible
    };

    const animateCounter = (counter) => {
        const target = +counter.dataset.target;
        let count = 0;
        const speed = 200; // The higher the number, the slower the animation

        const updateCount = () => {
            const increment = target / speed;
            if (count < target) {
                count += increment;
                counter.innerText = Math.ceil(count);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target); // Stop observing after animation
            }
        });
    }, options);

    counters.forEach(counter => {
        observer.observe(counter);
    });

});