import { useEffect, useState } from 'react'

/**
 * Garante que as Google Fonts (Bebas Neue / Montserrat) estão carregadas antes
 * de desenhar no canvas — caso contrário o texto sairia com a fonte errada.
 */
const FONTS_TO_LOAD = [
  "16px 'Bebas Neue'",
  "600 16px 'Montserrat'",
  "700 16px 'Montserrat'",
  "800 16px 'Montserrat'",
]

export function useFonts() {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    let active = true
    const done = () => active && setReady(true)

    if (!('fonts' in document)) {
      done()
      return
    }

    Promise.all(FONTS_TO_LOAD.map((f) => document.fonts.load(f)))
      .then(() => document.fonts.ready)
      .then(done)
      .catch(done) // mesmo em caso de erro, desenha com fallback

    return () => {
      active = false
    }
  }, [])

  return ready
}
