/**
 * Exportação da thumbnail em PNG 1280x720, qualidade máxima.
 *
 * Como o canvas já tem exatamente 1280x720 px, o PNG sai na resolução pedida
 * sem perdas (PNG é sem compressão com perda).
 */
import { THUMB_WIDTH, THUMB_HEIGHT } from './render'

/** Constrói um nome de ficheiro limpo a partir dos dados da thumbnail. */
export function buildFileName({ seriesName, messageTitle, messageType }) {
  const slug = (str) =>
    String(str || '')
      .normalize('NFD')
      .replace(/[̀-ͯ]/g, '')
      .replace(/[^a-zA-Z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .toLowerCase()

  const parts = []
  if (messageType === 'series' && seriesName) parts.push(slug(seriesName))
  if (messageTitle) parts.push(slug(messageTitle))
  if (parts.length === 0) parts.push('thumbnail')
  return `${parts.join('_')}.png`
}

/**
 * Exporta o canvas dado como PNG e dispara o download no browser.
 * @param {HTMLCanvasElement} canvas
 * @param {string} fileName
 * @returns {Promise<void>}
 */
export function downloadCanvasPng(canvas, fileName = 'thumbnail.png') {
  return new Promise((resolve, reject) => {
    if (!canvas) {
      reject(new Error('Canvas indisponível para exportação.'))
      return
    }
    // Garante dimensões corretas (defensivo).
    if (canvas.width !== THUMB_WIDTH || canvas.height !== THUMB_HEIGHT) {
      console.warn(
        `Canvas com ${canvas.width}x${canvas.height}; esperado ${THUMB_WIDTH}x${THUMB_HEIGHT}.`
      )
    }

    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error('Falha ao gerar o PNG.'))
          return
        }
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = fileName
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        // Liberta a memória do blob após o download.
        setTimeout(() => URL.revokeObjectURL(url), 1000)
        resolve()
      },
      'image/png',
      1.0 // qualidade máxima
    )
  })
}
