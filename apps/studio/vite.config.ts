import { fileURLToPath, URL } from "node:url";

import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@trackpress/core": fileURLToPath(
        new URL("../../packages/core/src/index.ts", import.meta.url),
      ),
      "@trackpress/themes": fileURLToPath(
        new URL("../../packages/themes/src/index.ts", import.meta.url),
      ),
    },
  },
});
