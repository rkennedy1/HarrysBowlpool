/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_API_URL: string;
  VITE_API_URL_DEV: string;
  VITE_USE_DEV: string;
  VITE_PORT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
