/**
 * HeritageGild Landing Page - Main JavaScript
 * Handles carousel, animations, smooth scrolling, and interactive elements
 */

(function() {
    'use strict';

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    // Set initial transparent state
    if (navbar) {
        navbar.classList.remove('scrolled');
    }

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar?.classList.add('scrolled');
        } else {
            navbar?.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ============================================
    // SMOOTH SCROLLING FOR NAVIGATION LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || href === '#contact') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    function setActiveNavLink() {
        let current = '';
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', setActiveNavLink);

    // ============================================
    // SCROLL ANIMATIONS (Intersection Observer)
    // ============================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .fade-in').forEach(el => {
        observer.observe(el);
    });

    // ============================================
    // GOLD CALCULATOR FUNCTIONALITY
    // ============================================
    const goldRateSlider = document.getElementById('goldRateSlider');
    const priceValue = document.querySelector('.price-value');
    const weightDisplay = document.getElementById('weightDisplay');
    const totalValueDisplay = document.getElementById('totalValueDisplay');
    const weightToggle = document.getElementById('weightToggle');
    
    let currentWeight = 0;
    let currentPrice = 120;

    // Update price and slider color when slider changes
    if (goldRateSlider && priceValue) {
        function updateSliderColor() {
            const min = parseInt(goldRateSlider.min);
            const max = parseInt(goldRateSlider.max);
            const value = parseInt(goldRateSlider.value);
            const percentage = ((value - min) / (max - min)) * 100;
            goldRateSlider.style.setProperty('--slider-percentage', percentage + '%');
        }

        // Initialize slider color
        updateSliderColor();

        goldRateSlider.addEventListener('input', function() {
            currentPrice = parseInt(this.value);
            priceValue.textContent = `$${currentPrice}`;
            updateSliderColor();
            updateTotalValue();
        });
    }

    // Weight toggle button - increments weight on click
    if (weightToggle) {
        weightToggle.addEventListener('click', function() {
            currentWeight += 1;
            updateWeightDisplay();
            updateTotalValue();
        });
    }

    function updateWeightDisplay() {
        if (weightDisplay) {
            weightDisplay.textContent = `${currentWeight.toString().padStart(2, '0')} g`;
        }
    }

    function updateTotalValue() {
        if (totalValueDisplay) {
            const total = currentWeight * currentPrice;
            totalValueDisplay.textContent = `$${total.toFixed(2).padStart(5, '0')}`;
        }
    }

    // ============================================
    // CAROUSEL FUNCTIONALITY
    // ============================================
    class Carousel {
        constructor(containerId) {
            this.container = document.getElementById(containerId);
            if (!this.container) return;
            
            this.slides = this.container.querySelectorAll('.carousel-slide');
            this.dotsContainer = document.getElementById('carouselDots');
            this.prevBtn = document.getElementById('prevBtn');
            this.nextBtn = document.getElementById('nextBtn');
            this.currentIndex = 0;
            this.autoPlayInterval = null;
            this.autoPlayDelay = 5000; // 5 seconds

            this.init();
        }

        init() {
            // Create dots
            if (this.dotsContainer) {
                this.slides.forEach((_, index) => {
                    const dot = document.createElement('div');
                    dot.className = `carousel-dot ${index === 0 ? 'active' : ''}`;
                    dot.addEventListener('click', () => this.goToSlide(index));
                    this.dotsContainer.appendChild(dot);
                });
            }

            // Event listeners
            if (this.prevBtn) {
                this.prevBtn.addEventListener('click', () => this.prevSlide());
            }

            if (this.nextBtn) {
                this.nextBtn.addEventListener('click', () => this.nextSlide());
            }

            // Keyboard navigation
            document.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowLeft') this.prevSlide();
                if (e.key === 'ArrowRight') this.nextSlide();
            });

            // Touch/swipe support
            this.addSwipeSupport();

            // Auto-play
            this.startAutoPlay();

            // Pause on hover
            if (this.container) {
                this.container.addEventListener('mouseenter', () => this.stopAutoPlay());
                this.container.addEventListener('mouseleave', () => this.startAutoPlay());
            }
        }

        goToSlide(index) {
            if (index < 0) {
                index = this.slides.length - 1;
            } else if (index >= this.slides.length) {
                index = 0;
            }

            // Update slides
            this.slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });

            // Update dots
            const dots = this.dotsContainer?.querySelectorAll('.carousel-dot');
            if (dots) {
                dots.forEach((dot, i) => {
                    dot.classList.remove('active');
                    if (i === index) {
                        dot.classList.add('active');
                    }
                });
            }

            // Move slides container
            const slidesContainer = this.container.querySelector('.carousel-slides');
            if (slidesContainer) {
                slidesContainer.style.transform = `translateX(-${index * 100}%)`;
            }

            this.currentIndex = index;
        }

        nextSlide() {
            this.goToSlide(this.currentIndex + 1);
        }

        prevSlide() {
            this.goToSlide(this.currentIndex - 1);
        }

        startAutoPlay() {
            this.stopAutoPlay();
            this.autoPlayInterval = setInterval(() => {
                this.nextSlide();
            }, this.autoPlayDelay);
        }

        stopAutoPlay() {
            if (this.autoPlayInterval) {
                clearInterval(this.autoPlayInterval);
                this.autoPlayInterval = null;
            }
        }

        addSwipeSupport() {
            let touchStartX = 0;
            let touchEndX = 0;

            this.container.addEventListener('touchstart', (e) => {
                touchStartX = e.changedTouches[0].screenX;
            });

            this.container.addEventListener('touchend', (e) => {
                touchEndX = e.changedTouches[0].screenX;
                this.handleSwipe();
            });

            this.handleSwipe = () => {
                if (touchEndX < touchStartX - 50) {
                    this.nextSlide();
                }
                if (touchEndX > touchStartX + 50) {
                    this.prevSlide();
                }
            };
        }
    }

    // Initialize carousel when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            new Carousel('carouselSlides');
        });
    } else {
        new Carousel('carouselSlides');
    }

    // ============================================
    // WHY CHOOSE US SLIDER
    // ============================================
    function initWhyChooseSlider() {
        const slides = document.querySelectorAll('#whyChooseSlides .carousel-slide');
        const navTabs = document.querySelectorAll('.nav-tab');
        const slidesContainer = document.getElementById('whyChooseSlides');
        const sliderWrapper = document.querySelector('.why-choose-slider-wrapper');
        let currentIndex = 0;
        let autoPlayInterval = null;
        const autoPlayDelay = 5000; // 5 seconds
        
        // Drag variables
        let isDragging = false;
        let startX = 0;
        let currentTranslate = 0;
        let prevTranslate = 0;
        let animationID = 0;

        function goToSlide(index, smooth = true) {
            if (index < 0) {
                index = slides.length - 1;
            } else if (index >= slides.length) {
                index = 0;
            }

            // Update slides container transform for sliding animation (right to left)
            if (slidesContainer) {
                const translateX = -index * 100;
                currentTranslate = translateX;
                prevTranslate = translateX;
                
                if (smooth) {
                    slidesContainer.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                } else {
                    slidesContainer.style.transition = 'none';
                }
                slidesContainer.style.transform = `translateX(${translateX}%)`;
            }

            // Update nav tabs
            navTabs.forEach((tab, i) => {
                tab.classList.remove('active');
                if (i === index) {
                    tab.classList.add('active');
                }
            });

            // Update line segments
            const lineSegments = document.querySelectorAll('.nav-tabs-line-segment');
            lineSegments.forEach((segment, i) => {
                segment.classList.remove('active');
                if (i === index) {
                    segment.classList.add('active');
                }
            });

            currentIndex = index;
        }

        function getPositionX(event) {
            return event.type.includes('mouse') ? event.clientX : event.touches[0].clientX;
        }

        function setSliderPosition() {
            if (slidesContainer) {
                slidesContainer.style.transform = `translateX(${currentTranslate}%)`;
            }
        }

        function animation() {
            setSliderPosition();
            if (isDragging) {
                requestAnimationFrame(animation);
            }
        }

        function startDrag(event) {
            startX = getPositionX(event);
            isDragging = true;
            stopAutoPlay();
            
            // Prevent default behavior
            event.preventDefault();
            
            animationID = requestAnimationFrame(animation);
            
            if (sliderWrapper) {
                sliderWrapper.style.cursor = 'grabbing';
            }
        }

        function drag(event) {
            if (!isDragging) return;
            
            // Prevent default behavior
            event.preventDefault();
            
            const currentX = getPositionX(event);
            const moved = currentX - startX;
            const slideWidth = sliderWrapper ? sliderWrapper.offsetWidth : 0;
            const movePercentage = (moved / slideWidth) * 100;
            
            currentTranslate = prevTranslate + movePercentage;
            
            // Prevent dragging beyond boundaries
            const maxTranslate = 0;
            const minTranslate = -(slides.length - 1) * 100;
            
            if (currentTranslate > maxTranslate) {
                currentTranslate = maxTranslate;
            } else if (currentTranslate < minTranslate) {
                currentTranslate = minTranslate;
            }
        }

        function endDrag() {
            if (!isDragging) return;
            
            cancelAnimationFrame(animationID);
            isDragging = false;
            
            const movedBy = currentTranslate - prevTranslate;
            
            // Determine which slide to snap to
            if (movedBy < -10 && currentIndex < slides.length - 1) {
                currentIndex += 1;
            } else if (movedBy > 10 && currentIndex > 0) {
                currentIndex -= 1;
            }
            
            goToSlide(currentIndex);
            
            if (sliderWrapper) {
                sliderWrapper.style.cursor = 'grab';
            }
            
            startAutoPlay();
        }

        function nextSlide() {
            goToSlide(currentIndex + 1);
        }

        function startAutoPlay() {
            stopAutoPlay();
            autoPlayInterval = setInterval(() => {
                nextSlide();
            }, autoPlayDelay);
        }

        function stopAutoPlay() {
            if (autoPlayInterval) {
                clearInterval(autoPlayInterval);
                autoPlayInterval = null;
            }
        }

        // Event listeners for nav tabs
        navTabs.forEach((tab, index) => {
            tab.addEventListener('click', () => {
                goToSlide(index);
                stopAutoPlay();
                startAutoPlay();
            });
        });

        // Event listeners for tab-line segments (make them clickable)
        const lineSegments = document.querySelectorAll('.nav-tabs-line-segment');
        lineSegments.forEach((segment, index) => {
            segment.style.cursor = 'pointer';
            segment.addEventListener('click', () => {
                goToSlide(index);
                stopAutoPlay();
                startAutoPlay();
            });
        });

        // Initialize - set initial transform
        if (slidesContainer) {
            slidesContainer.style.transform = 'translateX(0%)';
        }
        
        // Mouse drag events
        if (sliderWrapper) {
            sliderWrapper.style.cursor = 'grab';
            
            // Mouse events
            sliderWrapper.addEventListener('mousedown', startDrag);
            sliderWrapper.addEventListener('mousemove', drag);
            sliderWrapper.addEventListener('mouseup', endDrag);
            sliderWrapper.addEventListener('mouseleave', endDrag);
            
            // Touch events for mobile
            sliderWrapper.addEventListener('touchstart', startDrag);
            sliderWrapper.addEventListener('touchmove', drag);
            sliderWrapper.addEventListener('touchend', endDrag);
        }
        
        // Initialize
        startAutoPlay();

        // Pause on hover
        if (slidesContainer) {
            slidesContainer.addEventListener('mouseenter', stopAutoPlay);
            slidesContainer.addEventListener('mouseleave', startAutoPlay);
        }
    }

    // Initialize Why Choose Us slider
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initWhyChooseSlider();
        });
    } else {
        initWhyChooseSlider();
    }

    // ============================================
    // GOLD CHART CANVAS
    // ============================================
    function drawGoldChart() {
        const canvas = document.getElementById('goldChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const container = canvas.parentElement;
        const width = canvas.width = container.offsetWidth - 32;
        const height = canvas.height = container.offsetHeight - 32;

        // Chart data matching the image (values in grams: 0g, 50g, 100g, 150g)
        const data = [
            { month: 'Jan', value: 45 },
            { month: 'Feb', value: 60 },
            { month: 'Mar', value: 55 },
            { month: 'Apr', value: 50 },
            { month: 'May', value: 90 },
            { month: 'Jun', value: 130 }
        ];

        const padding = { top: 20, right: 20, bottom: 40, left: 50 };
        const chartWidth = width - padding.left - padding.right;
        const chartHeight = height - padding.top - padding.bottom;
        const maxValue = 150;
        const minValue = 0;
        const valueRange = maxValue - minValue;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw background
        ctx.fillStyle = '#1A1A1A';
        ctx.fillRect(0, 0, width, height);

        // Draw grid lines (horizontal)
        ctx.strokeStyle = '#2A2A2A';
        ctx.lineWidth = 1;
        const gridLines = 4;
        for (let i = 0; i <= gridLines; i++) {
            const y = padding.top + (chartHeight / gridLines) * i;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();
        }

        // Draw Y-axis labels
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '12px Inter';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        const yLabels = ['0g', '50g', '100g', '150g'];
        yLabels.forEach((label, i) => {
            const y = padding.top + (chartHeight / gridLines) * (gridLines - i);
            ctx.fillText(label, padding.left - 10, y);
        });

        // Draw X-axis labels
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        data.forEach((point, index) => {
            const x = padding.left + (chartWidth / (data.length - 1)) * index;
            ctx.fillText(point.month, x, height - padding.bottom + 10);
        });

        // Draw chart line
        ctx.strokeStyle = '#4CAF50';
        ctx.lineWidth = 3;
        ctx.beginPath();

        data.forEach((point, index) => {
            const x = padding.left + (chartWidth / (data.length - 1)) * index;
            const y = padding.top + chartHeight - ((point.value - minValue) / valueRange) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // Draw data points
        ctx.fillStyle = '#4CAF50';
        data.forEach((point, index) => {
            const x = padding.left + (chartWidth / (data.length - 1)) * index;
            const y = padding.top + chartHeight - ((point.value - minValue) / valueRange) * chartHeight;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    // Draw chart when DOM is ready
    function initChart() {
        const canvas = document.getElementById('goldChart');
        if (canvas) {
            setTimeout(() => {
                drawGoldChart();
            }, 100);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChart);
    } else {
        initChart();
    }

    // Redraw chart on window resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            drawGoldChart();
            drawAboutDashboardChart();
        }, 250);
    });

    // ============================================
    // ABOUT DASHBOARD CHART
    // ============================================
    function drawAboutDashboardChart() {
        const canvas = document.getElementById('aboutDashboardChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const container = canvas.parentElement;
        const width = canvas.width = container.offsetWidth - 32;
        const height = canvas.height = container.offsetHeight - 32;

        // Chart data for 6 months
        const data = [
            { month: 'Jan', value: 30 },
            { month: 'Feb', value: 80 },
            { month: 'Mar', value: 65 },
            { month: 'Apr', value: 100 },
            { month: 'May', value: 90 },
            { month: 'Jun', value: 120 }
        ];

        const padding = { top: 20, right: 20, bottom: 40, left: 50 };
        const chartWidth = width - padding.left - padding.right;
        const chartHeight = height - padding.top - padding.bottom;
        const maxValue = 150;
        const minValue = 0;
        const valueRange = maxValue - minValue;

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Draw background
        ctx.fillStyle = '#1A1A1A';
        ctx.fillRect(0, 0, width, height);

        // Draw grid lines (horizontal)
        ctx.strokeStyle = '#2A2A2A';
        ctx.lineWidth = 1;
        const gridLines = 4;
        for (let i = 0; i <= gridLines; i++) {
            const y = padding.top + (chartHeight / gridLines) * i;
            ctx.beginPath();
            ctx.moveTo(padding.left, y);
            ctx.lineTo(width - padding.right, y);
            ctx.stroke();
        }

        // Draw Y-axis labels
        ctx.fillStyle = '#FFFFFF';
        ctx.font = '12px Inter';
        ctx.textAlign = 'right';
        ctx.textBaseline = 'middle';
        const yLabels = ['0g', '50g', '100g', '150g'];
        yLabels.forEach((label, i) => {
            const y = padding.top + (chartHeight / gridLines) * (gridLines - i);
            ctx.fillText(label, padding.left - 10, y);
        });

        // Draw X-axis labels
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        data.forEach((point, index) => {
            const x = padding.left + (chartWidth / (data.length - 1)) * index;
            ctx.fillText(point.month, x, height - padding.bottom + 10);
        });

        // Draw area fill
        ctx.fillStyle = 'rgba(76, 175, 80, 0.2)';
        ctx.beginPath();
        data.forEach((point, index) => {
            const x = padding.left + (chartWidth / (data.length - 1)) * index;
            const y = padding.top + chartHeight - ((point.value - minValue) / valueRange) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, padding.top + chartHeight);
                ctx.lineTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        ctx.lineTo(width - padding.right, padding.top + chartHeight);
        ctx.closePath();
        ctx.fill();

        // Draw chart line
        ctx.strokeStyle = '#4CAF50';
        ctx.lineWidth = 3;
        ctx.beginPath();

        data.forEach((point, index) => {
            const x = padding.left + (chartWidth / (data.length - 1)) * index;
            const y = padding.top + chartHeight - ((point.value - minValue) / valueRange) * chartHeight;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });

        ctx.stroke();

        // Draw data points
        ctx.fillStyle = '#4CAF50';
        data.forEach((point, index) => {
            const x = padding.left + (chartWidth / (data.length - 1)) * index;
            const y = padding.top + chartHeight - ((point.value - minValue) / valueRange) * chartHeight;
            
            ctx.beginPath();
            ctx.arc(x, y, 4, 0, Math.PI * 2);
            ctx.fill();
        });
    }

    // Initialize about dashboard chart
    function initAboutDashboardChart() {
        const canvas = document.getElementById('aboutDashboardChart');
        if (canvas) {
            setTimeout(() => {
                drawAboutDashboardChart();
            }, 100);
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initAboutDashboardChart();
        });
    } else {
        initAboutDashboardChart();
    }

    // Timeframe tabs functionality
    document.querySelectorAll('.timeframe-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.timeframe-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            // Chart can be redrawn here if needed for different timeframes
        });
    });

    // ============================================
    // PRICING CARD HOVER EFFECTS
    // ============================================
    document.querySelectorAll('.pricing-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // ============================================
    // FEATURE CARD ANIMATIONS
    // ============================================
    document.querySelectorAll('.feature-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    // ============================================
    // FORM VALIDATION (if forms are added later)
    // ============================================
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!this.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            this.classList.add('was-validated');
        }, false);
    });

    // ============================================
    // LAZY LOADING FOR IMAGES
    // ============================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    // ============================================
    // FAQ ACCORDION FUNCTIONALITY
    // ============================================
    function initFAQAccordion() {
        const faqItems = document.querySelectorAll('.faq-item');
        
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                
                // Close all items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                });
                
                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    }
    
    // Initialize FAQ accordion
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initFAQAccordion();
        });
    } else {
        initFAQAccordion();
    }

    // ============================================
    // CONSOLE MESSAGE
    // ============================================
    console.log('%cHeritageGild Landing Page', 'color: #FFD54F; font-size: 20px; font-weight: bold;');
    console.log('%cWelcome to HeritageGild - Your trusted gold investment platform', 'color: #B0B0B0; font-size: 12px;');

})();

