// TODO: Some of these should probably be supplied by the API

// MAIN CALENDAR VARIABLES
var maxGridItems = 0;
const dayGrid = document.querySelector("#monthView_dayGrid");

const currentDate = new Date();
//currentDate.setMonth(currentDate.getMonth() - 1);
const daysInCurrentMonth = getDaysInMonth(currentDate);
const firstDayOfCurrentMonth = getFirstWeekDayInMonth(currentDate);
console.log(firstDayOfCurrentMonth);

const previousMonth = new Date();
previousMonth.setMonth(currentDate.getMonth() - 1);
const nextMonth = new Date();
nextMonth.setMonth(currentDate.getMonth() + 1);

function getDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

// Take a date as an argument, and return the first weekday of that month
function getFirstWeekDayInMonth(date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDayDate = new Date(year, month, 1);
    const firstDayDateSlice = firstDayDate
        .toString()
        .split(" ")[0];
    // TODO: Maybe there's a better way to do this, but it works for now, and I
    // can't be bothered with the Date object's arcane nonsense anymore
    switch (firstDayDateSlice) {
        case "Mon":
            return {weekday: "Monday", index: 0};
        case "Tue":
            return {weekday: "Tuesday", index: 1};
        case "Wed":
            return {weekday: "Wednesday", index: 2};
        case "Thu":
            return {weekday: "Thursday", index: 3};
        case "Fri":
            return {weekday: "Friday", index: 4};
        case "Sat":
            return {weekday: "Saturday", index: 5};
        case "Sun":
            return {weekday: "Sunday", index: 6};
        default:
            return {weekDay: "UNDEFINED", index: 0};
    }
}

function createDayDiv(type, date) {
    const newDiv = document.createElement("div");
    newDiv.className= "monthView_day";
    newDiv.classList.add(type);

    const dateLabel = document.createElement("h4");
    dateLabel.textContent = date;
    // TODO: dateLabel should probably have a class of its own

    newDiv.appendChild(dateLabel);
    return newDiv;
}

// Takes a date as an argument, and creates a calendar grid of that date's
// corresponding month
function createCalendarGrid(date) {
    const firstDay = getFirstWeekDayInMonth(date);

    // Getting a list of the last days of the previous month, and using it to
    // get the date numbers to use for the "previous" day divs
    const daysInPreviousMonth = getDaysInMonth(previousMonth);

    // TODO: Is there a cleaner way to do this?
    // Create an array of all the dates of the previous month, and slice it down
    // to the appropriate amount needed to fill in the calendar
    let remainder = [];
    for(let c = 1; c <= daysInPreviousMonth; c++) {
        remainder.push(c);
    }
    remainder = remainder.slice(Math.max(remainder.length - firstDay.index, 0));
    
    // Add the previous days up to the first weekday of the date
    for(let i = 0; i < firstDay.index; i++) {
        dayGrid.appendChild(createDayDiv("previous", remainder[i]));
    }     

    // Add all the days of the current month
    for(let i = 0; i < daysInCurrentMonth; i++) {
        dayGrid.appendChild(createDayDiv("current", i+1));
    }

    // Fill up the rest of the grid with next month's days
    const daysRemaining = maxGridItems - dayGrid.children.length;
    for(let i = 0; i < daysRemaining; i++) {
        dayGrid.appendChild(createDayDiv("next", i+1));
    }

    // Lastly, add the "today" class to the current day
    dayGrid.children[date.getDate() + firstDay.index - 1].classList.add("today");
}

function initCalendar() {
    console.log("Loading Month View");
    // Index is 5(Saturday) or more, 35 grid items is not enough. 
    if (firstDayOfCurrentMonth.index >= 5) {
        maxGridItems = 42;
    } else {
        maxGridItems = 35;
    }
    createCalendarGrid(currentDate);
    dayGrid.addEventListener("click", (e) => {
        switch (e.target.classList[1]) {
            case "previous":
                // TODO: Go back one month
                break;
            case "next":
                // TODO: Go forward one month
                break;
            case "current":
                // TODO: Show daily agenda
            default:
                break;
        }
    });
}
