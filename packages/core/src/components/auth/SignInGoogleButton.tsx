
interface signInGoogleButtonProps {
  onClick: () => void;
}

export default function SignInGoogleButton({ onClick }: signInGoogleButtonProps) {
  return (
    <button className="btn btn--outline" onClick={onClick}>
      <img src="/google-logo.svg" alt="Google logo" className="form-wrapper__icon" />
      <span>Google</span>
    </button>
  );
}
