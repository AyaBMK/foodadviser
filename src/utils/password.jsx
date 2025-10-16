// utils/password.js
export function checkPasswordStrength(pw) {
  const minLen = pw.length >= 10;
  const hasUpper = /[A-Z]/.test(pw);
  const hasLower = /[a-z]/.test(pw);
  const hasDigit = /\d/.test(pw);
  const hasSymbol = /[^\w\s]/.test(pw);

  const ok = minLen && hasUpper && hasLower && hasDigit && hasSymbol;
  let message = "";
  if (!minLen) message = "Le mot de passe doit contenir au moins 10 caractères.";
  else if (!hasUpper) message = "Ajoute au moins une majuscule.";
  else if (!hasLower) message = "Ajoute au moins une minuscule.";
  else if (!hasDigit) message = "Ajoute au moins un chiffre.";
  else if (!hasSymbol) message = "Ajoute au moins un symbole.";

  return { ok, message };
}
