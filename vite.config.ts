import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import viteCompression from 'vite-plugin-compression'
import imagemin from 'unplugin-imagemin/vite'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({}), viteCompression({}), imagemin({})]
})
