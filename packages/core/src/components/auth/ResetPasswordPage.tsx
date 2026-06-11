import { Link } from 'react-router';
import { AppRoutes } from '../../lib/constants';
import Logo from '../Logo';
import FormInput from '../ui/FormInput';

export default function ResetPasswordPage() {
  return (
    <div className="auth-container">
      <div className="auth-container__section auth-container__info">
        <Logo text={false} />
      </div>

      <div className="form-wrapper auth-container__section">
        <div className="form-wrapper__header">
          <h1 className="form-wrapper__title">Reset your password</h1>
          <p className="form-wrapper__descr">We'll send you a link to reset it.</p>
        </div>

        <form className="form-wrapper__form">
          <FormInput
            label="Email"
            type="email"
            placeholder="johndoe@example.com"
            accentColor="var(--color-bg-accent-sec)"
          />

          <button className="btn btn--purple">Send reset link</button>
        </form>

        <div className="form-wrapper__footer">
          <span>Remembered it?</span>
          <Link to={AppRoutes.LOGIN}>Back to log in</Link>
        </div>
      </div>
    </div>
  );
}
