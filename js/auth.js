/**
 * NexMart Authentication Controller
 * Controls Login & Signup tab switching, form validation, password show/hide, and simulated session login.
 */

document.addEventListener("DOMContentLoaded", () => {
  initAuthForm();
});

function initAuthForm() {
  const loginTabBtn = document.getElementById("tab-btn-login");
  const signupTabBtn = document.getElementById("tab-btn-signup");
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");

  if (loginTabBtn && signupTabBtn) {
    loginTabBtn.addEventListener("click", () => {
      loginTabBtn.classList.add("active");
      signupTabBtn.classList.remove("active");
      if (loginForm) loginForm.style.display = "block";
      if (signupForm) signupForm.style.display = "none";
    });

    signupTabBtn.addEventListener("click", () => {
      signupTabBtn.classList.add("active");
      loginTabBtn.classList.remove("active");
      if (signupForm) signupForm.style.display = "block";
      if (loginForm) loginForm.style.display = "none";
    });
  }
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const email = document.getElementById("login-email").value.trim();
  const pass = document.getElementById("login-password").value;
  const errorMsg = document.getElementById("login-error-msg");

  if (!email || !pass) {
    if (errorMsg) errorMsg.textContent = "Please fill in all required fields.";
    return;
  }

  // Simulate successful login
  Store.login(email, "Rahul Sharma");
  Utils.showToast("Welcome back to NexMart!", "success");
  setTimeout(() => {
    window.location.href = "account.html";
  }, 600);
}

function handleSignupSubmit(e) {
  e.preventDefault();
  const name = document.getElementById("signup-name").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const phone = document.getElementById("signup-phone").value.trim();
  const pass = document.getElementById("signup-password").value;
  const confirmPass = document.getElementById("signup-confirm-password").value;
  const errorMsg = document.getElementById("signup-error-msg");

  if (!name || !email || !pass || !confirmPass) {
    if (errorMsg) errorMsg.textContent = "Please fill in all required fields.";
    return;
  }

  if (pass !== confirmPass) {
    if (errorMsg) errorMsg.textContent = "Passwords do not match!";
    return;
  }

  // Simulate registration
  Store.login(email, name);
  Utils.showToast("Account created successfully!", "success");
  setTimeout(() => {
    window.location.href = "account.html";
  }, 600);
}

function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;

  if (input.type === "password") {
    input.type = "text";
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`;
  } else {
    input.type = "password";
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
  }
}
