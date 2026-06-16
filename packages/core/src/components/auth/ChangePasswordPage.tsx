import AuthInfo from './AuthInfo';
import FormInput from '../ui/FormInput';
import { AppRoutes } from '../../lib/constants';
import { Link } from 'react-router';
import useChangePassword from '../../hooks/useChangePassword';

export default function ChangePasswordPage() {
  const { status, errorMessage, register, handleSubmit, onSubmit, passwordScore, errors } =
    useChangePassword();

  if (status === 'checking') {
    return <p>Loading</p>;
  }

  if (status === 'error') {
    return (
      <div>
        <p>{errorMessage}</p>
        <Link to={AppRoutes.RESET_PASSWORD}>Reset password</Link>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-container__section auth-container__info">
        <AuthInfo />
      </div>

      <div className="form-wrapper auth-container__section">
        <div className="form-wrapper__header">
          <h1 className="form-wrapper__title">Change your password</h1>
          <p className="form-wrapper__descr">Choose a strong new password for your account.</p>
        </div>

        <form className="form-wrapper__form" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="New password"
            type="password"
            placeholder="••••••••"
            accentColor="var(--color-bg-accent-sec)"
            registration={register('password')}
            error={errors.password}
          />
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

          <FormInput
            label="Confirm password"
            type="password"
            placeholder="••••••••"
            accentColor="var(--color-bg-accent-sec)"
            registration={register('confirmPassword')}
            error={errors.confirmPassword}
          />

          {errors.root && <p className="form-wrapper__error">{errors.root.message}</p>}

          <button className="btn btn--purple">Change password</button>
        </form>

        <div className="form-wrapper__footer">
          <span>Remembered it?</span>
          <Link to={AppRoutes.LOGIN}>Back to log in</Link>
        </div>
      </div>
    </div>
  );
}
