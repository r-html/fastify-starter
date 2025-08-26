/* eslint-disable node/no-unpublished-import */
import { exit } from 'node:process'

import { build } from 'esbuild'
import esbuildPluginPino from 'esbuild-plugin-pino'
import esbuildPluginTsc from 'esbuild-plugin-tsc'

build({
  entryPoints: [process.env.ENTRY_POINTS],
  bundle: true,
  sourcemap: true,
  minify: process.env.NODE_ENV !== 'dev',
  keepNames: true,
  platform: 'node',
  format: 'cjs',
  outdir: './deploy/dist',
  logLevel: 'info',
  /* TODO find out why thread-stream is not bundling correctly */
  /* Fixed by manually copying the node_modules/thread-stream/lib folder to deploy/dist folder */
  // external: ['thread-stream'],
  plugins: [
    esbuildPluginTsc(),
    esbuildPluginPino({
      transports: ['pino-pretty'],
    }),
  ],
}).catch(e => {
  console.error(e)
  exit(1)
})
