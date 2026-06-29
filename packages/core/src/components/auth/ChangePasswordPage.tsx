import { Link } from 'react-router';

import useChangePassword from '../../hooks/useChangePassword';
import { AppRoutes } from '../../lib/constants';
import AuthWrapper from '../pageWrappers/AuthWrapper';
import FormInput from '../common/FormInput';
import ErrorMessage from '../common/ErrorMessage';
import PasswordRequirements from './PasswordRequirements';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
export default function ChangePasswordPage() {
  const {
    status,
    errorMessage,
    register,
    handleSubmit,
    onSubmit,
    passwordScore,
    errors,
    isSubmitting,
  } = useChangePassword();

  if (status === 'checking') {
    return (
      <AuthWrapper>
        <p className="form-wrapper__checking">Checking your reset link…</p>
      </AuthWrapper>
    );
  }

  if (status === 'error') {
    return (
      <AuthWrapper>
        <ErrorMessage message={errorMessage ?? "Error changing the password"} />
        <Link className="btn" to={AppRoutes.RESET_PASSWORD}>
          Request new link
        </Link>
      </AuthWrapper>
    );
  }

  return (
    <AuthWrapper
      title="Change your password"
      description="Choose a strong new password for your account."
    >
      <form className="form-wrapper__form" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          id="change-password"
          label="New password"
          type="password"
          placeholder="••••••••"
          accentColor="var(--color-bg-accent-sec)"
          registration={register('password')}
          error={errors.password}
        />
        <PasswordRequirements />

        <PasswordStrengthIndicator passwordScore={passwordScore} />

        <FormInput
          id="change-confirm-password"
          label="Confirm password"
          type="password"
          placeholder="••••••••"
          accentColor="var(--color-bg-accent-sec)"
          registration={register('confirmPassword')}
          error={errors.confirmPassword}
        />

        {errors.root && <ErrorMessage message={errors.root.message} />}

        <button className="btn btn--purple" type="submit" disabled={isSubmitting}>
          Change password
        </button>
      </form>

      <div className="form-wrapper__footer">
        <span>Remembered it?</span>
        <Link to={AppRoutes.LOGIN}>Back to log in</Link>
      </div>
    </AuthWrapper>
  );
}
