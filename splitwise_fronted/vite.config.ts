import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
// Add your framework plugin here if using one (e.g., import react from '@vitejs/plugin-react';)

export default defineConfig({
  plugins: [
    // Add your framework plugin here (e.g., react()),
    tailwindcss(),
  ],
});
