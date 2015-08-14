var ModuleTestWebPDetector = (function(global) {

global["BENCHMARK"] = false;

var test = new Test("WebPDetector", {
        disable:    false, // disable all tests.
        browser:    true,  // enable browser test.
        worker:     true,  // enable worker test.
        node:       true,  // enable node test.
        nw:         true,  // enable nw.js test.
        button:     true,  // show button.
        both:       true,  // test the primary and secondary modules.
        ignoreError:false, // ignore error.
        callback:   function() {
        },
        errorback:  function(error) {
        }
    }).add([
        // generic test
        testWebPDetector,
    ]);

if (IN_BROWSER || IN_NW) {
    test.add([
        // browser and node-webkit test
    ]);
} else if (IN_WORKER) {
    test.add([
        // worker test
    ]);
} else if (IN_NODE) {
    test.add([
        // node.js and io.js test
    ]);
}

// --- test cases ------------------------------------------
function testWebPDetector(test, pass, miss) {
    var ua = new UserAgent();
    var browser = ua.BROWSER;
    var osVersion = parseFloat(ua.OS_VERSION);

    if (IN_BROWSER || IN_NW) {
        ;
    } else {
        test.done(pass());
        return;
    }

    setTimeout(function() {
        document.body.innerHTML += JSON.stringify(WebPDetector, null, 2).replace(/\n/g, "<br>");

        if (browser === "Chrome") {
            if (WebPDetector.LOSSY    && WebPDetector.LOSSLESS &&
                WebPDetector.ALPHA    && WebPDetector.ANIMATION) {
                test.done(pass());
            } else {
                test.done(miss());
            }
        } else if (browser === "Chrome for iOS") {
            if (WebPDetector.LOSSY    && WebPDetector.LOSSLESS &&
                WebPDetector.ALPHA) {
                test.done(pass());
            } else {
                test.done(miss());
            }
        } else if (browser === "AOSP") {
            if (osVersion >= 4.0 && WebPDetector.LOSSY) {
                ;
            } else {
                test.done(miss());
                return;
            }
            if (osVersion >= 4.2 && WebPDetector.LOSSLESS && WebPDetector.ALPHA) {
                ;
            } else {
                test.done(miss());
                return;
            }
            test.done(pass());
        } else {
            test.done(pass());
        }
    }, 100); // because async detection.
}

return test.run();

})(GLOBAL);

