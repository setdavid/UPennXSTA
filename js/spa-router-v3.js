document.addEventListener("DOMContentLoaded", function () {

    let pathsJSON = null;
    fetch("paths.json")
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                return null;
            }
        }).then((json) => {
            console.log(json != null);
            if (json != null) {
                pathsJSON = json;

                // console.log("#/home/test1/test2/test3: " + pathExists(pathToArr(pageToPath("#/home/test1/test2/test3"))));
                // console.log("#/home/test2: " + pathExists(pathToArr(pageToPath("#/home/test2"))));
                // console.log("#/home: " + pathExists(pathToArr(pageToPath("#/home"))));

                window.addEventListener("hashchange", function () {
                    navTo(window.location.hash);
                });

                var hashLocationOnReady = window.location.hash;
                console.log("onready: " + hashLocationOnReady.length);
                if (hashLocationOnReady.length === 0) {
                    window.location.hash = "#/home";
                } else {
                    navTo(window.location.hash);
                }
            }
        }).catch((error) => { });

    let pageToPath = function (page) {
        return page.slice(2);
    }

    let pathToArr = function (path) {
        return path.split("/");
    }

    let pathArrToTarget = function (pathArr) {
        // console.log("-----------HashLocation: " + hashLocation);
        // console.log("Page: " + page);

        let pathTarget = null;

        if (pathArr[0] in pathsJSON) {
            pathTarget = pathsJSON[pathArr[0]];

            for (let i = 1; i < pathArr.length && pathTarget != null; i++) {
                if (pathArr[i] in pathTarget) {
                    pathTarget = pathTarget[pathArr[i]];
                } else {
                    pathTarget = null;
                }
            }
        }

        return pathTarget;
    }

    function navTo(page) {
        let path = pageToPath(page);
        let target = pathArrToTarget(pathToArr(path));

        if (target != null) {
            jsUtils.closeSlider();

            console.log("NAVTO PAGE: " + path);

            fetch("pages/" + path + ".html")
                .then((response) => {
                    if (response.ok) {
                        console.log("Status - HTML true: " + path);
                        return response.text();
                    } else {
                        console.log("Status - HTML failed: " + path);
                        return "navTo(#/error404)";
                    }
                }).then((text) => {
                    if (text != "navTo(#/error404)") {
                        document.querySelector("#main-content").innerHTML = text;

                        var requestUrlCSS = "css/null.css";
                        var requestUrlJS = "js/null.js";

                        // console.log("resultCSS: " + ((text.indexOf("<style>") != -1) && (text.indexOf("</style>") != -1)));
                        // console.log("resultJS: " + ((text.indexOf("<script>") != -1) && (text.indexOf("</script>") != -1)));

                        console.log("CSS: " + target["CSS"]);
                        console.log("JS: " + target["JS"]);

                        if (target["CSS"]) {
                            requestUrlCSS = "css/" + path + ".css";
                        }

                        if (target["JS"]) {
                            requestUrlJS = "js/" + path + ".js";
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
                        navTo("#/error404");
                    }
                }).
                catch((error) => {
                    // console.log("Status - CSS caught error: " + page);
                    // cssChange("css/#/error404.css");
                    // console.log("Status - JS caught error: " + error);
                    // scriptChange("js/null.js");
                });

            window.scrollTo(0, 0);
        } else {
            navTo("#/error404");
        }
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