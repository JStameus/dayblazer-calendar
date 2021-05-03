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
    //body: JSON.stringify(userData)
}
const BASEURL = "http://localhost:3000/api";
const QUERY = `u=jstameus`;

var currentXP = 300;
var requiredXP = 1000;
var eventList = [];

function main() {
    fetch(`${BASEURL}/${QUERY}`, requestOptions)
        .then(response => response.json())
        .then(data => {
            if(data.events) {
                data.events.forEach(obj => {
                    eventList.push(obj);
                });
            }
            initCalendar();
        })
        .catch(err => {
            console.log(`ERROR: ${err}`);
        });
}

// APP ENTRY POINT
main();
