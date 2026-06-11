import { Link } from 'react-router';
import { AppRoutes } from '../../lib/constants';
import Logo from '../Logo';
import FormInput from '../ui/FormInput';

export default function RegisterPage() {
  return (
    <div className="auth-container">
      <div className="auth-container__section auth-container__info">
        <Logo text={false} />
        <div>Mascot</div>
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

        <form className="form-wrapper__form">
          <FormInput label="Name" placeholder="John Doe" />
          <FormInput label="Email" type="email" placeholder="johndoe@example.com" />
          <FormInput label="Password" type="password" placeholder="••••••••" />
          <FormInput label="Confirm password" type="password" placeholder="••••••••" />

          <button className="btn">Create account</button>
        </form>

        <div className="form-wrapper__alternative">
          <hr />
          <span>OR</span>
          <hr />
        </div>

        <div className="form-wrapper__actions">
          <button className="btn btn--outline">Google</button>
          <button className="btn btn--outline">Magic link</button>
        </div>

        <div className="form-wrapper__footer">
          <span>Already stretching?</span>
          <Link to={AppRoutes.LOGIN}>Log in</Link>
        </div>
      </div>
    </div>
  );
}
