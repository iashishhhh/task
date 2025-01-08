document.getElementById('registrationForm').addEventListener('submit', function (event) {
  event.preventDefault()

  clearErrors()

  const firstName = document.getElementById('name-f').value.trim()
  const lastName = document.getElementById('name-l').value.trim()
  const email = document.getElementById('email').value.trim()
  const phone = document.getElementById('tel').value.trim()
  const password = document.getElementById('pass').value.trim()
  const confirmPassword = document.getElementById('pass2').value.trim()
  const termsAccepted = document.getElementById('chb').checked

  let isValid = true

  // Custom validation
  if (firstName === '') {
    showError('firstNameError', 'First name is required!')
    isValid = false
  }
  if (lastName === '') {
    showError('lastNameError', 'Last name is required!')
    isValid = false
  }
  if (email === '') {
    showError('emailError', 'Email is required!')
    isValid = false
  }
  if (phone === '') {
    showError('phoneError', 'Phone number is required!')
    isValid = false
  } 
  else if (!validatePhone(phone)) {
    showError('phoneError', 'Please enter a valid 10-digit phone number.')
    isValid = false
  }
  if (password === '') {
    showError('passwordError', 'Password is required!')
    isValid = false
  } else if (password.length < 6) {
    showError('passwordError', 'Password must be at least 6 characters long.')
    isValid = false
  }
  if (confirmPassword === '') {
    showError('confirmPasswordError', 'Please confirm your password!')
    isValid = false
  } else if (password !== confirmPassword) {
    showError('confirmPasswordError', 'Passwords do not match!')
    isValid = false
  }
  if (!termsAccepted) {
    showError('termsError', 'You must accept the terms and conditions to proceed.')
    isValid = false
  }

  if (isValid) {
    const formData = {
      firstName,
      lastName,
      email,
      phone,
      password,
    termsAccepted}

    // Save data to localStorage
    localStorage.setItem('userData', JSON.stringify(formData))
    console.log('User data saved to localStorage!')

    alert('User successfully created!')
    window.location.href = 'login.html'
  }
})

function validatePhone (phone) {
  const phoneRegex = /^[0-9]{10}$/
  return phoneRegex.test(phone)
}

function showError (elementId, message) {
  document.getElementById(elementId).innerText = message
}

function clearErrors () {
  const errorElements = document.querySelectorAll('.error')
  errorElements.forEach(element => {
    element.innerText = ''
  })
}
