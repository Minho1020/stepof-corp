const swiper = new Swiper('.swiper', {
    loop: false,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    slidesPerView: "auto",
    spaceBetween: 100,
    speed: 300,
});