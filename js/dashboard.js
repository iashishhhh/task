$(document).ready(function () {
  const loggedInUser = localStorage.getItem('loggedInUser')

  if (loggedInUser) {
    document.getElementById('username').textContent = loggedInUser
    $('#username').text(loggedInUser)
  } else {
    document.getElementById('username').textContent = 'Guest'
    $('#username').text('Guest')
  }
})
