// Define the type for resume data
interface ResumeData {
  userName: string;
  fullName: string;
  email: string;
  contactNumber: string;
  education: string;
  experience: string;
  skills: string;
  address: string;
  linkedinProfile: string;
  displayPicture?: string;
}

// Function to handle form submission
document.getElementById('resume-form')?.addEventListener('submit', function (event: Event) {
    event.preventDefault(); // Prevent form submission
  
    // Clear any previous error messages
    clearErrors();
  
    // Collect values from form fields
    const userName = (document.getElementById('userName') as HTMLInputElement).value.trim();
    const fullName = (document.getElementById('full-name') as HTMLInputElement).value.trim();
    const email = (document.getElementById('email-address') as HTMLInputElement).value.trim();
    const contactNumber = (document.getElementById('contact-number') as HTMLInputElement).value.trim();
    const education = (document.getElementById('education') as HTMLTextAreaElement).value.trim();
    const experience = (document.getElementById('experience') as HTMLTextAreaElement).value.trim();
    const skills = (document.getElementById('skills') as HTMLTextAreaElement).value.trim();
    const address = (document.getElementById('home-address') as HTMLTextAreaElement).value.trim();
    const linkedinProfile = (document.getElementById('linkedin-profile') as HTMLInputElement).value.trim();
  
    // Validate form fields
    const isValid = validateForm({
      userName,
      fullName,
      email,
      contactNumber,
      education,
      experience,
      skills,
      address,
      linkedinProfile,
    });
  
    if (!isValid) return; // Stop submission if validation fails
  
    // Handle display picture
    const displayPictureFile = (document.getElementById('displayPicture') as HTMLInputElement).files?.[0];
    let displayPictureDataUrl = '';
  
    if (displayPictureFile) {
      const reader = new FileReader();
      reader.onload = function () {
        displayPictureDataUrl = reader.result as string;
        saveDataAndDisplay({
          userName,
          fullName,
          email,
          contactNumber,
          education,
          experience,
          skills,
          address,
          linkedinProfile,
          displayPicture: displayPictureDataUrl,
        });
      };
      reader.readAsDataURL(displayPictureFile);
    } else {
      saveDataAndDisplay({
        userName,
        fullName,
        email,
        contactNumber,
        education,
        experience,
        skills,
        address,
        linkedinProfile,
      });
    }
  });
  
  // Function to validate the form
  function validateForm(data: ResumeData): boolean {
    let isValid = true;
  
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
  function showError(inputId: string, message: string): void {
    const inputElement = document.getElementById(inputId) as HTMLElement;
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = 'red';
    errorElement.textContent = message;
    inputElement.parentElement?.appendChild(errorElement);
  }
  
  // Function to clear previous errors
  function clearErrors(): void {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach((message) => message.remove());
  }
  
  // Function to validate email format
  function validateEmail(email: string): boolean {
    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return emailPattern.test(email);
  }
  
  // Function to save data and display it
  function saveDataAndDisplay(data: ResumeData): void {
    console.log('Saving resume data:', data);
    localStorage.setItem('resumeData', JSON.stringify(data));
  
    // Display saved data in a readable format (can be enhanced)
    const resumeDisplay = document.getElementById('resume-display') as HTMLElement;
    resumeDisplay.innerHTML = `
      <h2>Resume Preview</h2>
      <p><strong>Username:</strong> ${data.userName}</p>
      <p><strong>Full Name:</strong> ${data.fullName}</p>
      <p><strong>Email:</strong> ${data.email}</p>
      <p><strong>Contact Number:</strong> ${data.contactNumber}</p>
      <p><strong>Education:</strong> ${data.education}</p>
      <p><strong>Experience:</strong> ${data.experience}</p>
      <p><strong>Skills:</strong> ${data.skills}</p>
      <p><strong>Home Address:</strong> ${data.address}</p>
      <p><strong>LinkedIn Profile:</strong> <a href="${data.linkedinProfile}" target="_blank">${data.linkedinProfile}</a></p>
      ${data.displayPicture ? `<img src="${data.displayPicture}" alt="Display Picture" class="display-Picture" />` : ''}
    `;
  
    // Generate shareable link and enable PDF download
    const shareableLinkContainer = document.getElementById('shareable-link-container') as HTMLElement;
    shareableLinkContainer.style.display = 'block';
  }
  
  // Restore resume data on page load if it exists
  window.onload = function (): void {
    const storedResumeData = localStorage.getItem('resumeData');
    if (storedResumeData) {
      const data: ResumeData = JSON.parse(storedResumeData);
      saveDataAndDisplay(data); // Display saved resume on page load
    }
  };
// Function to handle PDF download
function downloadPDF(data: ResumeData): void {
  // Use jsPDF to generate PDF


 const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Add content to PDF
  doc.text('Resume', 10, 10);
  doc.text(`Username: ${data.userName}`, 10, 20);
  doc.text(`Full Name: ${data.fullName}`, 10, 30);
  doc.text(`Email: ${data.email}`, 10, 40);
  doc.text(`Contact Number: ${data.contactNumber}`, 10, 50);
  doc.text(`Education: ${data.education}`, 10, 60);
  doc.text(`Experience: ${data.experience}`, 10, 70);
  doc.text(`Skills: ${data.skills}`, 10, 80);
  doc.text(`Home Address: ${data.address}`, 10, 90);
  doc.text(`LinkedIn Profile: ${data.linkedinProfile}`, 10, 100);

  // If a display picture exists, add it to the PDF
  if (data.displayPicture) {
      const img = new Image();
      img.src = data.displayPicture;
      img.onload = function () {
          doc.addImage(img, 'JPEG', 10, 110, 50, 50); // Adjust dimensions as necessary
          doc.save('resume.pdf');
      };
  } else {
      // Save PDF if no image
      doc.save('resume.pdf');
  }
}

// Attach the downloadPDF function to the "Download PDF" button
document.getElementById('download-pdf')?.addEventListener('click', function () {
  const storedResumeData = localStorage.getItem('resumeData');
  if (storedResumeData) {
      const data: ResumeData = JSON.parse(storedResumeData);
      downloadPDF(data);
  }
});
