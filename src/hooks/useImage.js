import { useEffect, useState } from 'react'
import { loadImage } from '@utils/loadImage'

/**
 * Carrega um src de imagem e devolve o HTMLImageElement (ou null).
 * Re-carrega sempre que o src muda; ignora resultados de carregamentos antigos.
 */
export function useImage(src) {
  const [image, setImage] = useState(null)

  useEffect(() => {
    let active = true
    if (!src) {
      setImage(null)
      return
    }
    loadImage(src)
      .then((img) => {
        if (active) setImage(img)
      })
      .catch(() => {
        if (active) setImage(null)
      })
    return () => {
      active = false
    }
  }, [src])

  return image
}
