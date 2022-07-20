import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
   plugins: [vue()],
   resolve: {
      alias: {
         '@': path.join(__dirname, '/src/'),
         '#': path.join(__dirname, '/global/'),
      },
   },

   // Tauri requirements
   clearScreen: false,
   server: {
      strictPort: true,
      host: 'localhost',
      port: 8080,
   },
   envPrefix: ['VITE_', 'TAURI_'],
   build: {
      target: ['es2021', 'chrome100', 'safari13'],
      minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
      sourcemap: !!process.env.TAURI_DEBUG,
   },
});
