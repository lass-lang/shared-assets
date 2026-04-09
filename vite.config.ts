import { defineConfig } from 'vite'
import lass from '@lass-lang/vite-plugin-lass'

export default defineConfig({
  plugins: [lass()],
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    minify: false,
    rollupOptions: {
      input: 'index.html',
      output: {
        assetFileNames: 'css/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
})
