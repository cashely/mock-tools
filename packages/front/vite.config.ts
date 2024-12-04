import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteExternalsPlugin } from 'vite-plugin-externals';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteExternalsPlugin({
    //   react: 'React',
    //  'react-dom': 'ReactDOM',
    //  'react-router-dom': 'ReactRouterDOM',
    //  'antd': 'antd'
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react','react-dom','react-router-dom', 'antd'],
          monaco: ['monaco-editor', '@monaco-editor/react', '@monaco-editor/loader'],
          icons: ['@ant-design/icons', 'react-icons'],
        }
      }
    }
  }
})
