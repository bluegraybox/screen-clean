const closeButtonClasses = [
    'ytp-ad-overlay-close-button',
    'ytp-ad-skip-button'
];

function poll() {
    closePopupAd();
    setTimeout(poll, 2000);  // run every 2 seconds
}

const mutationCallback = function(mutationsList, observer) {
    console.log("mutationCallback");
    // ignore the mutations and look for new pop-up ads
    // closePopupAd();
    setTimeout(closePopupAd, 2000);  // wait two seconds
}

// Create an observer instance linked to the callback function
const mutationObserver = new MutationObserver(mutationCallback);

function closePopupAd() {
    // console.log("checking for ads");
    closeButtonClasses.forEach(function(cbClass) {
        // console.log("checking button class: " + cbClass);
        getElements(cbClass).forEach(function(button) {
            console.log("found button");
            button.click();
        });
    });
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

function setupMutationObserver() {
    var watchNode = document.getElementById('primary');
    if (watchNode) {
        // Start observing the target node for configured mutations
        mutationObserver.observe(watchNode, { attributes: true, childList: true, subtree: true });  // MutationObserverInitobserverConfig
    }
    else {
        setTimeout(setupMutationObserver, 2000);  // wait two seconds
    }
}

// either poll or set up mutation observer, not both
poll();
// setupMutationObserver();
