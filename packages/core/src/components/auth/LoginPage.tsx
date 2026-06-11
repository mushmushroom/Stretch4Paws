import { Link } from 'react-router';
import { AppRoutes } from '../../lib/constants';
import Logo from '../Logo';
import FormInput from '../ui/FormInput';

export default function LoginPage() {
  return (
    <div className="auth-container login">
      <div className="auth-container__section auth-container__info">
        <Logo text={false} />
      </div>

      <div className="form-wrapper auth-container__section">
        <div className="form-wrapper__header">
          <h1 className="form-wrapper__title">Welcome back!</h1>
          <p className="form-wrapper__descr">Your streak missed you.</p>
        </div>

        <form className="form-wrapper__form">
          <FormInput label="Email" type="email" placeholder="johndoe@example.com" />
          <FormInput label="Password" type="password" placeholder="••••••••" />
          <Link to={AppRoutes.RESET_PASSWORD} className="login__forgot">Forgot password?</Link>

          <button className="btn">Log in</button>
        </form>

        <div className="form-wrapper__alternative">
          <hr />
          <span>OR</span>
          <hr />
        </div>

        <div className="form-wrapper__actions">
          <button className="btn btn--outline">Continue with Google</button>
        </div>

        <div className="form-wrapper__footer">
          <span>New here?</span>
          <Link to={AppRoutes.REGISTER}>Create an account</Link>
        </div>
      </div>
    </div>
  );
}
