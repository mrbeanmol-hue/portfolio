const gallery = document.querySelector(".gallery-grid");
const galleryItems = document.querySelectorAll(".gallery-item");
function resizeGalleryItem(item) {

    if (item.hidden) {
        item.style.gridRowEnd = "auto";
        return;
    }

    // Clears the previous calculated size.
    item.style.gridRowEnd = "auto";

    // Measures the photograph.
    const itemHeight = item.getBoundingClientRect().height;

    // Matches the 18px space between the columns.
    const verticalGap = 18;

    // Adds exactly one small grid row per pixel.
    const rowSpan = Math.ceil(itemHeight + verticalGap);

    item.style.gridRowEnd = `span ${rowSpan}`;
}
function resizeGallery() {
    galleryItems.forEach(function (item) {
        resizeGalleryItem(item);
    });
}
galleryItems.forEach(function (item) {
    const image = item.querySelector("img");

    if (image.complete) {
        resizeGalleryItem(item);
    } else {
        image.addEventListener("load", function () {
            resizeGalleryItem(item);
        });
    }
});
window.addEventListener("resize", resizeGallery);
resizeGallery();

const galleryFilterButtons =
    document.querySelectorAll(".gallery-filter");

galleryFilterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const selectedFilter = button.dataset.filter;

        galleryItems.forEach(function (item) {


            const itemTags = (
                item.dataset.tags || ""
            ).split(" ");


            if (
                selectedFilter === "all" ||
                itemTags.includes(selectedFilter)
            ) {
                item.hidden = false;
            } else {
                item.hidden = true;
            }
        });


        galleryFilterButtons.forEach(function (filterButton) {
            filterButton.classList.remove("active-filter");
        });

        button.classList.add("active-filter");
        requestAnimationFrame(function () {
            resizeGallery();
        });
    });
});
const lightbox = document.querySelector("#lightbox");
const lightboxImage = document.querySelector("#lightbox-image");
const lightboxClose = document.querySelector("#lightbox-close");
const lightboxPrevious = document.querySelector("#lightbox-previous");
const lightboxNext = document.querySelector("#lightbox-next");

let lightboxImages = [];
let currentLightboxIndex = 0;
function getVisibleGalleryImages() {
    const allGalleryImages =
        document.querySelectorAll(".gallery-item img");

    return Array.from(allGalleryImages).filter(function (image) {
        const galleryItem = image.closest(".gallery-item");

        return galleryItem && !galleryItem.hidden;
    });
}
function updateLightboxImage() {
    const selectedImage = lightboxImages[currentLightboxIndex];

    if (!selectedImage) {
        return;
    }

    lightboxImage.src = selectedImage.src;
    lightboxImage.alt = selectedImage.alt;
}
function openLightbox(clickedImage) {
    lightboxImages = getVisibleGalleryImages();

    currentLightboxIndex =
        lightboxImages.indexOf(clickedImage);

    updateLightboxImage();

    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");

    document.body.classList.add("lightbox-open");
}
function closeLightbox() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");

    document.body.classList.remove("lightbox-open");
}
function showPreviousImage() {
    currentLightboxIndex--;

    if (currentLightboxIndex < 0) {
        currentLightboxIndex =
            lightboxImages.length - 1;
    }

    updateLightboxImage();
}
function showNextImage() {
    currentLightboxIndex++;

    if (
        currentLightboxIndex >=
        lightboxImages.length
    ) {
        currentLightboxIndex = 0;
    }

    updateLightboxImage();
}
galleryItems.forEach(function (item) {
    const image = item.querySelector("img");

    image.addEventListener("click", function () {
        openLightbox(image);
    });
});
lightboxClose.addEventListener("click", closeLightbox);
lightboxPrevious.addEventListener("click", showPreviousImage);
lightboxNext.addEventListener("click", showNextImage);
lightbox.addEventListener("click", function (event) {
    if (event.target === lightbox) {
        closeLightbox();
    }
});
document.addEventListener("keydown", function (event) {

    if (!lightbox.classList.contains("is-open")) {
        return;
    }

    if (event.key === "Escape") {
        closeLightbox();
    }

    if (event.key === "ArrowLeft") {
        showPreviousImage();
    }

    if (event.key === "ArrowRight") {
        showNextImage();
    }
});