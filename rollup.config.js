import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import styles from 'rollup-plugin-styles';
import pkg from './package.json';

const umd = {
  input: 'src/index.js',
  output: {
    name: 'gmaps-measuretool',
    file: pkg.browser,
    format: 'umd'
  },
  plugins: [
    resolve(),
    babel({
      exclude: ['node_modules/**']
    }),
    styles()
  ]
};

const esm = {
  input: 'src/index.js',
  external: ['gmaps-measuretool'],
  output: {
    file: pkg.module,
    format: 'es'
  },
  plugins: [
    babel({
      exclude: ['node_modules/**']
    }),
    styles()
  ]
};

export default [umd, esm];
