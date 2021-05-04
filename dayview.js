const dayView = document.querySelector("#day_view_full");
const screenBlocker = document.querySelector("#screen_blocker");

const closeButton = document.querySelector("#day_view_button_close");
closeButton.addEventListener("click", () => {
    toggleDayView();
});

const showTodayButton = document.querySelector("#sideMenu_showAgenda");
showTodayButton.addEventListener("click", () => {
    toggleDayView();
});

function toggleDayView() {
    if(dayView.style.display === "none") {
        dayView.style.display = "block";
        screenBlocker.style.display = "block";
        screenBlocker.classList.add("enabled");
        screenBlocker.classList.remove("disabled");
    }
    else {
        dayView.style.display = "none";
        screenBlocker.classList.remove("enabled");
        screenBlocker.classList.add("disabled");
        setTimeout(() => {
            screenBlocker.style.display = "none";
        }, 210);
    }
}

class CalendarDay {
    constructor(date, eventList) {
        this.date = date;
        this.eventList = eventList;
    }
    createMenuView() {
        const container = document.createElement("div");
        container.classList.add("day_view_full");

        const header = document.createElement("h1");
        header.textContent = date.toString();
    }
}
