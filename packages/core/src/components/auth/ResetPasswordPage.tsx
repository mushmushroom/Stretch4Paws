import { Link } from 'react-router';
import { AppRoutes } from '../../lib/constants';
import FormInput from '../ui/FormInput';
import useResetPassword from '../../hooks/useResetPassword';
import AuthWrapper from '../pageWrappers/AuthWrapper';
import SuccessMessage from './SuccessMessage';
import ErrorMessage from './ErrorMessage';

export default function ResetPasswordPage() {
  const { register, handleSubmit, onSubmit, errors, successMessage, isSubmitting } =
    useResetPassword();
  return (
    <AuthWrapper title="Reset your password" description="We'll send you a link to reset it.">
      <form className="form-wrapper__form" onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Email"
          type="email"
          placeholder="johndoe@example.com"
          accentColor="var(--color-bg-accent-sec)"
          registration={register('email')}
          error={errors.email}
        />

        {errors.root && <ErrorMessage message={errors.root.message} />}
        {successMessage && <SuccessMessage message={successMessage} />}

        <button className="btn btn--purple" disabled={isSubmitting}>
          Send reset link
        </button>
      </form>

      <div className="form-wrapper__footer">
        <span>Remembered it?</span>
        <Link to={AppRoutes.LOGIN}>Back to log in</Link>
      </div>
    </AuthWrapper>
  );
}
