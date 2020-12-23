document.addEventListener("DOMContentLoaded", function () {

    var hashLocationOnReady = window.location.hash;
    console.log("onready: " + hashLocationOnReady.length);
    if (hashLocationOnReady.length === 0) {
        window.location.hash = "#home"
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
        var page = (hashLocation.slice(1)).replace(/[/]/g, "-");
        console.log("-----------HashLocation: " + hashLocation);
        console.log("Page: " + page);
        return page;
    }

    function navTo(page) {
        jsUtils.closeSlider();

        console.log("NAVTO PAGE: " + page);

        var requestUrlHTML = "pages/page-" + page + ".html";
        fetch(requestUrlHTML)
            .then((response) => {
                if (response.ok) {
                    console.log("Status - HTML true: " + page);
                    return response.text();
                } else {
                    console.log("Status - HTML failed: " + page);
                    navTo("error404");
                    return "";
                }
            }).then(text => {
                document.querySelector("#main-content").innerHTML = text;
                jsUtils.refresh();
            }).
            catch((error) => {
                console.log("Status - JS failed: " + error);
                scriptChange("js/page-error404.js");
            });

        window.scrollTo(0, 0);

        var requestUrlCSS = "css/page-" + page + ".css";
        fetch(requestUrlCSS)
            .then((response) => {
                if (response.ok) {
                    console.log("Status - CSS true: " + page);
                    cssChange(requestUrlCSS);
                } else {
                    console.log("Status - CSS failed: " + page);
                    cssChange("css/page-error404.css");
                }
            }).
            catch((error) => {
                console.log("Status - JS failed: " + error);
                scriptChange("js/page-error404.js");
            });

        var requestUrlJS = "js/page-" + page + ".js";
        fetch(requestUrlJS)
            .then((response) => {
                if (response.ok) {
                    console.log("Status - JS true: " + page);
                    scriptChange(requestUrlJS);
                } else {
                    console.log("Status - JS failed: " + page);
                    scriptChange("js/page-error404.js");
                }
            }).
            catch((error) => {
                console.log("Status - JS failed: " + error);
                scriptChange("js/page-error404.js");
            });
    }

    function scriptChange(requestUrl) {
        $("script[src*='page']").remove();
        var newScript = document.createElement("script");
        newScript.src = requestUrl;
        document.body.appendChild(newScript);
    }

    function cssChange(requestUrl) {
        $("head > link:last").remove();
        $("head").append("<link rel='stylesheet' href='" + requestUrl + "'>");
    }
});