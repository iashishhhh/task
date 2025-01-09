document.getElementById('passwordResetForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  clearErrors();

  const email = document.getElementById('email').value.trim();
  const newPassword = document.getElementById('password').value.trim();
  const confirmNewPassword = document.getElementById('confirmPassword').value.trim();

  let isValid = true;

  // Email Validation
  if (email === '') {
    showError('emailError', 'Email is required.');
    isValid = false;
  } else if (!validateEmail(email)) {
    showError('emailError', 'Please enter a valid email address.');
    isValid = false;
  }

  // New Password Validation
  if (newPassword === '') {
    showError('passwordError', 'New password is required.');
    isValid = false;
  } else if (!validatePassword(newPassword)) {
    showError(
      'passwordError',
      'Password must be at least 8 characters long and contain uppercase, lowercase, digit, and special character.'
    );
    isValid = false;
  }

  // Confirm Password Validation
  if (confirmNewPassword === '') {
    showError('confirmPasswordError', 'Please confirm your new password.');
    isValid = false;
  } else if (newPassword !== confirmNewPassword) {
    showError('confirmPasswordError', 'Passwords do not match.');
    isValid = false;
  }

  if (isValid) {
    const apiUrl = 'http://localhost:3000/users'; // Adjust API URL to match your JSON server endpoint

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const users = await response.json();

      // Check if the email exists in the users data
      const user = users.find(user => user.email === email);

      if (user) {
        // Update to new password
        user.password = newPassword;

        // Send updated user data back to the server
        const updateResponse = await fetch(`${apiUrl}/${user.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            password: newPassword,
          }),
        });

        // if (updateResponse.ok) {
        //   alert('Password successfully updated.');
        // } 
        if (updateResponse.ok) {
          window.location.href = 'login.html'; 
        } 
        
        else {
          showError('passwordError', 'Failed to update password. Please try again later.');
        }

      } else {
        showError('emailError', 'Email not found. Please provide a registered email.');
      }

    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  }
});

// Eye toggle functionality for "New Password"
document.getElementById('togglePassword').addEventListener('click', function () {
  const passwordField = document.getElementById('password');
  const icon = this.querySelector('i'); // Select the icon inside the span

  if (passwordField.type === 'password') {
    passwordField.type = 'text'; // Show the password
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash'); // Change icon to "eye-slash"
  } else {
    passwordField.type = 'password'; // Hide the password
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye'); // Change icon back to "eye"
  }
});

// Eye toggle functionality for "Confirm Password"
document.getElementById('toggleConfirmPassword').addEventListener('click', function () {
  const confirmPasswordField = document.getElementById('confirmPassword');
  const icon = this.querySelector('i'); // Select the icon inside the span

  if (confirmPasswordField.type === 'password') {
    confirmPasswordField.type = 'text'; // Show the password
    icon.classList.remove('fa-eye');
    icon.classList.add('fa-eye-slash'); // Change icon to "eye-slash"
  } else {
    confirmPasswordField.type = 'password'; // Hide the password
    icon.classList.remove('fa-eye-slash');
    icon.classList.add('fa-eye'); // Change icon back to "eye"
  }
});

// Helper functions
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
}

function showError(elementId, message) {
  document.getElementById(elementId).innerText = message;
}

function clearErrors() {
  document.querySelectorAll('.text-danger').forEach(errorElement => {
    errorElement.innerText = '';
  });
}
