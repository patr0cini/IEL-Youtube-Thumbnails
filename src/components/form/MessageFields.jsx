import { useThumbnail } from '@/state/ThumbnailContext'
import TextField from '@components/ui/TextField'
import Segmented from '@components/ui/Segmented'
import Button from '@components/ui/Button'
import Icon from '@components/ui/Icon'

/**
 * Tipo de mensagem (isolada / série) e respetivos campos.
 *  - Série   -> Nome da série + Título da mensagem
 *  - Isolada -> apenas Título da mensagem
 */
export default function MessageFields() {
  const { state, actions } = useThumbnail()
  const isSeries = state.messageType === 'series'

  return (
    <div className="fieldset">
      <span className="fieldset__legend">Mensagem</span>

      <Segmented
        value={state.messageType}
        onChange={actions.setMessageType}
        options={[
          { value: 'single', label: 'Mensagem isolada' },
          { value: 'series', label: 'Série de mensagens' },
        ]}
      />

      {isSeries && (
        <TextField
          label="Nome da série"
          value={state.seriesName}
          onChange={(v) => actions.setField('seriesName', v)}
          placeholder="A GRAÇA"
        />
      )}

      <TextField
        label="Título da mensagem"
        value={state.messageTitle}
        onChange={(v) => actions.setField('messageTitle', v)}
        placeholder={isSeries ? 'Justificados pela Fé' : 'O Poder da Oração'}
      />

      {isSeries ? (
        <p className="hint">
          O fundo é definido pelo nome da série e mantém-se igual em todas as
          mensagens dessa série.
        </p>
      ) : (
        <div className="btn-row">
          <Button onClick={actions.shuffleSeed} title="Sortear outro fundo">
            <Icon name="shuffle" size={16} /> Trocar fundo
          </Button>
        </div>
      )}
    </div>
  )
}
