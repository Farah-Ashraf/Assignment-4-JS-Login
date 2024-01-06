let allAccounts = [];

if (localStorage.getItem("allAccounts") != null) {
  allAccounts = JSON.parse(localStorage.getItem("allAccounts"));
}

//select inputs in signup page
let nameInput = document.querySelector("#userName");
let emailInput = document.querySelector("#userEmail");
let passInput = document.querySelector("#userPassword");

//select inputs in login page
let emailInputLogin = document.getElementById("userEmailLogin");
let passInputLogin = document.getElementById("userPassLogin");

//select the validation Div in signup page
let validationMessageSignupPage = document.querySelector("div.d-none");

//select the validation Div in login page
let validationMessageLoginPage = document.querySelector("div.d-none");

//select the home div that will contain the welcome message
let homeDiv = document.getElementById("homeContentDiv");

function signUp() {
  let userAccount = {
    name: nameInput.value,
    email: emailInput.value,
    password: passInput.value,
  };

  if (!ckeckSignUpValidation()) {
    validationMessageSignupPage.classList.remove("d-none");
    return;
  }

  let isUserExists = false;

  for (let i = 0; i < allAccounts.length; i++) {
    if (emailInput.value == allAccounts[i].email) {
      validationMessageSignupPage.classList.remove("d-none");
      validationMessageSignupPage.innerHTML = `<p class="text-danger fs-6 py-3"> Email already exists. </p>`;
      isUserExists = true; // email exist
    }
  }

  if (!isUserExists) {
    allAccounts.push(userAccount);
    localStorage.setItem("allAccounts", JSON.stringify(allAccounts));

    validationMessageSignupPage.classList.remove("d-none");
    validationMessageSignupPage.innerHTML = `<p class="text-success fs-6 py-3"> Success. </p>`;
    //  window.open('../index.html' ,'_self' )
  }
}

// validations of signup page (name, email, password)
function userNameValidation() {
  let nameRegex = /[a-z]{3,}/i;

  return nameRegex.test(nameInput.value);
}

function userEmailValidation() {
  let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  return emailRegex.test(emailInput.value);
}

function userPassValidation() {
  let passRegex = /\w{3,}/;

  return passRegex.test(passInput.value);
}

// return true if all the validation of the signup is true
function ckeckSignUpValidation() {
  return userNameValidation() && userEmailValidation() && userPassValidation();
}

function login() {
  let isLoggedIn = false;
  let userNameLoggedIn = "";

  if (isLoginEmpty == true) {
    validationMessageLoginPage.classList.remove("d-none");
    validationMessageLoginPage.innerHTML = `<p class="text-danger fs-4 py-3 ">Email and password are required!</p>`;
    return;
  }

  for (let i = 0; i < allAccounts.length; i++) {
    if (
      emailInputLogin.value == allAccounts[i].email &&
      passInputLogin.value == allAccounts[i].password
    ) {
      isLoggedIn = true;
      userNameLoggedIn = allAccounts[i].name;
      break;
    }
  }

  //============= why this code doesn't work? ====================

  // if (isLoggedIn) {
  //   window.location.replace = "../home.html";
  //   homeDiv.innerHTML = `<h1 class="text-info my-4">Welcome ${userNameLoggedIn}</h1>`;

  // } else {
  //   validationMessageLoginPage.classList.remove("d-none");
  // }

  if (isLoggedIn) {
    sessionStorage.setItem("loggedUser", userNameLoggedIn);
    window.location.href = "../home.html";
  } else {
    validationMessageLoginPage.classList.remove("d-none");
  }
}

function isLoginEmpty() {
  return emailInputLogin.value == "" || passInputLogin.value == "";
}
