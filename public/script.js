$(document).ready(function() {

    /* ========================================
       Navbar Scroll Effect
       ======================================== */
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('.navbar').addClass('scrolled');
        } else {
            $('.navbar').removeClass('scrolled');
        }
    });

    /* ========================================
       Mobile Menu Toggle
       ======================================== */
    $('.hamburger').click(function() {
        $(this).toggleClass('active');
        $('.nav-menu').toggleClass('active');

        // Animate hamburger icon
        if ($(this).hasClass('active')) {
            $(this).find('span:nth-child(1)').css({
                'transform': 'rotate(45deg) translateY(10px)',
            });
            $(this).find('span:nth-child(2)').css({
                'opacity': '0',
            });
            $(this).find('span:nth-child(3)').css({
                'transform': 'rotate(-45deg) translateY(-10px)',
            });
        } else {
            $(this).find('span').css({
                'transform': 'none',
                'opacity': '1',
            });
        }
    });

    /* ========================================
       Smooth Scrolling for Navigation Links
       ======================================== */
    $('.nav-link').click(function(e) {
        e.preventDefault();

        const target = $(this).attr('href');
        const targetPosition = $(target).offset().top - 70;

        $('html, body').animate({
            scrollTop: targetPosition
        }, 800, 'swing');

        // Close mobile menu if open
        $('.nav-menu').removeClass('active');
        $('.hamburger').removeClass('active');
        $('.hamburger span').css({
            'transform': 'none',
            'opacity': '1',
        });
    });

    /* ========================================
       Active Navigation Link on Scroll
       ======================================== */
    $(window).scroll(function() {
        const scrollPos = $(window).scrollTop() + 100;

        $('.nav-link').each(function() {
            const currLink = $(this);
            const refElement = $(currLink.attr('href'));

            if (refElement.length) {
                if (refElement.offset().top <= scrollPos &&
                    refElement.offset().top + refElement.height() > scrollPos) {
                    $('.nav-link').removeClass('active');
                    currLink.addClass('active');
                }
            }
        });
    });

    /* ========================================
       Scroll Animations for Sections
       ======================================== */
    function checkScroll() {
        $('.section').each(function() {
            const sectionTop = $(this).offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();

            if (windowBottom > sectionTop + 100) {
                $(this).addClass('visible');
            }
        });
    }

    // Check on scroll
    $(window).scroll(function() {
        checkScroll();
    });

    // Check on load
    checkScroll();

    /* ========================================
       Skill Tags Hover Effect with Stagger
       ======================================== */
    $('.skill-category').each(function(categoryIndex) {
        $(this).find('.skill-tag').each(function(index) {
            $(this).css({
                'animation': `fadeInUp 0.5s ease-out ${categoryIndex * 0.1 + index * 0.05}s both`
            });
        });
    });

    /* ========================================
       Timeline Items Animation
       ======================================== */
    function animateTimeline() {
        $('.timeline-item').each(function(index) {
            const itemTop = $(this).offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();

            if (windowBottom > itemTop + 50) {
                $(this).css({
                    'opacity': '1',
                    'transform': 'translateX(0)',
                    'transition': 'all 0.6s ease-out ' + (index * 0.2) + 's'
                });
            }
        });
    }

    // Initial state for timeline items
    $('.timeline-item').css({
        'opacity': '0',
        'transform': 'translateX(-30px)'
    });

    $(window).scroll(function() {
        animateTimeline();
    });

    animateTimeline();

    /* ========================================
       Contact Items Hover Effect
       ======================================== */
    $('.contact-item').hover(
        function() {
            $(this).find('.contact-icon').css({
                'transform': 'rotate(360deg) scale(1.1)',
                'transition': 'transform 0.6s ease'
            });
        },
        function() {
            $(this).find('.contact-icon').css({
                'transform': 'rotate(0deg) scale(1)',
            });
        }
    );

    /* ========================================
       Typing Effect for Hero Title
       ======================================== */
    function typeWriter(element, text, speed, callback) {
        let i = 0;
        element.text('');
        element.css('display', 'block');

        function type() {
            if (i < text.length) {
                element.text(element.text() + text.charAt(i));
                i++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        }
        type();
    }

    // Optional: Uncomment to enable typing effect
    // const nameElement = $('.name');
    // const originalText = nameElement.text();
    // nameElement.css('display', 'none');
    // setTimeout(function() {
    //     typeWriter(nameElement, originalText, 100);
    // }, 500);

    /* ========================================
       Parallax Effect on Hero Section
       ======================================== */
    $(window).scroll(function() {
        const scrolled = $(window).scrollTop();
        $('.hero-content').css('transform', 'translateY(' + (scrolled * 0.3) + 'px)');
        $('.hero-content').css('opacity', 1 - (scrolled / 500));
    });

    /* ========================================
       Smooth Fade-in for Hero Elements
       ======================================== */
    $('.hero-content > *').each(function(index) {
        $(this).css({
            'animation-delay': (index * 0.2) + 's'
        });
    });

    /* ========================================
       Button Ripple Effect
       ======================================== */
    $('.btn').click(function(e) {
        const button = $(this);
        const ripple = $('<span class="ripple"></span>');

        const diameter = Math.max(button.width(), button.height());
        const radius = diameter / 2;

        ripple.css({
            width: diameter,
            height: diameter,
            left: e.pageX - button.offset().left - radius,
            top: e.pageY - button.offset().top - radius
        });

        button.append(ripple);

        setTimeout(function() {
            ripple.remove();
        }, 600);
    });

    // Add ripple CSS dynamically
    $('<style>')
        .prop('type', 'text/css')
        .html(`
            .btn {
                position: relative;
                overflow: hidden;
            }
            .ripple {
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.5);
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            }
            @keyframes rippleEffect {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `)
        .appendTo('head');

    /* ========================================
       Scroll to Top Button (Optional)
       ======================================== */
    // Create scroll to top button
    $('body').append('<button id="scrollTop" title="Go to top">↑</button>');

    $('#scrollTop').css({
        'display': 'none',
        'position': 'fixed',
        'bottom': '30px',
        'right': '30px',
        'width': '50px',
        'height': '50px',
        'border': 'none',
        'border-radius': '50%',
        'background': 'linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)',
        'color': 'white',
        'font-size': '24px',
        'cursor': 'pointer',
        'z-index': '999',
        'box-shadow': '0 4px 16px rgba(0, 0, 0, 0.4)',
        'transition': 'all 0.3s ease'
    });

    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $('#scrollTop').fadeIn();
        } else {
            $('#scrollTop').fadeOut();
        }
    });

    $('#scrollTop').click(function() {
        $('html, body').animate({scrollTop: 0}, 800);
        return false;
    });

    $('#scrollTop').hover(
        function() {
            $(this).css('transform', 'translateY(-5px)');
        },
        function() {
            $(this).css('transform', 'translateY(0)');
        }
    );

    /* ========================================
       About Info Cards Stagger Animation
       ======================================== */
    function animateInfoCards() {
        $('.info-item').each(function(index) {
            const cardTop = $(this).offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();

            if (windowBottom > cardTop + 50) {
                $(this).css({
                    'opacity': '1',
                    'transform': 'translateY(0)',
                    'transition': 'all 0.5s ease-out ' + (index * 0.15) + 's'
                });
            }
        });
    }

    // Initial state
    $('.info-item').css({
        'opacity': '0',
        'transform': 'translateY(20px)'
    });

    $(window).scroll(function() {
        animateInfoCards();
    });

    animateInfoCards();

    /* ========================================
       Skills Category Stagger Animation
       ======================================== */
    function animateSkills() {
        $('.skill-category').each(function(index) {
            const skillTop = $(this).offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();

            if (windowBottom > skillTop + 50) {
                $(this).css({
                    'opacity': '1',
                    'transform': 'translateY(0)',
                    'transition': 'all 0.6s ease-out ' + (index * 0.1) + 's'
                });
            }
        });
    }

    // Initial state
    $('.skill-category').css({
        'opacity': '0',
        'transform': 'translateY(30px)'
    });

    $(window).scroll(function() {
        animateSkills();
    });

    animateSkills();

    /* ========================================
       Contact Items Stagger Animation
       ======================================== */
    function animateContactItems() {
        $('.contact-item').each(function(index) {
            const contactTop = $(this).offset().top;
            const windowBottom = $(window).scrollTop() + $(window).height();

            if (windowBottom > contactTop + 50) {
                $(this).css({
                    'opacity': '1',
                    'transform': 'translateY(0)',
                    'transition': 'all 0.5s ease-out ' + (index * 0.15) + 's'
                });
            }
        });
    }

    // Initial state
    $('.contact-item').css({
        'opacity': '0',
        'transform': 'translateY(30px)'
    });

    $(window).scroll(function() {
        animateContactItems();
    });

    animateContactItems();

    /* ========================================
       Preloader (Optional)
       ======================================== */
    $(window).on('load', function() {
        $('body').css('overflow', 'visible');
    });

    /* ========================================
       Console Message
       ======================================== */
    console.log('%c👋 Hello! Welcome to my portfolio!', 'font-size: 20px; color: #8b5cf6; font-weight: bold;');
    console.log('%cInterested in the code? Check it out on GitHub!', 'font-size: 14px; color: #a78bfa;');
});
