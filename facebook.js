/* Show/Hide Comments

The comments for each post are contained in a single div.
Find all these comment divs,
    insert a button before each to show/hide it,
    then hide the comment div.
Check for new comment divs every second, in case of scrolling.
*/


hideNewCommentDivs([]);  // Start with an empty array


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

    // pass allCommentDivs to the next invocation to be the oldCommentDivs
    setTimeout(() => hideNewCommentDivs(allCommentDivs), 1000);  // run every second
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
