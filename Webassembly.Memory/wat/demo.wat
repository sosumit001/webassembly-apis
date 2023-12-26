(module
	;; reading the memory
	(import "js" "mem" (memory 1))
	(import "fun"  "log" (func $log (param i32) (param i32)))
	;; write to this memory
	(data (i32.const 0) "Hi")
	(func (export "writeHi")
		i32.const 0 ;; offset
		i32.const 2 ;; len
		call $log
	)
)