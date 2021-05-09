class CalendarEvent {
    constructor(eventData) {
        this.id = eventData.id;
        this.name = eventData.name;
        this.description = eventData.description;
        this.date = eventData.date;
        this.startTime = eventData.startTime;
        this.endTime = eventData.endTime;
        this.type = eventData.type;
        this.difficulty = eventData.difficulty;
        this.xpValue = eventData.xpValue;
        this.finished = eventData.finished;
        this.checked = false;
    }
    updateEventInfo(eventData) {
        // TODO: Should an event be able to change its own ID? Probably not. 
        // I'm leaving it out of this update function for now.
        this.name = eventData.name;
        this.description = eventData.description;
        this.date = eventData.date;
        this.startTime = eventData.startTime;
        this.endTime = eventData.endTime;
        this.type = eventData.type;
        this.finished = eventData.finished;
        this.difficulty = eventData.difficulty;
        this.xpValue = eventData.xpValue;
        console.log(`Updated CalendarEvent: ${this.id}`);
    }
}
