/*
                                == UI MANAGER ==
    The UI manager keeps track of, and modifies the state of the user interface.
    What's hidden, what's being displayed, and what needs to be updated when
    some value changes. All functions that toggle visibility, change the text
    content of DOM elements and such, should go here.
*/

// === CALENDAR ===
var maxGridItems = 0;
const dayGrid = document.querySelector("#monthView_dayGrid");

// === PROGRESS BAR ===
function updateProgressBar() {
    const newPercentage = (currentXP/requiredXP) * 100;
    progressBarFill.style.width = `${newPercentage}%`;

    xpDisplay.textContent = `${currentXP}/${requiredXP}`;
}

// === DAY VIEW ===
const dayView = document.querySelector("#day_view_full");
const screenBlocker = document.querySelector("#screen_blocker");
function toggleDayView() {
    if(dayView.style.display === "none") {
        dayView.style.display = "block";
        screenBlocker.style.display = "block";
        screenBlocker.classList.add("enabled");
        screenBlocker.classList.remove("disabled");
    }
    else {
        dayView.style.display = "none";
        screenBlocker.classList.remove("enabled");
        screenBlocker.classList.add("disabled");
        setTimeout(() => {
            screenBlocker.style.display = "none";
        }, 210);
    }
}
