import Swiper from 'swiper';
import {
  Pagination,
  Navigation,
  Autoplay,
  EffectCreative,
} from 'swiper/modules';

import { Accordion } from './components/accordion';

initBurger();
setActiveMenu();
openContactformPopup();

new Accordion('#faq', '');

function setMenuPosition(header, menu, burgerBtn) {
  if (burgerBtn.classList.contains('open')) {
    menu.style.top = header.offsetHeight + 'px';
    menu.style.height = `calc(100dvh - ${header.offsetHeight}px)`;
  }
}

function initBurger() {
  const header = document.querySelector('.header');
  const burgerBtn = document.querySelector('.header_burger');
  const menu = document.querySelector('.header_inner');

  burgerBtn.addEventListener('click', () => {
    burgerBtn.classList.toggle('open');
    menu.classList.toggle('show');
    document.body.classList.toggle('lock');
    setMenuPosition(header, menu, burgerBtn);
  });

  window.addEventListener('resize', () => {
    setMenuPosition(header, menu, burgerBtn);
  });
}

new Swiper('.hero_swiper', {
  modules: [Navigation, Autoplay],
  speed: 2100,
  grabCursor: true,
  autoplay: {
    delay: 3000,
  },
  slidesPerView: 1,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

new Swiper('.gallery_swiper', {
  modules: [Navigation, Pagination, EffectCreative],
  centeredSlides: true,
  initialSlide: 1,
  loop: true,
  speed: 1300,
  effect: 'creative',
  creativeEffect: {
    prev: {
      shadow: false,
      translate: ['-110%', 0, -150],
    },
    next: {
      shadow: false,
      translate: ['110%', 0, -150],
    },
    current: {
      translate: [0, 0, 0],
      scale: 1,
    },
  },
  pagination: {
    el: '.swiper-pagination',
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  breakpoints: {
    320: {
      slidesPerView: 1.2,
      spaceBetween: 12,
    },
    768: {
      slidesPerView: 1.7,
      spaceBetween: 12,
    },
    1024: {
      slidesPerView: 2.2,
      spaceBetween: 20,
    },
    1200: {
      slidesPerView: 2.3,
      spaceBetween: 20,
    },
    1442: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});

let swiper;

function initSwiper() {
  if (window.innerWidth <= 1024 && !swiper) {
    swiper = new Swiper('.team_gallery', {
      modules: [Navigation, Pagination, EffectCreative],
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
      },
      effect: 'creative',
      creativeEffect: {
        prev: {
          shadow: false,
          translate: ['-110%', 0, -150],
        },
        next: {
          shadow: false,
          translate: ['110%', 0, -150],
        },
        current: {
          translate: [0, 0, 0],
          scale: 1,
        },
      },
      breakpoints: {
        320: {
          slidesPerView: 1.2,
          spaceBetween: 12,
          centeredSlides: true,
        },
        560: {
          slidesPerView: 1.8,
          spaceBetween: 12,
          centeredSlides: true,
        },
        768: {
          slidesPerView: 2.3,
          spaceBetween: 12,
          centeredSlides: true,
        },
      },
    });
  } else if (window.innerWidth > 1024 && swiper) {
    swiper.destroy(true, true);
    swiper = null;
  }
}

initSwiper();

window.addEventListener('resize', () => {
  initSwiper();
});

function setActiveMenu() {
  const currentPath = window.location.pathname.split('/').pop();
  const menuLinks = document.querySelectorAll('.header_menu-link');

  menuLinks.forEach((link) => {
    const linkPath = link.getAttribute('href');

    if (
      linkPath === currentPath ||
      (currentPath === '' && linkPath === 'index.html')
    ) {
      link.classList.add('active');
    }
  });
}

function openContactformPopup() {
  const formPopup = document.querySelector('.form-popup-wrapper');
  const openFormBtn = document.querySelector('.open-form-btn');
  const closeFormBtn = document.querySelector('.close-form-btn');

  openFormBtn.addEventListener('click', () => {
    formPopup.classList.add('show');
    document.body.classList.add('lock');
  });

  closeFormBtn.addEventListener('click', () => {
    formPopup.classList.remove('show');
    document.body.classList.remove('lock');
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && formPopup.classList.contains('show')) {
      formPopup.classList.remove('show');
      document.body.classList.remove('lock');
    }
  });
}
