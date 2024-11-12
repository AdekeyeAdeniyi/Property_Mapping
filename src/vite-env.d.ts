/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_GOOGLE_MAPS_API_KEY: string;
  readonly VITE_APP_GOOGLE_MAPS_ID: string;
  readonly VITE_APP_ZILL_API_KEY: string;
  readonly VITE_APP_ZILL_URL: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
