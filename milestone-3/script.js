document.addEventListener('DOMContentLoaded', function () {
    var resumeForm = document.getElementById('resumeform');
    var outputElement = document.getElementById('Output');
    if (resumeForm && outputElement) {
        resumeForm.addEventListener('submit', function (event) {
            event.preventDefault(); // Prevent form submission and page reload
            // Fetching form inputs
            var fullName = document.getElementById('full-name').value;
            var email = document.getElementById('email-address').value;
            var contactNumber = document.getElementById('contact-number').value;
            var education = document.getElementById('education').value;
            var experience = document.getElementById('experience').value;
            var skills = document.getElementById('skills').value;
            var homeAddress = document.getElementById('home-address').value;
            var linkedinProfile = document.getElementById('linkedin-profile').value;
            // Create resume content dynamically, ensuring it is not editable
            var resumeOutput = "\n        <h2>Resume</h2>\n        <p><strong>Name:</strong> ".concat(fullName, "</p>\n        <p><strong>Email:</strong> ").concat(email, "</p>\n        <p><strong>Phone:</strong> ").concat(contactNumber, "</p>\n        <p><strong>Home Address:</strong> ").concat(homeAddress, "</p>\n        <p><strong>LinkedIn Profile:</strong> <a href=\"").concat(linkedinProfile, "\" target=\"_blank\">").concat(linkedinProfile, "</a></p>\n        <h3>Education</h3>\n        <p>").concat(education, "</p>\n        <h3>Experience</h3>\n        <p>").concat(experience, "</p>\n        <h3>Skills</h3>\n        <p>").concat(skills, "</p>\n      ");
            // Output the resume content into the Output div, making it non-editable
            outputElement.innerHTML = resumeOutput;
            outputElement.setAttribute('contenteditable', 'false'); // Prevent editing
            outputElement.style.userSelect = 'none'; // Disable text selection
            outputElement.style.pointerEvents = 'none'; // Disable any interaction with the content
            // Disable all form fields
            var formElements = resumeForm.querySelectorAll('input, textarea, button');
            formElements.forEach(function (element) {
                element.disabled = true;
            });
        });
    }
    else {
        console.error('Could not find the form or output element.');
    }
});
