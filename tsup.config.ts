import type { Options } from 'tsup'

export const tsup: Options = {
  dts: true,
  clean: true,
  minify: true,
  // splitting: true,
  format: ['esm', 'cjs'],
  external: ['vue', 'react'],
  entry: [
    'src/*.ts',
    'src/*.tsx'
  ],
}
