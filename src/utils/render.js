/**
 * Renderização da thumbnail num <canvas> 2D a 1280x720.
 *
 * O MESMO desenho serve a pré-visualização (canvas escalado por CSS) e a
 * exportação PNG — garantindo que o que se vê é exatamente o que se exporta.
 *
 * `drawThumbnail` é síncrono: assume que todas as imagens já estão carregadas
 * (o componente trata do carregamento). Toda a composição visual vive aqui,
 * separada da UI, para ser fácil de manter e evoluir (novos templates, etc.).
 *
 * Composição: tipográfica e CENTRADA (sem fotografia) — muito espaço negativo,
 * forte contraste e tipografia grande, no estilo dos grandes canais.
 */
// Cor de recurso caso não exista nenhum ficheiro de fundo.
const SOLID_BG = '#0a0c12'

// Dimensões oficiais da thumbnail.
export const THUMB_WIDTH = 1280
export const THUMB_HEIGHT = 720

// Identidade visual (cores) — consistente em todas as thumbnails.
const COLOR = {
  title: '#ffffff',
  series: '#f0b542', // dourado quente — etiqueta da série
  preacher: 'rgba(255,255,255,0.82)',
  bar: '#f0b542',
}

/**
 * Desenha a thumbnail completa.
 * @param {CanvasRenderingContext2D} ctx
 * @param {object} opts
 */
export function drawThumbnail(ctx, opts) {
  const { width = THUMB_WIDTH, height = THUMB_HEIGHT, background, text, logo } = opts

  ctx.clearRect(0, 0, width, height)

  // 1) Fundo (imagem real ou procedural determinístico).
  drawBackground(ctx, width, height, background)

  // 2) Camadas para profundidade e legibilidade do texto.
  drawScrims(ctx, width, height)

  // 3) Vinheta global subtil.
  drawVignette(ctx, width, height)

  // 4) Logótipo da igreja (canto superior esquerdo) — sempre presente.
  drawLogo(ctx, width, height, logo)

  // 5) Bloco de texto centrado (etiqueta da série + título + nome do pregador).
  drawTextBlock(ctx, width, height, text)
}

/* ------------------------------------------------------------------ *
 * Fundo
 * ------------------------------------------------------------------ */
function drawBackground(ctx, W, H, background) {
  if (background?.kind === 'image' && background.image) {
    drawCover(ctx, background.image, W, H)
  } else {
    // Sem imagem disponível (ainda a carregar ou sem ficheiros): fundo sólido.
    ctx.fillStyle = SOLID_BG
    ctx.fillRect(0, 0, W, H)
  }
}

/** Desenha uma imagem em modo "cover" (preenche, recorta o excesso). */
function drawCover(ctx, img, W, H, focusX = 0.5, focusY = 0.5) {
  const ir = img.width / img.height
  const cr = W / H
  let dw, dh
  if (ir > cr) {
    dh = H
    dw = H * ir
  } else {
    dw = W
    dh = W / ir
  }
  const dx = (W - dw) * focusX
  const dy = (H - dh) * focusY
  ctx.drawImage(img, dx, dy, dw, dh)
}

/* ------------------------------------------------------------------ *
 * Camadas escuras (scrims) para contraste e legibilidade
 * ------------------------------------------------------------------ */
function drawScrims(ctx, W, H) {
  // Escurecimento radial central, subtil, para o texto "assentar".
  const center = ctx.createRadialGradient(W / 2, H / 2, H * 0.2, W / 2, H / 2, W * 0.65)
  center.addColorStop(0, 'rgba(0,0,0,0.32)')
  center.addColorStop(1, 'rgba(0,0,0,0)')
  ctx.fillStyle = center
  ctx.fillRect(0, 0, W, H)

  // Reforço suave no topo e na base.
  const topBottom = ctx.createLinearGradient(0, 0, 0, H)
  topBottom.addColorStop(0, 'rgba(0,0,0,0.28)')
  topBottom.addColorStop(0.5, 'rgba(0,0,0,0)')
  topBottom.addColorStop(1, 'rgba(0,0,0,0.34)')
  ctx.fillStyle = topBottom
  ctx.fillRect(0, 0, W, H)
}

/* ------------------------------------------------------------------ *
 * Vinheta
 * ------------------------------------------------------------------ */
function drawVignette(ctx, W, H) {
  const grad = ctx.createRadialGradient(W / 2, H / 2, H * 0.35, W / 2, H / 2, H * 0.9)
  grad.addColorStop(0, 'rgba(0,0,0,0)')
  grad.addColorStop(1, 'rgba(0,0,0,0.5)')
  ctx.fillStyle = grad
  ctx.fillRect(0, 0, W, H)
}

/* ------------------------------------------------------------------ *
 * Bloco de texto (centrado)
 * ------------------------------------------------------------------ */
