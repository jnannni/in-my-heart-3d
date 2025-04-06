import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'src/components'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@loader': path.resolve(__dirname, 'src/components/loader'),
      '@3dmodels': path.resolve(__dirname, 'src/components/3dmodels'),
      '@contexts': path.resolve(__dirname, 'src/components/contexts'),
      '@infoCards': path.resolve(__dirname, 'src/components/InfoCards'),
    },
  },
});
