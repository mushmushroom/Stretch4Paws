import Lottie from 'lottie-react';
import { useRef } from 'react';
import { Link } from 'react-router';

import { AppRoutes } from '../../lib/constants';
import stretch4paws from '../../data/animations.json';
import Logo from '../Logo';
import FormInput from '../ui/FormInput';
import useRegister from '../../hooks/useRegister';
import SignInGoogleButton from './SignInGoogleButton';

export default function RegisterPage() {
  const { register, errors, handleSubmit, onSubmit, successMessage, passwordScore } = useRegister();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const lottieRef = useRef<any>(null);

  function handleMascotLoaded() {
    const anim = lottieRef.current?.animationItem;
    if (!anim) return;
    anim.playSegments([0, 72], true);
    anim.loop = true;
  }

  return (
    <div className="auth-container">
      <div className="auth-container__section auth-container__info">
        <Logo text={false} />
        <div className="animation-img">
          <Lottie
            lottieRef={lottieRef}
            animationData={stretch4paws}
            autoplay={false}
            loop={false}
            onDOMLoaded={handleMascotLoaded}
          />
        </div>
        <div className="register__info-text">
          <h3 className="register__info-title">Tiny stretches, happy humans.</h3>
          <p className="register__info-descr">
            Build a desk-stretch habit your body (and your inner pup) will thank you for.
          </p>
        </div>
      </div>

      <div className="form-wrapper auth-container__section">
        <div className="form-wrapper__header">
          <h1 className="form-wrapper__title">Create your account</h1>
          <p className="form-wrapper__descr">Start tracking your stretch streak today.</p>
        </div>

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
          <div>
            <p className="form-wrapper__password-requirements">
              Password must be at least 8 characters long and include uppercase letters, lowercase
              letters, numbers, and special characters.
            </p>
          </div>
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
            autoComplete="new-password"
            registration={register('confirmPassword')}
            error={errors.confirmPassword}
          />
          {errors.root && <p className="form-wrapper__error">{errors.root.message}</p>}
          {successMessage && <p className="form-wrapper__success-message">{successMessage}</p>}
          <button className="btn" type="submit">
            Create account
          </button>
        </form>

        <div className="form-wrapper__alternative">
          <hr />
          <span>OR</span>
          <hr />
        </div>

        <div className="form-wrapper__actions">
          <SignInGoogleButton />
        </div>

        <div className="form-wrapper__footer">
          <span>Already stretching?</span>
          <Link to={AppRoutes.LOGIN}>Log in</Link>
        </div>
      </div>
    </div>
  );
}
