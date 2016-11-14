// http://stackoverflow.com/questions/24218783/javascript-canvas-pixel-manipulation

var job = 0;
function cycleColors() {
    if(job) {
        clearInterval(job);
        job = 0;
    } else {
        job = setInterval(function(){
            var canvas = document.getElementById("resultCanvas");
            shiftHue(canvas, 0.01, 0, 0);
        }, 100);
    }
}

// Provides a new canvas containing [img] with adjhust HSV
function shiftHue(canvas, dh, ds, dv) {
    var ctx2 = canvas.getContext('2d');
    // get canvad img data 
    var imgData = ctx2.getImageData(0, 0, canvas.width, canvas.height);
    var data = imgData.data;
    var lastIndex = canvas.width * canvas.height * 4;
    var rgb = [0, 0, 0];
    var hsv = [0.0, 0.0, 0.0];
    // loop on all pixels
    for (var i = 0; i < lastIndex; i += 4) {
        // retrieve r,g,b (! ignoring alpha !) 
        var r = data[i];
        var g = data[i + 1];
        var b = data[i + 2];
        // convert to hsv
        RGB2HSV(r, g, b, hsv);
        // adjust HSV
        hsv[0] = (hsv[0] + dh) % 1;
        hsv[1] = hsv[1] + ds;
        hsv[2] = hsv[2] + dv;
        // convert back to rgb
        hsvToRgb(rgb, hsv);
        // store
        data[i] = rgb[0];
        data[i + 1] = rgb[1];
        data[i + 2] = rgb[2];
    }
    ctx2.putImageData(imgData, 0, 0);
}

//      UTILITIES

// ------------------------------------------
// converts r,b,b to h,s,v
//  r,g,b are [0-255]
//  h,s,v are [0-1] X [0-1] X [0-255]
// Source :  Lol Software :  http://lolengine.net/blog/2013/01/13/fast-rgb-to-hsv
function RGB2HSV(r, g, b, hsv) {
    var K = 0.0,
        swap = 0;
    if (g < b) {
        swap = g;
        g = b;
        b = swap;
        K = -1.0;
    }
    if (r < g) {
        swap = r;
        r = g;
        g = swap;
        K = -2.0 / 6.0 - K;
    }
    var chroma = r - (g < b ? g : b);
    hsv[0] = Math.abs(K + (g - b) / (6.0 * chroma + 1e-20));
    hsv[1] = chroma / (r + 1e-20);
    hsv[2] = r;
}

// ------------------------------------------
//  r,g,b are [0-255]
//  h,s,v are [0-1] X [0-1] X [0-255]
// Source :  Lol Software :  https://github.com/kobalicek/rgbhsv
function hsvToRgb(rgb, hsv) {
    var h = hsv[0];
    var s = hsv[1];
    var v = hsv[2];

    // The HUE should be at range [0, 1], convert 1.0 to 0.0 if needed.
    if (h >= 1.0) h -= 1.0;

    h *= 6.0;
    var index = Math.floor(h);

    var f = h - index;
    var p = v * (1.0 - s);
    var q = v * (1.0 - s * f);
    var t = v * (1.0 - s * (1.0 - f));

    switch (index) {
        case 0:
            rgb[0] = v;
            rgb[1] = t;
            rgb[2] = p;
            return;
        case 1:
            rgb[0] = q;
            rgb[1] = v;
            rgb[2] = p;
            return;
        case 2:
            rgb[0] = p;
            rgb[1] = v;
            rgb[2] = t;
            return;
        case 3:
            rgb[0] = p;
            rgb[1] = q;
            rgb[2] = v;
            return;
        case 4:
            rgb[0] = t;
            rgb[1] = p;
            rgb[2] = v;
            return;
        case 5:
            rgb[0] = v;
            rgb[1] = p;
            rgb[2] = q;
            return;
    }
}
