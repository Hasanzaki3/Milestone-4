// Get references to form and resume container
var form = document.getElementById("resume-form");
var resumeContainer = document.getElementById("resume");
// Utility to make elements editable
function makeEditable(element) {
    element.setAttribute("contenteditable", "true");
    element.classList.add("editable");
    // Save changes when focus is lost
    element.addEventListener("blur", function () {
        console.log("Updated content: ".concat(element.innerText));
    });
}
// Function to create and render the dynamic, editable resume
function generateResume(data) {
    resumeContainer.innerHTML = "\n    <div class=\"resume-header\">\n      <img src=\"".concat(data.profilePic, "\" alt=\"Profile Picture\">\n      <h2 class=\"editable\">").concat(data.name, "</h2>\n      <p class=\"editable\">").concat(data.email, " | ").concat(data.phone, "</p>\n    </div>\n    <div class=\"resume-section\">\n      <h3>Education</h3>\n      <ul>\n        ").concat(data.education
        .map(function (item) { return "<li class=\"editable\" contenteditable=\"true\">".concat(item.trim(), "</li>"); })
        .join(""), "\n      </ul>\n    </div>\n    <div class=\"resume-section\">\n      <h3>Work Experience</h3>\n      <ul>\n        ").concat(data.workExperience
        .map(function (item) { return "<li class=\"editable\" contenteditable=\"true\">".concat(item.trim(), "</li>"); })
        .join(""), "\n      </ul>\n    </div>\n    <div class=\"resume-section\">\n      <h3>Skills</h3>\n      <p class=\"editable\">\n        ").concat(data.skills.map(function (item) { return item.trim(); }).join(", "), "\n      </p>\n    </div>\n  ");
    // Make editable sections editable
    var editableElements = resumeContainer.querySelectorAll(".editable");
    editableElements.forEach(function (element) {
        makeEditable(element);
    });
}
// Event listener for form submission
form.addEventListener("submit", function (event) {
    event.preventDefault();
    // Get form values
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var phone = document.getElementById("phone").value;
    var profilePic = document.getElementById("profile-pic").value;
    var education = document.getElementById("education").value.split(";");
    var workExperience = document.getElementById("work-experience").value.split(";");
    var skills = document.getElementById("skills").value.split(",");
    // Generate the editable resume
    generateResume({ name: name, email: email, phone: phone, profilePic: profilePic, education: education, workExperience: workExperience, skills: skills });
});
