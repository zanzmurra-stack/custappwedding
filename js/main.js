(function ($) {
    "use strict";

    $(document).ready(function () {
        // ===========================================
        // DEKLARASI VARIABEL GLOBAL & FUNGSI PEMBANTU
        // (Ditempatkan di awal agar mudah diakses oleh semua bagian kode)
        // ===========================================

        // Untuk Musik
        const audio = document.getElementById("bgMusic");
        const btn = document.getElementById("playButton");
        let hasInteractedAndPlayed = false; // Flag untuk melacak apakah musik sudah pernah diputar otomatis/manual

        // Fungsi pembantu untuk memperbarui UI tombol musik
        function updatePlayButtonUI() {
            if (btn) { // Pastikan tombol ada di DOM sebelum diupdate
                btn.textContent = audio.paused ? "🎵 Play Music" : "⏸ Pause Music";
            }
        }

        // Fungsi utama untuk memutar musik (termasuk penanganan Promise untuk autoplay)
        function playMusicLogic() {
            if (audio && audio.paused) { // Pastikan elemen audio ada dan sedang dijeda
                audio.play().then(() => {
                    updatePlayButtonUI(); // Update UI setelah berhasil play
                    hasInteractedAndPlayed = true; // Set flag karena musik sudah diputar
                    console.log("Musik diputar via interaksi."); // Pesan konsol untuk debug
                }).catch(error => {
                    console.error("Gagal memutar musik:", error); // Pesan error di konsol
                    // Jika autoplay diblokir, kita set flag agar tidak terus mencoba secara otomatis
                    hasInteractedAndPlayed = true;
                    // Opsional: Berikan pesan ke pengguna jika autoplay diblokir
                    // alert("Browser Anda mungkin memblokir autoplay. Silakan klik tombol Play Music untuk memutar.");
                });
            }
        }

        // Fungsi utama untuk menjeda musik
        function pauseMusicLogic() {
            if (audio && !audio.paused) { // Pastikan elemen audio ada dan sedang diputar
                audio.pause();
                updatePlayButtonUI(); // Update UI setelah pause
                console.log("Musik dijeda via interaksi."); // Pesan konsol untuk debug
            }
        }

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
        // Smooth scrolling + Autoplay Musik saat klik Navbar Link
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

                // --- Logika Autoplay Musik saat Klik Navbar (Interaksi Pertama) ---
                if (!hasInteractedAndPlayed) {
                    playMusicLogic(); // Akan mencoba memutar musik
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
        // Countdown
        // =============================
        function startCountdown() {
            // Ganti tanggal acara kamu di sini (sesuai format "Month Day, Year HH:MM:SS")
            const weddingDate = new Date("December 06, 2025 08:00:00").getTime(); // Pukul 08:00 pagi

            function updateCountdown() {
                const now = new Date().getTime();
                const distance = weddingDate - now;

                if (distance < 0) {
                    // Jika waktu acara sudah lewat
                    ["days", "hours", "minutes", "seconds"].forEach(id => {
                        const element = document.getElementById(id);
                        if (element) element.innerHTML = "00";
                    });
                    return;
                }

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Perbarui elemen-elemen di HTML
                const daysEl = document.getElementById("days");
                const hoursEl = document.getElementById("hours");
                const minutesEl = document.getElementById("minutes");
                const secondsEl = document.getElementById("seconds");

                if (daysEl) daysEl.innerHTML = days.toString().padStart(2, "0");
                if (hoursEl) hoursEl.innerHTML = hours.toString().padStart(2, "0");
                if (minutesEl) minutesEl.innerHTML = minutes.toString().padStart(2, "0");
                if (secondsEl) secondsEl.innerHTML = seconds.toString().padStart(2, "0");
            }

            // Panggil updateCountdown pertama kali dan kemudian setiap detik
            setInterval(updateCountdown, 1000);
            updateCountdown(); // Panggil sekali untuk menghindari jeda 1 detik di awal
        }

        // Jalankan countdown saat dokumen siap
        startCountdown();

        // ===================================
        // EVENT LISTENER UNTUK MUSIK LAINNYA (Tombol Play/Pause & Autoplay Scroll)
        // ===================================

        // --- Event Listener untuk Tombol Play/Pause ---
        if (btn) { // Hanya tambahkan event listener jika tombol ada
            btn.addEventListener("click", function () {
                if (audio.paused) {
                    playMusicLogic();
                } else {
                    pauseMusicLogic();
                }
            });
        }

        // --- Event Listener: Autoplay saat Scroll ---
        $(window).on("scroll", function () { // Menggunakan jQuery .on() untuk event scroll
            // Jika musik sudah pernah diputar otomatis/manual, jangan picu lagi
            if (hasInteractedAndPlayed) {
                return;
            }

            const scrollPos = $(window).scrollTop(); // Posisi scroll dari atas
            const windowHeight = $(window).height(); // Tinggi viewport saat ini

            // Tentukan seberapa jauh scroll harus dilakukan untuk memicu musik (misal: 10% dari tinggi viewport)
            const scrollThreshold = windowHeight * 0.1; 

            if (scrollPos > scrollThreshold) {
                playMusicLogic(); // Coba putar musik
                // hasInteractedAndPlayed akan di-set di dalam playMusicLogic()
            }
        });
        
        // ===================================
        // INISIALISASI AWAL UNTUK MUSIK
        // ===================================
        updatePlayButtonUI(); // Atur teks tombol musik awal ('🎵 Play Music') saat halaman dimuat

        // =============================
        // Owl Carousel (jika Anda menggunakannya, inisialisasi yang benar)
        // =============================
        // $(".owl-carousel").owlCarousel({
        //     autoplay: true,
        //     smartSpeed: 1000,
        //     items: 1,
        //     dots: false,
        //     loop: true,
        //     nav : true,
        //     navText : [
        //         '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        //         '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        //     ]
        // });

        // =============================
        // Lightbox Gallery (jika Anda menggunakannya)
        // =============================
        // lightbox.option({
        //   'resizeDuration': 200,
        //   'wrapAround': true
        // });

    }); // Penutup $(document).ready()

})(jQuery); // Penutup fungsi anonim utama