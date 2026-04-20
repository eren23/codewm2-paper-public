export class NeoUnify {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        NeoUnifyFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_neounify_free(ptr, 0);
    }
    /**
     * Generate an image using RK2 ODE solver with classifier-free guidance.
     * Returns CHW f32 array [3, 16, 16] = 768 floats.
     * @param {number} class_label
     * @param {number} guidance_scale
     * @param {number} num_steps
     * @param {number} seed
     * @returns {Float32Array}
     */
    generate(class_label, guidance_scale, num_steps, seed) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.neounify_generate(retptr, this.__wbg_ptr, class_label, guidance_scale, num_steps, seed);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayF32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Generate and return all intermediate steps for visualization.
     * Returns [num_steps+1, 3, 16, 16] flattened.
     * @param {number} class_label
     * @param {number} guidance_scale
     * @param {number} num_steps
     * @param {number} seed
     * @returns {Float32Array}
     */
    generate_with_steps(class_label, guidance_scale, num_steps, seed) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.neounify_generate_with_steps(retptr, this.__wbg_ptr, class_label, guidance_scale, num_steps, seed);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v1 = getArrayF32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @returns {number}
     */
    image_size() {
        const ret = wasm.neounify_image_size(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {Uint8Array} data
     */
    constructor(data) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            wasm.neounify_new(retptr, ptr0, len0);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            NeoUnifyFinalization.register(this, this.__wbg_ptr, this);
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @returns {number}
     */
    num_classes() {
        const ret = wasm.neounify_num_classes(this.__wbg_ptr);
        return ret >>> 0;
    }
}
if (Symbol.dispose) NeoUnify.prototype[Symbol.dispose] = NeoUnify.prototype.free;

export class RealLeWM {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RealLeWMFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_reallewm_free(ptr, 0);
    }
    /**
     * Encode a 224x224x3 image (HWC, flat f32 array) to a latent state [192].
     * @param {Float32Array} pixels
     * @param {number} height
     * @param {number} width
     * @returns {Float32Array}
     */
    encode_image(pixels, height, width) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArrayF32ToWasm0(pixels, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            wasm.reallewm_encode_image(retptr, this.__wbg_ptr, ptr0, len0, height, width);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v2 = getArrayF32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export(r0, r1 * 4, 4);
            return v2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Returns the latent dimension (192).
     * @returns {number}
     */
    latent_dim() {
        const ret = wasm.reallewm_latent_dim(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Load model from compact binary format.
     *
     * Format: [u32 header_len][JSON header][raw f32 data]
     * @param {Uint8Array} data
     */
    constructor(data) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            wasm.reallewm_load_from_bytes(retptr, ptr0, len0);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeObject(r1);
            }
            this.__wbg_ptr = r0 >>> 0;
            RealLeWMFinalization.register(this, this.__wbg_ptr, this);
            return this;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Predict next latent state given current state [192] and action [10].
     * @param {Float32Array} state
     * @param {Float32Array} action
     * @returns {Float32Array}
     */
    predict_next(state, action) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArrayF32ToWasm0(state, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passArrayF32ToWasm0(action, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            wasm.reallewm_predict_next(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v3 = getArrayF32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export(r0, r1 * 4, 4);
            return v3;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Multi-step rollout. Returns flattened array [num_steps * 192].
     * @param {Float32Array} state
     * @param {Float32Array} actions
     * @param {number} num_steps
     * @returns {Float32Array}
     */
    rollout(state, actions, num_steps) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArrayF32ToWasm0(state, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passArrayF32ToWasm0(actions, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            wasm.reallewm_rollout(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1, num_steps);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v3 = getArrayF32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export(r0, r1 * 4, 4);
            return v3;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
if (Symbol.dispose) RealLeWM.prototype[Symbol.dispose] = RealLeWM.prototype.free;

export class RealLeWMInt8 {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(RealLeWMInt8.prototype);
        obj.__wbg_ptr = ptr;
        RealLeWMInt8Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RealLeWMInt8Finalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_reallewmint8_free(ptr, 0);
    }
    /**
     * Returns the action dimension (10).
     * @returns {number}
     */
    action_dim() {
        const ret = wasm.reallewmint8_action_dim(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Encode a 224x224x3 image (HWC, flat f32 array) to a latent state [192].
     * Same as RealLeWM — encoder is f32.
     * @param {Float32Array} pixels
     * @param {number} height
     * @param {number} width
     * @returns {Float32Array}
     */
    encode_image(pixels, height, width) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArrayF32ToWasm0(pixels, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            wasm.reallewmint8_encode_image(retptr, this.__wbg_ptr, ptr0, len0, height, width);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v2 = getArrayF32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export(r0, r1 * 4, 4);
            return v2;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Load from f32 binary (same format as RealLeWM) and quantize predictor
     * layers to INT8 in-browser. Same 69MB download, ~4x less runtime memory
     * for predictor inference.
     * @param {Uint8Array} data
     * @returns {RealLeWMInt8}
     */
    static from_f32_data(data) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            wasm.reallewmint8_from_f32_data(retptr, ptr0, len0);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var r2 = getDataViewMemory0().getInt32(retptr + 4 * 2, true);
            if (r2) {
                throw takeObject(r1);
            }
            return RealLeWMInt8.__wrap(r0);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Returns the latent dimension (192).
     * @returns {number}
     */
    latent_dim() {
        const ret = wasm.reallewmint8_latent_dim(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Predict next latent state using INT8 quantized predictor layers.
     * @param {Float32Array} state
     * @param {Float32Array} action
     * @returns {Float32Array}
     */
    predict_next(state, action) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArrayF32ToWasm0(state, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passArrayF32ToWasm0(action, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            wasm.reallewmint8_predict_next(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v3 = getArrayF32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export(r0, r1 * 4, 4);
            return v3;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * Multi-step rollout using INT8 quantized predictor layers.
     * Returns flattened array [num_steps * 192].
     * @param {Float32Array} state
     * @param {Float32Array} actions
     * @param {number} num_steps
     * @returns {Float32Array}
     */
    rollout(state, actions, num_steps) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArrayF32ToWasm0(state, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passArrayF32ToWasm0(actions, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            wasm.reallewmint8_rollout(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1, num_steps);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v3 = getArrayF32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export(r0, r1 * 4, 4);
            return v3;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
if (Symbol.dispose) RealLeWMInt8.prototype[Symbol.dispose] = RealLeWMInt8.prototype.free;

/**
 * A minimal world model dynamics predictor for WASM (demo with random weights).
 */
export class WasmWorldModel {
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WasmWorldModelFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wasmworldmodel_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    action_dim() {
        const ret = wasm.wasmworldmodel_action_dim(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    latent_dim() {
        const ret = wasm.wasmworldmodel_latent_dim(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {number} latent_dim
     * @param {number} action_dim
     * @param {number} hidden_dim
     * @param {number} num_layers
     * @param {number} num_heads
     */
    constructor(latent_dim, action_dim, hidden_dim, num_layers, num_heads) {
        const ret = wasm.wasmworldmodel_new(latent_dim, action_dim, hidden_dim, num_layers, num_heads);
        this.__wbg_ptr = ret >>> 0;
        WasmWorldModelFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * @param {Float32Array} state
     * @param {Float32Array} action
     * @returns {Float32Array}
     */
    predict_next(state, action) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArrayF32ToWasm0(state, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passArrayF32ToWasm0(action, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            wasm.wasmworldmodel_predict_next(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v3 = getArrayF32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export(r0, r1 * 4, 4);
            return v3;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
     * @param {Float32Array} initial_state
     * @param {Float32Array} actions
     * @param {number} num_steps
     * @returns {Float32Array}
     */
    rollout(initial_state, actions, num_steps) {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            const ptr0 = passArrayF32ToWasm0(initial_state, wasm.__wbindgen_export2);
            const len0 = WASM_VECTOR_LEN;
            const ptr1 = passArrayF32ToWasm0(actions, wasm.__wbindgen_export2);
            const len1 = WASM_VECTOR_LEN;
            wasm.wasmworldmodel_rollout(retptr, this.__wbg_ptr, ptr0, len0, ptr1, len1, num_steps);
            var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
            var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
            var v3 = getArrayF32FromWasm0(r0, r1).slice();
            wasm.__wbindgen_export(r0, r1 * 4, 4);
            return v3;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
}
if (Symbol.dispose) WasmWorldModel.prototype[Symbol.dispose] = WasmWorldModel.prototype.free;

/**
 * @returns {string}
 */
export function capability_report_json() {
    let deferred1_0;
    let deferred1_1;
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.capability_report_json(retptr);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        deferred1_0 = r0;
        deferred1_1 = r1;
        return getStringFromWasm0(r0, r1);
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
        wasm.__wbindgen_export(deferred1_0, deferred1_1, 1);
    }
}

/**
 * Geometric attention — also available in WASM.
 * @param {number} n
 * @param {number} d
 * @param {Float32Array} q
 * @param {Float32Array} k
 * @param {Float32Array} v
 * @param {Float32Array} positions
 * @param {number} sigma
 * @returns {Float32Array}
 */
export function geometric_attention_wasm(n, d, q, k, v, positions, sigma) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passArrayF32ToWasm0(q, wasm.__wbindgen_export2);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayF32ToWasm0(k, wasm.__wbindgen_export2);
        const len1 = WASM_VECTOR_LEN;
        const ptr2 = passArrayF32ToWasm0(v, wasm.__wbindgen_export2);
        const len2 = WASM_VECTOR_LEN;
        const ptr3 = passArrayF32ToWasm0(positions, wasm.__wbindgen_export2);
        const len3 = WASM_VECTOR_LEN;
        wasm.geometric_attention_wasm(retptr, n, d, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, sigma);
        var r0 = getDataViewMemory0().getInt32(retptr + 4 * 0, true);
        var r1 = getDataViewMemory0().getInt32(retptr + 4 * 1, true);
        var v5 = getArrayF32FromWasm0(r0, r1).slice();
        wasm.__wbindgen_export(r0, r1 * 4, 4);
        return v5;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}
export function __wbg_Error_83742b46f01ce22d(arg0, arg1) {
    const ret = Error(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
}
export function __wbg___wbindgen_throw_6ddd609b62940d55(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
}
const NeoUnifyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_neounify_free(ptr >>> 0, 1));
const RealLeWMFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_reallewm_free(ptr >>> 0, 1));
const RealLeWMInt8Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_reallewmint8_free(ptr >>> 0, 1));
const WasmWorldModelFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_wasmworldmodel_free(ptr >>> 0, 1));

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function dropObject(idx) {
    if (idx < 1028) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

let cachedDataViewMemory0 = null;
function getDataViewMemory0() {
    if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
        cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
    }
    return cachedDataViewMemory0;
}

let cachedFloat32ArrayMemory0 = null;
function getFloat32ArrayMemory0() {
    if (cachedFloat32ArrayMemory0 === null || cachedFloat32ArrayMemory0.byteLength === 0) {
        cachedFloat32ArrayMemory0 = new Float32Array(wasm.memory.buffer);
    }
    return cachedFloat32ArrayMemory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return decodeText(ptr, len);
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function getObject(idx) { return heap[idx]; }

let heap = new Array(1024).fill(undefined);
heap.push(undefined, null, true, false);

let heap_next = heap.length;

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1, 1) >>> 0;
    getUint8ArrayMemory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function passArrayF32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getFloat32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
cachedTextDecoder.decode();
const MAX_SAFARI_DECODE_BYTES = 2146435072;
let numBytesDecoded = 0;
function decodeText(ptr, len) {
    numBytesDecoded += len;
    if (numBytesDecoded >= MAX_SAFARI_DECODE_BYTES) {
        cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });
        cachedTextDecoder.decode();
        numBytesDecoded = len;
    }
    return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
}

let WASM_VECTOR_LEN = 0;


let wasm;
export function __wbg_set_wasm(val) {
    wasm = val;
}
