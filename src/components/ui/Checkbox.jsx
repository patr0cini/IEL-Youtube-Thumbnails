import Icon from './Icon'

/** Checkbox personalizado e acessível. */
export default function Checkbox({ label, checked, onChange }) {
  return (
    <label className="checkbox">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="checkbox__box">
        <Icon name="check" size={13} strokeWidth={3} />
      </span>
      <span>{label}</span>
    </label>
  )
}
