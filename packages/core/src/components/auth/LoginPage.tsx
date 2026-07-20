import { Link, useSearchParams } from 'react-router';
import { AppRoutes } from '../../lib/constants';
import FormInput from '../common/FormInput';
import useLogin from '../../hooks/useLogin';
import SignInGoogleButton from './SignInGoogleButton';
import { useState } from 'react';
import OrDivider from './OrDivider';
import SuccessMessage from '../common/SuccessMessage';
import ErrorMessage from '../common/ErrorMessage';
import AuthWrapper, { useDesktopRoute } from '../pageWrappers/AuthWrapper';

export default function LoginPage() {
  const [loginMode, setLoginMode] = useState<'password' | 'magic-link'>('password');
  const desktopRoute = useDesktopRoute();
  const [searchParams] = useSearchParams();
  const isDesktop = searchParams.get('desktop') === 'true';
  const {
    onPasswordSubmit,
    passwordForm,
    onMagicLinkSubmit,
    magicLinkForm,
    signInWithGoogle,
    successMagicLinkMessage,
  } = useLogin();

  return (
    <AuthWrapper title="Welcome back!" description="Your streak missed you.">
      {loginMode === 'password' && (
        <form className="form-wrapper__form" onSubmit={passwordForm.handleSubmit(onPasswordSubmit)}>
          <FormInput
            id="login-email"
            label="Email"
            type="email"
            placeholder="johndoe@example.com"
            autoComplete="email"
            registration={passwordForm.register('email')}
            error={passwordForm.formState.errors.email}
          />
          <FormInput
            id="login-password"
            label="Password"
            type="password"
            placeholder="••••••••"
            registration={passwordForm.register('password')}
            error={passwordForm.formState.errors.password}
          />
          <Link to={desktopRoute(AppRoutes.RESET_PASSWORD)} className="login__forgot">
            Forgot password?
          </Link>
          {passwordForm.formState.errors.root && (
            <ErrorMessage message={passwordForm.formState.errors.root.message} />
          )}
          <button className="btn" type="submit" disabled={passwordForm.formState.isSubmitting}>
            Log in
          </button>
        </form>
      )}

      {loginMode === 'magic-link' && !isDesktop && (
        <form
          className="form-wrapper__form"
          onSubmit={magicLinkForm.handleSubmit(onMagicLinkSubmit)}
        >
          <FormInput
            id="magic-link-email"
            label="Email"
            type="email"
            placeholder="johndoe@example.com"
            autoComplete="email"
            registration={magicLinkForm.register('email')}
            error={magicLinkForm.formState.errors.email}
          />
          {magicLinkForm.formState.errors.root && (
            <ErrorMessage message={magicLinkForm.formState.errors.root.message} />
          )}
          {successMagicLinkMessage && <SuccessMessage message={successMagicLinkMessage} />}

          <button className="btn" type="submit" disabled={magicLinkForm.formState.isSubmitting}>
            Send link
          </button>
        </form>
      )}

      <OrDivider />

      <div className="form-wrapper__actions">
        <SignInGoogleButton onClick={signInWithGoogle} />
        {!isDesktop && loginMode === 'magic-link' && (
          <button className="btn btn--outline" onClick={() => setLoginMode('password')}>
            Use password
          </button>
        )}
        {!isDesktop && loginMode === 'password' && (
          <button className="btn btn--outline" onClick={() => setLoginMode('magic-link')}>
            Magic link
          </button>
        )}
      </div>

      <div className="form-wrapper__footer">
        <span>New here?</span>
        <Link to={desktopRoute(AppRoutes.REGISTER)}>Create an account</Link>
      </div>
    </AuthWrapper>
  );
}
