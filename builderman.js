#!/usr/bin/env node
const babel = require('babel-core')
const fs = require('fs')
const defaultOptions = {
  extension: '.jsx',
  presets: [[ '@babel/preset-env', { shippedProposals: true } ]],
  plugins: [
    'add-module-exports',
  ],
}



async function compile(filename,toFile){
  const result = babel.transformFileSync(filename, {
    presets: defaultOptions.presets,
    plugins: [
      ...defaultOptions.plugins,
      ['@babel/transform-react-jsx', { pragma: 'h' }],
    ],
  })
  fs.promises.writeFile(toFile, result.code, (err) =>{console.error('\x1b[31m'+err)})
}
module.exports.compile = compile