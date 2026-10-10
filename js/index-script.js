// Show input error messages
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "news-letter-subscribe-form error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Show success color
function showSuccess(input, message) {
  const formControl = input.parentElement;
  formControl.className = "news-letter-subscribe-form success";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

// Check if the email is valid
function checkEmail(input) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Simple email regular expression
  if (re.test(input.value.trim())) {
    showSuccess(input, "Thankyou for subscribing");
  } else {
    showError(input, "Email is not valid");
  }
}


// Get form elements
const subscribeform = document.getElementById("news-letter-subscribe-form");
const email = document.getElementById("email");

// Add form event listener for validation
subscribeform.addEventListener("submit", function (e) {
  e.preventDefault();

  // Validation rules
  checkEmail(email);
});