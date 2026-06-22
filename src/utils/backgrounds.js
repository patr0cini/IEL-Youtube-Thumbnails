/**
 * Gestão dos fundos da thumbnail.
 *
 * Os fundos são EXCLUSIVAMENTE os ficheiros da pasta /backgrounds (curados pela
 * igreja). Não há geração procedural — apenas este conjunto fixo é usado.
 *
 * Regras de negócio:
 *  - Série   -> fundo SEMPRE igual para a mesma série (determinístico).
 *  - Isolada -> fundo escolhido aleatoriamente do conjunto (botão "Trocar fundo").
 */
import { hashString } from './prng'

// Descobre os ficheiros de fundo em build (ordenados para ordem estável).
const bgFiles = import.meta.glob('../../backgrounds/*.{png,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

/** URLs dos fundos disponíveis, por ordem alfabética do nome do ficheiro. */
export const backgroundUrls = Object.keys(bgFiles)
  .sort()
  .map((key) => bgFiles[key])

function normalizeKey(str = '') {
  return String(str)
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
}

/**
 * Decide que fundo (deste conjunto fixo) usar.
 * @returns {{ kind: 'image'|'solid', url?: string }}
 */
export function resolveBackground({ messageType, seriesName, singleSeed }) {
  const n = backgroundUrls.length
  if (n === 0) return { kind: 'solid' } // sem ficheiros: fundo sólido escuro

  let index
  if (messageType === 'series') {
    // Determinístico: a mesma série usa sempre o mesmo fundo do conjunto.
    index = hashString('serie:' + (normalizeKey(seriesName) || 'sem-nome')) % n
  } else {
    // Isolada: depende da seed sorteável (botão "Trocar fundo").
    index = (singleSeed >>> 0) % n
  }
  return { kind: 'image', url: backgroundUrls[index] }
}

/** Seed aleatória nova para o botão "Trocar fundo" das mensagens isoladas. */
export function newRandomSeed() {
  return Math.floor(Math.random() * 0xffffffff) >>> 0
}
