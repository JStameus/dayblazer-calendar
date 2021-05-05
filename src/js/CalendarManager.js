/* 
                             = CALENDAR MANAGER =
    The calendar manager is responsible for handling all information related to
    dates, such as the current date, which weekday is the first day of the month
    etc, as well as dynamically creating the elements representing the days and
    associated events. 
*/

/**
 * Returns a number representing the amount of days in the date's current
 * month.
 * @param {[Date]} date The date to get the day amount from.
 * @return {[Number]} The amount of days in the date's month.
 */
function getDaysInMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

/**
 * Gets the name and index of the first weekday of the selected date's month.
 * The function reads from a standard Date object and attempts to parse the
 * string value of it, and returns an "UNDEFINED" weekday if it fails.
 * @param {[Date]} selectedDate The date that should be used to get the current
 * month.
 * @return {[Object]} An object containing two properties: a string value called
 * weekday and a number called index.
 */
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

/**
 * Takes numbers for a day, month and year, and returns a formatted string value
 * that matches the formatting of the API's event objects.
 * @param {[Number]} day A two-digit number representing day of the month. If a
 * single digit is given, a 0 will be prepended to it.
 * @param {[Number]} month A two-digit number representing the month, If a
 * single digit is given, a 0 will be prepended to it.
 * @param {[Number]} year A four-digit number representing the year.
 * @return {[String]} A string value representing a date in DD-MM-YYYY format.
 */
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

/**
 * Populates an array with CalendarDay objects for each day in the specified
 * date's month. By default, the array is first cleared before adding new
 * CalendarDays, but can be overriden by passing "false" as the third argument.
 * This not recommended however, and it could result in duplicate data.
 * @param {Date} selectedDate The date to use as the starting point for
 * populating the list of days in the corresponding month.
 * @param {Array} dayList The array which will be cleared and filled with
 * CalendarDay objects.
 * @param {Boolean} clearDayList Set to true by default, which is the
 * recommended setting. 
 */
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

/**
 * Creates and returns a div displaying a number corresponding to the date the
 * div represents on the calendar. The div also has a CSS class which tells it
 * if it belongs to the previous, current or next month.
 * @param {String} type Should be either "previous", "current" or "next".
 * Represents if the day the div represents belongs to the current month, or the
 * next or previous.
 * @param {Number} day A number representing the day of the month the div
 * represents.
 * @return {Element} A div with the class "day_date_number", and a child node of
 * type h4 with the day number.
 */
function createDayDiv(type, day) {
    const dateLabel = document.createElement("h4");
    dateLabel.classList.add("day_date_number");
    dateLabel.textContent = day;

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
 * @param {[Number]} gridItemAmount The amount of grid items to be generated.
 * Can be set manually, but should usually be handled by the initCalendar
 * function.
 */
function createCalendarGrid(selectedDate, container, gridItemAmount) {
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
    const daysRemaining = gridItemAmount - container.children.length;
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
 * Creates and returns a div representing a CalendarEvent, representing its
 * name, setting a class appropriate to its type, and adding its id value to the
 * div's id for easy identification in the DOM.
 * @param {CalendarEvent} event The event data to use for creating the div.
 * @return A div element with two classes appropriate to its name and type, and
 * an id corresponding to the event's id.
*/
function createEventDiv(event) {
    const nameLabel = document.createElement("p");
    nameLabel.textContent = event.name;
    nameLabel.classList.add("event_preview_name");
    nameLabel.classList.add(`event_type_${event.type}`);

    const newDiv = document.createElement("div");
    newDiv.id = `event_${event.id}`;
    newDiv.classList.add("event_preview");
    newDiv.appendChild(nameLabel);

    return newDiv;
}

/**
 * Loops through the specified container element's children and check the
 * specified event list for any events that belong to that specific day, and
 * creates and appends them if a match is found.
 * @param {Array} eventList The array containing the CalendarEvent objects.
 * @param {Element} container The DOM element containing divs representing days
 * on the calendar. Requires the container's direct children to have a "date"
 * attribute in their data set that matches the format of the CalendarEvents.
 */
function initEvents(eventList, container) {
    const nodeList = container.children;
    for(let i = 0; i < nodeList.length; i++) {
        const currentDayDiv = nodeList[i];
        eventList.forEach(obj => {
           if(obj.date === currentDayDiv.dataset.date) {
                currentDayDiv.appendChild(createEventDiv(obj));
            }
        });
    }
}

/**
 * Initializes an interactable calendar with the specified date as its starting
 * point, and adds an event listener to the container that holds the DOM
 * elements representing the calendar, listening for clicks.
 * @param {[Date]} selectedDate The date to be used as the calendar's starting point.
 * @param {[Array]} eventList The list of events to use to populate the
 * calendar view.
 * @param {[Element]} container The container for the interactive calendar.
*/
function initCalendar(selectedDate, eventList, container) {
    const firstDayOfSelectedMonth = getFirstWeekDayInMonth(selectedDate);
    // If index is 5(Saturday) or more, 35 grid items is not enough. 
    let maxGridItems = 0;
    if (firstDayOfSelectedMonth.index >= 5) {
        maxGridItems = 42;
    } else {
        maxGridItems = 35;
    }
    createCalendarGrid(selectedDate, container, maxGridItems);
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
    initEvents(eventList, container);
}
