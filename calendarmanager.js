// TODO: Some of these should probably be supplied by the API

// MAIN CALENDAR VARIABLES
var maxGridItems = 0;
const dayGrid = document.querySelector("#monthView_dayGrid");

const currentDate = new Date();
//currentDate.setMonth(currentDate.getMonth() - 1);
const daysInCurrentMonth = getDaysInMonth(currentDate);
const firstDayOfCurrentMonth = getFirstWeekDayInMonth(currentDate);

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

function getDateString(day, month, year) {
    // Prepend a 0 to the number is it's a single digit
    if (day.toString().length === 1) {
        day = "0" + day;
    }
    if(month.toString().length === 1) {
        month = "0" + month ;
    }

    return `${day}-${month}-${year}`;
}

function createDayDiv(type, date) {
    const dateLabel = document.createElement("h4");
    dateLabel.classList.add("day_date_number");
    dateLabel.textContent = date;

    //const expandButton = document.createElement("button");
    //expandButton.textContent = "------";
    //expandButton.classList.add("day_button_expand");

    const newDiv = document.createElement("div");
    newDiv.className= "monthView_day";
    newDiv.classList.add(type);
    newDiv.appendChild(dateLabel);
    //newDiv.appendChild(expandButton);

    return newDiv;
}

function createEventDiv(event) {
    const nameLabel = document.createElement("p");
    nameLabel.textContent = event.name;
    nameLabel.classList.add("event_preview_name");
    let eventType = "";
    switch (event.type) {
        case "event":
            eventType = "event";
            break;
        case "task":
            eventType = "task";
            break;
        case "reminder":
            eventType = "reminder";
            break;
        default:
            eventType = "default";
            break;
    }
    nameLabel.classList.add(`event_type_${eventType}`);

    const newDiv = document.createElement("div");
    newDiv.id = `event_${event.id}`;
    newDiv.appendChild(nameLabel);

    return newDiv;
}

// Takes a date as an argument, and creates a calendar grid of that date's
// corresponding month
function createCalendarGrid(date) {
    const firstDay = getFirstWeekDayInMonth(date);

    // Getting a list of the last days of the previous month, and using it to
    // get the date numbers to use for the "previous" day divs
    const daysInPreviousMonth = getDaysInMonth(previousMonth);

    // Create an array of all the dates of the previous month, and slice it down
    // to the appropriate amount needed to fill in the calendar
    // TODO: Is there a cleaner way to do this?
    let remainder = [];
    for(let c = 1; c <= daysInPreviousMonth; c++) {
        remainder.push(c);
    }
    remainder = remainder.slice(Math.max(remainder.length - firstDay.index, 0));
    
    // Add the previous days up to the first weekday of the date
    for(let i = 0; i < firstDay.index; i++) {
        const currentDateString = getDateString(remainder[i], previousMonth.getMonth() + 1, previousMonth.getFullYear());
        const newDiv = createDayDiv("previous", remainder[i]);
        newDiv.dataset.date = currentDateString;
        dayGrid.appendChild(newDiv);
    }     

    // Add all the days of the current month
    for(let i = 0; i < daysInCurrentMonth; i++) {
        const currentDateString = getDateString(i + 1, currentDate.getMonth() + 1, currentDate.getFullYear());
        const newDiv = createDayDiv("current", i + 1);
        newDiv.dataset.date = currentDateString;
        dayGrid.appendChild(newDiv);
    }

    // Fill up the rest of the grid with next month's days
    const daysRemaining = maxGridItems - dayGrid.children.length;
    for(let i = 0; i < daysRemaining; i++) {
        const currentDateString = getDateString(i + 1, nextMonth.getMonth() + 1, nextMonth.getFullYear());
        const newDiv = createDayDiv("next", i + 1);
        newDiv.dataset.date = currentDateString;
        dayGrid.appendChild(newDiv);
    }

    // Lastly, add the "today" class to the current day
    dayGrid.children[date.getDate() + firstDay.index - 1].classList.add("today");
}

function initCalendar() {
    console.log("Loading Month View");
    // If index is 5(Saturday) or more, 35 grid items is not enough. 
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
    initEvents();
}

function initEvents() {
    const nodeList = dayGrid.children;
    for(let i = 0; i < nodeList.length; i++) {
        const currentDayDiv = nodeList[i];
        eventList.forEach(obj => {
            if(obj.date === currentDayDiv.dataset.date) {
                currentDayDiv.appendChild(createEventDiv(obj));
            }
        });
    }
}
