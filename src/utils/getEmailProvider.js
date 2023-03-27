export function getEmailProvider(email) {
  const domain = email.split('@')[1].split('.')[0];
  return domain.charAt(0).toUpperCase() + domain.slice(1);
}
