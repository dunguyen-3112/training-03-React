import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@src/": "/src/",
      "@components/": "/src/components/",
      "@services/": "/src/services/",
      "@pages/": "/src/pages/",
      "@routes/": "/src/routes/",
      "@utils/": "/src/utils/",
      "@hooks/": "/src/hooks/",
      "@helpers/": "/src/helpers/",
      "@layouts/": "/src/layouts/",
      "@context/": "/src/context/",
      "@assets/": "/src/assets/",
      "@constants/": "/src/constants/",
    },
  },
});
