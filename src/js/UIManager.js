/*
                                = UI MANAGER =
    The UI manager keeps track of, and modifies the state of the user interface.
    What's hidden, what's being displayed, and what needs to be updated when
    some value changes. All functions that toggle visibility, change the text
    content of DOM elements and such, should go here.
*/

function updateProgressBar(progressBarFillEl, xpTextEl, xpPool) {
    const newPercentage = (xpPool.currentXP/xpPool.requiredXP) * 100;
    progressBarFillEl.style.width = `${newPercentage}%`;

    xpTextEl.textContent = `${xpPool.currentXP}/${xpPool.requiredXP}`;
}

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
