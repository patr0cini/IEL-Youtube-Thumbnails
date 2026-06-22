/**
 * Formatação do nome do pregador.
 *
 * Regra de negócio:
 *  - Se "Pastor" estiver ativo  -> "Pastor João Silva"
 *  - Caso contrário             -> "João Silva"
 */
export function formatPreacherName(name = '', isPastor = false) {
  const clean = String(name).trim()
  if (!clean) return ''
  return isPastor ? `Pastor ${clean}` : clean
}
