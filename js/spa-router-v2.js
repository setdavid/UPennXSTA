document.addEventListener("DOMContentLoaded", function () {

    var hashLocationOnReady = window.location.hash;
    console.log("onready: " + hashLocationOnReady.length);
    if (hashLocationOnReady.length === 0) {
        window.location.hash = "#/home";
    } else {
        var pageOnReady = hashToPage(window.location.hash);
        navTo(pageOnReady);
    }

    window.addEventListener("hashchange", function () {
        var page = hashToPage(window.location.hash);
        console.log("hashchange");
        navTo(page);
    });

    function hashToPage(hashLocation) {
        var page = (hashLocation.slice(2)).replace(/[/]/g, "-");
        console.log("-----------HashLocation: " + hashLocation);
        console.log("Page: " + page);
        return page;
    }

    function navTo(page) {
        jsUtils.closeSlider();

        console.log("NAVTO PAGE: " + page);

        var requestUrlHTML = "pages/" + page + ".html";
        fetch(requestUrlHTML)
            .then((response) => {
                if (response.ok) {
                    console.log("Status - HTML true: " + page);
                    return response.text();
                } else {
                    console.log("Status - HTML failed: " + page);
                    return "navTo(error404)";
                }
            }).then((text) => {
                if (text != "navTo(error404)") {
                    document.querySelector("#main-content").innerHTML = text;

                    var requestUrlCSS = "css/null.css";
                    var requestUrlJS = "js/null.js";

                    console.log("resultCSS: " + ((text.indexOf("<style>") != -1) && (text.indexOf("</style>") != -1)));
                    console.log("resultJS: " + ((text.indexOf("<script>") != -1) && (text.indexOf("</script>") != -1)));

                    if ((text.indexOf("<style>") != -1) && (text.indexOf("</style>") != -1)) {
                        requestUrlCSS = "css/" + page + ".css";
                    }

                    if ((text.indexOf("<script>") != -1) && (text.indexOf("</script>") != -1)) {
                        requestUrlJS = "js/" + page + ".js";
                    }

                    fetch(requestUrlCSS)
                        .then((response) => {
                            if (response.ok) {
                                console.log("Status - CSS true: " + requestUrlCSS);
                                cssChange(requestUrlCSS);
                            } else {
                                console.log("Status - CSS failed: " + page);
                                cssChange("css/null.css");
                            }
                        }).
                        catch((error) => { });

                    fetch(requestUrlJS)
                        .then((response) => {
                            if (response.ok) {
                                console.log("Status - JS true: " + requestUrlJS);
                                scriptChange(requestUrlJS);
                            } else {
                                console.log("Status - JS failed: " + page);
                                scriptChange("js/null.js");
                            }
                        }).
                        catch((error) => { });
                } else {
                    navTo("error404");
                }
            }).
            catch((error) => {
                // console.log("Status - CSS caught error: " + page);
                // cssChange("css/error404.css");
                // console.log("Status - JS caught error: " + error);
                // scriptChange("js/null.js");
            });

        window.scrollTo(0, 0);
    }

    function scriptChange(requestUrl) {
        jsUtils.refresh();

        // $("script[src*='page']").remove();
        $("body > script:nth-last-child(2)").remove();
        var newScript = document.createElement("script");
        newScript.src = requestUrl;
        document.body.appendChild(newScript);
    }

    function cssChange(requestUrl) {
        $("head > link:last").remove();
        $("head").append("<link rel='stylesheet' href='" + requestUrl + "'>");
    }
});