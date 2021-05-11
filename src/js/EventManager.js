/*
                              = EVENT MANAGER =
    The event manager contains functions related to updating, adding and
    deleting events, as well as making API calls to update the event list on the
    server.
*/

// Send the specified list to the specified user's event board.
function postEventList(dayList, user, token) {
    let eventsToSend = [];
    dayList.forEach((day) => {
        day.eventList.forEach((obj) => {
            eventsToSend.push(obj);
        });
    });
    const requestBody = {
        owner: user,
        guests: [],
        events: eventsToSend,
    }
    const options = {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
            "User-Name": `${user}`,
            "Board-Token": `${token}`,
        },
        body: JSON.stringify(requestBody),
    };
    console.log("Sending POST...");
    fetch(`${BASEURL}`, options)
        .then(response => response.json())
        .then(json => console.log(json))
        .catch(err => console.log(err));
}

// TODO: Maybe this is something only the server should be able to do?
function createRandomID() {
    let id = "";
    const letters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "1234567890";
    // Get two random letters and three random numbers
    for(let i = 0; i < 2; i++) {
        id += letters[Math.floor(Math.random() * letters.length)];
    }
    for(let i = 0; i < 3; i++) {
        id += numbers[Math.floor(Math.random() * numbers.length)];
    }
    return id;
}

// TODO: Needs proper documentation!
function addNewEvent(calendarDay) {
    let obj = {};
    const nameInput = document.querySelector("#editor_input_name");
    obj.name = nameInput.value;

    const typeInput = document.querySelector("#editor_input_type");
    obj.type = typeInput.value;

    const descInput = document.querySelector("#editor_input_description");
    obj.description = descInput.value;

    let startHour = document.querySelector("#editor_input_start_hour").value;
    let startMinute = document.querySelector("#editor_input_start_minute").value;
    if(startHour.toString().length != 2) {
        startHour = "0" + startHour;
    }
    if(startMinute.toString().length != 2) {
        startMinute = "0" + startMinute;
    } 
    obj.startTime = `${startHour}:${startMinute}`;
    
    let endHour = document.querySelector("#editor_input_end_hour").value;
    let endMinute = document.querySelector("#editor_input_end_minute").value;
    if(endHour.toString().length != 2) {
        endHour = "0" + endHour;
    }
    if(endMinute.toString().length != 2) {
        endMinute = "0" + endMinute;
    } 
    obj.endTime = `${endHour}:${endMinute}`;

    const difficultyInput = document.querySelector("#editor_input_difficulty");
    obj.difficulty = parseInt(difficultyInput.value);
    switch (obj.difficulty) {
        // TODO: These things should ONLY be set by the server!
        case 1:
            obj.xpValue = 150;
            break
        case 2:
            obj.xpValue = 400;
            break;
        case 3:
            obj.xpValue = 750;
            break;
        default:
            console.log(obj.difficulty);
            alert("Invalid difficulty rating! Try again.");
            return;
    }
    obj.checked = false;
    obj.finished = false;
    obj.id = createRandomID();
    obj.date = calendarDay.date;

    const newEvent = new CalendarEvent(obj);
    calendarDay.eventList.push(newEvent);

    nameInput.value = "";
    descInput.value = "";
    difficultyInput.value = 1;
}


function updateEventEditor(id = "undefined") {
    if (editorMode === "add") {
        const nameInput = document.querySelector("#editor_input_name");
        nameInput.value = "";
        const typeInput = document.querySelector("#editor_input_type");
        typeInput.value = "";
        const descInput = document.querySelector("#editor_input_description");
        descInput.value = "";
        const difficultyInput = document.querySelector("#editor_input_difficulty");
        difficultyInput.value = 1;
    } else if (editorMode === "edit") {
        let event = selectedCalendarDay.eventList.find((obj) => {
            return obj.id === id;
        });
        console.log(event);

        const nameInput = document.querySelector("#editor_input_name");
        nameInput.value = event.name;
        const typeInput = document.querySelector("#editor_input_type");
        typeInput.value = event.type;
        const descInput = document.querySelector("#editor_input_description");
        descInput.value = event.description;
        const difficultyInput = document.querySelector("#editor_input_difficulty");
        difficultyInput.value = event.difficulty;
    }
}

// Search through a list of events and update the specified event with the new
// data.
// TODO: Needs proper documentation!
function updateEvent(id) {
    let event = selectedCalendarDay.eventList.find((obj) => {
        return obj.id === id;
    });
    const nameInput = document.querySelector("#editor_input_name");
    const typeInput = document.querySelector("#editor_input_type");
    const descInput = document.querySelector("#editor_input_description");
    const difficultyInput = document.querySelector("#editor_input_difficulty");

    let startHour = document.querySelector("#editor_input_start_hour").value;
    let startMinute = document.querySelector("#editor_input_start_minute").value;
    if(startHour.toString().length != 2) {
        startHour = "0" + startHour;
    }
    if(startMinute.toString().length != 2) {
        startMinute = "0" + startMinute;
    } 
    let newStartTime = `${startHour}:${startMinute}`;
    
    let endHour = document.querySelector("#editor_input_end_hour").value;
    let endMinute = document.querySelector("#editor_input_end_minute").value;
    if(endHour.toString().length != 2) {
        endHour = "0" + endHour;
    }
    if(endMinute.toString().length != 2) {
        endMinute = "0" + endMinute;
    } 
    let newEndTime = `${endHour}:${endMinute}`;

    event.name = nameInput.value;
    event.type = typeInput.value;
    event.description = descInput.value;
    event.difficulty = difficultyInput.value;
    event.startTime = newStartTime;
    event.endTime = newEndTime;
    
}

// TODO: Needs proper documentation!
function removeEvent(eventId, eventList) {
    // TODO: Not sure if using eventList.filter() would be cleaner here?
    for(let i = 0; i < eventList.length; i++) {
        if(eventList[i].id === eventId) {
            eventList.splice(i, 1);
        }
    }
}
