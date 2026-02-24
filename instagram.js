var pollInterval = 2 * 1000;  // run every N seconds
var killDelay = 1 * 1000;  // wait N seconds before deleting ad


function blankArticle(article, message) {
    return function () {
        article.innerHTML = '';
        console.log(message);
    }
}

function hideAds() {
    /*
    var sponsoredTags = document.getElementsByClassName("x1fhwpqd x132q4wb x5n08af");  // this feels fragile and unreliable
    for (let i = 0; i < sponsoredTags.length; i++) {
        var item = sponsoredTags.item(i).parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
        setTimeout(blankArticle(item, "hiding ad " + i), 1000);
    }
    */

    // blank out articles that contain any of these phrases
    var killPhrases = ['Learn more', 'Suggested for you', 'Shop now', 'Order now', 'Watch more'];
    var articles = document.getElementsByTagName("article");
    for (let i = 0; i < articles.length; i++) {
        var item = articles.item(i);
        for (let j = 0; j < killPhrases.length; j++) {
            if (item.innerHTML.includes(killPhrases[j])) {
                // do this on a delay so I have the satisfaction of watching it get deleted
                // UPDATE: this doesn't really work because it zaps ads as soon as they're added to the page, sometimes before I scroll down to them
                // setTimeout(blankArticle(item, "hiding article " + i), killDelay);
                item.innerHTML = '';
                // console.log("hiding article " + i);
                continue;
            }
        }
    }
}

function poll() {
    hideAds();
    setTimeout(poll, pollInterval);
}

poll();
