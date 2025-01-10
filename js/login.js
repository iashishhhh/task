$(document).ready(function () {
  // Handle login form submission
  $('#loginForm').submit(async function (event) {
    event.preventDefault(); // Prevent default form submission

    const username = $('#typeUsernameX').val().trim();
    const password = $('#typePasswordX').val().trim();

    clearErrors();

    // Validate inputs
    if (username === "") {
      showError('#typeUsernameX', 'Email is required.');
    }

    if (password === "") {
      showError('#typePasswordX', 'Password is required.');
    }

    // Email format validation
    if (username !== "" && !validateEmail(username)) {
      showError('#typeUsernameX', 'Please enter a valid email address.');
    }

    if ($('#typeUsernameX').hasClass('is-invalid') || $('#typePasswordX').hasClass('is-invalid')) {
      return;
    }

    const apiUrl = 'http://localhost:3000/users';

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const users = await response.json();

      const user = users.find(user => user.email === username);

      if (user) {
        if (user.password === password) {
          alert('Login successful!');
          
          // Store the user's username in localStorage
          localStorage.setItem('loggedInUser', user.username);
          
          // Redirect to the dashboard page
          window.location.href = 'dashboard.html'; 
        } else {
          showError('#typePasswordX', 'Invalid password!');
        }
      } else {
        showError('#typeUsernameX', 'Email not found!');
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  });

  // Function to show error messages
  function showError(selector, message) {
    $(selector)
      .addClass('is-invalid')
      .after(`<div class="error-message text-danger">${message}</div>`);
  }

  // Function to clear error messages
  function clearErrors() {
    $('.error-message').remove();
    $('input').removeClass('is-invalid');
  }

  // Email validation function
  function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  }

  // Toggle password visibility
  const passwordField = document.getElementById('typePasswordX');
  const toggleButton = document.getElementById('togglePasswordX');

  toggleButton.addEventListener('click', function (event) {
    event.preventDefault();

    if (passwordField.type === 'password') {
      passwordField.type = 'text'; // Show the password
      this.innerHTML = '<i class="fa-solid fa-eye-slash"></i>'; // Change icon to "eye-slash"
    } else {
      passwordField.type = 'password'; // Hide the password
      this.innerHTML = '<i class="fa-solid fa-eye"></i>'; // Change icon back to "eye"
    }
  });

  // Check if a user is already logged in
  const loggedInUser = localStorage.getItem('loggedInUser');
  if (loggedInUser) {
    $('#username').text(loggedInUser); // Display the username in the dropdown
  } else {
    $('#username').text('Guest'); // Show 'Guest' if no user is logged in
  }
});
