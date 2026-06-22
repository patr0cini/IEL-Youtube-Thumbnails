import { useThumbnail } from '@/state/ThumbnailContext'
import Slider from '@components/ui/Slider'
import Button from '@components/ui/Button'
import Icon from '@components/ui/Icon'

/**
 * Ajustes finos do texto (tamanho e posição).
 * Aparecem assim que há um título.
 */
export default function AdjustControls() {
  const { state, actions } = useThumbnail()
  const { text, messageTitle } = state

  const pct = (v) => `${Math.round(v * 100)}%`

  if (!messageTitle) {
    return (
      <div className="fieldset">
        <span className="fieldset__legend">Ajustes</span>
        <p className="hint">Escreve um título para afinar o tamanho e a posição do texto.</p>
      </div>
    )
  }

  return (
    <div className="fieldset">
      <span className="fieldset__legend">Ajustes de texto</span>

      <Slider
        label="Tamanho do texto"
        min={0.6}
        max={1.5}
        step={0.01}
        value={text.scale}
        onChange={(v) => actions.setText({ scale: v })}
        format={pct}
      />
      <Slider
        label="Posição horizontal"
        min={-200}
        max={200}
        step={1}
        value={text.posX}
        onChange={(v) => actions.setText({ posX: v })}
        format={(v) => `${v}px`}
      />
      <Slider
        label="Posição vertical"
        min={-160}
        max={160}
        step={1}
        value={text.posY}
        onChange={(v) => actions.setText({ posY: v })}
        format={(v) => `${v}px`}
      />
      <div className="btn-row">
        <Button onClick={actions.resetText}>
          <Icon name="reset" size={15} /> Repor texto
        </Button>
      </div>
    </div>
  )
}
