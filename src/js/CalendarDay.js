class CalendarDay {
    constructor(dateString) {
        this.date = dateString;
        this.refreshEventList();
    }
    renderEventPreview(container) {
        let dayDiv = null;
        const nodeList = container.children;

        for(let i = 0; i < nodeList.length; i++) {
            if(nodeList[i].dataset.date === this.date) {
                dayDiv = nodeList[i];
            }
        }
        // If no matching div was found, dayDiv will still be null, and the
        // function will exit prematurely.
        if(dayDiv === null) {
            console.warn(`No applicable div was found for CalendarDay ${this.date}.`);
            return;
        }

        this.eventList.forEach(obj => {
            const nameLabel = document.createElement("p");
            nameLabel.textContent = obj.name;
            nameLabel.classList.add("event_preview_name");
            nameLabel.classList.add(`event_type_${obj.type}`);

            const newDiv = document.createElement("div");
            newDiv.id = `event_${obj.id}`;
            newDiv.classList.add("event_preview");
            newDiv.appendChild(nameLabel);

            dayDiv.appendChild(newDiv);
        });
    }
    renderEventList(container) {
        // TODO: For this implementation to be ideal, all data sent between
        // client and server has to be strictly validated and secured.
        container.innerHTML = ``;
        this.eventList.forEach(obj => {
            // If the event is a task, it should have a checkbox and XP display
            let xpDisplay = "";
            let difficultyDisplay = "";
            let checkBox = "";
            let checkBoxValue = ""; 
            if(obj.type === "task") {
                xpDisplay = `<h3 class="event_header_xp_value"><span>${obj.xpValue}</span> XP</h3>`;
                checkBoxValue = obj.isFinished ? "checked" : "unchecked";
                checkBox = `<div class="event_main_checkbox ${checkBoxValue}" id="event_checkbox_${obj.id}" data-parentevent=${obj.id}></div>`;
                difficultyDisplay = `<h3 class="event_details_difficulty">Difficulty: ${obj.difficulty}</h3>`;

            }
            const eventDiv = document.createElement("div");
            eventDiv.classList.add(`schedule_event`);
            eventDiv.classList.add(`event_type_${obj.type}`);
            eventDiv.innerHTML = `
                <div class="schedule_event_header">
                    <h3 class="event_header_time">${obj.startTime} - ${obj.endTime}</h3>
                    ${xpDisplay}
                </div>
                <div class="schedule_event_main">
                    <h2 class="schedule_event_name">${obj.name}</h2>
                    ${checkBox}
                </div>
                <hr>
                <div class="schedule_event_footer">
                    <p class="event_footer_description">${obj.description}</p>
                    <div class="event_footer_controlpanel">
                        <div class="event_footer_controlpanel_delete"><i class="fa fa-trash"></i></div>
                        <div class="event_footer_controlpanel_edit"><i class="fa fa-edit"></i></div>
                        <div class="event_footer_controlpanel_expand"><i class="fa fa-list"></i></div>
                    </div>
                </div>
                <div class="schedule_event_details" style="display: none">
                    ${difficultyDisplay}
                    <h3 class="event_details_start">Start: ${obj.startTime}</h3>    
                    <h3 class="event_details_start">End: ${obj.endTime}</h3>    
                    <h3 class="event_details_location">Location: N/A</h3>    
                </div>
            `;
            container.appendChild(eventDiv);
        });
    }
    renderSummary(container) {
        container.innerHTML = ``;
        const summary = this.calculateSummary();
        const summaryDiv = document.createElement("div");
        summaryDiv.classList.add(`day_view_full_summary_info`);

        summaryDiv.innerHTML = `
            <h3>Total XP: <span class="xp_earned">${summary.earnedXP}</span>/<span class="xp_available">${summary.totalXP}</span></h3>
            <h3>Tasks: <span class="tasks_done">${summary.finishedTasks}</span>/<span class="tasks_available">${summary.totalTasks}</span></h3>
        `;
        container.appendChild(summaryDiv);
    }
    renderControlPanel(buttonElement) {
        let hasCheckedEvents = false;
        let checkedEvents = 0;
        for(let i = 0; i < this.eventList.length; i++) {
            const obj = this.eventList[i];
            if(obj.checked === true) {
                checkedEvents++;
            }
        }
        if(checkedEvents > 0) {
            hasCheckedEvents = true;
        }

        if(hasCheckedEvents === true) {
            buttonElement.classList.remove("inactive");
            buttonElement.classList.add("active");
            buttonElement.children[0].textContent = "Confirm";
        }
        else {
            buttonElement.classList.remove("active");
            buttonElement.classList.add("inactive");
            buttonElement.children[0].textContent = "...";
        }
    }
    // TODO: Can I make this less dependent on the class names matching/make it
    // more reusable? Do I need to?
    renderDashBoard() {
        let nextEvent;
        const nextEventTimeEl = document.querySelector("#next_event_header_time");
        const nextEventXPEl = document.querySelector("#next_event_header_xp");
        const nextEventNameEl = document.querySelector("#next_event_body_name");
        const nextEventDescEl = document.querySelector("#next_event_body_description");
        for(let i = 0; i < this.eventList.length; i++) {
            let event = this.eventList[i];
            if(event.type != "reminder" && !event.isFinished) {
                nextEvent = event;
                break;
            }
        }
        
        if(nextEvent) {
            nextEventTimeEl.textContent = nextEvent.startTime;
            // TODO: Using innerHTML so that the span doesn't get overwritten. Is
            // there a better way to do this?
            nextEventXPEl.innerHTML = (nextEvent.type === "task") ? `<span>${nextEvent.xpValue}</span> XP` : ``;

            nextEventNameEl.textContent = nextEvent.name;
            nextEventDescEl.textContent = nextEvent.description;
        } else {
            nextEventTimeEl.textContent = `--:--`
            nextEventXPEl.textContent = ``;

            nextEventNameEl.textContent = `None`;
            nextEventDescEl.textContent = `You have no more events scheduled for today.`;
        }
    }
    // Goes through the global list of events and rebuilds this CalendarDay's
    // event list with any events that match its date.
    refreshEventList() {
        // TODO: Don't rely on a global variable. Find where this can be passed
        // as an argument instead.
        let matchingEvents = globalEventList.filter((obj) => {
            // TODO: Is this a proper usage of filter? It works but it feels
            // dirty somehow.
            if(obj.date.toString().trim() === this.date.toString().trim()) {
                return true;
            }
            else {
                return false;
            }
        });
        const sortedEvents = matchingEvents.sort((a, b) => {
            let timeA = parseInt(a.startTime.slice(0,2));
            let timeB = parseInt(b.startTime.slice(0,2));
            if(timeA < timeB) {
                return -1;
            } else if (timeA > timeB) {
                return 1;
            } else {
                return 0;
            }
        });
        this.eventList = sortedEvents;
    }
    calculateSummary() {
        let earnedXP = 0;
        let totalXP = 0;
        let finishedTasks = 0;
        let totalTasks = 0;
        let totalEvents = 0;
        for(let i = 0; i < this.eventList.length; i++) {
            const obj = this.eventList[i];
            // Before adding XP, handle cases for events and reminders
            if(obj.type === "event") {
                totalEvents++;
                continue;
            } else if(obj.type === "reminder") {
                continue;
            } else if(obj.type === "task") {
                totalTasks++;
            }

            let XP = 0;
            switch (obj.difficulty) {
                case 1:
                    XP = 150;
                    totalXP += XP;
                    break;
                case 2: 
                    XP = 400;
                    totalXP += XP;
                    break;
                case 3:
                    XP = 750;
                    totalXP += XP;
                    break;
                default:
                    break;
            }
            if(obj.finished === true) {
                earnedXP += XP;
                finishedTasks++;
            }
        }
        return {earnedXP: earnedXP, totalXP: totalXP, finishedTasks: finishedTasks, totalTasks: totalTasks, totalEvents: totalEvents};
    }
}
