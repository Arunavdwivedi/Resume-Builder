let profileImage = null;

// Function to handle profile picture upload
document.getElementById('profilePic').addEventListener('change', function (event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      profileImage = e.target.result; // Store the image as a data URL
    };
    reader.readAsDataURL(file);
  }
});

function generateResume() {
  // Get user input values
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const phone = document.getElementById('phone').value;
  const address = document.getElementById('address').value;
  const education = document.getElementById('education').value;
  const experience = document.getElementById('experience').value;
  const skills = document.getElementById('skills').value;

  // Generate resume preview
  const previewContent = `
    ${profileImage ? `<img src="${profileImage}" alt="Profile Picture">` : ''}
    <h3>${name}</h3>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Phone:</strong> ${phone}</p>
    <p><strong>Address:</strong> ${address}</p>
    <hr>
    <h4>Education</h4>
    <p>${education}</p>
    <h4>Experience</h4>
    <p>${experience}</p>
    <h4>Skills</h4>
    <p>${skills}</p>
  `;

  // Display resume preview
  document.getElementById('previewContent').innerHTML = previewContent;
}

function downloadResume() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  // Get the content from the preview
  const content = document.getElementById('previewContent');

  // Add profile picture to PDF (if available)
  if (profileImage) {
    const img = new Image();
    img.src = profileImage;
    doc.addImage(img, 'JPEG', 10, 10, 40, 40); // Adjust position and size as needed
  }

  // Add text content to PDF
  const text = content.innerText;
  doc.setFontSize(12);
  doc.text(text, 10, profileImage ? 60 : 20); // Adjust position based on image

  // Save the PDF
  doc.save('resume.pdf');
}