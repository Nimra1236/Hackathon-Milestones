// interface ResumeData {
//   fullName: string;
//   email: string;
//   contactNumber: string;
//   education: string;
//   skills: string;
//   experience: string;
//   address: string;
//   linkedinProfile: string;
//   displayPicture?: string;
// }
var _a, _b;
// Function to handle form submission
(_a = document.getElementById('resume-form')) === null || _a === void 0 ? void 0 : _a.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault(); // Prevent form submission
    // Clear any previous error messages
    clearErrors();
    // Collect values from form fields
    var userName = document.getElementById('userName').value.trim();
    var fullName = document.getElementById('full-name').value.trim();
    var email = document.getElementById('email-address').value.trim();
    var contactNumber = document.getElementById('contact-number').value.trim();
    var education = document.getElementById('education').value.trim();
    var experience = document.getElementById('experience').value.trim();
    var skills = document.getElementById('skills').value.trim();
    var address = document.getElementById('home-address').value.trim();
    var linkedinProfile = document.getElementById('linkedin-profile').value.trim();
    // Validate form fields
    var isValid = validateForm({
        userName: userName,
        fullName: fullName,
        email: email,
        contactNumber: contactNumber,
        education: education,
        experience: experience,
        skills: skills,
        address: address,
        linkedinProfile: linkedinProfile,
    });
    if (!isValid)
        return; // Stop submission if validation fails
    // Handle display picture
    var displayPictureFile = (_a = document.getElementById('displayPicture').files) === null || _a === void 0 ? void 0 : _a[0];
    var displayPictureDataUrl = '';
    if (displayPictureFile) {
        var reader_1 = new FileReader();
        reader_1.onload = function () {
            displayPictureDataUrl = reader_1.result;
            saveDataAndDisplay({
                userName: userName,
                fullName: fullName,
                email: email,
                contactNumber: contactNumber,
                education: education,
                experience: experience,
                skills: skills,
                address: address,
                linkedinProfile: linkedinProfile,
                displayPicture: displayPictureDataUrl,
            });
        };
        reader_1.readAsDataURL(displayPictureFile);
    }
    else {
        saveDataAndDisplay({
            userName: userName,
            fullName: fullName,
            email: email,
            contactNumber: contactNumber,
            education: education,
            experience: experience,
            skills: skills,
            address: address,
            linkedinProfile: linkedinProfile,
        });
    }
});
// Function to validate the form
function validateForm(data) {
    var isValid = true;
    if (!data.userName) {
        showError('userName', 'Username is required.');
        isValid = false;
    }
    if (!data.fullName) {
        showError('full-name', 'Full name is required.');
        isValid = false;
    }
    if (!data.email || !validateEmail(data.email)) {
        showError('email-address', 'A valid email address is required.');
        isValid = false;
    }
    if (!data.contactNumber) {
        showError('contact-number', 'Contact number is required.');
        isValid = false;
    }
    if (!data.education) {
        showError('education', 'Education information is required.');
        isValid = false;
    }
    if (!data.experience) {
        showError('experience', 'Experience information is required.');
        isValid = false;
    }
    if (!data.skills) {
        showError('skills', 'Skills information is required.');
        isValid = false;
    }
    if (!data.address) {
        showError('home-address', 'Home address is required.');
        isValid = false;
    }
    if (!data.linkedinProfile) {
        showError('linkedin-profile', 'LinkedIn profile is required.');
        isValid = false;
    }
    return isValid;
}
// Function to display errors
function showError(inputId, message) {
    var _a;
    var inputElement = document.getElementById(inputId);
    var errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = 'red';
    errorElement.textContent = message;
    (_a = inputElement.parentElement) === null || _a === void 0 ? void 0 : _a.appendChild(errorElement);
}
// Function to clear previous errors
function clearErrors() {
    var errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(function (message) { return message.remove(); });
}
// Function to validate email format
function validateEmail(email) {
    var emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailPattern.test(email);
}
// Function to save data and display it
function saveDataAndDisplay(data) {
    console.log('Saving resume data:', data);
    localStorage.setItem('resumeData', JSON.stringify(data));
    // Display saved data in a readable format (can be enhanced)
    var resumeDisplay = document.getElementById('resume-display');
    resumeDisplay.innerHTML = "\n      <h2>Resume Preview</h2>\n      <p><strong>Username:</strong> ".concat(data.userName, "</p>\n      <p><strong>Full Name:</strong> ").concat(data.fullName, "</p>\n      <p><strong>Email:</strong> ").concat(data.email, "</p>\n      <p><strong>Contact Number:</strong> ").concat(data.contactNumber, "</p>\n      <p><strong>Education:</strong> ").concat(data.education, "</p>\n      <p><strong>Experience:</strong> ").concat(data.experience, "</p>\n      <p><strong>Skills:</strong> ").concat(data.skills, "</p>\n      <p><strong>Home Address:</strong> ").concat(data.address, "</p>\n      <p><strong>LinkedIn Profile:</strong> <a href=\"").concat(data.linkedinProfile, "\" target=\"_blank\">").concat(data.linkedinProfile, "</a></p>\n      ").concat(data.displayPicture ? "<img src=\"".concat(data.displayPicture, "\" alt=\"Display Picture\" class=\"display-Picture\" />") : '', "\n    ");
    // Generate shareable link and enable PDF download
    var shareableLinkContainer = document.getElementById('shareable-link-container');
    shareableLinkContainer.style.display = 'block';
}
// Restore resume data on page load if it exists
window.onload = function () {
    var storedResumeData = localStorage.getItem('resumeData');
    if (storedResumeData) {
        var data = JSON.parse(storedResumeData);
        saveDataAndDisplay(data); // Display saved resume on page load
    }
};
// Function to handle PDF download
function downloadPDF(data) {
    // Use jsPDF to generate PDF
    var jsPDF = window.jspdf.jsPDF;
    var doc = new jsPDF();
    // Add content to PDF
    doc.text('Resume', 10, 10);
    doc.text("Username: ".concat(data.userName), 10, 20);
    doc.text("Full Name: ".concat(data.fullName), 10, 30);
    doc.text("Email: ".concat(data.email), 10, 40);
    doc.text("Contact Number: ".concat(data.contactNumber), 10, 50);
    doc.text("Education: ".concat(data.education), 10, 60);
    doc.text("Experience: ".concat(data.experience), 10, 70);
    doc.text("Skills: ".concat(data.skills), 10, 80);
    doc.text("Home Address: ".concat(data.address), 10, 90);
    doc.text("LinkedIn Profile: ".concat(data.linkedinProfile), 10, 100);
    // If a display picture exists, add it to the PDF
    if (data.displayPicture) {
        var img_1 = new Image();
        img_1.src = data.displayPicture;
        img_1.onload = function () {
            doc.addImage(img_1, 'JPEG', 10, 110, 50, 50); // Adjust dimensions as necessary
            doc.save('resume.pdf');
        };
    }
    else {
        // Save PDF if no image
        doc.save('resume.pdf');
    }
}
// Attach the downloadPDF function to the "Download PDF" button
(_b = document.getElementById('download-pdf')) === null || _b === void 0 ? void 0 : _b.addEventListener('click', function () {
    var storedResumeData = localStorage.getItem('resumeData');
    if (storedResumeData) {
        var data = JSON.parse(storedResumeData);
        downloadPDF(data);
    }
});
