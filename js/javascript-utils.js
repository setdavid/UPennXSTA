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
    var fadePopouts = document.getElementsByClassName("fade-in-popout");

    for (var i = 0; i < fadeLefts.length; i++) {
        jsUtils.canFade.add(fadeLefts[i]);
    }

    for (var j = 0; j < fadeRights.length; j++) {
        jsUtils.canFade.add(fadeRights[j]);
    }

    for (var l = 0; l < fadeUps.length; l++) {
        jsUtils.canFade.add(fadeUps[l]);
    }

    for (var k = 0; k < fadePopouts.length; k++) {
        jsUtils.canFade.add(fadePopouts[k]);
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
            // console.log(jsUtils.canFade.size);
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
        if (!elem.classList.contains("fade-in-show")) {
            var clientRect = elem.getBoundingClientRect();
            var elemTop = clientRect.top;
            var elemBottom = clientRect.bottom;
            var navbarBottom = document.querySelector(".navbar").getBoundingClientRect().bottom;
            var elem50Height = elemTop + (0.5 * clientRect.height);

            //    console.log("top: " + elemTop);
            //    console.log("bottom: " + elemBottom);

            var isVisible = (elemTop >= navbarBottom && elemTop <= window.innerHeight) || (elemBottom >= navbarBottom && elemBottom <= window.innerHeight) ||
                (navbarBottom >= elemTop && navbarBottom <= elemBottom) || (window.innerHeight >= elemTop && window.innerHeight <= elemBottom);
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