(function ($) {
    "use strict";

    $(document).ready(function () {

        // =============================
        // Navbar on scroll
        // =============================
        $(window).scroll(function () {
            if ($(this).scrollTop() > 200) {
                $('.navbar').fadeIn('slow').css('display', 'flex');
            } else {
                $('.navbar').fadeOut('slow').css('display', 'none');
            }
        });

        // =============================
        // Smooth scrolling
        // =============================
        $(".navbar-nav a").on('click', function (event) {
            if (this.hash !== "") {
                event.preventDefault();

                $('html, body').animate({
                    scrollTop: $(this.hash).offset().top - 45
                }, 1500, 'easeInOutExpo');

                if ($(this).parents('.navbar-nav').length) {
                    $('.navbar-nav .active').removeClass('active');
                    $(this).closest('a').addClass('active');
                }
            }
        });

        // =============================
        // Modal Video
        // =============================
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });

        $('#videoModal').on('shown.bs.modal', function () {
            $("#video").attr('src', $videoSrc + "?autoplay=1&modestbranding=1&showinfo=0");
        });

        $('#videoModal').on('hide.bs.modal', function () {
            $("#video").attr('src', $videoSrc);
        });

        // =============================
        // Scroll to Bottom button
        // =============================
        $(window).scroll(function () {
            if ($(this).scrollTop() > 100) {
                $('.scroll-to-bottom').fadeOut('slow');
            } else {
                $('.scroll-to-bottom').fadeIn('slow');
            }
        });

        // =============================
        // Portfolio isotope
        // =============================
        /**var portfolioIsotope = $('.portfolio-container').isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });

        $('#portfolio-flters li').on('click', function () {
            $("#portfolio-flters li").removeClass('active');
            $(this).addClass('active');

            portfolioIsotope.isotope({ filter: $(this).data('filter') });
        });*/

        // =============================
        // Back to top button
        // =============================
        $(window).scroll(function () {
            if ($(this).scrollTop() > 200) {
                $('.back-to-top').fadeIn('slow');
            } else {
                $('.back-to-top').fadeOut('slow');
            }
        });

        $('.back-to-top').click(function () {
            $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
            return false;
        });

        // =============================
        // Gallery Carousel
        // =============================
        /**$(".gallery-carousel").owlCarousel({
            autoplay: false,
            smartSpeed: 1500,
            dots: false,
            loop: true,
            nav: true,
            navText: [
                '<i class="fa fa-angle-left" aria-hidden="true"></i>',
                '<i class="fa fa-angle-right" aria-hidden="true"></i>'
            ],
            responsive: {
                0: { items: 1 },
                576: { items: 2 },
                768: { items: 3 },
                992: { items: 4 },
                1200: { items: 5 }
            }
        });**/

        // =============================
        // Countdown
        // =============================
        function startCountdown() {
            const weddingDate = new Date("December 06, 2025 08:00:00").getTime();

            function updateCountdown() {
                const now = new Date().getTime();
                const distance = weddingDate - now;

                if (distance < 0) {
                    ["days","hours","minutes","seconds"].forEach(id => {
                        document.getElementById(id).innerHTML = "00";
                    });
                    return;
                }

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                document.getElementById("days").innerHTML = days.toString().padStart(2, "0");
                document.getElementById("hours").innerHTML = hours.toString().padStart(2, "0");
                document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, "0");
                document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, "0");
            }

            setInterval(updateCountdown, 1000);
            updateCountdown();
        }

        startCountdown();

    });

})(jQuery);
