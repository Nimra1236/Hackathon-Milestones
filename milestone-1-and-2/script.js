window.onload = function () {
    // Select the toggle button and skills section
    var toggleSkillsBtn = document.getElementById("toggleSkillsBtn");
    var skillsSection = document.getElementById("skillsSection");
    // Add a click event listener only if both elements exist
    if (toggleSkillsBtn && skillsSection) {
        toggleSkillsBtn.addEventListener("click", function () {
            // Toggle the visibility of the skills section
            if (skillsSection.style.display === "none" || skillsSection.style.display === "") {
                skillsSection.style.display = "block";
            }
            else {
                skillsSection.style.display = "none";
            }
        });
    }
    else {
        console.error("Toggle button or skills section not found in the DOM");
    }
    console.log("toggleSkillsBtn:", toggleSkillsBtn);
    console.log("skillsSection:", skillsSection);
};
