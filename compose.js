
function updateCharCount() {
  const textarea = document.getElementById('message');
  const counter = document.getElementById('charCounter');
  counter.textContent = `${textarea.value.length} characters`;
}

// Show success notification
function showSuccess() {
  const successDiv = document.createElement('div');
  successDiv.className = 'success-animation';
  successDiv.innerHTML = `
      <div class="success-icon">
          <i class="fas fa-check-circle"></i>
      </div>
      <h3 style="color: #1f2937; margin-bottom: 8px;">Email Sent!</h3>
      <p style="color: #6b7280;">Your message has been sent successfully.</p>
  `;
  document.body.appendChild(successDiv);

  setTimeout(() => successDiv.remove(), 3000);
}

// Handle form submit
function handleSubmit(event) {
  event.preventDefault();

  const to = document.getElementById('to').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  if (!to || !subject || !message) {
    alert('Please fill in all required fields (To, Subject, and Message)');
    return;
  }

  // (Here you could actually send email via API or IPC if needed)
  console.log("Sending email with attachments:", getSelectedAttachments());

  showSuccess();

  // Clear form after short delay
  setTimeout(clearForm, 1500);
}

// Save Draft notification
function saveDraft() {
  const successDiv = document.createElement('div');
  successDiv.className = 'success-animation';
  successDiv.innerHTML = `
      <div class="success-icon" style="color: #f59e0b;">
          <i class="fas fa-bookmark"></i>
      </div>
      <h3 style="color: #1f2937; margin-bottom: 8px;">Draft Saved!</h3>
      <p style="color: #6b7280;">Your draft has been saved successfully.</p>
  `;
  document.body.appendChild(successDiv);

  setTimeout(() => successDiv.remove(), 3000);
}

// Clear entire form
function clearForm() {
  document.getElementById('to').value = '';
  document.getElementById('cc').value = '';
  document.getElementById('bcc').value = '';
  document.getElementById('subject').value = '';
  document.getElementById('message').value = '';
  document.getElementById('attachments').value = '';
  document.getElementById('attachmentList').innerHTML = '';
  updateCharCount();
}

// Get selected attachment files (array)
function getSelectedAttachments() {
  return Array.from(document.getElementById('attachments').files);
}

// Listen for attachment selection
document.addEventListener("DOMContentLoaded", () => {
  const attachmentInput = document.getElementById('attachments');
  const attachmentList = document.getElementById('attachmentList');

  attachmentInput.addEventListener('change', function () {
    attachmentList.innerHTML = '';

    Array.from(this.files).forEach(file => {
      const tag = document.createElement('span');
      tag.className = 'attachment-tag';
      tag.textContent = file.name;

      // Optional: Add remove button per file
      const removeBtn = document.createElement('button');
      removeBtn.innerHTML = '&times;';
      removeBtn.className = 'remove-attachment';
      removeBtn.onclick = () => {
        removeFileFromInput(file.name);
        tag.remove();
      };

      tag.appendChild(removeBtn);
      attachmentList.appendChild(tag);
    });
  });
});

// Remove file from <input type="file">
function removeFileFromInput(fileName) {
  const input = document.getElementById('attachments');
  const dt = new DataTransfer();

  Array.from(input.files).forEach(file => {
    if (file.name !== fileName) dt.items.add(file);
  });

  input.files = dt.files;
}
