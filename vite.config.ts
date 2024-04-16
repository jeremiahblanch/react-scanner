import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      staticImport: true,
    }),
  ],
  build: {
    lib: {
      entry: {
        scanner: resolve(__dirname, "src/scanner.tsx"),
        "camera-chooser": resolve(__dirname, "src/camera-chooser.tsx"),
        index: resolve(__dirname, "src/index.ts"),
      },
      name: "BarcodeScanner",
    },
    rollupOptions: {
      external: [
        "react",
        "react/jsx-runtime",
        // 'barcode-detector/pure',
        // 'webrtc-adapter/dist/utils',
        // 'webrtc-adapter/dist/chrome/getusermedia',
        // 'webrtc-adapter/dist/firefox/getusermedia',
        // 'webrtc-adapter/dist/safari/safari_shim',
      ],
      output: {
        exports: "named",
      },
    },
  },
});