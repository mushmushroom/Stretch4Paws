import { Link } from 'react-router';
import { AppRoutes } from '../../lib/constants';
import FormInput from '../ui/FormInput';
import useRegister from '../../hooks/useRegister';
import SignInGoogleButton from './SignInGoogleButton';
import AuthWrapper from './AuthWrapper';
import PasswordStrengthIndicator from './PasswordStrengthIndicator';
import OrDivider from './OrDivider';
import PasswordRequirements from './PasswordRequirements';
import ErrorMessage from './ErrorMessage';
import SuccessMessage from './SuccessMessage';

export default function RegisterPage() {
  const {
    register,
    errors,
    handleSubmit,
    onSubmit,
    successMessage,
    passwordScore,
    signInWithGoogle,
    isSubmitting,
  } = useRegister();

  return (
    <AuthWrapper title="Join the pack" description="Create an account to track every stretch.">
      <>
        <form className="form-wrapper__form" onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Name"
            placeholder="John Doe"
            autoComplete="name"
            registration={register('name')}
            error={errors.name}
          />
          <FormInput
            label="Email"
            type="email"
            placeholder="johndoe@example.com"
            autoComplete="email"
            registration={register('email')}
            error={errors.email}
          />
          <FormInput
            label="Password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            registration={register('password')}
            error={errors.password}
          />
          <PasswordRequirements />
          <PasswordStrengthIndicator passwordScore={passwordScore} />
          <FormInput
            label="Confirm password"
            type="password"
            placeholder="••••••••"
            autoComplete="new-password"
            registration={register('confirmPassword')}
            error={errors.confirmPassword}
          />
          {errors.root && <ErrorMessage message={errors.root.message} />}
          {successMessage && <SuccessMessage message={successMessage} />}
          <button className="btn" type="submit" disabled={isSubmitting}>
            Create account
          </button>
        </form>

        <OrDivider />

        <div className="form-wrapper__actions">
          <SignInGoogleButton onClick={signInWithGoogle} />
        </div>

        <div className="form-wrapper__footer">
          <span>Already stretching?</span>
          <Link to={AppRoutes.LOGIN}>Log in</Link>
        </div>
      </>
    </AuthWrapper>
  );
}
