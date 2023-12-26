# WebAssembly Memory Interaction Example

## Overview

The aim of this project is to showcase how WebAssembly memory can be shared and accessed by both JavaScript and C++ code.

## WebAssembly Memory

A WebAssembly Memory is a contiguous block of raw bytes that can be used to store data that is accessible from both JavaScript and CPP files. In this project, we create a new WebAssembly Memory with an initial size of 10 pages and a maximum size of 100 pages.

```javascript
const memory = new WebAssembly.Memory({ initial: 10, maximum: 100 });
```

## Instantiating the WebAssembly Module

To access the WebAssembly Memory from our C++ code, we need to import the memory instance into the WebAssembly module during instantiation. The WebAssembly.instantiate function allows us to specify imports that will be available to the WebAssembly module. In this case, we pass the memory instance as an import

```javascript
//test-add-wasm.js

async function run_wasm() {
  // Fetch the WebAssembly module file ('add.wasm')
  // add.wasm created by compiling add.cpp using emscripten
  // use : emcc add.c -o add.wasm
  const res = await fetch("add.wasm");
  const bytes = await res.arrayBuffer();

  // Instantiate the WebAssembly module with the imported memory instance
  const module = await WebAssembly.instantiate(bytes, {
    js: {
      mem: memory,
    },
  });

  // ...
}
```

## Summing integers with C++

The C++ function sum_of_integers is defined to read a given number of integers from the WebAssembly memory and calculate their sum

```cpp
// C++ Code (add.cpp)

#include <cstdint>

extern "C" {
    EMSCRIPTEN_KEEPALIVE
    int32_t sum_of_integers(int32_t* ptr, int32_t len) {
        int32_t sum = 0;
        for (int32_t i = 0; i < len; i++) {
            sum += ptr[i];
        }
        return sum;
    }
}
```

The sum_of_integers function takes a pointer (ptr) to the WebAssembly memory and the length (len) of the array to read. It then reads the integers from the memory and returns their sum

## Running the Example

To run the example, open the HTML file (index.html) in a web browser. The JavaScript code will automatically load the WebAssembly module, interact with the memory, and log the result of the sum of integers to the console.

You can also modify the JavaScript code to read and write data to the WebAssembly memory using the Int32Array as needed.

Please note that this example uses Emscripten for WebAssembly compilation. Ensure you have Emscripten set up for your development environment to run the example successfully
