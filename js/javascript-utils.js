(function (global) {
    var jsUtils = {};
    jsUtils.refresh = function () {
        $("script[src*='javascript-utils.js']").remove();
        var newScript = document.createElement("script");
        newScript.src = "js/javascript-utils.js";
        document.body.appendChild(newScript);

        console.log("refreshed!");
    };

    jsUtils.closeSlider = function () {
        if ($(".nav-slider").hasClass("nav-slider-show") && $("body").hasClass("body-no-scroll")) {
            $(".nav-slider").toggleClass("nav-slider-show");
            $("body").toggleClass("body-no-scroll");
        }
    };

    jsUtils.navBarChangeColors = function () {
        navBarChangeColors();
    };

    jsUtils.scrollTo = function (id) {
        let elem = document.querySelector(id);
        if (elem != null) {
            // let topTarget = elem.getBoundingClientRect().top;
            let targetLocation = elem.getBoundingClientRect().top -
                document.querySelector("#main-content").getBoundingClientRect().top -
                document.querySelector(".navbar").getBoundingClientRect().bottom;
            // console.log("topTarget: " + topTarget);
            // console.log("Main content: " + document.querySelector("#main-content").getBoundingClientRect().top);
            window.scrollTo({
                top: targetLocation,
                left: 0,
                behavior: "smooth"
            });
        }
    }

    global.jsUtils = jsUtils;

    function navBarChangeColors() {
        if (document.querySelector(".jumbotron-frame").getBoundingClientRect().bottom >= document.querySelector(".navbar").getBoundingClientRect().bottom) {
            if (!$(".navbar").hasClass("navbar-transparent")) {
                $(".navbar").toggleClass("navbar-transparent");
                $(".navbar-brand-container").toggleClass("navbar-item-transparent");
                $(".navTo-group > div").toggleClass("navbar-item-transparent");
                $(".navbar .custom-toggler.navbar-toggler").toggleClass("navbar-item-transparent");
                $(".navbar .custom-toggler .navbar-toggler-icon").toggleClass("navbar-toggler-icon-transparent");
                $(".navbar .dropdown-menu").toggleClass("navbar-dropdown-transparent");
                $(".navbar .dropdown-menu .dropdown-item").toggleClass("navbar-dropdown-item-transparent");
            }
        } else {
            if ($(".navbar").hasClass("navbar-transparent")) {
                $(".navbar").toggleClass("navbar-transparent");
                $(".navbar-brand-container").toggleClass("navbar-item-transparent");
                $(".navTo-group > div").toggleClass("navbar-item-transparent");
                $(".navbar .custom-toggler.navbar-toggler").toggleClass("navbar-item-transparent");
                $(".navbar .custom-toggler .navbar-toggler-icon").toggleClass("navbar-toggler-icon-transparent");
                $(".navbar .dropdown-menu").toggleClass("navbar-dropdown-transparent");
                $(".navbar .dropdown-menu .dropdown-item").toggleClass("navbar-dropdown-item-transparent");
            }
        }
    }

    // console.log($(".jumbotron-frame").length);
    if ($(".jumbotron-frame").length) {
        jsUtils.navBarChangeColors();
    }

    $(".navbar-toggler").off();
    $(".navbar-toggler").on("click", toggleNavSlider);

    jsUtils.canFade = new Set();

    var fadeLefts = document.getElementsByClassName("fade-in-left");
    var fadeRights = document.getElementsByClassName("fade-in-right");
    var fadeUps = document.getElementsByClassName("fade-in-up");
    var fadeDowns = document.getElementsByClassName("fade-in-down");
    var fadePopouts = document.getElementsByClassName("fade-in-popout");

    for (let i = 0; i < fadeLefts.length; i++) {
        jsUtils.canFade.add(fadeLefts[i]);
    }

    for (let i = 0; i < fadeRights.length; i++) {
        jsUtils.canFade.add(fadeRights[i]);
    }

    for (let i = 0; i < fadeUps.length; i++) {
        jsUtils.canFade.add(fadeUps[i]);
    }

    for (let i = 0; i < fadeDowns.length; i++) {
        jsUtils.canFade.add(fadeDowns[i]);
    }

    for (let i = 0; i < fadePopouts.length; i++) {
        jsUtils.canFade.add(fadePopouts[i]);
    }

    $(window).off();
    $(window).on("scroll", function () {
        if ($(".jumbotron-frame").length) {
            jsUtils.navBarChangeColors();
        }

        var fadePassNavbarVars = document.getElementsByClassName("fadePassNavbar");

        for (var m = 0; m < fadePassNavbarVars.length; m++) {
            fadePassNavbar(fadePassNavbarVars[m]);
        }

        for (let elem of jsUtils.canFade) {
            console.log(jsUtils.canFade.size);
            fadeIn(elem);
        }
    });

    function toggleNavSlider() {
        $(".nav-slider").toggleClass("nav-slider-show");
        if ($(".nav-slider").hasClass("nav-slider-show") && !$("body").hasClass("body-no-scroll")) {
            $("body").toggleClass("body-no-scroll");
        }

        else if (!$(".nav-slider").hasClass("nav-slider-show") && $("body").hasClass("body-no-scroll")) {
            $("body").toggleClass("body-no-scroll");
        }
    }

    function fadeIn(elem) {
        let portionElemVisible = 0.70;

        if (!elem.classList.contains("fade-in-show")) {
            var clientRect = elem.getBoundingClientRect();
            var elemTop = clientRect.top;
            // var elemBottom = clientRect.bottom;
            var navbarBottom = document.querySelector(".navbar").getBoundingClientRect().bottom;
            var elem50Height = elemTop + (portionElemVisible * clientRect.height);

            //    console.log("top: " + elemTop);
            //    console.log("bottom: " + elemBottom);

            // var isVisible = (elemTop >= navbarBottom && elemTop <= window.innerHeight) || (elemBottom >= navbarBottom && elemBottom <= window.innerHeight) ||
            //     (navbarBottom >= elemTop && navbarBottom <= elemBottom) || (window.innerHeight >= elemTop && window.innerHeight <= elemBottom);

            var executeFade = elem50Height >= navbarBottom && elem50Height <= window.innerHeight;

            if (executeFade) {
                elem.classList.toggle("fade-in-show");
                jsUtils.canFade.delete(elem);
            }

            // else if (!isVisible && elem.classList.contains("fade-in-show")) {
            //     elem.classList.toggle("fade-in-show");
            // }
        }
    }

    function fadePassNavbar(elem) {
        var navbarBottom = document.querySelector(".navbar").getBoundingClientRect().bottom;
        var elemTop = elem.getBoundingClientRect().top;
        var elemBottom = elem.getBoundingClientRect().bottom;
        if ((elemTop <= navbarBottom) && (elemBottom >= navbarBottom)) {
            var elemHeight = elem.getBoundingClientRect().height;
            var difference = elemBottom - navbarBottom;
            var opacityVal = difference / elemHeight;
            elem.style.opacity = opacityVal;
        } else {
            if (elemTop > navbarBottom) {
                elem.style.opacity = 1;
            } else {
                elem.style.opacity = 0;
            }
        }
    }
})(window);

// // document.addEventListener("DOMContentLoaded", function () {
//     console.log("complete dom");
// });