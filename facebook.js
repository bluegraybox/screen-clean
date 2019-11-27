/* Show/Hide Comments

The comments for each post are contained in a single div.
Find all these comment divs,
    insert a button before each to show/hide it,
    then hide the comment div.
Check for new comment divs every second, in case of scrolling.
*/


// Start with an empty array
hideComments([]);


function hideComments(oldCommentDivs) {
    // Check to see if scrolling has caused new comment blocks to be added to the page.
    var allCommentDivs = getElements("UFIContainer");              // comment divs on main feed
    allCommentDivs = allCommentDivs.concat(getElements("_3w53"));  // comment divs on other person's timeline
    var newCommentDivs = allCommentDivs.filter(commentDiv => !oldCommentDivs.includes(commentDiv));

    // insert a "Show/Hide Comments" button before each new comment div
    newCommentDivs.forEach(function(commentDiv) {
        // console.log("New element " + commentDiv.id);  // debugging only

        var button = document.createElement("div");
        button.classList.add("showComments");
        button.innerHTML = "Show/Hide Comments";
        button.addEventListener("click", createShowHideFunc(commentDiv));

        commentDiv.insertAdjacentElement("beforebegin", button);
        commentDiv.style.display = "none";
    });
    // pass the new allComments to the next invocation
    setTimeout(() => hideComments(allCommentDivs), 1000);  // run every second
}


function getElements(cssClass) {
    var htmlcollection = document.getElementsByClassName(cssClass);

    // getElementsByClassName returns an HTMLCollection
    // need to covert it to Array so we can work with it
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
