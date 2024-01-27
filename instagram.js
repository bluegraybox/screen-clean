function hideAds() {
    var sponsoredTags = document.getElementsByClassName("x1fhwpqd x132q4wb x5n08af");
    for (let i = 0; i < sponsoredTags.length; i++) {
        sponsoredTags.item(i).parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.innerHTML = '';
        console.log("hiding ad");
    }

}

function poll() {
    hideAds();
    setTimeout(poll, 2000);  // run every 2 seconds
}

poll();
