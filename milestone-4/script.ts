document.addEventListener('DOMContentLoaded', function() {
    // Attaching the event listener for the form to submit
    document.getElementById('resumeform')?.addEventListener('submit', function(event) {
        event.preventDefault();

        // Fetching the file input element and other input values
        const displayPictureInput = document.getElementById("displayPicture") as HTMLInputElement;
        const nameElement = document.getElementById('full-name') as HTMLInputElement;
        const emailElement = document.getElementById('email-address') as HTMLInputElement;
        const phoneElement = document.getElementById('contact-number') as HTMLInputElement;
        const educationElement = document.getElementById('education') as HTMLInputElement;
        const experienceElement = document.getElementById('experience') as HTMLInputElement;
        const skillsElement = document.getElementById('skills') as HTMLInputElement;
        const homeAddressElement = document.getElementById('home-address') as HTMLInputElement;
        const linkedinElement = document.getElementById('linkedin-profile') as HTMLInputElement;

        if (displayPictureInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement && homeAddressElement && linkedinElement) {
            const displayPictureFile = displayPictureInput.files ? displayPictureInput.files[0] : null;
            const displayPictureURL = displayPictureFile ? URL.createObjectURL(displayPictureFile) : '';

            const name = nameElement.value;
            const email = emailElement.value;
            const phone = phoneElement.value;
            const education = educationElement.value;
            const experience = experienceElement.value;
            const skills = skillsElement.value;
            const homeAddress = homeAddressElement.value;
            const linkedin = linkedinElement.value;

            // Creating resume output
            const resumeOutput = `
                <h2>Resume</h2>
                ${displayPictureURL ? `<img id="displayPicture" src="${displayPictureURL}" alt="Display Picture">` : ""}
                <p><strong>Name:</strong> <span id="edit-name" class="editable">${name}</span></p>
                <p><strong>Email:</strong> <span id="edit-email" class="editable">${email}</span></p>
                <p><strong>Phone:</strong> <span id="edit-phone" class="editable">${phone}</span></p>
                <p><strong>Home Address:</strong> <span id="edit-home-address" class="editable">${homeAddress}</span></p>
                <p><strong>LinkedIn Profile:</strong> <span id="edit-linkedin" class="editable"><a href="${linkedin}" target="_blank">${linkedin}</a></span></p>
                <h3>Education</h3>
                <p id="edit-education" class="editable">${education}</p>
                <h3>Experience</h3>
                <p id="edit-experience" class="editable">${experience}</p>
                <h3>Skills</h3>
                <p id="edit-skills" class="editable">${skills}</p>
            `;

            const resumeOutputElement = document.getElementById('Output');
            if (resumeOutputElement) {
                resumeOutputElement.innerHTML = resumeOutput;
                makeEditable();
            }
        } else {
            console.error('One or more elements are missing');
        }
    });

    // This function will allow the resume to be editable
    function makeEditable() {
        const editableElements = document.querySelectorAll('.editable');
        editableElements.forEach(element => {
            element.addEventListener('click', function() {
                const currentElement = element as HTMLElement;
                const currentValue = currentElement.textContent || '';

                if (currentElement.tagName === 'P' || currentElement.tagName === 'SPAN') {
                    const input = document.createElement('input');
                    input.type = 'text';
                    input.value = currentValue;
                    input.classList.add('editing-input');

                    input.addEventListener('blur', function() {
                        currentElement.textContent = input.value;
                        currentElement.style.display = 'inline';
                        input.remove();
                    });

                    currentElement.style.display = 'none';
                    currentElement.parentNode?.insertBefore(input, currentElement);
                    input.focus();
                }
            });
        });
    }
});
