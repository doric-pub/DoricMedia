import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'

export default {
    input: `build/src/doriclib-media.js`,
    output: {
        format: "cjs",
        file: `bundle/src/doriclib-media.js`,
        sourcemap: true,
    },
    plugins: [
        resolve({ jsnext: true, main: true }),
        commonjs()
    ],
    external: ['doric'],
}