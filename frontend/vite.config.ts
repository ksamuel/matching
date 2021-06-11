import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '/matching/api/': {
                'target': 'http://127.0.0.1:8000/',
                'changeOrigin': true,
                'rewrite': (path) => path.replace(/^\/matching/, '')
            },
            '/matching/upload/': {
                'target': 'http://127.0.0.1:8000/',
                'changeOrigin': true,
                'rewrite': (path) => path.replace(/^\/matching/, '')
            },
            '/matching/$': {
                'target': 'http://127.0.0.1:8000/',
                'changeOrigin': true,
                'rewrite': (path) => path.replace(/^\/matching/, '')
            }
        }
    },
    plugins: [reactRefresh()],

})
