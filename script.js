// script.js - JavaScript chung cho toàn bộ website

// Hàm load các component như navbar, footer
function loadComponent(elementId, filePath) {
    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            document.getElementById(elementId).innerHTML = data;

            // Nếu load navbar, thêm sự kiện cho toggle menu
            if (elementId === 'navbar') {
                const navToggle = document.getElementById('navToggle');
                const navMenu = document.querySelector('.nav-menu');

                if (navToggle && navMenu) {
                    navToggle.addEventListener('click', function () {
                        navMenu.classList.toggle('active');
                        this.querySelector('i').classList.toggle('fa-bars');
                        this.querySelector('i').classList.toggle('fa-times');
                    });
                }
            }
        })
        .catch(error => console.error(`Lỗi khi load ${filePath}:`, error));
}

// Xử lý scroll cho header
window.addEventListener('scroll', function () {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        header.style.padding = '0.5rem 0';
    } else {
        header.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
        header.style.padding = '1rem 0';
    }
});

// Đóng menu khi click vào link
document.addEventListener('click', function (e) {
    const navMenu = document.querySelector('.nav-menu');
    const navToggle = document.getElementById('navToggle');

    if (navMenu && navMenu.classList.contains('active') &&
        !e.target.closest('.nav-menu') &&
        !e.target.closest('#navToggle')) {
        navMenu.classList.remove('active');
        if (navToggle) {
            navToggle.querySelector('i').classList.remove('fa-times');
            navToggle.querySelector('i').classList.add('fa-bars');
        }
    }
});

// Smooth scroll cho các liên kết nội bộ
document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            const href = this.getAttribute('href');

            // Chỉ xử lý các link nội bộ (không phải link trang)
            if (href !== '#' && href.startsWith('#') && document.querySelector(href)) {
                e.preventDefault();

                const target = document.querySelector(href);
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});