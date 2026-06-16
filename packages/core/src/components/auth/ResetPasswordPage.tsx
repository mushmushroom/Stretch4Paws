import { Link } from 'react-router';
import { AppRoutes } from '../../lib/constants';
import FormInput from '../ui/FormInput';
import AuthInfo from './AuthInfo';
import useResetPassword from '../../hooks/useResetPassword';

// TODO turn it into wrapper component
// TODO create components for error and success message
export default function ResetPasswordPage() {
  const { register, handleSubmit, onSubmit, errors, successMessage, isSubmitting } =
    useResetPassword();
  return (
    <div className="auth-container">
      <div className="auth-container__section auth-container__info">
        <AuthInfo />
      </div>

      <div className="form-wrapper auth-container__section">
        <div className="form-wrapper__header">
          <h1 className="form-wrapper__title">Reset your password</h1>
          <p className="form-wrapper__descr">We'll send you a link to reset it.</p>
        </div>

        <form className="form-wrapper__form" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Email"
            type="email"
            placeholder="johndoe@example.com"
            accentColor="var(--color-bg-accent-sec)"
            registration={register('email')}
            error={errors.email}
          />

          {errors.root && <p className="form-wrapper__error">{errors.root.message}</p>}
          {successMessage && <p className="form-wrapper__success-message">{successMessage}</p>}

          <button className="btn btn--purple" disabled={isSubmitting}>
            Send reset link
          </button>
        </form>

        <div className="form-wrapper__footer">
          <span>Remembered it?</span>
          <Link to={AppRoutes.LOGIN}>Back to log in</Link>
        </div>
      </div>
    </div>
  );
}
