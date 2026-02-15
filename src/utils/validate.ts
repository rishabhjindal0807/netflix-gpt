const validate = (email: string, password: string, fullName?: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  const nameRegex = /^[a-zA-Z\s0-9]{2,}$/;

  if (fullName && !nameRegex.test(fullName.trim())) {
    return "Full name is not valid (minimum 2 characters, letters, numbers, and spaces only)";
  }

  if (!emailRegex.test(email)) {
    return "Email is not valid";
  }

  if (!passwordRegex.test(password)) {
    return "Password is not valid (minimum 8 characters, at least one uppercase, one lowercase, and one number)";
  }

  return null;
};

export default validate;
