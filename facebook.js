function hideComments(oldComments) {
    // comments is an HTMLCollection; oldComments and allComments are arrays
    var comments = document.getElementsByClassName("UFIContainer");
    var newComments = [];
    var allComments = [];
    for (var i = 0; i < comments.length; i++) {
        var c = comments.item(i);
        allComments.push(c);
        if (!oldComments.includes(c)) {
            newComments.push(c);
        }
    }
    for (var i = 0; i < newComments.length; i++) {
        console.log("New element " + newComments[i].id);
        var button = document.createElement("div");
        button.classList.add("showComments");
        button.innerHTML = "Show/Hide Comments";
        button.addEventListener("click", showFunc(newComments[i]));
        newComments[i].insertAdjacentElement("beforebegin", button);
        newComments[i].style.display = "none";
    }
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
