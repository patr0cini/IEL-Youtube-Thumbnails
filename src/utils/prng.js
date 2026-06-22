/**
 * Geração de números pseudo-aleatórios *determinística*.
 *
 * É a base da regra de negócio dos fundos:
 *  - A mesma série produz sempre o mesmo fundo (mesma seed -> mesma sequência).
 *  - Mensagens isoladas usam uma seed aleatória (ou baseada no título).
 */

/**
 * Hash de string -> inteiro de 32 bits (cyrb53 simplificado).
 * Normaliza o texto (minúsculas, sem acentos, sem espaços) para que
 * "Êxodo", "exodo" e "EXODO " produzam a mesma seed.
 */
export function hashString(str = '') {
  const normalized = String(str)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // remove acentos
    .toLowerCase()
    .trim()

  let h1 = 0xdeadbeef
  let h2 = 0x41c6ce57
  for (let i = 0; i < normalized.length; i++) {
    const ch = normalized.charCodeAt(i)
    h1 = Math.imul(h1 ^ ch, 2654435761)
    h2 = Math.imul(h2 ^ ch, 1597334677)
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909)
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909)
  return (4294967296 * (2097151 & h2) + (h1 >>> 0)) >>> 0
}

/**
 * PRNG mulberry32: rápido e determinístico.
 * Recebe uma seed inteira e devolve uma função () => número em [0, 1).
 */
export function mulberry32(seed) {
  let a = seed >>> 0
  return function random() {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Cria um PRNG a partir de uma string (atalho usado pelos fundos). */
export function seededRandom(str) {
  return mulberry32(hashString(str))
}
