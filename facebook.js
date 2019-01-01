// Covert HTMLCollection to Array so we can work with it
function toArray(htmlcollection) {
    var arr = [];
    for (var i = 0; i < htmlcollection.length; i++) {
        var c = htmlcollection.item(i);
        arr.push(c);
    }
    return arr;
}

function hideComments(oldComments) {
    // getElementsByClassName returns an HTMLCollection; need to covert it to Array so we can work with it
    // comments on main feed
    var allComments = toArray(document.getElementsByClassName("UFIContainer"));
    // comments on other person's timeline
    allComments = allComments.concat(toArray(document.getElementsByClassName("_3w53")));
    var newComments = allComments.filter(comment => !oldComments.includes(comment));
    newComments.forEach(function(comment) {
        console.log("New element " + comment.id);
        var button = document.createElement("div");
        button.classList.add("showComments");
        button.innerHTML = "Show/Hide Comments";
        button.addEventListener("click", showFunc(comment));
        comment.insertAdjacentElement("beforebegin", button);
        comment.style.display = "none";
    });
    // pass the new allComments to the next invocation
    setTimeout(() => hideComments(allComments), 1000);
}

function showFunc(commentBlock) {
    return (event) => {
        if (commentBlock.style.display == "block") {
            commentBlock.style.display = "none";
        }
        else {
            commentBlock.style.display = "block";
        }
    };
}

// Start with an empty array
hideComments([]);
