import { useThumbnail } from '@/state/ThumbnailContext'
import { formatPreacherName } from '@utils/formatName'
import TextField from '@components/ui/TextField'
import Checkbox from '@components/ui/Checkbox'

/** Campos do pregador: nome + checkbox "Pastor". */
export default function PreacherFields() {
  const { state, actions } = useThumbnail()
  const preview = formatPreacherName(state.preacherName, state.isPastor)

  return (
    <div className="fieldset">
      <span className="fieldset__legend">Pregador</span>

      <TextField
        label="Nome do pregador"
        value={state.preacherName}
        onChange={(v) => actions.setField('preacherName', v)}
        placeholder="João Silva"
      />

      <Checkbox
        label="Pastor"
        checked={state.isPastor}
        onChange={() => actions.togglePastor()}
      />

      {preview && (
        <p className="hint">
          Aparece como: <strong style={{ color: 'var(--text)' }}>{preview}</strong>
        </p>
      )}
    </div>
  )
}
