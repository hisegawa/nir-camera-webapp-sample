import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import mkcert from "vite-plugin-mkcert";

// https://vite.dev/config/
export default defineConfig({
  base: "/nir-camera-webapp-sample/",
  server: {
    host: true,
    https: true
  },
  plugins: [mkcert(), react()]
});
