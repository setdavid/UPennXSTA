(function (global) {
    var pageHome = {};
    pageHome.runScript = true;
    runSlideshowJumbotron();
    global.pageHome = pageHome;

    var executeOnce = {
        once: true
    };
    window.addEventListener("hashchange", function () {
        pageHome.runScript = false;
    }, executeOnce);

    function runSlideshowJumbotron() {
        var collageImageURLs = new Array(
            "img/group_picture2.jpg",
            "img/group_meeting1.jpg",
            "img/group_picture3.jpg",
            "img/group_meeting2.jpg"
        );

        var numImages = collageImageURLs.length;

        var baseZIndex = 50;
        var duration = 5000; //in milliseconds
        var transitionDuration = 1000;

        for (var i = 0; i <= numImages; i++) {
            if (i >= numImages) {
                $(".slideshow-jumbotron-collage").append("<div id='slideshow-jumbotron-image-" + i + "' style='background-image: url(" + collageImageURLs[0] + "); z-index: " + (50 - i) + "'></div>");
            } else {
                $(".slideshow-jumbotron-collage").append("<div id='slideshow-jumbotron-image-" + i + "' style='background-image: url(" + collageImageURLs[i] + "); z-index: " + (50 - i) + "'></div>");
            }
        }

        $(".slideshow-jumbotron-collage > div").css("transition-duration", (transitionDuration / 1000) + "s");

        var index = 0;
        jumbotronAnimation(index, duration, transitionDuration, numImages);
    }

    function jumbotronAnimation(index, duration, transitionDuration, numImages) {
        if (!pageHome.runScript) {
            return;
        } else {
            // console.log("index: " + index);
            window.setTimeout(function () {
                $("#slideshow-jumbotron-image-" + index).css("opacity", "0");
                window.setTimeout(function () {
                    if (index + 1 >= numImages) {
                        index = -1;
                        $("#slideshow-jumbotron-image-" + 0).css("opacity", "1");
                        window.setTimeout(function () {
                            $(".slideshow-jumbotron-collage > div").css("opacity", "1");
                        }, 1000);
                    }
                    jumbotronAnimation(index + 1, duration, transitionDuration, numImages);
                }, transitionDuration);
            }, duration);
        }
    }

    //function setJumbotronHeight() {
    //    var windowHeight = $(window).height();
    //    var navBarHeight = $(".navbar").height();
    //    var jumbotronHeight = windowHeight - navBarHeight;
    //    console.log(jumbotronHeight);
    //    $(".jumbotron").height(jumbotronHeight);
    //    //    $("body").
    //}
})(window);