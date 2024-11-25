// Get references to form and resume container
const form = document.getElementById("resume-form") as HTMLFormElement;
const resumeContainer = document.getElementById("resume")!;

// Utility to make elements editable
function makeEditable(element: HTMLElement) {
  element.setAttribute("contenteditable", "true");
  element.classList.add("editable");

  // Save changes when focus is lost
  element.addEventListener("blur", () => {
    console.log(`Updated content: ${element.innerText}`);
  });
}

// Function to create and render the dynamic, editable resume
function generateResume(data: {
  name: string;
  email: string;
  phone: string;
  profilePic: string;
  education: string[];
  workExperience: string[];
  skills: string[];
}) {
  resumeContainer.innerHTML = `
    <div class="resume-header">
      <img src="${data.profilePic}" alt="Profile Picture">
      <h2 class="editable">${data.name}</h2>
      <p class="editable">${data.email} | ${data.phone}</p>
    </div>
    <div class="resume-section">
      <h3>Education</h3>
      <ul>
        ${data.education
          .map(
            (item) => `<li class="editable" contenteditable="true">${item.trim()}</li>`
          )
          .join("")}
      </ul>
    </div>
    <div class="resume-section">
      <h3>Work Experience</h3>
      <ul>
        ${data.workExperience
          .map(
            (item) => `<li class="editable" contenteditable="true">${item.trim()}</li>`
          )
          .join("")}
      </ul>
    </div>
    <div class="resume-section">
      <h3>Skills</h3>
      <p class="editable">
        ${data.skills.map((item) => item.trim()).join(", ")}
      </p>
    </div>
  `;

  // Make editable sections editable
  const editableElements = resumeContainer.querySelectorAll(".editable");
  editableElements.forEach((element) => {
    makeEditable(element as HTMLElement);
  });
}

// Event listener for form submission
form.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get form values
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const phone = (document.getElementById("phone") as HTMLInputElement).value;
  const profilePic = (document.getElementById("profile-pic") as HTMLInputElement).value;
  const education = (document.getElementById("education") as HTMLTextAreaElement).value.split(";");
  const workExperience = (document.getElementById("work-experience") as HTMLTextAreaElement).value.split(";");
  const skills = (document.getElementById("skills") as HTMLTextAreaElement).value.split(",");

  // Generate the editable resume
  generateResume({ name, email, phone, profilePic, education, workExperience, skills });
});
