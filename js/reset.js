document.getElementById('passwordResetForm').addEventListener('submit', function (event) {
  event.preventDefault()

  clearErrors()

  const email = document.getElementById('email').value.trim()
  const newPassword = document.getElementById('password').value.trim()
  const confirmNewPassword = document.getElementById('confirmPassword').value.trim()

  let isValid = true

  // Email Validation
  if (email === '') {
    showError('emailError', 'Email is required.')
    isValid = false
  } else if (!validateEmail(email)) {
    showError('emailError', 'Please enter a valid email address.')
    isValid = false
  }



  // New Password Validation
  if (newPassword === '') {
    showError('passwordError', 'New password is required.')
    isValid = false
  } else if (!validatePassword(newPassword)) {
    showError(
      'passwordError',
      'Password must be at least 8 characters long and contain uppercase, lowercase, digit, and special character.'
    )
    isValid = false
  }

  // Confirm Password Validation
  if (confirmNewPassword === '') {
    showError('confirmPasswordError', 'Please confirm your new password.')
    isValid = false
  } else if (newPassword !== confirmNewPassword) {
    showError('confirmPasswordError', 'Passwords do not match.')
    isValid = false
  }

  if (isValid) {
    const storedUserData = JSON.parse(localStorage.getItem('userData'))

    // Check if user exists and old password matches
    if (storedUserData && storedUserData.email === email) {
      if (storedUserData.password === oldPassword) {
        // Update to new password
        storedUserData.password = newPassword

        localStorage.setItem('userData', JSON.stringify(storedUserData))

        alert('Password successfully updated.')

        window.location.href = 'login.html'

        document.getElementById('passwordResetForm').reset()
      } else {
        // showError('oldPasswordError', 'Old password is incorrect.')
      }
    } else {
      showError('emailError', 'Email not found. Please provide a registered email.')
    }
  }
})

function validateEmail (email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function validatePassword (password) {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return passwordRegex.test(password)
}

function showError (elementId, message) {
  document.getElementById(elementId).innerText = message
}

function clearErrors () {
  document.querySelectorAll('.text-danger').forEach(errorElement => {
    errorElement.innerText = ''
  })
}
