/*
                              = EVENT MANAGER =
    The event manager contains functions related to updating, adding and
    deleting events, as well as making API calls to update the event list on the
    server.
*/

// Send the specified list to the specified user's event board.
function postEventList(eventList, user, token) {
    const requestBody = {
        owner: user,
        guests: [],
        events: eventList,
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
function addNewEvent(data, eventList) {
    data.id = createRandomID();
    data.finished = false;
    eventList.push(new CalendarEvent(data));
}

// Search through a list of events and update the specified event with the new
// data.
// TODO: Needs proper documentation!
function updateEvent(data, eventId, eventList) {
    let targetEvent = eventList.find(obj => obj.id === eventId);
    targetEvent.updateEventInfo(data);
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
