const rollup = require('rollup');
const babel = require("rollup-plugin-babel");

const inputOptions = {
  input: 'src/main.js',
  plugins: [
    babel({
      exclude: 'node_modules/**',
      plugins: ['external-helpers'],
      externalHelpers: true
    })
  ]
};

const outputOptions = {
  dir: 'dist',
  file: 'bundle.js',
  format: 'cjs'
};

const build = async () => {
  const bundle = await rollup.rollup(inputOptions);
  const { code, map } = await bundle.generate(outputOptions);
  await bundle.write(outputOptions);
};

build();
