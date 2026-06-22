/** Campo de texto com label. */
export default function TextField({ label, value, onChange, placeholder, ...rest }) {
  return (
    <label className="field">
      {label && <span className="field__label">{label}</span>}
      <input
        className="input"
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        {...rest}
      />
    </label>
  )
}
