// Импорт исходного массива

import images from './gallery-items.js';

// Ссылки

const galleryContainer = document.querySelector('.js-gallery');
const modal = document.querySelector('.js-lightbox');
const modalImage = document.querySelector('.lightbox__image');
const modalBtn = document.querySelector('[data-action="close-lightbox"]');
const overlay = document.querySelector('.lightbox__overlay');

galleryContainer.addEventListener('click', openModal);

galleryContainer.insertAdjacentHTML('beforeend', createGalleryMarkup(images));

// Создание и рендер разметки по массиву данных и предоставленному шаблону.

function createGalleryMarkup(images) {
  return images
    .map(({ original, preview, description }) => {
      return `
      <li class="gallery__item">
        <a
          class="gallery__link"
          href="${original}"
        >
          <img
            class="gallery__image"
            src="${preview}"
            data-source="${original}"
            alt="${description}"
          />
        </a>
      </li>
        `;
    })
    .join('');
}

// Реализация делегирования на галерее ul.js - gallery и получение url большого изображения.
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image

function openModal(event) {
  event.preventDefault();
  if (event.target === event.currentTarget) {
    return;
  }
  window.addEventListener('keydown', onEscKeyPress);

  modalImage.src = event.target.dataset.source;
  modalImage.alt = event.target.alt;
  modal.classList.add('is-open');
  modalBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', onOverlayClick);
  window.addEventListener('keydown', openNextImg);
  // window.addEventListener('keyup', moveRight);
  // window.addEventListener('keyup', moveLeft);
}

// Закрытие модального окна по клику на кнопку button[data - action= "close-lightbox"].
// Очистка значения атрибута src элемента img.lightbox__image.

function closeModal() {
  modal.classList.remove('is-open');
  modalImage.src = '';

  window.removeEventListener('keydown', onEscKeyPress);
  modalBtn.removeEventListener('click', closeModal);
  overlay.removeEventListener('click', onOverlayClick);
  window.removeEventListener('keydown', openNextImg);
  // window.removeEventListener('keyup', moveRight);
  // window.removeEventListener('keyup', moveLeft);
}

// Закрытие модального окна по клику на div.lightbox__overlay.

function onOverlayClick(event) {
  if (event.target === event.currentTarget) {
    closeModal();
  }
}

// Закрытие модального окна по нажатию клавиши ESC.

function onEscKeyPress(event) {
  if (event.code === 'Escape') {
    closeModal();
  }
}

// Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".

function openNextImg(event) {
  let i = images.findIndex(item => item.original === modalImage.src);

  if (event.code === 'ArrowLeft') {
    if (i === 0) {
      return closeModal();
    }
    i -= 1;
  }

  if (event.code === 'ArrowRight') {
    if (i === images.length - 1) {
      return closeModal();
    }
    i += 1;
  }

  modalImage.src = images[i].original;
  modalImage.alt = images[i].description;
}
