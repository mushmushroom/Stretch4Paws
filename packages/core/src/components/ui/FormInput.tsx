import { InputHTMLAttributes, useState } from 'react';
// import { UseFormRegisterReturn } from 'react-hook-form';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  accentColor?: string;
  // error?: string;
  // registration?: UseFormRegisterReturn;
}

export default function FormInput({
  label,
  accentColor,
  type,
  // error,
  // registration,
  ...inputProps
}: FormInputProps) {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="form-input">
      <label className="form-input__label">{label}</label>
      <div className="form-input__field">
        <input
          className="form-input__input"
          type={isPassword ? (showPassword ? 'text' : 'password') : type}
          style={accentColor ? ({ '--input-accent': accentColor } as React.CSSProperties) : undefined}
          // {...registration}
          {...inputProps}
        />
        {isPassword && (
          <button
            type="button"
            className="form-input__toggle"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
      {/* {error && <span className="form-input__error">{error}</span>} */}
    </div>
  );
}
