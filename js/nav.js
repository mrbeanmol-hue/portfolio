let currentPage = window.location.pathname.split("/").pop();

if (currentPage === "") {
    currentPage = "index.html";
}

const navigationLinks = document.querySelectorAll(".site-navigation a");
navigationLinks.forEach(function (link) {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
        link.classList.add("active-page");
    }
});