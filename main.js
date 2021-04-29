const BASEURL = "http://localhost:3000/api";
var apiQuery = "u=jstameus";
var eventList = [];

function main() {
    // TODO: Events should be fetched from the API before calendar initialization
    fetch(`${BASEURL}/${apiQuery}`)
        .then(response => response.json())
        .then(data => {
            // TODO: I am getting an array of data here. Is there a problem in
            // the client or the API?
            data[0].events.forEach(obj => eventList.push(obj));
            initCalendar();
        });
}

// APP ENTRY POINT
main();
