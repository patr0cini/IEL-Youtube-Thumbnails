import { useRef } from 'react'
import { ThumbnailProvider } from '@/state/ThumbnailContext'
import Header from '@components/Header'
import FormPanel from '@components/form/FormPanel'
import PreviewPanel from '@components/preview/PreviewPanel'

/**
 * Composição da aplicação.
 *  - O canvasRef vive aqui para ser partilhado entre a pré-visualização
 *    (que desenha) e a exportação (que lê os píxeis).
 */
export default function App() {
  const canvasRef = useRef(null)
  const previewRef = useRef(null)

  // "GERAR THUMBNAIL": em mobile (colunas empilhadas) leva à pré-visualização.
  const handleGenerate = () => {
    previewRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <ThumbnailProvider>
      <div className="app">
        <Header />
        <main className="app-main">
          <div className="col-form">
            <FormPanel onGenerate={handleGenerate} />
          </div>
          <div className="col-preview" ref={previewRef}>
            <PreviewPanel canvasRef={canvasRef} />
          </div>
        </main>
      </div>
    </ThumbnailProvider>
  )
}
