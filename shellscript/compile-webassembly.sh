docker run \
  --rm -it \
  -v $(pwd)/scissors/src/wasm:/src \
  trzeci/emscripten \
  emcc -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -s MODULARIZE=1 -s EXTRA_EXPORTED_RUNTIME_METHODS=[\"FS\"] -s EXPORT_NAME=\"huffman\" -o ./huffman.js huffman.c
