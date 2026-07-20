import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

const coreNodeModules = path.resolve(__dirname, '../../core/node_modules');

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    port: 5174,
    fs: { allow: [path.resolve(__dirname, '../../../..')] },
  },
  resolve: {
    alias: {
      '@stretch4paws/core': path.resolve(__dirname, '../../core/src'),
      '@stretch4paws/db': path.resolve(__dirname, '../../db/src'),
      'react': path.resolve(__dirname, 'node_modules/react'),
      'react-dom': path.resolve(__dirname, 'node_modules/react-dom'),
      'lottie-react': path.resolve(coreNodeModules, 'lottie-react/build/index.es.js'),
      'use-sound': path.resolve(coreNodeModules, 'use-sound'),
      'react-confetti': path.resolve(coreNodeModules, 'react-confetti'),
      'react-circular-progressbar': path.resolve(coreNodeModules, 'react-circular-progressbar'),
      'react-chartjs-2': path.resolve(coreNodeModules, 'react-chartjs-2'),
      'chart.js': path.resolve(coreNodeModules, 'chart.js'),
    },
  },
});
