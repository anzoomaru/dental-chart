import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/dental-chart/", // ★これを追加（リポジトリ名）
  plugins: [react()],
})
