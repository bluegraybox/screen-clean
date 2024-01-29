const closeButtonClasses = [
    'dismiss-button',
    'ytp-ad-overlay-close-button',
    'ytp-ad-skip-button',
    'ytp-ad-skip-button-modern'
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

function clickButtonOnce(button) {
    // Make sure our parent span isn't hidden
    if (button.parentElement.style.display != 'none') {
        if (button.getAttribute("hasBeenClicked")) {
            console.log("button has already been clicked");
            // console.log("button has already been clicked - clicking anyway");
            // button.click();
        }
        else {
            console.log("clicking button");  // tried to log button.className, but it's undefined?!
            button.click();
            button.setAttribute("hasBeenClicked", true);
        }
    }
}

function closePopupAd() {
    // console.log("checking for ads");
    closeButtonClasses.forEach(function(cbClass) {
        // console.log("checking button class: " + cbClass);
        getElements(cbClass).forEach(clickButtonOnce);
    });

    // close subscription box
    var dismissButton = document.getElementById("dismiss-button");
    if (dismissButton) {
        var dismissButtons = collectionToArray(dismissButton.getElementsByTagName("button"));
        dismissButtons.forEach(clickButtonOnce);
    }
}

function collectionToArray(htmlcollection) {
    // getElementsBy... methods return an HTMLCollection; covert to Array so we can work with it
    var arr = [];
    for (var i = 0; i < htmlcollection.length; i++) {
        var c = htmlcollection.item(i);
        arr.push(c);
    }
    return arr;
}

function getElements(cssClass) {
    // getElementsByClassName returns an HTMLCollection; covert to Array so we can work with it
    var htmlcollection = document.getElementsByClassName(cssClass);
    return collectionToArray(htmlcollection);
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
