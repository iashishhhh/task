document.getElementById('registrationForm').addEventListener('submit', async function (event) {
  event.preventDefault(); // Prevent default form submission
  
  clearErrors(); // Clear any existing error messages
  resetInvalidClasses(); // Reset invalid classes to make sure all fields are validated

  const fullname = document.getElementById('fullname').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('tel').value.trim();
  const password = document.getElementById('pass').value.trim();
  const confirmPassword = document.getElementById('pass2').value.trim();
  const termsAccepted = document.getElementById('chb').checked;

  let isValid = true;

  // Custom validation for all fields
  if (fullname === '') {
    showError('fullnameError', 'Full Name is required!');
    document.getElementById('fullname').classList.add('is-invalid');
    isValid = false;
  }

  if (email === '') {
    showError('emailError', 'Email is required!');
    document.getElementById('email').classList.add('is-invalid');
    isValid = false;
  } else if (!validateEmail(email)) {
    showError('emailError', 'Please enter a valid email address!');
    document.getElementById('email').classList.add('is-invalid');
    isValid = false;
  }

  if (phone === '') {
    showError('phoneError', 'Phone number is required!');
    document.getElementById('tel').classList.add('is-invalid');
    isValid = false;
  } else if (!validatePhone(phone)) {
    showError('phoneError', 'Please enter a valid 10-digit phone number.');
    document.getElementById('tel').classList.add('is-invalid');
    isValid = false;
  }

  if (password === '') {
    showError('passwordError', 'Password is required!');
    document.getElementById('pass').classList.add('is-invalid');
    isValid = false;
  } else if (password.length < 6) {
    showError('passwordError', 'Password must be at least 6 characters long.');
    document.getElementById('pass').classList.add('is-invalid');
    isValid = false;
  }

  if (confirmPassword === '') {
    showError('confirmPasswordError', 'Please confirm your password!');
    document.getElementById('pass2').classList.add('is-invalid');
    isValid = false;
  } else if (password !== confirmPassword) {
    showError('confirmPasswordError', 'Passwords do not match!');
    document.getElementById('pass2').classList.add('is-invalid');
    isValid = false;
  }

  if (!termsAccepted) {
    showError('termsError', 'You must accept the terms and conditions to proceed.');
    isValid = false;
  }

  // Check if email already exists (this assumes you have a "GET" endpoint to fetch users)
  if (isValid) {
    try {
      const response = await fetch('http://localhost:3000/users');
      const existingUsers = await response.json();

      const emailExists = existingUsers.some(user => user.email === email);

      if (emailExists) {
        showError('emailError', 'This email is already in use. Please choose another.');
        document.getElementById('email').classList.add('is-invalid');
        isValid = false;
      }
    } catch (error) {
      console.error('Error checking existing users:', error);
    }
  }

  // If everything is valid, proceed with form submission
  if (isValid) {
    const formData = {
      fullname,
      email,
      phone,
      password,
      termsAccepted,
    };

    console.log('User data (not saved to localStorage)');

    alert('User successfully created!');

    const apiUrl = 'http://localhost:3000/users';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: fullname, 
          email, 
          phone,
          password,
        }),
      });

      if (response.ok) {
        window.location.href = 'login.html';  // Redirect to login page after successful signup
      } else {
        document.getElementById('message').innerHTML = `
          <div class="alert alert-danger">Signup failed. Please try again!</div>
        `;
      }

    } catch (error) {
      document.getElementById('message').innerHTML = `
        <div class="alert alert-danger">Error: ${error.message}</div>
      `;
    }
  }
});

document.getElementById('togglePassword').addEventListener('click', function () {
  const passwordField = document.getElementById('pass');
  
  if (passwordField.type === 'password') {
    passwordField.type = 'text'; // Show the password
    this.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'; // Change icon to "eye-slash"
  } else {
    passwordField.type = 'password'; // Hide the password
    this.innerHTML = '<i class="fa-solid fa-eye"></i>';
  }
});

document.getElementById('toggleConfirmPassword').addEventListener('click', function () {
  const confirmPasswordField = document.getElementById('pass2');
  
  if (confirmPasswordField.type === 'password') {
    confirmPasswordField.type = 'text'; 
    this.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'; 
  } else {
    confirmPasswordField.type = 'password'; 
    this.innerHTML = '<i class="fa-solid fa-eye"></i>';
  }
});

// Helper functions
function validatePhone(phone) {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
}

function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
}

function showError(elementId, message) {
  document.getElementById(elementId).innerText = message;
}

function clearErrors() {
  const errorElements = document.querySelectorAll('.error');
  errorElements.forEach(element => {
    element.innerText = ''; // Clear error messages
  });
}

function resetInvalidClasses() {
  // Remove invalid classes from input fields before adding them again
  const inputs = document.querySelectorAll('.form-control');
  inputs.forEach(input => input.classList.remove('is-invalid'));
}

// Restrict phone number input to numbers only
document.getElementById('tel').addEventListener('input', function (event) {
  // Remove non-numeric characters
  this.value = this.value.replace(/\D/g, '');
});
