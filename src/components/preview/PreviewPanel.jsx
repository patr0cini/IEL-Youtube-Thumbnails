import { useState } from 'react'
import { useThumbnail } from '@/state/ThumbnailContext'
import ThumbnailCanvas from './ThumbnailCanvas'
import Button from '@components/ui/Button'
import Icon from '@components/ui/Icon'
import { downloadCanvasPng, buildFileName } from '@utils/exportPng'

/**
 * Coluna direita: pré-visualização em tempo real + ações (descarregar PNG).
 */
export default function PreviewPanel({ canvasRef }) {
  const { state } = useThumbnail()
  const [exporting, setExporting] = useState(false)

  const handleDownload = async () => {
    setExporting(true)
    try {
      const name = buildFileName(state)
      await downloadCanvasPng(canvasRef.current, name)
    } catch (err) {
      console.error(err)
      alert('Não foi possível exportar a thumbnail.')
    } finally {
      setExporting(false)
    }
  }

  return (
    <section className="preview">
      <div className="preview__head">
        <span className="preview__title">Pré-visualização</span>
        <span className="preview__badge">1280 × 720 · PNG</span>
      </div>

      <ThumbnailCanvas canvasRef={canvasRef} />

      <div className="preview__actions">
        <Button variant="primary" size="lg" onClick={handleDownload} disabled={exporting}>
          <Icon name="download" size={18} />
          {exporting ? 'A exportar…' : 'Descarregar PNG'}
        </Button>
      </div>
    </section>
  )
}
