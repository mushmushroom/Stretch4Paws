import Logo from '../common/Logo';
import MascotAnimation from '../common/MascotAnimation';

export default function AuthInfo() {
  return (
    <div className="auth-container__section auth-container__info">
      <Logo text={false} />
      <MascotAnimation />
      <div className="auth-info__text">
        <h3 className="auth-info__title">Tiny stretches, happy humans.</h3>
        <p className="auth-info__descr">
          Build a desk-stretch habit your body (and your inner pup) will thank you for.
        </p>
      </div>
    </div>
  );
}
