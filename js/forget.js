$(document).ready(function () {
  $('#forgotPasswordForm').on('submit', async function (e) {
    e.preventDefault();

    clearErrors();

    var emailInput = $('#email');
    var email = emailInput.val().trim();
    var isValid = true;

    // Validate email input
    if (email === '') {
      emailInput.addClass('is-invalid');
      $('#emailError').text('Email is required.').show();
      isValid = false;
    } else if (!validateEmail(email)) {
      emailInput.addClass('is-invalid');
      $('#emailError').text('Please enter a valid email address.').show();
      isValid = false;
    }

    if (isValid) {
      const apiUrl = 'http://localhost:3000/users';  // Adjust API URL to match your JSON server endpoint

      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }

        const users = await response.json();

        // Check if the email exists in the users data
        const user = users.find(user => user.email === email);

        if (user) {
          // If the email matches, proceed to the reset page
          alert('Password reset link has been sent to your email address!');
          window.location.href = 'reset.html';
        } else {
          // If email is not found, show error
          emailInput.addClass('is-invalid');
          $('#emailError').text('Email not found in our records!').show();
        }

      } catch (error) {
        alert(`Error: ${error.message}`);
      }
    }
  });

  function validateEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function clearErrors() {
    $('#email').removeClass('is-invalid');
    $('#emailError').hide();
  }
});
