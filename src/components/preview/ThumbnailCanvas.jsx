import { useEffect, useMemo } from 'react'
import { useThumbnail } from '@/state/ThumbnailContext'
import { useImage } from '@hooks/useImage'
import { useFonts } from '@hooks/useFonts'
import { resolveBackground } from '@utils/backgrounds'
import { drawThumbnail, THUMB_WIDTH, THUMB_HEIGHT } from '@utils/render'
import { formatPreacherName } from '@utils/formatName'
import { logoUrl } from '@utils/logo'

/**
 * Canvas 1280x720 que desenha a thumbnail em tempo real.
 * O `canvasRef` é fornecido pelo pai para permitir a exportação PNG.
 */
export default function ThumbnailCanvas({ canvasRef }) {
  const { state } = useThumbnail()
  const fontsReady = useFonts()

  // Descritor do fundo (ficheiro ou procedural determinístico).
  const background = useMemo(
    () =>
      resolveBackground({
        messageType: state.messageType,
        seriesName: state.seriesName,
        singleSeed: state.singleSeed,
      }),
    [state.messageType, state.seriesName, state.singleSeed]
  )

  // Imagens carregadas (assíncronas).
  const bgImage = useImage(background.kind === 'image' ? background.url : null)
  const logoImage = useImage(logoUrl)

  // Modelo de texto pronto a desenhar.
  const preacherName = formatPreacherName(state.preacherName, state.isPastor)
  const showSeries = state.messageType === 'series'

  // (Re)desenha sempre que algo relevante muda.
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    drawThumbnail(ctx, {
      width: THUMB_WIDTH,
      height: THUMB_HEIGHT,
      background: { ...background, image: bgImage },
      text: {
        seriesLabel: state.seriesName,
        title: state.messageTitle,
        preacherName,
        scale: state.text.scale,
        posX: state.text.posX,
        posY: state.text.posY,
        showSeries,
      },
      logo: logoImage,
    })
  }, [
    canvasRef,
    fontsReady,
    background,
    bgImage,
    logoImage,
    state.text,
    state.seriesName,
    state.messageTitle,
    preacherName,
    showSeries,
  ])

  return (
    <div className="canvas-frame">
      <canvas ref={canvasRef} width={THUMB_WIDTH} height={THUMB_HEIGHT} />
    </div>
  )
}
