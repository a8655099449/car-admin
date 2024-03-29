import react from '@vitejs/plugin-react';
// visualizer是 打包大小分析工具，执行build命令后，会在根目录生成 stats.html文件，可以打开分析项目文件大小
import visualizer from 'rollup-plugin-visualizer';
import { ConfigEnv, defineConfig, UserConfigExport } from 'vite';
import { viteMockServe } from 'vite-plugin-mock';

export default ({ command }: ConfigEnv): UserConfigExport => ({
  plugins: [
    react(),
    visualizer(),
    viteMockServe({
      mockPath: '/src/mock',
      localEnabled: command === 'serve',
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        modifyVars: {},
      },
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  server: {
    port: 9996,
    proxy: {
      '/api': {
        // target: 'http://47.107.81.99:3011',
        target: 'http://localhost:3011/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/rl': {
        target: 'https://xtbg.ydpt.tech',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/rl/, ''),
      },
    },
  },
});
