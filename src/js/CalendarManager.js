/* 
                             == CALENDAR MANAGER ==
    The calendar manager is responsible for handling all information related to
    dates, such as the current date, which weekday is the first day of the month
    etc, as well as dynamically creating the elements representing the days.
*/


function getDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

// Take a date as an argument, and return the first weekday of that month
function getFirstWeekDayInMonth(selectedDate) {
    const month = selectedDate.getMonth();
    const year = selectedDate.getFullYear();
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

function createCalendarDayData(selectedDate, dayList, clearDayList = true) {
    if (clearDayList) {
        dayList = [];
    }
    const numberOfDays = getDaysInMonth(selectedDate);
    for(let i = 0; i < numberOfDays; i++) {
        const dateString = getDateString(i + 1, selectedDate.getMonth() + 1, selectedDate.getFullYear());
        dayList.push(new CalendarDay(dateString)); 
    }
}

function createDayDiv(type, date) {
    const dateLabel = document.createElement("h4");
    dateLabel.classList.add("day_date_number");
    dateLabel.textContent = date;

    const newDiv = document.createElement("div");
    newDiv.className= "monthView_day";
    newDiv.classList.add(type);
    newDiv.appendChild(dateLabel);

    return newDiv;
}

/**
 * [Creates divs representing days in a calendar with the selected date as its
 * starting point(usually the current date), and appends them to the specified
 * container.]
 * @param {[Date]} selectedDate The date which specifies the starting point of
 * the calendar.
 * @param {[Element]} container The parent DOM elements which will contain the
 * generated divs.
 */
function createCalendarGrid(selectedDate, container) {
    const previousMonth = new Date();
    previousMonth.setMonth(selectedDate.getMonth() - 1); 
    const firstDay = getFirstWeekDayInMonth(selectedDate);

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
        container.appendChild(newDiv);
    }     

    // Add all the days of the current month
    for(let i = 0; i < daysInCurrentMonth; i++) {
        const currentDateString = getDateString(i + 1, selectedDate.getMonth() + 1, selectedDate.getFullYear());
        const newDiv = createDayDiv("current", i + 1);
        newDiv.dataset.date = currentDateString;
        container.appendChild(newDiv);
    }

    // Fill up the rest of the grid with next month's days
    const daysRemaining = maxGridItems - container.children.length;
    for(let i = 0; i < daysRemaining; i++) {
        const currentDateString = getDateString(i + 1, nextMonth.getMonth() + 1, nextMonth.getFullYear());
        const newDiv = createDayDiv("next", i + 1);
        newDiv.dataset.date = currentDateString;
        container.appendChild(newDiv);
    }

    // Lastly, add the "today" class to the current day
    container.children[selectedDate.getDate() + firstDay.index - 1].classList.add("today");
}

/**
 * Initializes an interactable calendar with the specified date as its starting
 * point, and adds an event listener to the container that holds the DOM
 * elements representing the calendar, listening for clicks.
 * @param {[Date]} selectedDate The date to be used as the calendar's starting point.
 * @param {[Element]} container The container for the interactive calendar.
*/
function initCalendar(selectedDate, container) {
    const firstDayOfSelectedMonth = getFirstWeekDayInMonth(selectedDate);
    // If index is 5(Saturday) or more, 35 grid items is not enough. 
    if (firstDayOfSelectedMonth.index >= 5) {
        maxGridItems = 42;
    } else {
        maxGridItems = 35;
    }
    createCalendarGrid(selectedDate, container);
    //createCalendarDayData(selectedDate);
    container.addEventListener("click", (e) => {
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
