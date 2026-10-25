// Label + input (or textarea) + inline error message, reused by every form.
export default function FormField({ label, name, error, as = 'input', ...inputProps }) {
  const Control = as;
  return (
    <div className="form-field">
      <label htmlFor={name}>{label}</label>
      <Control
        id={name}
        name={name}
        className={error ? 'invalid' : ''}
        aria-invalid={Boolean(error)}
        {...inputProps}
      />
      {error && <span className="field-error">{error}</span>}
    </div>
  );
}
