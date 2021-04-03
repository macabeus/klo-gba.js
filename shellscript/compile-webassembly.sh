function docker_run_emscripten {
  local filename="$1"

  echo "Compiling $filename..."

  docker run \
    --rm -it \
    -v $(pwd)/scissors/src/wasm:/src \
    trzeci/emscripten:1.38.43 \
    emcc -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -s MODULARIZE=1 -s EXTRA_EXPORTED_RUNTIME_METHODS=[\"FS\"] -s EXPORT_NAME=\"$filename\" -o ./$filename.js $filename.c
}

docker_run_emscripten huffman
docker_run_emscripten lzss
