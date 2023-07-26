#include <cstdint>
#include <emscripten.h>

extern "C"
{
    // This function takes a pointer to the WebAssembly memory (ptr) and its length (len)
    // It reads the integers from the memory and returns their sum
    EMSCRIPTEN_KEEPALIVE
    int32_t sum_of_integers(int32_t *ptr, int32_t len)
    {
        int32_t sum = 0;

        for (int32_t i = 0; i < len; i++)
        {
            sum += ptr[i]; // read value from mem
        }

        // Return the sum of integers read from the memory
        return sum;
    }
}
