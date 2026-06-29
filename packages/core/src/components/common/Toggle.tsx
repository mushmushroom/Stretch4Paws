interface ToggleProps {
  checked: boolean;
  onChange: (value: boolean) => void;
  label?: string;
}

export default function Toggle({ checked, onChange, label }: ToggleProps) {
  return (
    <label className="toggle" aria-label={label}>
      <input
        className="toggle__input"
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="toggle__track">
        <span className="toggle__thumb" />
      </span>
    </label>
  );
}
