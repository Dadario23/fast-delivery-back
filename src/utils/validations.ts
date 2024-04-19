const regexPatterns: { [key: string]: RegExp } = {
  id: /^\d+$/,
  name: /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  address: /^[a-zA-Z0-9\s,.'-]{3,}$/,
  imageFormat: /\.(jpeg|jpg|png|gif)$/i,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
};

const validate = {
  email: (email: string): boolean => regexPatterns.email.test(email),
  // createResetUrl: (resetToken: string) =>
  //   `${process.env.MAIL_RESET_PASSWORD_URL}/reset-password/${resetToken}`,
  createResetUrl: (resetToken: string) =>
  `http://localhost:3000/reset-password/${resetToken}`,
  password: (password: string) => regexPatterns.password.test(password),
};

export default validate;