function drawTextBlock(ctx, W, H, text) {
  const {
    seriesLabel = '',
    title = '',
    preacherName = '',
    scale = 1,
    posX = 0,
    posY = 0,
    showSeries = false,
  } = text || {}

  const centerX = W / 2 + posX
  const maxWidth = W * 0.82

  const titleSize = 132 * scale
  const titleLineHeight = titleSize * 0.9
  const seriesSize = 32 * scale
  const preacherSize = 36 * scale

  // Quebra o título em linhas que cabem na largura disponível.
  setFont(ctx, `${titleSize}px 'Bebas Neue', sans-serif`)
  const titleLines = wrapText(ctx, (title || '').toUpperCase(), maxWidth)

  // Alturas de cada bloco para centrar verticalmente o conjunto.
  const barH = showSeries && seriesLabel ? 18 : 0 // barra + espaço
  const gapSeries = showSeries && seriesLabel ? seriesSize + 30 : 0
  const gapPreacher = preacherName ? preacherSize + 34 : 0
  const titleBlockH = titleLines.length * titleLineHeight
  const totalH = barH + gapSeries + titleBlockH + gapPreacher

  let y = H / 2 - totalH / 2 + posY
  ctx.textAlign = 'center'
  ctx.textBaseline = 'top'

  // 1) Etiqueta da série (só em séries) — barra dourada centrada + texto.
  if (showSeries && seriesLabel) {
    ctx.fillStyle = COLOR.bar
    ctx.fillRect(centerX - 28, y, 56, 3)
    y += barH

    setFont(ctx, `700 ${seriesSize}px 'Montserrat', sans-serif`)
    setLetterSpacing(ctx, '6px')
    ctx.fillStyle = COLOR.series
    // pequeno ajuste: o letter-spacing desloca o centro; compensa com padding.
    ctx.fillText(seriesLabel.toUpperCase(), centerX + 3, y)
    setLetterSpacing(ctx, 'normal')
    y += gapSeries
  }

  // 2) Título (grande, Bebas Neue).
  setFont(ctx, `${titleSize}px 'Bebas Neue', sans-serif`)
  ctx.fillStyle = COLOR.title
  ctx.save()
  ctx.shadowColor = 'rgba(0,0,0,0.55)'
  ctx.shadowBlur = 22
  ctx.shadowOffsetY = 5
  for (const line of titleLines) {
    ctx.fillText(line, centerX, y)
    y += titleLineHeight
  }
  ctx.restore()

  // 3) Nome do pregador.
  if (preacherName) {
    y += 34
    setFont(ctx, `600 ${preacherSize}px 'Montserrat', sans-serif`)
    setLetterSpacing(ctx, '1.5px')
    ctx.fillStyle = COLOR.preacher
    ctx.fillText(preacherName, centerX, y)
    setLetterSpacing(ctx, 'normal')
  }
}

/* ------------------------------------------------------------------ *
 * Logótipo (canto superior esquerdo)
 * ------------------------------------------------------------------ */
const LOGO_MARGIN = 46

function drawLogo(ctx, W, H, logo) {
  if (logo) {
    // Logótipo oficial da igreja (assets/logo.png), se existir.
    const targetH = 76
    const dw = targetH * (logo.width / logo.height)
    ctx.save()
    ctx.globalAlpha = 0.97
    ctx.drawImage(logo, LOGO_MARGIN, LOGO_MARGIN, dw, targetH)
    ctx.restore()
    return
  }
  // Caso não exista ficheiro, desenha o monograma "iel" embutido.
  drawMonogram(ctx, LOGO_MARGIN, LOGO_MARGIN)
}

/** Monograma "iel" (anel + wordmark) usado como logótipo predefinido. */
function drawMonogram(ctx, x, y) {
  const R = 35
  const cx = x + R
  const cy = y + R
  ctx.save()
  ctx.globalAlpha = 0.95
  ctx.shadowColor = 'rgba(0,0,0,0.45)'
  ctx.shadowBlur = 10

  // Anel exterior.
  ctx.strokeStyle = '#ffffff'
  ctx.lineWidth = R * 0.085
  ctx.beginPath()
  ctx.arc(cx, cy, R, 0, Math.PI * 2)
  ctx.stroke()

  // Wordmark "iel" centrado no anel.
  ctx.shadowBlur = 0
  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.font = `700 ${Math.round(R * 0.92)}px 'Montserrat', sans-serif`
  setLetterSpacing(ctx, '0.5px')
  ctx.fillText('iel', cx + 0.5, cy + R * 0.04)
  setLetterSpacing(ctx, 'normal')
  ctx.restore()
}

/* ------------------------------------------------------------------ *
 * Utilitários de texto
 * ------------------------------------------------------------------ */
function setFont(ctx, font) {
  ctx.font = font
}

/** letterSpacing nem sempre existe — protege contra browsers antigos. */
function setLetterSpacing(ctx, value) {
  try {
    ctx.letterSpacing = value
  } catch {
    /* ignora silenciosamente */
  }
}

/** Quebra o texto em linhas que cabem em maxWidth (respeita \n manual). */
function wrapText(ctx, text, maxWidth) {
  const lines = []
  for (const paragraph of String(text).split('\n')) {
    const words = paragraph.split(/\s+/).filter(Boolean)
    if (words.length === 0) {
      lines.push('')
      continue
    }
    let current = words[0]
    for (let i = 1; i < words.length; i++) {
      const test = current + ' ' + words[i]
      if (ctx.measureText(test).width > maxWidth) {
        lines.push(current)
        current = words[i]
      } else {
        current = test
      }
    }
    lines.push(current)
  }
  return lines
}
