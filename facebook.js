function hideComments(oldComments) {
    /*
    console.log("oldComments:");
    for (var i = 0; i < oldComments.length; i++) {
        console.log(oldComments[i]);
    }
    */
    // comments is an HTMLCollection; allComments is an array
    var comments = document.getElementsByClassName("UFIContainer");
    var newComments = [];
    var allComments = [];
    // console.log("comments:");
    for (var i = 0; i < comments.length; i++) {
        var c = comments.item(i);
        // console.log(c);
        allComments.push(c);
        if (!oldComments.includes(c)) {
            newComments.push(c);
        }
    }
    // console.log("Inserting elements");
    for (var i = 0; i < newComments.length; i++) {
        // console.log("Inserting element " + i);
        console.log("New element " + newComments[i].id);
        // var t = '<div class="showComments">Show Comments</div>';
        var button = document.createElement("div");
        button.classList.add("showComments");
        button.innerHTML = "Show/Hide Comments";
        button.addEventListener("click", showFunc(newComments[i]));
        newComments[i].insertAdjacentElement("beforebegin", button);
        // newComments[i].insertAdjacentHTML("beforebegin", t);
        newComments[i].style.display = "none";
    }
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

hideComments([]);

/*
document.addEventListener("load", function(event) {
    hideComments();
});
*/
