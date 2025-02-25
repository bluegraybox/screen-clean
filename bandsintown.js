function poll() {
    closePopupAd();
    setTimeout(poll, 2000);  // run every 2 seconds
}

function closePopupAd() {
    var closeButton = document.getElementById("closeIconHit");
    if (closeButton) {
        closeButton.click();
        console.log("clicked closeButton");
    }

    var closeButton2 = document.getElementsByClassName("bx-close-inside");
    if (closeButton2) {
        var i = closeButton2.item(0);
        if (i) {
            i.click();
            console.log("clicked closeButton2");
        }
    }

    var closeButton3 = document.getElementsByClassName("fs-close-button");
    if (closeButton3) {
        var i = closeButton3.item(0);
        if (i) {
            i.click();
            console.log("clicked closeButton3");
        }
    }

    var closeButton4 = document.getElementById("cbb");
    if (closeButton4) {
        closeButton4.click();
        console.log("clicked closeButton4");
    }
}

poll();
