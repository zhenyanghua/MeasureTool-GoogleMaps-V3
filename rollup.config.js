import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import styles from 'rollup-plugin-styles';
import pkg from './package.json';

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
      exclude: ['node_modules/**']
    }),
    styles()
  ],
  onwarn
};

const esm = {
  input: 'src/index.js',
  external: ['gmaps-measuretool'],
  output: {
    file: pkg.module,
    format: 'es',
    sourcemap: true
  },
  plugins: [
    resolve(),
    babel({
      exclude: ['node_modules/**']
    }),
    styles()
  ],
  onwarn
};

export default [umd, esm];
