$(document).ready(function() {

    // Bind a new countdown timer to the #down-clock div
    var countdown = new Timer("#countdown #down-clock", ".countdown-control", 0, 0, -1);
    $(".countdown-control.play-button").click(function() {
        if (!$(this).hasClass("disabled")) {
            countdown.run();
            countdown.disableControl("play");
            countdown.enableControl("pause");
        }
    });
    $(".countdown-control.pause-button").click(function() {
        if (!$(this).hasClass("disabled")) {
            countdown.stop();
            countdown.enableControl("play");
            countdown.disableControl("pause");
        }
    });
    $(".countdown-control.reset-button").click(function() {
        if (!$(this).hasClass("disabled")) {
            countdown.reset();
            countdown.enableControl("play");
            countdown.disableControl("pause");
        }
    });

    // Bind a new countup stopwatch to the #up-clock div
    var countup = new Timer("#countup #up-clock", ".countup-control", 0, 0, 1);
    $(".countup-control.play-button").click(function() {
        if (!$(this).hasClass("disabled")) {
            countup.run();
            countup.disableControl("play");
            countup.enableControl("pause");
        }
    });
    $(".countup-control.pause-button").click(function() {
        if (!$(this).hasClass("disabled")) {
            countup.stop();
            countup.enableControl("play");
            countup.disableControl("pause");
        }
    });
    $(".countup-control.reset-button").click(function() {
        if (!$(this).hasClass("disabled")) {
            countup.reset();
            countup.enableControl("play");
            countup.disableControl("pause");
        }
    });

    // Triggered whenever the user types in the box
    $("#seconds-input").on('input', function() {
        var val = parseInt($(this).val());
        if (isNaN(val) || val < 0) {
            val = 0;
        }
        countdown.changeBegin(val);
        countup.changeEnd(val);

        countdown.enableControl("play");
        countup.enableControl("play");
    });
});

/**
 * Interfaces between the general Timer code and the specific HTML layout of the page.
 * Only this must be modified if the HTML changes; the Timer is not tied to any
 * specific HTML classes.
 * Arguments:
 *   `control`: a string of a timer control, e.g. "play", "pause", "reset"
 *   `disableState`: boolean for whether to disable the button
 *   `element`: an HTML string determining which of (potentially many options)
 *              control buttons to change
 */
function setControlDisabled(control, disableState, element) {
    if (disableState) {
        $(element + "." + control + "-button").addClass("disabled");
    } else {
        $(element + "." + control + "-button").removeClass("disabled");
    }
}


/**
 * Creates a timer, bound to a specific HTML element, which counts between
 * `begin` and `end` in steps of `delta`. Has play, pause, and reset functionality.
 * Arguments:
 *   `element`: an HTML string defining which element to fill with the timer
 *   `controlElement`: an HTML string that houses the controls for the timer
 *   `begin`: the start time
 *   `end`: the end time
 *   `delta`: the 'step size', or how much the timer advances by every second
 */
var Timer = function(element, controlElement, begin, end, delta) {

    var curr = begin;       // `curr` holds the current value of the timer
    var tick;               // interval that ticks once a second

    /* Start ticking: call update() once per second. */
    function run() {
        tick = setInterval(update, 1000);
    }

    /* Stop ticking. */
    function stop() {
        clearInterval(tick);
    }

    /* Stop the clock and reset its time to the original `begin`. */
    function reset() {
        stop();
        curr = begin;
        render();
    }

    /* Render the `curr` time in `element`. */
    function render() {
        time = secondsToPrettyTimeString(curr);
        $(element).html("" + time);
    }

    /* Increment `curr` by `delta`, stop the clock if necessary, and re-render. */
    function update() {
        curr += delta;
        if (curr < 0) {
            return;
        }
        if (end > begin && (curr >= end)) {   // if counting up and reached destination
            stop();
            disableControl("play");
            disableControl("pause");
        }
        if (begin > end && (curr <= end)) {  // if counting down and reached destination
            stop();
            disableControl("play");
            disableControl("pause");
        }
        render();
    }

    /* Set a new `begin` and reset the `curr` (for a countdown). */
    function changeBegin(newValue) {
        stop();
        begin = newValue;
        curr  = begin;
        render();
    }

    /* Set a new `end` and reset the `curr` (for a countup). */
    function changeEnd(newValue) {
        stop();
        end  = newValue;
        curr = begin;
        render();
    }

    /* Disables the control denoted by the string input. */
    function disableControl(control) {
        setControlDisabled(control, true, controlElement);
    }

    /* Enables the control denoted by the string input. */
    function enableControl(control) {
        setControlDisabled(control, false, controlElement);
    }

    // Expose timer control functions
    this.run = run;
    this.stop = stop;
    this.reset = reset;
    this.changeBegin = changeBegin;
    this.changeEnd = changeEnd;
    this.disableControl = disableControl;
    this.enableControl = enableControl;

    render();          // render the timer initially
}
