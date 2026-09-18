const currentPath = window.location.pathname.toLowerCase();

const navigationLinks = document.querySelectorAll(".site-navigation a");

navigationLinks.forEach(function (link) {
    link.classList.remove("active-page");
});


if (currentPath.includes("/gallery/")) {
    document
        .querySelector('a[href*="gallery/"]')
        .classList.add("active-page");
}


else if (currentPath.includes("/about/")) {
    document
        .querySelector('a[href*="about/"]')
        .classList.add("active-page");
}


else if (currentPath.includes("/contact/")) {
    document
        .querySelector('a[href*="contact/"]')
        .classList.add("active-page");
}

else {
    const homeLink = document.querySelector(".site-navigation a");

    if (homeLink) {
        homeLink.classList.add("active-page");
    }
}