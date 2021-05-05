// TODO: These hardcoded values must be handled dynamically and securely when I
// can use a database, obviously.
const userData = {
    user: "jstameus",
    token: "abc123"
}
const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        "User-Name": `${userData.user}`,
        "Board-Token": `${userData.token}`
    },
}
// == API QUERY SETTING ==
const BASEURL = "http://localhost:3000/api";
const QUERY = `u=jstameus`;

// == USER XP ==
// TODO: Should probably not be stored locally. Only modify via API calls?
var userXP = {
    currentXP: 200,
    requiredXP: 4000,
};

// == MAIN CALENDAR VARIABLES ==
const currentDate = new Date();
const daysInCurrentMonth = getDaysInMonth(currentDate);
const firstDayOfCurrentMonth = getFirstWeekDayInMonth(currentDate);

const previousMonth = new Date();
previousMonth.setMonth(currentDate.getMonth() - 1);

const nextMonth = new Date();
nextMonth.setMonth(currentDate.getMonth() + 1);

// == FETCHED DATA ==
var globalCalendarDayList = [];
var globalEventList = [];

// == DOM ELEMENTS ==
// === MAIN CALENDAR GRID ===
var dayGrid = document.querySelector("#monthView_dayGrid");

// === FOOTER ===
const progressBarFill = document.querySelector("#progressBar_fill");
const xpDisplayText = document.querySelector("#footer_xpDisplay");

// === DAY VIEW ===
const dayView = document.querySelector("#day_view_full");
const screenBlocker = document.querySelector("#screen_blocker");

// === RIGHT SIDE MENU ===
const rightMenuContent = document.querySelector("#menu_right_content");

// == BUTTONS ==
// === DAY VIEW ===
const closeDayViewButton = document.querySelector("#day_view_button_close");
closeDayViewButton.addEventListener("click", () => {
    toggleDayView();
});

// === RIGHT SIDE MENU ===
const showTodayButton = document.querySelector("#sideMenu_showAgenda");
showTodayButton.addEventListener("click", () => {
    toggleDayView();
});

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

// == MAIN APP FUNCTIONS ==
function initApp() {
    fetch(`${BASEURL}/${QUERY}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            if(data.events) {
                data.events.forEach(obj => {
                    globalEventList.push(new CalendarEvent(obj));
                });
            }
            initCalendar(currentDate, globalEventList, dayGrid);
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
        });
    updateProgressBar(progressBarFill, xpDisplayText, userXP);
}
// ------------------------

// == APP ENTRY POINT ==
window.addEventListener("DOMContentLoaded", () => {
    initApp();
});
