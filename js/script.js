
const photos = [
    {
        src: "images/photos/photo-1.jpg",
        alt: "number one"
    },
    {
        src: "images/photos/photo-2.jpg",
        alt: "number two"
    },
    {
        src: "images/photos/photo-3.jpg",
        alt: "number three"
    },
    {
        src: "images/photos/photo-4.jpg",
        alt: "number four"
    },
    {
        src: "images/photos/photo-5.jpg",
        alt: "number five"
    },
    {
        src: "images/photos/photo-6.jpg",
        alt: "number six"
    }
];

photos.forEach(function (photo) {
    const image = new Image();
    image.src = photo.src;
});

const homepagePhoto = document.querySelector("#homepage-photo");

let currentPhotoIndex = 0;
let autoPlayTimer;
let autoPlayStopped = false;
let touchStartX = 0;
let ignoreNextClick = false;
let photoChangeNumber = 0;

async function showCurrentPhoto() {

    const thisChange = ++photoChangeNumber;

    homepagePhoto.classList.add("photo-changing");

    // Wait for fade-out.
    await new Promise(function (resolve) {
        setTimeout(resolve, 120);
    });

    const nextPhoto = photos[currentPhotoIndex];

    const loadedImage = new Image();
    loadedImage.src = nextPhoto.src;

    try {
        await loadedImage.decode();
    } catch {

    }

    if (thisChange !== photoChangeNumber) {
        return;
    }

    homepagePhoto.src = nextPhoto.src;
    homepagePhoto.alt = nextPhoto.alt;

    requestAnimationFrame(function () {
        requestAnimationFrame(function () {
            homepagePhoto.classList.remove("photo-changing");
        });
    });
}
function showPreviousPhoto() {
    currentPhotoIndex = currentPhotoIndex - 1;

    if (currentPhotoIndex < 0) {
        currentPhotoIndex = photos.length - 1;
    }

    showCurrentPhoto();
}
function startAutoPlay() {
    autoPlayTimer = setInterval(function () {
        showNextPhoto();
    }, 6000);
}
function stopAutoPlay() {
    if (autoPlayStopped) {
        return;
    }

    autoPlayStopped = true;
    clearInterval(autoPlayTimer);
}
function showNextPhoto() {
    currentPhotoIndex = currentPhotoIndex + 1;

    if (currentPhotoIndex >= photos.length) {
        currentPhotoIndex = 0;
    }

    showCurrentPhoto();
}
document.addEventListener("click", function (event) {
    if (ignoreNextClick) {
        ignoreNextClick = false;
        return;
    }

    const interactiveElement = event.target.closest(
        "a, button, input, textarea, select, label"
    );

    if (interactiveElement) {
        return;
    }

    stopAutoPlay();

    const middleOfPage = window.innerWidth / 2;

    if (event.clientX < middleOfPage) {
        showPreviousPhoto();
    } else {
        showNextPhoto();
    }
});


document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
        stopAutoPlay();
        showPreviousPhoto();
    }

    if (event.key === "ArrowRight") {
        stopAutoPlay();
        showNextPhoto();
    }
});
document.addEventListener("touchstart", function (event) {
    touchStartX = event.changedTouches[0].clientX;
});
document.addEventListener("touchend", function (event) {
    const touchEndX = event.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX;
    if (Math.abs(swipeDistance) < 50) {
        return;
    }

    stopAutoPlay();
    ignoreNextClick = true;

    if (swipeDistance < 0) {
        showNextPhoto();
    } else {
        showPreviousPhoto();
    }
});

startAutoPlay();

