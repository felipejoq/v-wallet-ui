import {USERS} from "../data/users.js";
import {alertLoginFail, emailInput, passwordInput} from "./elements.js";
import {loading} from "../utils/loading.js";
import {navigateTo} from "../utils/navigate.js";

export const loginAction = ({loginForm}) => {
  const data = JSON.parse(localStorage.getItem('data'));
  if(data.user) navigateTo({path: '/pages/menu.html'});
  $(loginForm).on('submit', (event) => {
    event.preventDefault();

    const request = {
      emailUser: emailInput.value.trim(),
      passwordUser: passwordInput.value.trim()
    }

    const result = isValidLogin(request);

    if (result.isValid && result.user) {
      localStorage.setItem('data', JSON.stringify({ ...data, user: result.user }));
      loading({
        location: `/pages/menu.html`,
        timeMs: 2000,
        callback: navigateTo
      });
    }
  });
}

function isValidLogin({emailUser, passwordUser}) {
  let isEmailValid = true;
  let isPasswordValid = true;

  const user = isValidUser({emailUser, passwordUser});

  if (emailUser.length === 0 || !validateEmail({emailUser})) {
    isEmailValid = false;
    emailInput.classList.add('is-invalid');
    emailInput.classList.remove('is-valid');
  } else {
    emailInput.classList.remove('is-invalid');
    emailInput.classList.add('is-valid');
  }

  if (passwordUser.length < 6) {
    isPasswordValid = false;
    passwordInput.classList.add('is-invalid');
    passwordInput.classList.remove('is-valid');
  } else {
    passwordInput.classList.remove('is-invalid');
    passwordInput.classList.add('is-valid');
  }

  if (!user) {
    alertLoginFail.style.display = 'block'
  } else {
    alertLoginFail.style.display = 'none'
  }

  return {
    isValid: isEmailValid && isPasswordValid,
    emailValid: isEmailValid,
    passwordValid: isPasswordValid,
    user,
  };
}

function isValidUser({emailUser, passwordUser}) {
  return USERS.find(({email, password}) => {
    return email === emailUser && password === passwordUser;
  })
}

function validateEmail({emailUser}) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailUser);
}