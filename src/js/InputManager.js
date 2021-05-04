/* 
                              == INPUT MANAGER ==
    The input manager controls all things related to input. This includes adding
    event listeners, responding to events and calling relevant functions when
    the user does something. Buttons should be declared and configured here.
    References to DOM elements are organized by location/parent.
*/

// SIDE MENU: RIGHT
const rightMenuContent = document.querySelector("#menu_right_content");
const rightToggleButton = document.querySelector("#menu_right_toggleButton");
rightToggleButton.addEventListener("click", () => {
    if(rightMenuContent.style.display === "none") {
        rightMenuContent.style.display = "block";
        rightToggleButton.textContent = "-";
    } else {
        rightMenuContent.style.display = "none";
        rightToggleButton.textContent = "+";
    }
});

const showTodayButton = document.querySelector("#sideMenu_showAgenda");
showTodayButton.addEventListener("click", () => {
    toggleDayView();
});

// FOOTER AND PROGRESS BAR
const progressBarFill = document.querySelector("#progressBar_fill");
const xpDisplay = document.querySelector("#footer_xpDisplay");

// === DAY VIEW ===
const closeDayViewButton = document.querySelector("#day_view_button_close");
closeDayViewButton.addEventListener("click", () => {
    toggleDayView();
});

