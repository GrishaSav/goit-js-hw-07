import { galleryItems } from "./gallery-items.js";
// Change code below this line

const galleryList = document.querySelector(".gallery");
const galleryMarkup = createGalleryItemsMarkup(galleryItems);

galleryList.insertAdjacentHTML("beforeend", galleryMarkup);

function createGalleryItemsMarkup(galleryItems) {
  return galleryItems
    .map(({ preview, original, description }) => {
      return `
        <li class="gallery__item">
        <a class="gallery__link" href="${original}">
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
    .join("");
}

galleryList.addEventListener("click", onImgClick);

function onImgClick(evt) {
  evt.preventDefault();

  if (evt.target.nodeName !== "IMG") {
    return;
  }

  const modal = basicLightbox.create(
    `<img src="${evt.target.dataset.source}" width="800" height="600">`,
    {
      onShow: () => window.addEventListener("keydown", onEscKeyPress),
      onClose: () => window.removeEventListener("keydown", onEscKeyPress),
    }
  );

  modal.show();

  function onEscKeyPress(evt) {
    if (evt.code === "Escape") {
      modal.close();
    }
  }
}
