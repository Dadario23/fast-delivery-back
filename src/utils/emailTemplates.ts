import validations from './validations';

interface EmailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

const createEmailOptions = (to: string, subject: string, htmlContent: string): EmailOptions => ({
  from: process.env.MAIL_USERNAME,
  to,
  subject,
  html: htmlContent
});

interface User {
  email: string;
  name?: string;
}

interface EmailTemplates {
  welcome: (user: User) => EmailOptions;
  forgotPassword: (user: User, resetToken: string) => EmailOptions;
  resetPasswordConfirmation: (user: User) => EmailOptions;
  passwordChanged: (user: User) => EmailOptions;
}

const emailTemplates: EmailTemplates = {
  welcome: (user: User): EmailOptions => createEmailOptions(user.email, 'Bienvenido/a a Fast Delivery', `
    <h3>¡Hola, ${user.name || ''}!</h3>
    <p>¡Tu cuenta fue creada exitosamente!</p>
    <p>Ya podés iniciar sesión y empezar a usar la aplicación.</p>
    <p>Saludos,</p>
    <p><b>Grupo 3 Fast Delivery</b></p>
  `),
  forgotPassword: (user: User, resetToken: string): EmailOptions => {
    const resetUrl = validations.createResetUrl(resetToken);
    return createEmailOptions(user.email, 'Restablecimiento de Contraseña', `
      <h3>¡Hola, ${user.name || ''}!</h3>
      <p>Por favor, hacé clic en el siguiente enlace para restablecer tu contraseña:</p>
      <p><a href="${resetUrl}">Hacé clic sobre este mismo link</a></p>
      <p>Si no solicitaste restablecer tu contraseña, por favor ignorá este correo electrónico.</p>
      <p>Saludos,</p>
      <p><b>Grupo 3 Fast Delivery</b></p>
    `);
  },
  resetPasswordConfirmation: (user: User): EmailOptions => createEmailOptions(user.email, 'Confirmación de Cambio de Contraseña', `
    <h4>¡Tu contraseña fue cambiada exitosamente!</h4>
    <p>Si no hiciste este cambio de contraseña, por favor comunicate con nuestro equipo de soporte.</p>
    <p>Si realizaste este cambio, no es necesario que realices ninguna otra acción.</p>
    <p>Saludos,</p>
    <p><b>Grupo 3 Fast Delivery</b></p>
  `),
  passwordChanged: (user: User): EmailOptions => createEmailOptions(user.email, 'Cambio de Contraseña en Mi Turno Web App', `
    <h3>¡Hola, ${user.name || ''}!</h3>
    <p>Tu contraseña en Fast Delivery fue cambiada exitosamente.</p>
    <p>Si no realizaste este cambio, por favor comunicate inmediatamente con nuestro equipo de soporte.</p>
    <p>Saludos,</p>
    <p><b>Grupo 3 Fast Delivery</b></p>
  `)
};

export default emailTemplates;

