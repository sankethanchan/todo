import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/getTodoList': 'http://127.0.0.1:3001',
      '/addTodoList': 'http://127.0.0.1:3001',
      '/updateTodoList': 'http://127.0.0.1:3001',
      '/deleteTodoList': 'http://127.0.0.1:3001',
    }
  }
})



// https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
