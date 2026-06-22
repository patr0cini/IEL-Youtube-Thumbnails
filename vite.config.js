import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// Configuração do Vite.
// Os aliases facilitam imports e mantêm o código organizado e fácil de manter.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
      '@utils': fileURLToPath(new URL('./src/utils', import.meta.url)),
      '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      '@hooks': fileURLToPath(new URL('./src/hooks', import.meta.url)),
    },
  },
  // As pastas de conteúdo (backgrounds, series, assets) vivem na raiz do projeto.
  // O `import.meta.glob` descobre-as em tempo de build (ver src/utils/backgrounds.js).
})
