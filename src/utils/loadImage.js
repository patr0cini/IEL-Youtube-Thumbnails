/**
 * Carregamento de imagens como HTMLImageElement (Promise).
 * Usado para preparar fundos, fotografia e logótipo antes de desenhar no canvas.
 */
export function loadImage(src) {
  return new Promise((resolve, reject) => {
    if (!src) {
      resolve(null)
      return
    }
    const img = new Image()
    // Permite exportar o canvas mesmo com imagens de outra origem.
    img.crossOrigin = 'anonymous'
    img.onload = () => resolve(img)
    img.onerror = (e) => reject(e)
    img.src = src
  })
}
