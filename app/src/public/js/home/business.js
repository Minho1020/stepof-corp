$(document).ready(function() {
    $(window).scrollTop()
    const header = document.querySelector("header");

    const headers = document.querySelectorAll(".section-header");

    function scrollShowHeader() {
        for (const element of headers) {
            if (!element.classList.contains('show')) {
                if (window.innerHeight > element.parentElement.getBoundingClientRect().top) {
                    element.classList.add('show');
                }
            } 
            else {
                if (window.innerHeight < element.parentElement.getBoundingClientRect().top + scrollMargin) {
                    element.classList.remove('show');
                    }
            }
        }
    }    

    var targetList = document.querySelector("#targetList"),
        target = document.querySelectorAll('.targetText'),
        targetImage = document.querySelectorAll(".logo-img"),
        currentIdx = 0,
        targetCount = target.length;

    makeClone()
    
    function makeClone() {
        for(var i = 0; i < targetCount; i++) {
            var cloneTarget = target[i].cloneNode(true);
            cloneTarget.classList.add("clone");
            targetList.appendChild(cloneTarget);
        }
        for(var i = targetCount - 1; i >= 0; i--) {
            var cloneTarget = target[i].cloneNode(true);
            cloneTarget.classList.add("clone");
            targetList.prepend(cloneTarget);
        }
        updateHeight();
        setInitialPos();
        setTimeout(function() {
            targetList.classList.add("animated");
        }, 100);
        target[0].classList.add("targetSelected")
        targetImage[0].classList.add("show");
    }

    function updateHeight() {
        var currentTargets = document.querySelectorAll('.targetText');
        var newTargetCount= currentTargets.length;

        var newHeight = target[0].offsetHeight*newTargetCount + "px";
        targetList.style.height = newHeight;
    }

    function setInitialPos() {
        var initialTranslateValue = - target[0].offsetHeight*targetCount + 'px';
        targetList.style.transform = `translateY(${initialTranslateValue})`
        
    }
    setInterval(() => moveTarget(currentIdx + 1), 2000)

    function moveTarget(num) {
        targetList.style.top = -num * target[0].offsetHeight + "px";
        currentIdx = num;

        if(currentIdx == targetCount) {

            setTimeout(function() {
                targetList.classList.remove("animated");
                targetList.style.top = '0px';
                currentIdx = 0;
                target[num - 1].classList.remove("targetSelected")
                target[0].classList.add("targetSelected");
                targetImage[num - 1].classList.remove("show");
                targetImage[0].classList.add("show");
            }, 300);
            setTimeout(function() {
                targetList.classList.add("animated");

            }, 400);
        } else {
            target[num - 1].classList.remove("targetSelected")
            target[num].classList.add("targetSelected");
            targetImage[num -  1].classList.remove("show");
            targetImage[num].classList.add("show");
        }
    }


    

    const item = document.querySelectorAll(".animateOnScroll"),
        scrollMargin = 80;

    const scrollShow = function() {
        scrollShowText();
    }   

    
    function scrollShowText() {
        for (const element of item) {
            if (!element.classList.contains('show')) {
                if (window.innerHeight > element.getBoundingClientRect().top + scrollMargin) {
                element.classList.add('show');
                }
            } 
            // else {
            //     if (window.innerHeight < element.getBoundingClientRect().top + scrollMargin) {
            //         element.classList.remove('show');
            //         }
            // }
        }
    }
    scrollShow();
    window.addEventListener('load', scrollShow);
    window.addEventListener('scroll', scrollShow);
});