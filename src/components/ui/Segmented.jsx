/**
 * Controlo segmentado (grupo de botões mutuamente exclusivos).
 * options: [{ value, label }]
 */
export default function Segmented({ options, value, onChange }) {
  return (
    <div className="segmented" role="group">
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className="segmented__btn"
          aria-pressed={value === opt.value}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
