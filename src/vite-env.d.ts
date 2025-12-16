/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_PAYLOAD_URL: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}