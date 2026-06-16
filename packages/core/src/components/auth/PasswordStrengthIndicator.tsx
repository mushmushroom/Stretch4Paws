interface PasswordStrengthIndicatorProps {
  passwordScore: number;
}
export default function PasswordStrengthIndicator({ passwordScore }: PasswordStrengthIndicatorProps) {
  return (
    <div className="form-wrapper__password-strength password-strength">
      <span
        className={`password-strength__item ${passwordScore !== null && passwordScore > 0 ? 'password-strength__item--weak' : ''}`}
        aria-label="Weak password"
      ></span>
      <span
        className={`password-strength__item ${passwordScore >= 3 ? 'password-strength__item--medium' : ''}`}
        aria-label="Medium password"
      ></span>
      <span
        className={`password-strength__item ${passwordScore === 4 ? 'password-strength__item--strong' : ''}`}
        aria-label="Strong password"
      ></span>
    </div>
  );
}
