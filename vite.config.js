import { defineConfig } from 'vite'
import react from '@vitejs/react-refresh' // o el plugin que uses (vue, svelte, etc.)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/conexzionweb/', // <--- AGREGA ESTA LÍNEA CON EL NOMBRE DE TU REPOSITORIO
})
