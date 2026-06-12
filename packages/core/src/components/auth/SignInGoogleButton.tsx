import React from 'react'
import useRegister from '../../hooks/useRegister';

export default function SignInGoogleButton() {
  const { signInWithGoogle } = useRegister();
  return (
    <button className="btn btn--outline" onClick={signInWithGoogle}>
      <img src="/google-logo.svg" alt="Google logo" className="form-wrapper__icon" />
      <span>Google</span>
    </button>
  );
}
