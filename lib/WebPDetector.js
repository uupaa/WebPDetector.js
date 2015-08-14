(function moduleExporter(name, closure) {
"use strict";

var entity = GLOBAL["WebModule"]["exports"](name, closure);

if (typeof module !== "undefined") {
    module["exports"] = entity;
}
return entity;

})("WebPDetector", function moduleClosure(/* global */) {
"use strict";

// --- dependency modules ----------------------------------
// --- define / local variables ----------------------------
// --- class / interfaces ----------------------------------
var WebPDetector = {
    "LOSSY":     false,
    "LOSSLESS":  false,
    "ALPHA":     false,
    "ANIMATION": false,
    "repository": "https://github.com/uupaa/WebPDetector.js",
};

// --- implements ------------------------------------------
// original source code is here: https://developers.google.com/speed/webp/faq
//  - WebP lossy support
//      - Chrome 17+
//      - Chrome for Android 25+
//      - AOSP Stock Browser, Android 4.0+ (ICS)
//  - WebP lossy, lossless & alpha support (libwebp v0.2.0)
//      - Chrome 23+
//      - Chrome for Android 25+
//      - Chrome for iOS 29+
//      - AOSP Stock Browser, Android 4.2+ (JB-MR1)
//  - WebP animation
//      - Google Chrome 32+
if (IN_BROWSER || IN_NW) {
    _detect("LOSSY",     "UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA");
    _detect("LOSSLESS",  "UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==");
    _detect("ALPHA",     "UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==");
    _detect("ANIMATION", "UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA");
}

function _detect(key, value) {
    var img = new Image();
    img.src = "data:image/webp;base64," + value;
    img.onload = function() {
        WebPDetector[key] = (img.width > 0 && img.height > 0) ? true : false;
    };
}

return WebPDetector; // return entity

});

