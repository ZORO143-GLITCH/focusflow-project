import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ⚠️ Change 'focusflow' below to whatever your GitHub repo name is
// e.g. if your repo is github.com/yourname/my-app  →  base: '/my-app/'
export default defineConfig({
  plugins: [react()],
  base: '/',
})
