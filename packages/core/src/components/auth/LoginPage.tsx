import { Link } from 'react-router';
import { AppRoutes } from '../../lib/constants';
import FormInput from '../ui/FormInput';
import AuthInfo from './AuthInfo';
import useLogin from '../../hooks/useLogin';
import SignInGoogleButton from './SignInGoogleButton';
import { useState } from 'react';

export default function LoginPage() {
  const [loginMode, setLoginMode] = useState<'password' | 'magic-link'>('password');
  const {
    onPasswordSubmit,
    passwordForm,
    onMagicLinkSubmit,
    magicLinkForm,
    signInWithGoogle,
    successMagicLinkMessage,
  } = useLogin();

  return (
    <div className="auth-container login">
      <AuthInfo />

      <div className="form-wrapper auth-container__section">
        <div className="form-wrapper__header">
          <h1 className="form-wrapper__title">Welcome back!</h1>
          <p className="form-wrapper__descr">Your streak missed you.</p>
        </div>
        {loginMode === 'password' && (
          <form
            className="form-wrapper__form"
            onClick={passwordForm.handleSubmit(onPasswordSubmit)}
          >
            <FormInput
              label="Email"
              type="email"
              placeholder="johndoe@example.com"
              autoComplete="email"
              registration={passwordForm.register('email')}
              error={passwordForm.formState.errors.email}
            />
            <FormInput
              label="Password"
              type="password"
              placeholder="••••••••"
              registration={passwordForm.register('password')}
              error={passwordForm.formState.errors.password}
            />
            <Link to={AppRoutes.RESET_PASSWORD} className="login__forgot">
              Forgot password?
            </Link>
            {passwordForm.formState.errors.root && (
              <p className="form-wrapper__error">{passwordForm.formState.errors.root.message}</p>
            )}
            <button className="btn" type="submit">
              Log in
            </button>
          </form>
        )}

        {loginMode === 'magic-link' && (
          <form
            className="form-wrapper__form"
            onClick={magicLinkForm.handleSubmit(onMagicLinkSubmit)}
          >
            <FormInput
              label="Email"
              type="email"
              placeholder="johndoe@example.com"
              autoComplete="email"
              registration={magicLinkForm.register('email')}
              error={magicLinkForm.formState.errors.email}
            />
            {magicLinkForm.formState.errors.root && (
              <p className="form-wrapper__error">{magicLinkForm.formState.errors.root.message}</p>
            )}
            {successMagicLinkMessage && (
              <p className="form-wrapper__success-message">{successMagicLinkMessage}</p>
            )}

            <button className="btn" type="submit">
              Send link
            </button>
          </form>
        )}

        <div className="form-wrapper__alternative">
          <hr />
          <span>OR</span>
          <hr />
        </div>

        <div className="form-wrapper__actions">
          <SignInGoogleButton onClick={signInWithGoogle} />
          {loginMode === 'magic-link' && (
            <button className="btn btn--outline" onClick={() => setLoginMode('password')}>
              Use password
            </button>
          )}
          {loginMode === 'password' && (
            <button className="btn btn--outline" onClick={() => setLoginMode('magic-link')}>
              Magic link
            </button>
          )}
        </div>

        <div className="form-wrapper__footer">
          <span>New here?</span>
          <Link to={AppRoutes.REGISTER}>Create an account</Link>
        </div>
      </div>
    </div>
  );
}
