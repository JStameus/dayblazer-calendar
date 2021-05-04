const dayView = document.querySelector("#day_view_full");
const closeButton = document.querySelector("#day_view_button_close");
closeButton.addEventListener("click", () => {
    dayView.style.display = "none";
});

const showTodayButton = document.querySelector("#sideMenu_showAgenda");
showTodayButton.addEventListener("click", () => {
    dayView.style.display = "block";
});

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
