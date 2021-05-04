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
    newDiv.classList.add("event_preview");
    newDiv.appendChild(nameLabel);

    return newDiv;
}

