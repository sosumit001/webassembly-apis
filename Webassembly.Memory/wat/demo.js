const mem = new WebAssembly.Memory({
	initial: 1
})
const consoleLogString = (offset, len) => {
	const bytes = new Uint8Array(mem.buffer, offset, len)
	// const string = new TextDecoder("utf8").decode(bytes)
	// console.log(string)
}
const impObj = {
	js: {
		mem
	},
	fun: {
		log : consoleLogString
	}
}

fetch("./demo.wasm")
.then(wasmBinary => wasmBinary.arrayBuffer())
.then(bytes => WebAssembly.instantiate(bytes, impObj))
.then(wasmMod => {
	wasmMod.instance.exports.writeHi()
	// console.log('wasm mod : ', wasmMod)

})
