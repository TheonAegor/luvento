import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import viteTsconfigPaths from 'vite-tsconfig-paths';
import circleDependency from 'vite-plugin-circular-dependency';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), viteTsconfigPaths(), circleDependency()],
  resolve: {
    alias: {
        src: "/src",
    },
},
})
