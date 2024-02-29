/* Show/Hide Comments

The comments for each post are contained in a single div.
Find all these comment divs,
    insert a button before each to show/hide it,
    then hide the comment div.
Check for new comment divs every second, in case of scrolling.
*/

filteredSubjects = ["trump", "republican", "virus", "coronavirus", "covid"];

// Main entry point
var startTime = Date.now();
// hideAds();
// hideNewCommentDivs();  // Start with an empty array
// deleteFilteredPostDivs([]);

// const watchNode = document.getElementById('contentArea');
var oldPostDivs = [];
var oldCommentDivs = [];

/*
const mutationCallback = function(mutationsList, observer) {
    console.log("mutationCallback");
    // ignore the mutations and look for new posts
    var allPostDivs = []; // deleteFilteredPostDivs(oldPostDivs);  // delete before we hide comments
    var allCommentDivs = hideNewCommentDivs();  // Start with an empty array
    oldPostDivs = allPostDivs;
    oldCommentDivs = allCommentDivs;
}

if (watchNode) {
    // Create an observer instance linked to the callback function
    const mutationObserver = new MutationObserver(mutationCallback);

    // Start observing the target node for configured mutations
    mutationObserver.observe(watchNode, { childList: true, subtree: true });  // MutationObserverInitobserverConfig
}
*/

function deleteFilteredPostDivs(oldPostDivs) {
    var allPostDivs = getElements("div[role=feed] > div");
    var newPostDivs = allPostDivs.filter(div => !oldPostDivs.includes(div));

    // delete new post divs if they contain filtered subjects
    newPostDivs.forEach(function(postDiv) {
        var contents = postDiv.innerHTML;
        filteredSubjects.forEach(function(subject) {
            var re = new RegExp(">([^<>]*\\b" + subject + "\\b[^<>]*)<", "i");
            var m = contents.match(re);
            if (m) {
                // On click, restore contents
                postDiv.addEventListener("click", (event) => { postDiv.innerHTML = contents; });
                console.log("Deleted: " + m[1]);
                postDiv.innerHTML = '<h1 style="color:red">DELETED: ' + m[1] + '</h1>';
            }
        });
    });
    return allPostDivs;
}


function hideNewCommentDivs() {
    // Check to see if scrolling has caused new comment blocks to be added to the page.
    var mainFeedCommentDivs = [];  // getElements("UFIContainer");  // This doesn't work/isn't needed anymore, but left in to show handling of multiple styles
    var friendTimelineCommentDivs = getElements("div.cwj9ozl2.tvmbv18p");

    var allCommentDivs = mainFeedCommentDivs.concat(friendTimelineCommentDivs);

    // insert a "Show/Hide Comments" button before each new comment div
    allCommentDivs.forEach(function(commentDiv) {
        // This check saves us all the hassle of checking comment counts
        var showComments = commentDiv.getElementsByClassName("showComments");
        if (showComments.length != 0) {
            return;
        }

        var commentList;
        for (let i = 0; i < commentDiv.children.length; i++) {
            var child = commentDiv.children.item(i)
            if (child.tagName.toLowerCase() === "ul") {
                commentList = child;
                break;
            }
        };
        if (commentList !== undefined) {
            var button = document.createElement("div");
            button.classList.add("showComments");
            button.innerHTML = "Show/Hide Comments";
            button.addEventListener("click", createShowHideFunc(commentList));

            commentList.insertAdjacentElement("beforebegin", button);
            commentList.style.display = "none";
        }
    });
    var now = Date.now();
    if ( (now - startTime) > 20000 && allCommentDivs.length == 0) {
        // if it's been 20 seconds since start and we still don't have any matching divs, give up
    }
    else {
        setTimeout(hideNewCommentDivs, 1000);  // run every second
    }
    return allCommentDivs;
}


function getElements(cssClass) {
    var htmlcollection = document.querySelectorAll(cssClass);

    // querySelectorAll returns an HTMLCollection; covert to Array so we can work with it
    var arr = [];
    for (var i = 0; i < htmlcollection.length; i++) {
        var c = htmlcollection.item(i);
        arr.push(c);
    }
    return arr;
}


// Create a new function to show/hide a specific comment div.
function createShowHideFunc(commentDiv) {
    return (event) => {
        if (commentDiv.style.display == "block") {
            commentDiv.style.display = "none";
        }
        else {
            commentDiv.style.display = "block";
        }
    };
}



/* This only sorta works. FB only sets the ad link when you roll over it.
   And it regenerates the ads as you scroll.
*/
function hideAds() {
    var allAddLinks = document.querySelectorAll('a[href^="\/ads\/"]');
    allAddLinks.forEach((adLink) => {
        var parent = adLink.parentElement;
        for (var i = 0; i < 11; i++) {
            parent = parent.parentElement;
        }
        parent.style.visibility = "hidden";
        parent.style.height = "10px";
    });
    console.log("hid "+allAddLinks.length+" ads");
    var now = Date.now();
    setTimeout(hideAds, 1000);  // run every second
    /*
    if ( (now - startTime) > 20000 && allAddLinks.length == 0) {
        // if it's been 20 seconds since start and we still don't have any matching divs, give up
    }
    else {
    }
    */
}
