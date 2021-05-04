// SIDE MENU: RIGHT
const rightMenuContent = document.querySelector("#menu_right_content");
const rightToggleButton = document.querySelector("#menu_right_toggleButton");
rightToggleButton.addEventListener("click", () => {
    if(rightMenuContent.style.display === "none") {
        rightMenuContent.style.display = "block";
        rightToggleButton.textContent = "-";
    } else {
        rightMenuContent.style.display = "none";
        rightToggleButton.textContent = "+";
    }
});

// FOOTER AND PROGRESS BAR
const progressBarFill = document.querySelector("#progressBar_fill");
const xpDisplay = document.querySelector("#footer_xpDisplay");
function updateProgressBar() {
    const newPercentage = (currentXP/requiredXP) * 100;
    progressBarFill.style.width = `${newPercentage}%`;

    xpDisplay.textContent = `${currentXP}/${requiredXP}`;
}
