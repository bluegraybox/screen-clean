function closePopupAd(cssClasses) {
    // console.log("checking for ads");
    var elements = [];
    for (var i = 0; i < cssClasses.length; i++) {
        var cssClass = cssClasses[i];
        var newElements = getElements(cssClass);
        // console.log("found " + newElements.length + " matches for class " + cssClass);
        elements = elements.concat(newElements);
    }

    for (var i = 0; i < elements.length; i++) {
        // console.log("closing ad");
        var e = elements[i];
        e.click();
    }
    setTimeout(() => closePopupAd(cssClasses), 3000);  // run every 3 seconds
}

function getElements(cssClass) {
    var htmlcollection = document.getElementsByClassName(cssClass);

    // getElementsByClassName returns an HTMLCollection; covert to Array so we can work with it
    var arr = [];
    for (var i = 0; i < htmlcollection.length; i++) {
        var c = htmlcollection.item(i);
        arr.push(c);
    }
    return arr;
}


closePopupAd([
    'ytp-ad-overlay-close-button',
    'ytp-ad-skip-button'
]);
