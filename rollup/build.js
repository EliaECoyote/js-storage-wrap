/* eslint-disable-next-line import/no-extraneous-dependencies */
const { rollup } = require("rollup");
/* eslint-disable-next-line import/no-extraneous-dependencies */
const babel = require("rollup-plugin-babel");
/* eslint-disable-next-line import/no-extraneous-dependencies */
const { terser } = require("rollup-plugin-terser");

async function buildBrowserBundle() {
  const inputOptions = {
    input: "src/main.js",
    plugins: [babel({ exclude: "node_modules/**" })]
  };
  const outputOptions = {
    file: "dist/browser_bundle.js",
    format: "cjs"
  };
  const bundle = await rollup(inputOptions);
  await bundle.generate(outputOptions);
  await bundle.write(outputOptions);
}

async function buildMinifiedBundle() {
  const inputOptions = {
    input: "src/main.js",
    plugins: [babel({ exclude: "node_modules/**" }), terser()]
  };
  const outputOptions = {
    file: "dist/bundle.min.js",
    compact: true,
    name: "StorageWrap",
    format: "iife"
  };
  const bundle = await rollup(inputOptions);
  await bundle.generate(outputOptions);
  await bundle.write(outputOptions);
}

async function buildNodeBundle() {
  const inputOptions = {
    input: "src/node.js",
    plugins: [babel({ exclude: "node_modules/**" })]
  };
  const outputOptions = {
    file: "dist/node_bundle.js",
    format: "cjs"
  };
  const bundle = await rollup(inputOptions);
  await bundle.generate(outputOptions);
  await bundle.write(outputOptions);
}

buildBrowserBundle();
buildMinifiedBundle();
buildNodeBundle();
