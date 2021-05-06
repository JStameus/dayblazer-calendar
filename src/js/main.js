// TODO: These hardcoded values must be handled dynamically and securely when I
// can use a database, obviously.
const userData = {
    user: "jstameus",
    token: "abc123"
}
const getRequestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        "User-Name": `${userData.user}`,
        "Board-Token": `${userData.token}`
    },
}

function postTest() {
    const requestBody = {
        owner: `${userData.user}`,
        guests: [],
        events: globalEventList,
    }
    const options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "User-Name": `${userData.user}`,
            "Board-Token": `${userData.token}`,
        },
        body: JSON.stringify(requestBody),
    };
    console.log("Sending POST...");
    fetch(`${BASEURL}`, options)
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
}

// == API QUERY SETTING ==
const BASEURL = "http://localhost:3000/api";
const QUERY = `u=jstameus`;

// == FETCHED DATA ==
var globalCalendarDayList = [];
var globalEventList = [];

var dataObject = {
    name: "Bubby",
    level: 52
}

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
    fetch(`${BASEURL}/${QUERY}`, getRequestOptions)
        .then(response => response.json())
        .then(data => {
            if(data.events) {
                globalEventList = createEventList(data);
                globalCalendarDayList = createCalendarDayData(currentDate);
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
