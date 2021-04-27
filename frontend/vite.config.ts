import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
   server: {
    proxy: {
      '/upload_file/': 'http://127.0.0.1:8000/'
    }
  },
  plugins: [reactRefresh()],

})
