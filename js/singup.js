document.getElementById('registrationForm').addEventListener('submit', async function (event) {
  event.preventDefault();

  clearErrors();

  const fullname = document.getElementById('fullname').value.trim();
  const email = document.getElementById('email').value.trim();
  const phone = document.getElementById('tel').value.trim();
  const password = document.getElementById('pass').value.trim();
  const confirmPassword = document.getElementById('pass2').value.trim();
  const termsAccepted = document.getElementById('chb').checked;

  let isValid = true;

  // Custom validation
  if (fullname === '') {
    showError('fullnameError', 'Full Name is required!');
    isValid = false;
  }

  if (email === '') {
    showError('emailError', 'Email is required!');
    isValid = false;
  }
  if (phone === '') {
    showError('phoneError', 'Phone number is required!');
    isValid = false;
  } else if (!validatePhone(phone)) {
    showError('phoneError', 'Please enter a valid 10-digit phone number.');
    isValid = false;
  }
  if (password === '') {
    showError('passwordError', 'Password is required!');
    isValid = false;
  } else if (password.length < 6) {
    showError('passwordError', 'Password must be at least 6 characters long.');
    isValid = false;
  }
  if (confirmPassword === '') {
    showError('confirmPasswordError', 'Please confirm your password!');
    isValid = false;
  } else if (password !== confirmPassword) {
    showError('confirmPasswordError', 'Passwords do not match!');
    isValid = false;
  }
  if (!termsAccepted) {
    showError('termsError', 'You must accept the terms and conditions to proceed.');
    isValid = false;
  }

  if (isValid) {
    const formData = {
      fullname,
      email,
      phone,
      password,
      termsAccepted,
    };

    localStorage.setItem('userData', JSON.stringify(formData));
    console.log('User data saved to localStorage!');

    alert('User successfully created!');

    const apiUrl = 'http://localhost:3000/users';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          name: `${fullname} `, 
          email, 
          password,
        }),
      });

      if (response.ok) {
        document.getElementById('message').innerHTML = `
          <div class="alert alert-success">Signup successful!</div>
        `;
        document.getElementById('registrationForm').reset();
      } else {
        document.getElementById('message').innerHTML = `
          <div class="alert alert-danger">Signup failed. Try again!</div>
        `;
      }
    } catch (error) {
      document.getElementById('message').innerHTML = `
        <div class="alert alert-danger">Error: ${error.message}</div>
      `;
    }
  }
});

function validatePhone(phone) {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone);
}

function showError(elementId, message) {
  document.getElementById(elementId).innerText = message;
}

function clearErrors() {
  const errorElements = document.querySelectorAll('.error');
  errorElements.forEach(element => {
    element.innerText = '';
  });
}
