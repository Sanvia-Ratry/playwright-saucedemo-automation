export const users = {
  validUser: { username: "standard_user", password: "secret_sauce" },
  invalidPasswordUser: { username: "standard_user", password: "wrong_password" },
  lockedOutUser: { username: "locked_out_user", password: "secret_sauce" },
};

export const invalidLogins = [
  {
    name: "wrong password",
    user: users.invalidPasswordUser.username,
    pass: users.invalidPasswordUser.password,
    error: "Username and password do not match",
  },
  { name: "empty username", user: "", pass: "secret_sauce", error: "Username is required" },
  { name: "empty password", user: "standard_user", pass: "", error: "Password is required" },
  {
    name: "locked out user",
    user: users.lockedOutUser.username,
    pass: users.lockedOutUser.password,
    error: "this user has been locked out",
  },
];
export const checkoutFields = [
  { name: "first name", first: "", last: "Tester", zip: "12345", error: "First Name is required" },
  { name: "last name", first: "Alex", last: "", zip: "12345", error: "Last Name is required" },
  { name: "postal code", first: "Alex", last: "Tester", zip: "", error: "Postal Code is required" },
];
