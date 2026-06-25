// grab lyrics from uta-net.com pages
// (They block text selection and ctrl-clicks.)

// need to log this to get the \n to print
console.log(document.getElementById("kashi-area").innerHTML.replaceAll("<br>", "\n"));
