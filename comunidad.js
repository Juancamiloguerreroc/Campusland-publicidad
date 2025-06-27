// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
    }
});

// Animate stats on scroll
const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
};

const statObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const finalNumber = statNumber.textContent;
            const number = parseInt(finalNumber.replace(/\D/g, ''));
            const suffix = finalNumber.replace(/[\d,]/g, '');
            
            let current = 0;
            const increment = number / 30;
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    statNumber.textContent = finalNumber;
                    clearInterval(timer);
                } else {
                    statNumber.textContent = Math.floor(current).toLocaleString() + suffix;
                }
            }, 50);
            
            statObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-bubble').forEach(stat => {
    statObserver.observe(stat);
});

// Card hover effects
document.querySelectorAll('.connection-card, .activity-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Story carousel auto-rotation (simplified)
let currentStory = 0;
const stories = document.querySelectorAll('.story-card');

function showNextStory() {
    stories[currentStory].style.display = 'none';
    currentStory = (currentStory + 1) % stories.length;
    stories[currentStory].style.display = 'block';
}

// Hide all stories except first
stories.forEach((story, index) => {
    if (index !== 0) story.style.display = 'none';
});

// Auto-rotate every 5 seconds
setInterval(showNextStory, 5000);