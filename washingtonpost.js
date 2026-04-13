/* Run a background process that removes ads as they appear
 */


// run every N seconds
var pollInterval = 2 * 1000;

function hideAds() {
    var ads = document.getElementsByTagName("wp-ad-wrapper");
    for (let i = 0; i < ads.length; i++) {
        var item = ads.item(i);
        item.innerHTML = '';
        item.setAttribute('style', '');
    }
}

function poll() {
    hideAds();
    setTimeout(poll, pollInterval);
}

poll();

/*
closeIconHit
primis_trigger
*/
