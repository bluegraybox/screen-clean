function hideAds() {
    var htmlcollection = document.getElementsByClassName("adsbygoogle");
    for (var i = 0; i < htmlcollection.length; i++) {
        var c = htmlcollection.item(i);
        c.outerText = "";
    }
}

function poll() {
    hideAds();
    setTimeout(poll, 3000);  // run every 3 seconds
}

poll();
