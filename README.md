# Gerador de Thumbnails — Igreja

Aplicação web para criar **thumbnails profissionais de YouTube** (estilo dos
grandes canais cristãos) em menos de 30 segundos. Basta preencher alguns campos
e a thumbnail é gerada automaticamente, pronta a descarregar em **1280×720 PNG**.

![1280×720 · PNG](https://img.shields.io/badge/export-1280×720_PNG-f0b542)

---

## ✨ Funcionalidades

- **Pré-visualização em tempo real** — tudo o que mudas aparece logo.
- **Composição tipográfica centrada** (sem fotografia): título grande, muito
  espaço negativo, forte contraste — estilo dos grandes canais.
- **Pregador** com checkbox *Pastor* (→ "Pastor João Silva").
- **Mensagem isolada** ou **série de mensagens**:
  - Série → mostra *Nome da série* + *Título* e usa **sempre o mesmo fundo** para
    a mesma série (determinístico).
  - Isolada → mostra só o *Título*, com fundo **aleatório** (botão *Trocar fundo*).
- **Ajuste de texto**: tamanho e posição.
- **Logótipo da igreja** no canto **superior esquerdo** de todas as thumbnails
  (usa `assets/logo.png`; se não existir, mostra um monograma "iel" embutido).
- **Exportação PNG** em qualidade máxima.

---

## 🚀 Como executar

```bash
npm install          # instala dependências
npm run dev          # arranca em http://localhost:5173
npm run build        # build de produção (pasta dist/)
npm run preview      # pré-visualiza o build
```

> Requer Node.js 18+.

---

## 🖼️ Personalizar conteúdo

A app funciona **logo após o `npm run dev`**, mesmo sem imagens — os fundos são
gerados por código. Para usar conteúdo próprio:

| Pasta | O que colocar |
|---|---|
| `assets/logo.png` | Logótipo da igreja (PNG transparente, **claro/branco**). Aparece no canto superior esquerdo de cada thumbnail. Sem ele, é usado um monograma "iel" embutido. |
| `backgrounds/*.png` | Fundos para **mensagens isoladas** (escolhidos ao acaso). |
| `series/<Nome>/background.png` | Fundo fixo de cada **série** (a pasta tem de ter o nome da série). |

Cada pasta tem um `README.md` com detalhes. Resolução recomendada: **1280×720**.

---

## 🗂️ Estrutura do projeto

```
.
├── assets/                 # logótipo (logo.png)
├── backgrounds/            # fundos das mensagens isoladas
├── series/                 # fundos por série (uma pasta por série)
├── index.html
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── components/
    │   ├── Header.jsx
    │   ├── form/           # coluna esquerda (formulário)
    │   │   ├── FormPanel.jsx
    │   │   ├── PreacherFields.jsx
    │   │   ├── MessageFields.jsx
    │   │   └── AdjustControls.jsx
    │   ├── preview/        # coluna direita (pré-visualização)
    │   │   ├── PreviewPanel.jsx
    │   │   └── ThumbnailCanvas.jsx
    │   └── ui/             # componentes reutilizáveis (Button, Slider, …)
    ├── state/             # estado global (Context + reducer)
    ├── hooks/             # hooks (useImage, useFonts)
    ├── utils/             # lógica pura
    │   ├── render.js        # desenho da thumbnail no canvas (o "motor")
    │   ├── backgrounds.js    # registo + geração procedural de fundos
    │   ├── exportPng.js
    │   ├── prng.js          # aleatoriedade determinística (seeds)
    │   ├── formatName.js
    │   ├── loadImage.js
    │   └── logo.js
    └── styles/            # CSS (tema, layout, formulário, pré-visualização)
```

### Princípios de arquitetura

- **Responsabilidades separadas**: a UI (componentes) não conhece os detalhes do
  desenho — toda a composição visual vive em `utils/render.js`.
- **Estado central** num único sítio (`state/`), pronto a ligar no futuro a base
  de dados, login ou bibliotecas de pregadores/séries.
- **O mesmo canvas** serve a pré-visualização e a exportação → o que vês é o que
  exportas, exatamente a 1280×720.

---

## 🔮 Preparado para o futuro

A estrutura foi pensada para acrescentar facilmente:

- Biblioteca de pregadores e de séries (já há um sítio central para os dados).
- Base de dados / login (o estado está isolado em `state/`).
- IA para gerar fundos (basta fornecer um URL/Blob ao descritor de fundo).
- Templates diferentes (novas funções de layout em `utils/render.js`).
- Geração de thumbnails em lote (a função `drawThumbnail` é pura e reutilizável).
