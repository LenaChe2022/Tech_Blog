document.addEventListener("DOMContentLoaded", () => {
    //find all elements with class navbar-burger
    const $navbarBurgers = Array.prototype.slice.call(
        document.querySelectorAll(".navbar-burger"),
        0
    );
    // add click-event to each element
    $navbarBurgers.forEach((el) => {
       el.addEventListener("click", () => {
        const target = el.dataset.target;
        const $target = document.getElementById(target);

     // toggle class "is-active" on both the navbar-burger and navbar-menu
        el.classList.toggle("is-active");
        $target.classList.toggle("is-active");   
    });
});
});