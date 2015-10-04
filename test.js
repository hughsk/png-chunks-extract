const test = require('tape')
const path = require('path')
const Chunks = require('./')
const fs = require('fs')

test('png-chunks-extract', function (t) {
  const data = fs.readFileSync(path.join(__dirname, 'test.png'))

  t.deepEqual(
    Chunks(data),
    Chunks(new Uint8Array(data)),
    'works identically with buffers and Uint8Arrays'
  )

  const chunks = Chunks(data)
  const names = chunks.map(function (chunk) {
    return chunk.name
  })

  const lengths = chunks.map(function (chunk) {
    return chunk.data.length
  })

  t.deepEqual(lengths, [ 13, 3094, 9, 413, 16384, 16384, 16384, 7168, 0 ], 'extracted chunk lengths are as expected')
  t.deepEqual(names, [
    'IHDR',
    'iCCP',
    'pHYs',
    'iTXt',
    'IDAT',
    'IDAT',
    'IDAT',
    'IDAT',
    'IEND'
  ], 'extracted chunk names are as expected')

  t.end()
})
