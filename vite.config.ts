import { defineConfig, loadEnv } from "vite";

import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  // Determine base path based on environment
  let base = "/";
  if (mode === "production-github") {
    base = "/Shmira/";
  }

  return {
    plugins: [
      react(),
      {
        name: "html-transform",
        transformIndexHtml(html) {
          const date = new Date();
          const israelDateTime = date.toLocaleString("he-IL", {
            dateStyle: "short",
            timeStyle: "short",
            hour12: false,
          });
          return html.replace(
            /%VITE_RELEASE_DATE%/g,
            JSON.stringify(israelDateTime)
          );
        },
      },
    ],
    base,
    build: {
      outDir: "build",
      sourcemap: true,
    },
    server: {
      port: 3000,
      open: true,
    },
    preview: {
      port: 3000,
    },
    define: {
      define: {
        "import.meta.env.VITE_BUILD_EPOC_DATE": JSON.stringify(
          new Date().getTime()
        ),
        "import.meta.env.VITE_APP_VERSION": JSON.stringify(
          process.env.npm_package_version
        ),
      },
      "process.env.REACT_APP_ENV": JSON.stringify(env.VITE_APP_ENV || mode),
      VITE_RELEASE_DATE: JSON.stringify(new Date().toISOString()),
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./src/setupTests.ts",
      css: true,
    },
  };
});
