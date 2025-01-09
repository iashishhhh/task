$(document).ready(function () {
  $('#loginForm').submit(async function (event) {
    event.preventDefault();

    const username = $('#typeUsernameX').val().trim();
    const password = $('#typePasswordX').val().trim();

    clearErrors();

    const storedUserData = localStorage.getItem('userData');
    if (!storedUserData) {
      alert('Create New Account');
      return;
    }

    let userData;
    try {
      userData = JSON.parse(storedUserData);
    } catch (e) {
      showError('#typeUsernameX', 'Error parsing user data. Please sign up first!');
      return;
    }

    let isValid = true;

    if (username === '') {
      showError('#typeUsernameX', 'Username is required!');
      isValid = false;
    } else if (username !== userData.email) {
      showError('#typeUsernameX', 'Email does not match!');
      isValid = false;
    } else {
      console.log('Email matches!');
    }

    if (password === '') {
      showError('#typePasswordX', 'Password is required!');
      isValid = false;
    } else if (password !== userData.password) {
      showError('#typePasswordX', 'Password does not match!');
      isValid = false;
    }

    if (isValid) {
      alert('Login successful!');
      window.location.href = 'dashboard.html';
    }
  });

  // New Code Addition: Check Credentials with JSON Server
  $('#loginForm').submit(async function (e) {
    e.preventDefault();

    const username = $('#typeUsernameX').val().trim();
    const password = $('#typePasswordX').val().trim();

    const apiUrl = 'http://localhost:3000/users';

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }

      const users = await response.json();

      // Check if email and password match any user
      const user = users.find(user => user.email === username && user.password === password);

      if (user) {
        alert('Login successful via JSON Server!');
        window.location.href = 'dashboard.html';
      } else {
        showError('#typeUsernameX', 'Invalid email or password!');
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  });

  function showError(selector, message) {
    $(selector)
      .addClass('is-invalid')
      .after(`<div class="error-message text-danger">${message}</div>`);
  }

  function clearErrors() {
    $('.error-message').remove();
    $('input').removeClass('is-invalid');
  }
});
