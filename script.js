const { gsap } = window;

gsap.timeline().set("menu", {autoAlpha: 1}).from(".menu__item-innerText", {
    delay: 1,
    duration: 0.85,
    xPercent: 25,
    yPercent: 125,
    stagger: 0.095,
    skewY: gsap.utils.wrap([-8, 8]),
    ease: "expo.out"
}).set(".menu", {pointerEvents: "all"});

gsap.defaults({
    duration: 0.55,
    ease: "expo.out"
});

const menuItems = document.querySelectorAll(".menu__item");

menuItems.forEach(element => {
    const imageWrapper = element.querySelector(".menu__item-image-wrapper");
    const imageWrapperBounds = imageWrapper.getBoundingClientRect();
    let itemBounds = element.getBoundingClientRect();

    const onMouseEnter = () => {
        gsap.set(imageWrapper, {
            scale: 0.8,
            xPercent: 25,
            yPercent: 50,
            rotation: -15
        });
        gsap.to(imageWrapper, {opacity: 1, scale: 1, yPercent: 0, xPercent: 0})
    }

    const onMouseLeave = () => {
        gsap.to(imageWrapper, {
            opacity: 0,
            scale: 0.8,
            xPercent: 25,
            yPercent: -50,
            rotation: -15
        });
    }


    const onMouseMove = ({x, y}) => {
        let yOffset = itemBounds.top / imageWrapperBounds.height;
        yOffset = gsap.utils.mapRange(0, 1.5, -150, 150, yOffset)
        gsap.to(imageWrapper, {
            duration: 1.25,
            x: Math.abs(x - itemBounds.left) - imageWrapperBounds.width / 1.55,
            y: Math.abs(y - itemBounds.top) - imageWrapperBounds.height / 2 - yOffset
        })
    }

    element.addEventListener("mouseenter", onMouseEnter)
    element.addEventListener("mouseleave", onMouseLeave)
    element.addEventListener("mousemove", onMouseMove)

    window.addEventListener("resize", () => {
        itemBounds = element.getBoundingClientRect();
    })
});