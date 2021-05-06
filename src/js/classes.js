class CalendarDay {
    constructor(dateString) {
        this.date = dateString;
        this.eventList = this.refreshEventList();
    }
    renderEventList(container) {
        // Update the relevant elements of the dayView to show the info
        // contained in this CalendarDay
        // TODO: For this implementation to be ideal, all data sent between
        // client and server has to be strictly validated.
        container.innerHTML = ``;
        this.eventList.forEach(obj => {
            const eventDiv = document.createElement("div");
            eventDiv.classList.add(`schedule_event`);
            eventDiv.classList.add(`event_type_${obj.type}`);

            //const eventTitle = document.createElement("h3");
            //eventTitle.textContent = obj.name;
            eventDiv.innerHTML = `
                <h3>${obj.startTime} - ${obj.endTime}</h3>
                <h2 class="schedule_event_name">${obj.name}</h2>
                <hr>
                <p class="schedule_event_description">${obj.description}</p>
            `;
            container.appendChild(eventDiv);
        });
    }
    // Goes through the global list of events and rebuilds this CalendarDay's
    // event list with any events that match its date.
    refreshEventList() {
        const matchingEvents = globalEventList.filter((obj) => {
            // TODO: Is this a proper usage of filter? It works but it feels
            // dirty somehow.
            if(obj.date.toString().trim() === this.date.toString().trim()) {
                return true;
            }
            else {
                return false;
            }
        });
        return matchingEvents;
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
        this.finished = eventData.finished;
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
        console.log(`Updated CalendarEvent: ${this.id}`);
    }
}
