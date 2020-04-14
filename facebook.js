/* Show/Hide Comments

The comments for each post are contained in a single div.
Find all these comment divs,
    insert a button before each to show/hide it,
    then hide the comment div.
Check for new comment divs every second, in case of scrolling.
*/

filteredSubjects = ["trump", "virus", "coronavirus", "covid"];

const watchNode = document.getElementById('contentArea');
var oldPostDivs = [];
var oldCommentDivs = [];

const mutationCallback = function(mutationsList, observer) {
    console.log("mutationCallback");
    // ignore the mutations and look for new posts
    var allPostDivs = deleteFilteredPostDivs(oldPostDivs);  // delete before we hide comments
    var allCommentDivs = hideNewCommentDivs(oldCommentDivs);  // Start with an empty array
    oldPostDivs = allPostDivs;
    oldCommentDivs = allCommentDivs;
}

// Create an observer instance linked to the callback function
const mutationObserver = new MutationObserver(mutationCallback);

// Start observing the target node for configured mutations
mutationObserver.observe(watchNode, { childList: true, subtree: true });  // MutationObserverInitobserverConfig


function deleteFilteredPostDivs(oldPostDivs) {
    var mainFeedPostDivs = [];  // TODO: Figure this out later
    var friendTimelinePostDivs = getElements("mbm");
    var allPostDivs = mainFeedPostDivs.concat(friendTimelinePostDivs);
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


function hideNewCommentDivs(oldCommentDivs) {
    // Check to see if scrolling has caused new comment blocks to be added to the page.
    var mainFeedCommentDivs = getElements("UFIContainer");
    var friendTimelineCommentDivs = getElements("_3w53");
    var allCommentDivs = mainFeedCommentDivs.concat(friendTimelineCommentDivs);
    var newCommentDivs = allCommentDivs.filter(div => !oldCommentDivs.includes(div));

    // insert a "Show/Hide Comments" button before each new comment div
    newCommentDivs.forEach(function(commentDiv) {
        var button = document.createElement("div");
        button.classList.add("showComments");
        button.innerHTML = "Show/Hide Comments";
        button.addEventListener("click", createShowHideFunc(commentDiv));

        commentDiv.insertAdjacentElement("beforebegin", button);
        commentDiv.style.display = "none";
    });
    return allCommentDivs;
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
