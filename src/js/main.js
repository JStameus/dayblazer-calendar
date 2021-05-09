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

// == API QUERY SETTING ==
const BASEURL = "http://localhost:3000/api";
const QUERY = `u=jstameus`;

// == GLOBALLY AVAILABLE DATA/STATE INFO ==
var globalCalendarDayList = [];
var globalEventList = [];
var selectedCalendarDay = null;

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
dayGrid.addEventListener("click", (e) => {
    // TODO: This function is quite long and should be moved to its appropriate
    // file later.
    switch (e.target.classList[1]) {
        case "previous":
            // TODO: Go back one month
            break;
        case "next":
            // TODO: Go forward one month
            break;
        case "current":
            const selectedDay = globalCalendarDayList.find(obj => {
                if(e.target.dataset.date === obj.date) {
                    return true;
                }
            });
            selectedCalendarDay = selectedDay;
            selectedDay.renderEventList(scheduleContainer);
            selectedDay.renderSummary(summaryContainer);
            toggleElementVisibility(dayView, screenBlocker, 210);
        default:
            break;
    }
});

// === FOOTER ===
const progressBarFill = document.querySelector("#progressBar_fill");
const xpDisplayText = document.querySelector("#footer_xpDisplay");

// === DAY VIEW ===
const dayView = document.querySelector("#day_view_full");
const screenBlocker = document.querySelector("#screen_blocker");
const scheduleContainer = document.querySelector("#day_view_full_schedule");
const summaryContainer = document.querySelector("#day_view_full_summary");
const closeDayViewButton = document.querySelector("#day_view_button_close");
scheduleContainer.addEventListener("click", (e) => {
    let checkbox = null;
    if(e.target.classList.contains("event_main_checkbox")) {
        checkbox = e.target;
        // Find out which CalendarEvent this checkbox element belongs to.
        const parentEvent = selectedCalendarDay.eventList.find(obj => {
            return obj.id === checkbox.dataset.parentevent;
        });
        
        if(checkbox.classList.contains("unchecked")) {
            // Set the CSS class to "checked"
            checkbox.classList.remove("unchecked");
            checkbox.classList.add("checked");
            parentEvent.checked = true;
        } else if(checkbox.classList.contains("checked")) {
            // Set the CSS class to "unchecked"
            checkbox.classList.remove("checked");
            checkbox.classList.add("unchecked");
            parentEvent.checked = false;
        } else {
            console.warn(`${checkbox.id} has no 'checked/unchecked' class!`);
        }
    } 
});
closeDayViewButton.addEventListener("click", () => {
    toggleElementVisibility(dayView, screenBlocker, 210);
    selectedCalendarDay = null;
});

// === RIGHT SIDE MENU ===
const rightMenu = document.querySelector("#menu_right");
const rightToggleButton = document.querySelector("#menu_right_toggle_button");
rightToggleButton.addEventListener("click", () => {
    if (rightMenu.className === "open") {
        rightMenu.className = "closed";
    } else {
        rightMenu.className = "open";
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
            initCalendar(currentDate, dayGrid, globalCalendarDayList);
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
