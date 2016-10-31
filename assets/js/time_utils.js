/**
 * Converts number of seconds (an integer) to a pretty string.  For example:
 *     3 days 6 hours 1 minute 10 seconds
 * The words (days, hours, minutes, seconds) are enclosed in <sup></sup> tags
 * in order to support separate styling.
 */
function secondsToPrettyTimeString(seconds) {
    var days = Math.floor(seconds / 86400);
    seconds = seconds % 86400;

    var hours = Math.floor(seconds / 3600);
    seconds = seconds % 3600;

    var minutes = Math.floor(seconds / 60);
    seconds = seconds % 60;

    var daysQualifier    = prettifyTimeQualifier("day", days);
    var hoursQualifier   = prettifyTimeQualifier("hour", hours);
    var minutesQualifier = prettifyTimeQualifier("minute", minutes);
    var secondsQualifier = prettifyTimeQualifier("second", seconds);

    return (days + daysQualifier + hours + hoursQualifier +
            minutes + minutesQualifier + seconds + secondsQualifier);
}

/**
 * Given a time qualifier `unit` (e.g. minute, second) and a `number`, returns
 * an HTML string with the properly-pluralized qualifier surrounded in <`tag`>.
 * Only supports units which are pluralized by appending an 's' to the singular.
 */
function prettifyTimeQualifier(unit, number, tag="sub") {
    if (number != 1) {
        unit += "s";
    }
    return "<" + tag + ">" + unit + "</" + tag + "> ";
}
