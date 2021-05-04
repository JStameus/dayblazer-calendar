// TODO: These hardcoded values must be handled dynamically and securely when I
// can use a database, obviously.
const userData = {
    user: "jstameus",
    token: "abc123"
}
const requestOptions = {
    method: "GET",
    mode: "cors",
    headers: {
        "Content-Type": "application/json",
        "User-Name": `${userData.user}`,
        "Board-Token": `${userData.token}`
    },
}
const BASEURL = "http://localhost:3000/api";
const QUERY = `u=jstameus`;

var currentXP = 200;
var requiredXP = 4000;

function initApp() {
    fetch(`${BASEURL}/${QUERY}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            if(data.events) {
                data.events.forEach(obj => {
                    globalEventList.push(new CalendarEvent(obj));
                });
            }
            initCalendar();
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
        });
    updateProgressBar();
}

// APP ENTRY POINT
window.addEventListener("DOMContentLoaded", () => {
    initApp();
});
