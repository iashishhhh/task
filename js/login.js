$(document).ready(function () {
  $('#loginForm').submit(function (event) {
    event.preventDefault()

    const username = $('#typeUsernameX').val().trim()
    const password = $('#typePasswordX').val().trim()

    clearErrors()

    const storedUserData = localStorage.getItem('userData')
    if (!storedUserData) {
      showError('#typeUsernameX', ' Please Enter your valid Email!')
      return
    }

    let userData
    try {
      userData = JSON.parse(storedUserData)
    } catch (e) {
      showError('#typeUsernameX', 'Error parsing user data. Please sign up first!')
      return
    }

    let isValid = true

    if (username === '') {
      showError('#typeUsernameX', 'Username is required!')
      isValid = false
    } else if (username !== userData.email) {
      showError('#typeUsernameX', 'Email does not match!')
      isValid = false
    } else {
      console.log('Email matches!')
    }

    if (password === '') {
      showError('#typePasswordX', 'Password is required!')
      isValid = false
    } else if (password !== userData.password) {
      showError('#typePasswordX', 'Password does not match!')
      isValid = false
    }

    if (isValid) {
      alert('Login successful!')
      window.location.href = 'dashboard.html'
    }
  })

  function showError (selector, message) {
    $(selector)
      .addClass('is-invalid')
      .after(`<div class="error-message text-danger">${message}</div>`)
  }

  function clearErrors () {
    $('.error-message').remove()
    $('input').removeClass('is-invalid')
  }
})
