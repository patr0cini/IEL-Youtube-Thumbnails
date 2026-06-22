import PreacherFields from './PreacherFields'
import MessageFields from './MessageFields'
import AdjustControls from './AdjustControls'
import Button from '@components/ui/Button'
import Icon from '@components/ui/Icon'

/**
 * Coluna esquerda: o formulário completo.
 * Cada secção é um componente próprio (responsabilidades separadas).
 */
export default function FormPanel({ onGenerate }) {
  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      <PreacherFields />
      <MessageFields />
      <AdjustControls />

      <Button type="button" variant="primary" size="lg" block onClick={onGenerate}>
        <Icon name="image" size={18} /> GERAR THUMBNAIL
      </Button>
    </form>
  )
}
