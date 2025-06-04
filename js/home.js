document.addEventListener('DOMContentLoaded', () => {
    const sliderContainer = document.querySelector('.slider-container');
    if (!sliderContainer) {
        // console.warn('Slider container not found.');
        return;
    }

    const slides = sliderContainer.querySelectorAll('.img-slider');
    
    // Coba pilih tombol dengan asumsi mereka ada di dalam .slider-container (struktur yang direkomendasikan)
    let prevButton = sliderContainer.querySelector('.slider-button.prev');
    let nextButton = sliderContainer.querySelector('.slider-button.next');

    // Fallback jika tombol masih menggunakan struktur HTML lama (.button-container di luar .slider-container)
    if (!prevButton || !nextButton) {
        const externalButtonContainer = document.querySelector('.button-container');
        if (externalButtonContainer) {
            prevButton = externalButtonContainer.querySelector('.prev');
            nextButton = externalButtonContainer.querySelector('.next');
        }
    }

    if (slides.length === 0) {
        // console.warn('No slides found in the slider.');
        return;
    }
    if (!prevButton || !nextButton) {
        // console.warn('Slider navigation buttons not found.');
        return;
    }

    let currentIndex = 0;
    const intervalTime = 7000; // 7 detik
    let slideInterval;

    function showSlide(index) {
        // Sembunyikan semua slide
        slides.forEach(slide => {
            slide.classList.remove('active');
        });

        // Normalisasi index
        if (index >= slides.length) {
            currentIndex = 0;
        } else if (index < 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex = index;
        }

        // Tampilkan slide yang dipilih
        slides[currentIndex].classList.add('active');
    }

    function nextSlideAction() {
        showSlide(currentIndex + 1);
    }

    function prevSlideAction() {
        showSlide(currentIndex - 1);
    }

    function startAutoSlide() {
        stopAutoSlide(); // Hentikan interval sebelumnya jika ada
        slideInterval = setInterval(nextSlideAction, intervalTime);
    }

    function stopAutoSlide() {
        clearInterval(slideInterval);
    }

    nextButton.addEventListener('click', () => {
        nextSlideAction();
        startAutoSlide(); // Reset interval saat navigasi manual
    });

    prevButton.addEventListener('click', () => {
        prevSlideAction();
        startAutoSlide(); // Reset interval saat navigasi manual
    });

    // Inisialisasi slider
    if (slides.length > 0) {
        showSlide(currentIndex); // Tampilkan slide pertama
        startAutoSlide();    // Mulai slideshow otomatis
    }

    // Opsional: Jeda slideshow saat mouse hover di atas slider
    sliderContainer.addEventListener('mouseenter', stopAutoSlide);
    sliderContainer.addEventListener('mouseleave', startAutoSlide);
});

$(document).ready(function () {
    $.getJSON('data/blog.json', function (data) {
        let output = '';
        $.each(data, function (i, item) {
            output += `
                <div class="content-card">
                    <div class="news-image-wrapper">
                        <img src="${item.image}" alt="${item.alt}">
                    </div>
                    <div class="card-text-content">
                        <div>
                            <h3>${item.title}</h3>
                            <p>${item.description}</p>
                        </div>
                        <a href="detail-news.html?slug=${item.slug}" class="read-more-link">READ MORE</a>
                    </div>
                </div>
            `;
        });
        $('#news-container').html(output);
    });
});