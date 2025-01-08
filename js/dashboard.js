const logoutButton = document.getElementById('logout')

logoutButton.addEventListener('click', function () {
  localStorage.clear()
  window.location.href = 'login.html'
})
