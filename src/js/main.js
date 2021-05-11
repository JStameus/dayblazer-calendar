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
const summaryContainer = document.querySelector("#day_view_full_summary");
const scheduleContainer = document.querySelector("#day_view_full_schedule");
const checkoutButton = document.querySelector("#day_view_full_controlpanel_checkout");
const addNewButton = document.querySelector("#day_view_full_controlpanel_add");
const confirmNewEventButton = document.querySelector("#event_editor_confirm_button");
const closeDayViewButton = document.querySelector("#day_view_button_close");
const closeEditorButton = document.querySelector("#editor_header_button");
// TODO: Maybe I should be more specific with this event listener and not add it
// to this whole container?
scheduleContainer.addEventListener("click", (e) => {
    let checkbox = null;
    // Clicking on checkboxes
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
        selectedCalendarDay.renderControlPanel(checkoutButton);
    } 

    // Delete events
    if(e.target.classList.contains("event_footer_controlpanel_delete")) {
        let parentEvent = selectedCalendarDay.eventList.find((obj) => {
            return obj.id === e.target.dataset.parentevent
        });
        let newList = selectedCalendarDay.eventList.filter((obj) => {
            return obj.id != parentEvent.id;
        });
        // TODO: The user should get a chance to confirm before the event is
        // deleted.
        selectedCalendarDay.eventList = newList;
        selectedCalendarDay.renderEventPreview(dayGrid);
        selectedCalendarDay.renderEventList(scheduleContainer);
        selectedCalendarDay.renderSummary(summaryContainer);
        postEventList(globalCalendarDayList, userData.user, userData.token); 
    }
});
closeDayViewButton.addEventListener("click", () => {
    toggleElementVisibility(dayView, screenBlocker, 210);
    // TODO: The "Confirm" button should be reset here
    selectedCalendarDay = null;
});
closeEditorButton.addEventListener("click", () => {
    toggleElementVisibility(editorWindow, editorBlocker, 210);
});
checkoutButton.addEventListener("click", () => {
    selectedCalendarDay.finishCheckedEvents();
    selectedCalendarDay.renderControlPanel(checkoutButton);
    selectedCalendarDay.renderEventList(scheduleContainer);
    selectedCalendarDay.renderSummary(summaryContainer);
    postEventList(globalCalendarDayList, userData.user, userData.token); 

});
addNewButton.addEventListener("click", () => {
    toggleElementVisibility(editorWindow, editorBlocker, 210);
});
confirmNewEventButton.addEventListener("click", () => {
    addNewEvent(selectedCalendarDay, globalEventList);
    selectedCalendarDay.renderEventPreview(dayGrid);
    selectedCalendarDay.renderEventList(scheduleContainer);
    selectedCalendarDay.renderSummary(summaryContainer);
    toggleElementVisibility(editorWindow, editorBlocker, 210);
    // TODO: Hardcoded values, fix this!
    postEventList(globalCalendarDayList, userData.user, userData.token); 
});

// === EDITOR ===
const editorBlocker = document.querySelector("#editor_blocker");
const editorWindow = document.querySelector("#event_editor");

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
                // Populate the Global Event List
                data.events.forEach((obj) => {
                    globalEventList.push(obj);
                });
                globalCalendarDayList = createCalendarDayData(currentDate);
            }
        })
        .then(() => {
            globalEventList = [];
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
