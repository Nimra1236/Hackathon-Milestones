document.addEventListener('DOMContentLoaded', () => {
  const resumeForm = document.getElementById('resumeform') as HTMLFormElement | null;
  const outputElement = document.getElementById('Output') as HTMLDivElement | null;

  if (resumeForm && outputElement) {
    resumeForm.addEventListener('submit', (event: Event) => {
      event.preventDefault(); // Prevent form submission and page reload

      // Fetching form inputs
      const fullName = (document.getElementById('full-name') as HTMLInputElement).value;
      const email = (document.getElementById('email-address') as HTMLInputElement).value;
      const contactNumber = (document.getElementById('contact-number') as HTMLInputElement).value;
      const education = (document.getElementById('education') as HTMLTextAreaElement).value;
      const experience = (document.getElementById('experience') as HTMLTextAreaElement).value;
      const skills = (document.getElementById('skills') as HTMLTextAreaElement).value;
      const homeAddress = (document.getElementById('home-address') as HTMLTextAreaElement).value;
      const linkedinProfile = (document.getElementById('linkedin-profile') as HTMLInputElement).value;

      // Create resume content dynamically, ensuring it is not editable
      const resumeOutput = `
        <h2>Resume</h2>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${contactNumber}</p>
        <p><strong>Home Address:</strong> ${homeAddress}</p>
        <p><strong>LinkedIn Profile:</strong> <a href="${linkedinProfile}" target="_blank">${linkedinProfile}</a></p>
        <h3>Education</h3>
        <p>${education}</p>
        <h3>Experience</h3>
        <p>${experience}</p>
        <h3>Skills</h3>
        <p>${skills}</p>
      `;

      // Output the resume content into the Output div, making it non-editable
      outputElement.innerHTML = resumeOutput;
      outputElement.setAttribute('contenteditable', 'false'); // Prevent editing
      outputElement.style.userSelect = 'none'; // Disable text selection
      outputElement.style.pointerEvents = 'none'; // Disable any interaction with the content

      // Disable all form fields
      const formElements = resumeForm.querySelectorAll('input, textarea, button');
      formElements.forEach((element) => {
        (element as HTMLInputElement).disabled = true;
      });
    });
  } else {
    console.error('Could not find the form or output element.');
  }
});
