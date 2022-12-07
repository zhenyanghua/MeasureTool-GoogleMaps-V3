import fs from 'fs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import terser from '@rollup/plugin-terser';
import sass from 'rollup-plugin-sass';

const pkg = JSON.parse(fs.readFileSync(new URL('./package.json', import.meta.url), 'utf8'));

function onwarn (warning, warn) {
  if (warning.code === 'CIRCULAR_DEPENDENCY') {
    return;
  }
  warn(warning);
}

const umd = {
  input: 'src/index.js',
  output: {
    name: 'MeasureTool',
    file: pkg.browser,
    format: 'umd'
  },
  plugins: [
    resolve(),
    babel({
      babelHelpers: 'bundled',
      exclude: ['node_modules/**']
    }),
    sass({ insert: true }),
    terser()
  ],
  onwarn
};

const esm = {
  input: 'src/index.js',
  external: ['MeasureTool'],
  output: {
    file: pkg.module,
    format: 'es'
  },
  plugins: [
    resolve(),
    babel({
      babelHelpers: 'bundled',
      exclude: ['node_modules/**']
    }),
    sass({ insert: true })
  ],
  onwarn
};

export default [umd, esm];
