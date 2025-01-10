const username = localStorage.getItem('loggedInUser')

if (username) {
  document.getElementById('username').textContent = username
} else {
  document.getElementById('username').textContent = 'Guest' // Or redirect to login page

}
