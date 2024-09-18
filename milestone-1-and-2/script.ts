window.onload = function() {
    
    // Select the toggle button and skills section
    const toggleSkillsBtn = document.getElementById("toggleSkillsBtn") as HTMLButtonElement | null;
    const skillsSection = document.getElementById("skillsSection") as HTMLElement | null;
  
    // Add a click event listener only if both elements exist
    if (toggleSkillsBtn && skillsSection) {
      toggleSkillsBtn.addEventListener("click", () => {
        // Toggle the visibility of the skills section
        if (skillsSection.style.display === "none" || skillsSection.style.display === "") {
          skillsSection.style.display = "block"; 
        } else {
          skillsSection.style.display = "none"; 
        }
      });
    } else {
      console.error("Toggle button or skills section not found in the DOM");
    }
  
    console.log("toggleSkillsBtn:", toggleSkillsBtn);
    console.log("skillsSection:", skillsSection);
  }
  