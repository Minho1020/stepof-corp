$(document).ready(function() {
    const swiper = new Swiper('.swiper', {
        loop: false,
        slidesPerView: "auto",
        autoplay: {
            delay: 4500,
            disableOnInteraction: false,
        },
        spaceBetween: 30,
        speed: 600,
    });
    
    const edit_btn = document.querySelector(".edit-btn"),
        delete_btn = document.querySelector(".delete-btn"),
        search = document.querySelector("#searching"),
        search_btn = document.querySelector("#searching-btn"),
        reset_btn = document.querySelector("#reset-btn"),
        option_btn = document.querySelector("#option-btn");
    
    edit_btn.addEventListener("click", newsEdit);
    delete_btn.addEventListener("click", newsDelete);
    reset_btn.addEventListener("click", search_reset);
    search_btn.addEventListener("click", newsSearch);
    option_btn.addEventListener("click", optionBanner);
    $("#searching").on("propertychange change keyup paste input", onchange_search);


    function onchange_search() {
        var search_input = $(this).val();
        if(search_input.length >= 1) {
            reset_btn.style.display = "flex";
        } else {
            reset_btn.style.display = "none";
        };
    };
    function search_reset() {
        search.value = "";
        reset_btn.style.display = "none";
    };
    function optionBanner() {
        if($("#option-box").hasClass("unclicked")) {
            $("#option-box").attr("class","clicked");
            $("#option-group").css("display","block");
        } else {
            $("#option-box").attr("class","unclicked");
        }
    }

    function newsSearch() {

    }
    
    function popup() {
    
    };
    
    function newsEdit() {

    };
    
    function newsDelete() {
    
    };
})