import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Ensure Vite builds to "dist"
  },
  // resolve: {
  //   alias: {
  //     'react-konva': 'react-konva/es/ReactKonva',
  //   },
  // },
  // server: {
  //   port: process.env.PORT || 3000, // Use Heroku's port
  // },
})
