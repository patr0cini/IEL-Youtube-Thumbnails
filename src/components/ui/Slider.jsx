/** Slider (range) com etiqueta e valor formatado. */
export default function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format = (v) => v,
}) {
  return (
    <div className="slider">
      <div className="slider__head">
        <span>{label}</span>
        <span className="slider__value">{format(value)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  )
}
