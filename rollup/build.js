/* eslint-disable-next-line */
const rollup = require('rollup');
/* eslint-disable-next-line */
const babel = require('rollup-plugin-babel');

const inputOptions = {
  input: 'src/main.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
  ],
};

const outputOptions = {
  dir: 'dist',
  file: 'bundle.js',
  format: 'cjs',
};

const build = async () => {
  const bundle = await rollup.rollup(inputOptions);
  await bundle.generate(outputOptions);
  await bundle.write(outputOptions);
};

build();
