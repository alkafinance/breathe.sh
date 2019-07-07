// node environment
declare const require: (id: string) => any
declare const process: {
  env: {
    [key: string]: string | undefined
  }
}

// HMR
declare const module: {
  hot?: {
    dispose: (callback?: () => void) => void
    accept: (callback?: () => void) => void
  }
}

// phaser dependencies
declare class ActiveXObject {}

// HACK: stub globals from @types/node
declare namespace NodeJS {
  interface ReadableStream {}
}
