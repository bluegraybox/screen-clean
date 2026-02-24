/* Run a background process that removes ads as they appear
 */


// if we see these phrases, assume it's an ad
var killPhrases = ['Learn more', 'Suggested for you', 'Shop now', 'Order now', 'Watch more'];

// run every N seconds
var pollInterval = 2 * 1000;

function hideAds() {
    var articles = document.getElementsByTagName("article");
    for (let i = 0; i < articles.length; i++) {
        var item = articles.item(i);
        for (let j = 0; j < killPhrases.length; j++) {
            if (item.innerHTML.includes(killPhrases[j])) {
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
