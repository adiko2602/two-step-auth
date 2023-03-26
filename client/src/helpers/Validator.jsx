export default class Validator {
  constructor() {}

  email(email) {
    if (!email.includes("@")) return false;
    if (!email.includes(".")) return false;
    if (email === "") return false;
    return true;
  }

  password(password) {
    if (password.length < 8) return false;
    return true;
  }

  passwordEqual(passwordOne, passwordTwo) {
    if (passwordOne !== passwordTwo) return false;
    return true;
  }
}
