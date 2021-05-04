class CalendarDay {
    constructor(date, eventList) {
        this.date = date;
        this.eventList = eventList;
    }
    updateMenuView() {
        // Update the relevant elements of the dayView to show the info
        // contained in this CalendarDay
    }
}

class CalendarEvent {
    constructor(eventData) {
        this.id = eventData.id;
        this.name = eventData.name;
        this.description = eventData.description;
        this.date = eventData.date;
        this.startTime = eventData.startTime;
        this.endTime = eventData.endTime;
        this.type = eventData.type;
    }
}
