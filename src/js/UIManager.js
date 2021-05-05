/*
                                = UI MANAGER =
    The UI manager keeps track of, and modifies the state of the user interface.
    What's hidden, what's being displayed, and what needs to be updated when
    some value changes. All functions that toggle visibility, change the text
    content of DOM elements and such, should go here.
*/

/**
 * Checks an XP Pool and calculates progress to the next level in percentage
 * units, and then updates the specified visual element and text element
 * accordingly.
 * @param {Element} progressBarFillEl An element representing a visual progress
 * bar, where the width corresponds to the percentage of progress towards the
 * next leve.
 * @param {Element} xpTextEl A text element showing the current XP in the XP
 * pool, and the total required XP to advance to the next level.
 * @param {Object} xpPool An object containing properties "currentXP" and
 * "requiredXP", which will be used to calculate the percentage width of the
 * progress bar.
 */
function updateProgressBar(progressBarFillEl, xpTextEl, xpPool) {
    const newPercentage = (xpPool.currentXP/xpPool.requiredXP) * 100;
    progressBarFillEl.style.width = `${newPercentage}%`;

    xpTextEl.textContent = `${xpPool.currentXP}/${xpPool.requiredXP}`;
}

/**
 * Toggles an element's display property between "none" and "block". Optionally
 * includes a background blocker which appears when the element is shown,
 * usually to obscure other elements behind it. Includes a short delay before
 * the background blocker is properly disabled, which can be set manually if
 * desired.
 * @param {Element} element The DOM element to be toggled.
 * @param {Element} backgroundBlocker The DOM element to be turned on or off
 * alongside the primary element. Set to "null" by default.
 * @param {Number} fadeTime The time in miliseconds before the background
 * blocker is completely disabled after the primary element is disabled.
 */
function toggleElementVisibility(element, backgroundBlocker = null, fadeTime = 200) {
    if(element.style.display === "none") {
        element.style.display = "block";
        if(backgroundBlocker) {
            backgroundBlocker.style.display = "block";
            backgroundBlocker.classList.add("enabled");
            backgroundBlocker.classList.remove("disabled");
        }
    }
    else {
        element.style.display = "none";
        if(backgroundBlocker) {
            backgroundBlocker.classList.remove("enabled");
            backgroundBlocker.classList.add("disabled");
            setTimeout(() => {
                backgroundBlocker.style.display = "none";
            }, fadeTime);
        }
    }
}
