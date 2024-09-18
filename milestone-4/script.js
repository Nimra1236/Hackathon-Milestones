document.addEventListener('DOMContentLoaded', function () {
    var _a;
    // Attaching the event listener for the form to submit
    (_a = document.getElementById('resumeform')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
        event.preventDefault();
        // Fetching the file input element and other input values
        var displayPictureInput = document.getElementById("displayPicture");
        var nameElement = document.getElementById('full-name');
        var emailElement = document.getElementById('email-address');
        var phoneElement = document.getElementById('contact-number');
        var educationElement = document.getElementById('education');
        var experienceElement = document.getElementById('experience');
        var skillsElement = document.getElementById('skills');
        var homeAddressElement = document.getElementById('home-address');
        var linkedinElement = document.getElementById('linkedin-profile');
        if (displayPictureInput && nameElement && emailElement && phoneElement && educationElement && experienceElement && skillsElement && homeAddressElement && linkedinElement) {
            var displayPictureFile = displayPictureInput.files ? displayPictureInput.files[0] : null;
            var displayPictureURL = displayPictureFile ? URL.createObjectURL(displayPictureFile) : '';
            var name_1 = nameElement.value;
            var email = emailElement.value;
            var phone = phoneElement.value;
            var education = educationElement.value;
            var experience = experienceElement.value;
            var skills = skillsElement.value;
            var homeAddress = homeAddressElement.value;
            var linkedin = linkedinElement.value;
            // Creating resume output
            var resumeOutput = "\n                <h2>Resume</h2>\n                ".concat(displayPictureURL ? "<img id=\"displayPicture\" src=\"".concat(displayPictureURL, "\" alt=\"Display Picture\">") : "", "\n                <p><strong>Name:</strong> <span id=\"edit-name\" class=\"editable\">").concat(name_1, "</span></p>\n                <p><strong>Email:</strong> <span id=\"edit-email\" class=\"editable\">").concat(email, "</span></p>\n                <p><strong>Phone:</strong> <span id=\"edit-phone\" class=\"editable\">").concat(phone, "</span></p>\n                <p><strong>Home Address:</strong> <span id=\"edit-home-address\" class=\"editable\">").concat(homeAddress, "</span></p>\n                <p><strong>LinkedIn Profile:</strong> <span id=\"edit-linkedin\" class=\"editable\"><a href=\"").concat(linkedin, "\" target=\"_blank\">").concat(linkedin, "</a></span></p>\n                <h3>Education</h3>\n                <p id=\"edit-education\" class=\"editable\">").concat(education, "</p>\n                <h3>Experience</h3>\n                <p id=\"edit-experience\" class=\"editable\">").concat(experience, "</p>\n                <h3>Skills</h3>\n                <p id=\"edit-skills\" class=\"editable\">").concat(skills, "</p>\n            ");
            var resumeOutputElement = document.getElementById('Output');
            if (resumeOutputElement) {
                resumeOutputElement.innerHTML = resumeOutput;
                makeEditable();
            }
        }
        else {
            console.error('One or more elements are missing');
        }
    });
    // This function will allow the resume to be editable
    function makeEditable() {
        var editableElements = document.querySelectorAll('.editable');
        editableElements.forEach(function (element) {
            element.addEventListener('click', function () {
                var _a;
                var currentElement = element;
                var currentValue = currentElement.textContent || '';
                if (currentElement.tagName === 'P' || currentElement.tagName === 'SPAN') {
                    var input_1 = document.createElement('input');
                    input_1.type = 'text';
                    input_1.value = currentValue;
                    input_1.classList.add('editing-input');
                    input_1.addEventListener('blur', function () {
                        currentElement.textContent = input_1.value;
                        currentElement.style.display = 'inline';
                        input_1.remove();
                    });
                    currentElement.style.display = 'none';
                    (_a = currentElement.parentNode) === null || _a === void 0 ? void 0 : _a.insertBefore(input_1, currentElement);
                    input_1.focus();
                }
            });
        });
    }
});
