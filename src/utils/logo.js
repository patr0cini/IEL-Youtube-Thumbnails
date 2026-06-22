/**
 * Deteção do logótipo da igreja.
 *
 * Se existir o ficheiro /assets/logo.png (ou .jpg/.webp), o seu URL é exposto e
 * o logótipo aparece automaticamente na thumbnail. Caso contrário, fica null e
 * simplesmente não é mostrado.
 */
const logoFiles = import.meta.glob('../../assets/logo.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
})

const urls = Object.values(logoFiles)

/** URL do logótipo, ou null se não existir. */
export const logoUrl = urls.length > 0 ? urls[0] : null
