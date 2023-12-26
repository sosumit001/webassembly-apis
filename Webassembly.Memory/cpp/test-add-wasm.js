
var memory = new WebAssembly.Memory({ initial: 10, maximum: 100 });


async function run_wasm() {

    // Fetch the WebAssembly module file ('add.wasm')
    const res = await fetch('add.wasm');
    const bytes = await res.arrayBuffer();

    // Instantiate the WebAssembly module
    const module = await WebAssembly.instantiate(bytes, {
        js: {
            mem: memory
        }
    });

    // Create an Int32Array to access the WebAssembly
    const jsArray = new Int32Array(module.instance.exports.memory.buffer);

    for (let i = 0; i < 10; i++) {
        jsArray[i] = i + 1;
    }

    const sumResult = module.instance.exports.sum_of_integers(0, 10);
    console.log('Sum of 10 integers:', sumResult);
}

// Call the function to run the WebAssembly module
run_wasm();