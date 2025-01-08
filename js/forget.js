$(document).ready(function () {
  $('#forgotPasswordForm').on('submit', function (e) {
    e.preventDefault()

    clearErrors()

    var emailInput = $('#email')
    var email = emailInput.val().trim()
    var isValid = true


    if (email === '') {
      emailInput.addClass('is-invalid')
      $('#emailError').text('Email is required.').show()
      isValid = false
    } else if (!validateEmail(email)) {
      emailInput.addClass('is-invalid')
      $('#emailError').text('Please enter a valid email address.').show()
      isValid = false
    }
    if (isValid) {
      var storedUserData = JSON.parse(localStorage.getItem('userData'))

      if (storedUserData && storedUserData.email === email) {
        alert('Password reset link has been sent to your email address!')
        window.location.href = 'reset.html'
      } else {
        emailInput.addClass('is-invalid')
        $('#emailError').text('Email not found in our records!').show()
      }
    }
  })

  function validateEmail (email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }


  function clearErrors () {
    $('#email').removeClass('is-invalid')
    $('#emailError').hide()
  }
})
