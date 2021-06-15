import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'

const URL_PREFIX = (process.env.URL_PREFIX || '/').replace(new RegExp('/+$', 'g'), '') + '/';

// https://vitejs.dev/config/

export default defineConfig({

    base: URL_PREFIX,
    server: {

        proxy: {
            [URL_PREFIX + 'api/']: {
                'target': 'http://127.0.0.1:8000/',
                'changeOrigin': true,
                'rewrite': (path) => path.replace(URL_PREFIX, '')
            },
            [URL_PREFIX + 'upload/']: {
                'target': 'http://127.0.0.1:8000/',
                'changeOrigin': true,
                'rewrite': (path) => path.replace(URL_PREFIX, '')
            }
        }
    },
    plugins: [reactRefresh()],

})
