const loggedUser = sessionStorage.getItem("loggedUser");

if (!loggedUser) {
  window.location.href = "../index.html";
} else {
  let homeDiv = document.getElementById("homeContentDiv");
  homeDiv.innerHTML = `<h1 class="text-info my-4">Welcome ${loggedUser}</h1>`;
}

function logout() {
  sessionStorage.removeItem("loggedUser");
  window.location.href = "../index.html";
}
