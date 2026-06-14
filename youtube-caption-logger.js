/*
Log YouTube closed captions

Writes to the Javascript console and appends to a global accumulator string.

You can copy-paste from the line-by-line console output, but Chrome adds debugging info to each line and mangles duplicate lines.
Dumping out the accumulator string at the end is much cleaner.

The Chrome debugging info appears as something like 'VM1234:7 ' at the beginning of each line after the first.
Do `pbpaste | less` to see the actual value, then use sed to strip them out:

    pbpaste | sed 's/VM1234:7//;' | pbcopy

*/

var captionLogger = {
    last_text: [],  // array for last-logged text
    full_text: '', // text accumulator
    log_captions() {
        // This is the tricky and fragile bit; the rest is housekeeping
        var elems = document.getElementsByClassName('ytp-caption-segment');

        if (elems) {
            var changed = false;
            for (var i = 0; i < elems.length; i++) {
                var new_text = elems.item(i)?.textContent;
                if (new_text != this.last_text[i]) {
                    changed = true;
                }
                this.last_text[i] = new_text;
            }
            if (changed) {
                for (var i = 0; i < elems.length; i++) {
                    console.log(this.last_text[i]);
                    // add to accumulator; needs to be initialized at the beginning and logged at end
                    this.full_text += this.last_text[i] + "\n";
                }
            }
        }
    },
    start() {
        this.last_text = [];  // array for last-logged text
        this.full_text = ''; // text accumulator
        // Run log_captions every 100ms
        var logger = this;
        this.interval_id = setInterval(() => logger.log_captions(), 100);
    },
    stop() {
        // stop logging
        clearInterval(this.interval_id);
        this.dump();
    },
    dump() {
        // dump text accumulator as single log message
        console.log(this.full_text);
    }
}
