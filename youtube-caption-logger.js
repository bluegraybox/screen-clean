/*
Log YouTube closed captions

Writes to the Javascript console and appends to a global accumulator string.

You can copy-paste from the line-by-line console output, but Chrome adds debugging info to each line and mangles duplicate lines.
Dumping out the accumulator string at the end is much cleaner.

The Chrome debugging info appears as something like 'VM1234:7 ' at the beginning of each line after the first.
Do `pbpaste | less` to see the actual value, then use sed to strip them out:

    pbpaste | sed 's/VM1234:7//;' | pbcopy

*/

function log_captions() {
    // This is the tricky and fragile bit; the rest is housekeeping
    var elems = document.getElementsByClassName('ytp-caption-segment');

    if (elems) {
        var changed = false;
        for (var i = 0; i < elems.length; i++) {
            var new_text = elems.item(i)?.textContent;
            if (new_text != last_text[i]) {
                changed = true;
            }
            last_text[i] = new_text;
        }
        if (changed) {
            for (var i = 0; i < elems.length; i++) {
                console.log(last_text[i]);
                // add to accumulator; needs to be initialized at the beginning and logged at end
                full_text += last_text[i] + "\n";
            }
        }
    }
}

// create/clear array for last-logged text
var last_text = [];

// create/clear text accumulator (accessible from function)
var full_text = '';

// Run log_captions every 100ms
var interval_id = setInterval(log_captions, 100);

// stop logging
clearInterval(interval_id);

// dump text accumulator as single log message
console.log(full_text);

