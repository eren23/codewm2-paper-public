/* @ts-self-types="./synapse_wasm.d.ts" */

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
        const ret = wasm.neounify_generate(this.__wbg_ptr, class_label, guidance_scale, num_steps, seed);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
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
        const ret = wasm.neounify_generate_with_steps(this.__wbg_ptr, class_label, guidance_scale, num_steps, seed);
        var v1 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v1;
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
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.neounify_new(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        NeoUnifyFinalization.register(this, this.__wbg_ptr, this);
        return this;
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
     * Encode a 224x224x3 image (HWC, flat f32 array) to a latent state.
     * For slim models with input_proj, projects 192d encoder output to latent space.
     * @param {Float32Array} pixels
     * @param {number} height
     * @param {number} width
     * @returns {Float32Array}
     */
    encode_image(pixels, height, width) {
        const ptr0 = passArrayF32ToWasm0(pixels, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.reallewm_encode_image(this.__wbg_ptr, ptr0, len0, height, width);
        var v2 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
    /**
     * Returns the latent dimension (192 for baseline, 96 for slim).
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
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.reallewm_load_from_bytes(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        this.__wbg_ptr = ret[0] >>> 0;
        RealLeWMFinalization.register(this, this.__wbg_ptr, this);
        return this;
    }
    /**
     * Predict next latent state given current state [192] and action [10].
     * @param {Float32Array} state
     * @param {Float32Array} action
     * @returns {Float32Array}
     */
    predict_next(state, action) {
        const ptr0 = passArrayF32ToWasm0(state, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayF32ToWasm0(action, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.reallewm_predict_next(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        var v3 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v3;
    }
    /**
     * Multi-step rollout. Returns flattened array [num_steps * latent_dim].
     * @param {Float32Array} state
     * @param {Float32Array} actions
     * @param {number} num_steps
     * @returns {Float32Array}
     */
    rollout(state, actions, num_steps) {
        const ptr0 = passArrayF32ToWasm0(state, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayF32ToWasm0(actions, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.reallewm_rollout(this.__wbg_ptr, ptr0, len0, ptr1, len1, num_steps);
        var v3 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v3;
    }
}
if (Symbol.dispose) RealLeWM.prototype[Symbol.dispose] = RealLeWM.prototype.free;

export class RealLeWMFullQ4 {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(RealLeWMFullQ4.prototype);
        obj.__wbg_ptr = ptr;
        RealLeWMFullQ4Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RealLeWMFullQ4Finalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_reallewmfullq4_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    action_dim() {
        const ret = wasm.reallewmfullq4_action_dim(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {Float32Array} pixels
     * @param {number} height
     * @param {number} width
     * @returns {Float32Array}
     */
    encode_image(pixels, height, width) {
        const ptr0 = passArrayF32ToWasm0(pixels, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.reallewmfullq4_encode_image(this.__wbg_ptr, ptr0, len0, height, width);
        var v2 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
    /**
     * Load f32 weights and quantize BOTH encoder and predictor to Q4 in-browser.
     * Runtime memory: ~8MB (vs 52MB f32). Download is still 69MB.
     * @param {Uint8Array} data
     * @returns {RealLeWMFullQ4}
     */
    static from_f32_data(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.reallewmfullq4_from_f32_data(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return RealLeWMFullQ4.__wrap(ret[0]);
    }
    /**
     * Load pre-quantized LQ40 binary (INT8 encoder + Q4 predictor).
     * Format: [4B "LQ40"][4B config_len][JSON config][sequential weight data]
     * @param {Uint8Array} data
     * @returns {RealLeWMFullQ4}
     */
    static from_lq40_data(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.reallewmfullq4_from_lq40_data(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return RealLeWMFullQ4.__wrap(ret[0]);
    }
    /**
     * @returns {number}
     */
    latent_dim() {
        const ret = wasm.reallewmfullq4_latent_dim(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {Float32Array} state
     * @param {Float32Array} action
     * @returns {Float32Array}
     */
    predict_next(state, action) {
        const ptr0 = passArrayF32ToWasm0(state, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayF32ToWasm0(action, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.reallewmfullq4_predict_next(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        var v3 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v3;
    }
    /**
     * @param {Float32Array} state
     * @param {Float32Array} actions
     * @param {number} num_steps
     * @returns {Float32Array}
     */
    rollout(state, actions, num_steps) {
        const ptr0 = passArrayF32ToWasm0(state, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayF32ToWasm0(actions, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.reallewmfullq4_rollout(this.__wbg_ptr, ptr0, len0, ptr1, len1, num_steps);
        var v3 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v3;
    }
}
if (Symbol.dispose) RealLeWMFullQ4.prototype[Symbol.dispose] = RealLeWMFullQ4.prototype.free;

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
        const ptr0 = passArrayF32ToWasm0(pixels, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.reallewmint8_encode_image(this.__wbg_ptr, ptr0, len0, height, width);
        var v2 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
    /**
     * Load from f32 binary (same format as RealLeWM) and quantize predictor
     * layers to INT8 in-browser. Same 69MB download, ~4x less runtime memory
     * for predictor inference.
     * @param {Uint8Array} data
     * @returns {RealLeWMInt8}
     */
    static from_f32_data(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.reallewmint8_from_f32_data(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return RealLeWMInt8.__wrap(ret[0]);
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
        const ptr0 = passArrayF32ToWasm0(state, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayF32ToWasm0(action, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.reallewmint8_predict_next(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        var v3 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v3;
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
        const ptr0 = passArrayF32ToWasm0(state, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayF32ToWasm0(actions, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.reallewmint8_rollout(this.__wbg_ptr, ptr0, len0, ptr1, len1, num_steps);
        var v3 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v3;
    }
}
if (Symbol.dispose) RealLeWMInt8.prototype[Symbol.dispose] = RealLeWMInt8.prototype.free;

export class RealLeWMQ4 {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(RealLeWMQ4.prototype);
        obj.__wbg_ptr = ptr;
        RealLeWMQ4Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        RealLeWMQ4Finalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_reallewmq4_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    action_dim() {
        const ret = wasm.reallewmq4_action_dim(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {Float32Array} pixels
     * @param {number} height
     * @param {number} width
     * @returns {Float32Array}
     */
    encode_image(pixels, height, width) {
        const ptr0 = passArrayF32ToWasm0(pixels, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.reallewmq4_encode_image(this.__wbg_ptr, ptr0, len0, height, width);
        var v2 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
    /**
     * Load from f32 binary (same format as RealLeWM) and quantize predictor
     * layers to Q4 in-browser. Same 69MB download, ~8x less runtime memory
     * for predictor inference.
     * @param {Uint8Array} data
     * @returns {RealLeWMQ4}
     */
    static from_f32_data(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.reallewmq4_from_f32_data(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return RealLeWMQ4.__wrap(ret[0]);
    }
    /**
     * Load pre-quantized LQ40 binary (f32 encoder + Q4 predictor).
     * Works for q4-pred, wanda20-q4, wanda40-q4 modes.
     * @param {Uint8Array} data
     * @returns {RealLeWMQ4}
     */
    static from_lq40_data(data) {
        const ptr0 = passArray8ToWasm0(data, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.reallewmq4_from_lq40_data(ptr0, len0);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return RealLeWMQ4.__wrap(ret[0]);
    }
    /**
     * @returns {number}
     */
    latent_dim() {
        const ret = wasm.reallewmq4_latent_dim(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {Float32Array} state
     * @param {Float32Array} action
     * @returns {Float32Array}
     */
    predict_next(state, action) {
        const ptr0 = passArrayF32ToWasm0(state, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayF32ToWasm0(action, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.reallewmq4_predict_next(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        var v3 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v3;
    }
    /**
     * @param {Float32Array} state
     * @param {Float32Array} actions
     * @param {number} num_steps
     * @returns {Float32Array}
     */
    rollout(state, actions, num_steps) {
        const ptr0 = passArrayF32ToWasm0(state, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayF32ToWasm0(actions, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.reallewmq4_rollout(this.__wbg_ptr, ptr0, len0, ptr1, len1, num_steps);
        var v3 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v3;
    }
}
if (Symbol.dispose) RealLeWMQ4.prototype[Symbol.dispose] = RealLeWMQ4.prototype.free;

/**
 * Code WM running in WASM. Zero drift vs PyTorch reference (<1e-6 max_abs).
 *
 * Usage from JS:
 * ```js
 * const configJson = await (await fetch("code_wm_g8.json")).text();
 * const weightsBytes = new Uint8Array(await (await fetch("g8.safetensors")).arrayBuffer());
 * const model = WasmCodeWM.create(configJson, weightsBytes);
 * // tokens is an Int32Array of ids from the ast_tokenizer (< 662)
 * const embedding = model.encode(new Int32Array([1,2,3,...]));   // length 128
 * ```
 */
export class WasmCodeWM {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(WasmCodeWM.prototype);
        obj.__wbg_ptr = ptr;
        WasmCodeWMFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WasmCodeWMFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wasmcodewm_free(ptr, 0);
    }
    /**
     * @returns {number}
     */
    action_dim() {
        const ret = wasm.wasmcodewm_action_dim(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Build from config JSON string + safetensors bytes.
     * @param {string} config_json
     * @param {Uint8Array} weights_bytes
     * @returns {WasmCodeWM}
     */
    static create(config_json, weights_bytes) {
        const ptr0 = passStringToWasm0(config_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(weights_bytes, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.wasmcodewm_create(ptr0, len0, ptr1, len1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return WasmCodeWM.__wrap(ret[0]);
    }
    /**
     * Build from config + encoder-only weights (target encoder for prediction).
     * Accepts partial safetensors with only state_encoder.* keys — action encoder
     * and predictor are left zeroed. Only `.encode()` is valid on this instance.
     * @param {string} config_json
     * @param {Uint8Array} weights_bytes
     * @returns {WasmCodeWM}
     */
    static create_encoder_only(config_json, weights_bytes) {
        const ptr0 = passStringToWasm0(config_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(weights_bytes, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.wasmcodewm_create_encoder_only(ptr0, len0, ptr1, len1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return WasmCodeWM.__wrap(ret[0]);
    }
    /**
     * Encode a token sequence to a model_dim-d latent. Accepts i32 for JS
     * ergonomics; values must be < vocab_size.
     * @param {Int32Array} tokens
     * @returns {Float32Array}
     */
    encode(tokens) {
        const ptr0 = passArray32ToWasm0(tokens, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmcodewm_encode(this.__wbg_ptr, ptr0, len0);
        var v2 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
    /**
     * Encode an action vector (length action_dim) to a model_dim-d latent.
     * @param {Float32Array} action
     * @returns {Float32Array}
     */
    encode_action(action) {
        const ptr0 = passArrayF32ToWasm0(action, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmcodewm_encode_action(this.__wbg_ptr, ptr0, len0);
        var v2 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
    /**
     * Tokenize Python source via the native AST tokenizer, then encode
     * → 128-d latent in one JS call. Fully self-contained pipeline.
     * @param {string} source
     * @returns {Float32Array}
     */
    encode_source(source) {
        const ptr0 = passStringToWasm0(source, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmcodewm_encode_source(this.__wbg_ptr, ptr0, len0);
        var v2 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
    /**
     * @returns {number}
     */
    encoder_loops() {
        const ret = wasm.wasmcodewm_encoder_loops(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    max_seq_len() {
        const ret = wasm.wasmcodewm_max_seq_len(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    model_dim() {
        const ret = wasm.wasmcodewm_model_dim(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Predict the next-state latent from (z_state, z_action).
     * @param {Float32Array} z_state
     * @param {Float32Array} z_action
     * @returns {Float32Array}
     */
    predict(z_state, z_action) {
        const ptr0 = passArrayF32ToWasm0(z_state, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayF32ToWasm0(z_action, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.wasmcodewm_predict(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        var v3 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v3;
    }
    /**
     * Full transition prediction pipeline: encode state tokens + action vector
     * → predict next latent. Returns the predicted next-state embedding.
     * @param {Int32Array} tokens
     * @param {Float32Array} action
     * @returns {Float32Array}
     */
    predict_transition(tokens, action) {
        const ptr0 = passArray32ToWasm0(tokens, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayF32ToWasm0(action, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.wasmcodewm_predict_transition(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        var v3 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v3;
    }
    /**
     * @returns {number}
     */
    vocab_size() {
        const ret = wasm.wasmcodewm_vocab_size(this.__wbg_ptr);
        return ret >>> 0;
    }
}
if (Symbol.dispose) WasmCodeWM.prototype[Symbol.dispose] = WasmCodeWM.prototype.free;

/**
 * Mamba language model running in WASM.
 *
 * Usage from JS:
 * ```js
 * const configJson = await (await fetch("config.json")).text();
 * const weightsBytes = new Uint8Array(await (await fetch("model.safetensors")).arrayBuffer());
 * const model = WasmMamba.create(configJson, weightsBytes);
 * const tokens = model.generate(new Uint32Array([510, 5347, 273]), 20, 0.8);
 * ```
 */
export class WasmMamba {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(WasmMamba.prototype);
        obj.__wbg_ptr = ptr;
        WasmMambaFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WasmMambaFinalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wasmmamba_free(ptr, 0);
    }
    /**
     * Create a Mamba model from config JSON and safetensors bytes.
     * @param {string} config_json
     * @param {Uint8Array} weights_bytes
     * @returns {WasmMamba}
     */
    static create(config_json, weights_bytes) {
        const ptr0 = passStringToWasm0(config_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(weights_bytes, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.wasmmamba_create(ptr0, len0, ptr1, len1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return WasmMamba.__wrap(ret[0]);
    }
    /**
     * Get the model dimension.
     * @returns {number}
     */
    d_model() {
        const ret = wasm.wasmmamba_d_model(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Run a forward pass and return logits for the last token.
     * @param {Uint32Array} token_ids
     * @returns {Float32Array}
     */
    forward(token_ids) {
        const ptr0 = passArray32ToWasm0(token_ids, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmmamba_forward(this.__wbg_ptr, ptr0, len0);
        var v2 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
    /**
     * Generate tokens from a prompt.
     *
     * Returns the generated token IDs (excluding prompt).
     * @param {Uint32Array} prompt_tokens
     * @param {number} max_tokens
     * @param {number} temperature
     * @param {number} seed
     * @returns {Uint32Array}
     */
    generate(prompt_tokens, max_tokens, temperature, seed) {
        const ptr0 = passArray32ToWasm0(prompt_tokens, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmmamba_generate(this.__wbg_ptr, ptr0, len0, max_tokens, temperature, seed);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v2 = getArrayU32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
    /**
     * Generate text from a string prompt. Tokenization happens in WASM.
     * @param {string} prompt
     * @param {number} max_tokens
     * @param {number} temperature
     * @param {number} seed
     * @returns {string}
     */
    generate_text(prompt, max_tokens, temperature, seed) {
        let deferred3_0;
        let deferred3_1;
        try {
            const ptr0 = passStringToWasm0(prompt, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len0 = WASM_VECTOR_LEN;
            const ret = wasm.wasmmamba_generate_text(this.__wbg_ptr, ptr0, len0, max_tokens, temperature, seed);
            var ptr2 = ret[0];
            var len2 = ret[1];
            if (ret[3]) {
                ptr2 = 0; len2 = 0;
                throw takeFromExternrefTable0(ret[2]);
            }
            deferred3_0 = ptr2;
            deferred3_1 = len2;
            return getStringFromWasm0(ptr2, len2);
        } finally {
            wasm.__wbindgen_free(deferred3_0, deferred3_1, 1);
        }
    }
    /**
     * Load a tokenizer from tokenizer.json bytes.
     * @param {Uint8Array} tokenizer_json
     */
    load_tokenizer(tokenizer_json) {
        const ptr0 = passArray8ToWasm0(tokenizer_json, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmmamba_load_tokenizer(this.__wbg_ptr, ptr0, len0);
        if (ret[1]) {
            throw takeFromExternrefTable0(ret[0]);
        }
    }
    /**
     * Get the number of layers.
     * @returns {number}
     */
    num_layers() {
        const ret = wasm.wasmmamba_num_layers(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * Quantize to INT8. Returns a new WasmMambaInt8 with ~4x smaller projections.
     * @returns {WasmMambaInt8}
     */
    quantize_int8() {
        const ptr = this.__destroy_into_raw();
        const ret = wasm.wasmmamba_quantize_int8(ptr);
        return WasmMambaInt8.__wrap(ret);
    }
    /**
     * Get the vocabulary size.
     * @returns {number}
     */
    vocab_size() {
        const ret = wasm.wasmmamba_vocab_size(this.__wbg_ptr);
        return ret >>> 0;
    }
}
if (Symbol.dispose) WasmMamba.prototype[Symbol.dispose] = WasmMamba.prototype.free;

/**
 * INT8-quantized Mamba model for WASM — ~4x smaller linear projections.
 */
export class WasmMambaInt8 {
    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(WasmMambaInt8.prototype);
        obj.__wbg_ptr = ptr;
        WasmMambaInt8Finalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }
    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        WasmMambaInt8Finalization.unregister(this);
        return ptr;
    }
    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_wasmmambaint8_free(ptr, 0);
    }
    /**
     * Create directly from config + safetensors (loads f32 then quantizes).
     * @param {string} config_json
     * @param {Uint8Array} weights_bytes
     * @returns {WasmMambaInt8}
     */
    static create(config_json, weights_bytes) {
        const ptr0 = passStringToWasm0(config_json, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArray8ToWasm0(weights_bytes, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.wasmmambaint8_create(ptr0, len0, ptr1, len1);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return WasmMambaInt8.__wrap(ret[0]);
    }
    /**
     * @returns {number}
     */
    d_model() {
        const ret = wasm.wasmmambaint8_d_model(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @param {Uint32Array} token_ids
     * @returns {Float32Array}
     */
    forward(token_ids) {
        const ptr0 = passArray32ToWasm0(token_ids, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmmambaint8_forward(this.__wbg_ptr, ptr0, len0);
        var v2 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
    /**
     * @param {Uint32Array} prompt_tokens
     * @param {number} max_tokens
     * @param {number} temperature
     * @param {number} seed
     * @returns {Uint32Array}
     */
    generate(prompt_tokens, max_tokens, temperature, seed) {
        const ptr0 = passArray32ToWasm0(prompt_tokens, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ret = wasm.wasmmambaint8_generate(this.__wbg_ptr, ptr0, len0, max_tokens, temperature, seed);
        if (ret[3]) {
            throw takeFromExternrefTable0(ret[2]);
        }
        var v2 = getArrayU32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v2;
    }
    /**
     * @returns {number}
     */
    num_layers() {
        const ret = wasm.wasmmambaint8_num_layers(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
     * @returns {number}
     */
    vocab_size() {
        const ret = wasm.wasmmambaint8_vocab_size(this.__wbg_ptr);
        return ret >>> 0;
    }
}
if (Symbol.dispose) WasmMambaInt8.prototype[Symbol.dispose] = WasmMambaInt8.prototype.free;

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
        const ptr0 = passArrayF32ToWasm0(state, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayF32ToWasm0(action, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.wasmworldmodel_predict_next(this.__wbg_ptr, ptr0, len0, ptr1, len1);
        var v3 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v3;
    }
    /**
     * @param {Float32Array} initial_state
     * @param {Float32Array} actions
     * @param {number} num_steps
     * @returns {Float32Array}
     */
    rollout(initial_state, actions, num_steps) {
        const ptr0 = passArrayF32ToWasm0(initial_state, wasm.__wbindgen_malloc);
        const len0 = WASM_VECTOR_LEN;
        const ptr1 = passArrayF32ToWasm0(actions, wasm.__wbindgen_malloc);
        const len1 = WASM_VECTOR_LEN;
        const ret = wasm.wasmworldmodel_rollout(this.__wbg_ptr, ptr0, len0, ptr1, len1, num_steps);
        var v3 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
        wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
        return v3;
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
        const ret = wasm.capability_report_json();
        deferred1_0 = ret[0];
        deferred1_1 = ret[1];
        return getStringFromWasm0(ret[0], ret[1]);
    } finally {
        wasm.__wbindgen_free(deferred1_0, deferred1_1, 1);
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
    const ptr0 = passArrayF32ToWasm0(q, wasm.__wbindgen_malloc);
    const len0 = WASM_VECTOR_LEN;
    const ptr1 = passArrayF32ToWasm0(k, wasm.__wbindgen_malloc);
    const len1 = WASM_VECTOR_LEN;
    const ptr2 = passArrayF32ToWasm0(v, wasm.__wbindgen_malloc);
    const len2 = WASM_VECTOR_LEN;
    const ptr3 = passArrayF32ToWasm0(positions, wasm.__wbindgen_malloc);
    const len3 = WASM_VECTOR_LEN;
    const ret = wasm.geometric_attention_wasm(n, d, ptr0, len0, ptr1, len1, ptr2, len2, ptr3, len3, sigma);
    var v5 = getArrayF32FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 4, 4);
    return v5;
}

/**
 * Standalone Python AST tokenizer (doesn't need a model). Returns u16 tokens.
 * @param {string} source
 * @param {number} max_len
 * @returns {Uint16Array}
 */
export function tokenize_python(source, max_len) {
    const ptr0 = passStringToWasm0(source, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len0 = WASM_VECTOR_LEN;
    const ret = wasm.tokenize_python(ptr0, len0, max_len);
    var v2 = getArrayU16FromWasm0(ret[0], ret[1]).slice();
    wasm.__wbindgen_free(ret[0], ret[1] * 2, 2);
    return v2;
}

function __wbg_get_imports() {
    const import0 = {
        __proto__: null,
        __wbg_Error_83742b46f01ce22d: function(arg0, arg1) {
            const ret = Error(getStringFromWasm0(arg0, arg1));
            return ret;
        },
        __wbg___wbindgen_is_function_3c846841762788c1: function(arg0) {
            const ret = typeof(arg0) === 'function';
            return ret;
        },
        __wbg___wbindgen_is_object_781bc9f159099513: function(arg0) {
            const val = arg0;
            const ret = typeof(val) === 'object' && val !== null;
            return ret;
        },
        __wbg___wbindgen_is_string_7ef6b97b02428fae: function(arg0) {
            const ret = typeof(arg0) === 'string';
            return ret;
        },
        __wbg___wbindgen_is_undefined_52709e72fb9f179c: function(arg0) {
            const ret = arg0 === undefined;
            return ret;
        },
        __wbg___wbindgen_throw_6ddd609b62940d55: function(arg0, arg1) {
            throw new Error(getStringFromWasm0(arg0, arg1));
        },
        __wbg_call_2d781c1f4d5c0ef8: function() { return handleError(function (arg0, arg1, arg2) {
            const ret = arg0.call(arg1, arg2);
            return ret;
        }, arguments); },
        __wbg_crypto_38df2bab126b63dc: function(arg0) {
            const ret = arg0.crypto;
            return ret;
        },
        __wbg_error_a6fa202b58aa1cd3: function(arg0, arg1) {
            let deferred0_0;
            let deferred0_1;
            try {
                deferred0_0 = arg0;
                deferred0_1 = arg1;
                console.error(getStringFromWasm0(arg0, arg1));
            } finally {
                wasm.__wbindgen_free(deferred0_0, deferred0_1, 1);
            }
        },
        __wbg_getRandomValues_c44a50d8cfdaebeb: function() { return handleError(function (arg0, arg1) {
            arg0.getRandomValues(arg1);
        }, arguments); },
        __wbg_length_ea16607d7b61445b: function(arg0) {
            const ret = arg0.length;
            return ret;
        },
        __wbg_msCrypto_bd5a034af96bcba6: function(arg0) {
            const ret = arg0.msCrypto;
            return ret;
        },
        __wbg_new_227d7c05414eb861: function() {
            const ret = new Error();
            return ret;
        },
        __wbg_new_with_length_825018a1616e9e55: function(arg0) {
            const ret = new Uint8Array(arg0 >>> 0);
            return ret;
        },
        __wbg_node_84ea875411254db1: function(arg0) {
            const ret = arg0.node;
            return ret;
        },
        __wbg_process_44c7a14e11e9f69e: function(arg0) {
            const ret = arg0.process;
            return ret;
        },
        __wbg_prototypesetcall_d62e5099504357e6: function(arg0, arg1, arg2) {
            Uint8Array.prototype.set.call(getArrayU8FromWasm0(arg0, arg1), arg2);
        },
        __wbg_randomFillSync_6c25eac9869eb53c: function() { return handleError(function (arg0, arg1) {
            arg0.randomFillSync(arg1);
        }, arguments); },
        __wbg_require_b4edbdcf3e2a1ef0: function() { return handleError(function () {
            const ret = module.require;
            return ret;
        }, arguments); },
        __wbg_stack_3b0d974bbf31e44f: function(arg0, arg1) {
            const ret = arg1.stack;
            const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
            const len1 = WASM_VECTOR_LEN;
            getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
            getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
        },
        __wbg_static_accessor_GLOBAL_8adb955bd33fac2f: function() {
            const ret = typeof global === 'undefined' ? null : global;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_GLOBAL_THIS_ad356e0db91c7913: function() {
            const ret = typeof globalThis === 'undefined' ? null : globalThis;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_SELF_f207c857566db248: function() {
            const ret = typeof self === 'undefined' ? null : self;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_static_accessor_WINDOW_bb9f1ba69d61b386: function() {
            const ret = typeof window === 'undefined' ? null : window;
            return isLikeNone(ret) ? 0 : addToExternrefTable0(ret);
        },
        __wbg_subarray_a068d24e39478a8a: function(arg0, arg1, arg2) {
            const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
            return ret;
        },
        __wbg_versions_276b2795b1c6a219: function(arg0) {
            const ret = arg0.versions;
            return ret;
        },
        __wbindgen_cast_0000000000000001: function(arg0, arg1) {
            // Cast intrinsic for `Ref(Slice(U8)) -> NamedExternref("Uint8Array")`.
            const ret = getArrayU8FromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_cast_0000000000000002: function(arg0, arg1) {
            // Cast intrinsic for `Ref(String) -> Externref`.
            const ret = getStringFromWasm0(arg0, arg1);
            return ret;
        },
        __wbindgen_init_externref_table: function() {
            const table = wasm.__wbindgen_externrefs;
            const offset = table.grow(4);
            table.set(0, undefined);
            table.set(offset + 0, undefined);
            table.set(offset + 1, null);
            table.set(offset + 2, true);
            table.set(offset + 3, false);
        },
    };
    return {
        __proto__: null,
        "./synapse_wasm_bg.js": import0,
    };
}

const NeoUnifyFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_neounify_free(ptr >>> 0, 1));
const RealLeWMFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_reallewm_free(ptr >>> 0, 1));
const RealLeWMFullQ4Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_reallewmfullq4_free(ptr >>> 0, 1));
const RealLeWMInt8Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_reallewmint8_free(ptr >>> 0, 1));
const RealLeWMQ4Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_reallewmq4_free(ptr >>> 0, 1));
const WasmCodeWMFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_wasmcodewm_free(ptr >>> 0, 1));
const WasmMambaFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_wasmmamba_free(ptr >>> 0, 1));
const WasmMambaInt8Finalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_wasmmambaint8_free(ptr >>> 0, 1));
const WasmWorldModelFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_wasmworldmodel_free(ptr >>> 0, 1));

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_externrefs.set(idx, obj);
    return idx;
}

function getArrayF32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getFloat32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayU16FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint16ArrayMemory0().subarray(ptr / 2, ptr / 2 + len);
}

function getArrayU32FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint32ArrayMemory0().subarray(ptr / 4, ptr / 4 + len);
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
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

let cachedUint16ArrayMemory0 = null;
function getUint16ArrayMemory0() {
    if (cachedUint16ArrayMemory0 === null || cachedUint16ArrayMemory0.byteLength === 0) {
        cachedUint16ArrayMemory0 = new Uint16Array(wasm.memory.buffer);
    }
    return cachedUint16ArrayMemory0;
}

let cachedUint32ArrayMemory0 = null;
function getUint32ArrayMemory0() {
    if (cachedUint32ArrayMemory0 === null || cachedUint32ArrayMemory0.byteLength === 0) {
        cachedUint32ArrayMemory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32ArrayMemory0;
}

let cachedUint8ArrayMemory0 = null;
function getUint8ArrayMemory0() {
    if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
        cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8ArrayMemory0;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4, 4) >>> 0;
    getUint32ArrayMemory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

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

function passStringToWasm0(arg, malloc, realloc) {
    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8ArrayMemory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }
    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
        const ret = cachedTextEncoder.encodeInto(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_externrefs.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
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

const cachedTextEncoder = new TextEncoder();

if (!('encodeInto' in cachedTextEncoder)) {
    cachedTextEncoder.encodeInto = function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    };
}

let WASM_VECTOR_LEN = 0;

let wasmModule, wasm;
function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    wasmModule = module;
    cachedDataViewMemory0 = null;
    cachedFloat32ArrayMemory0 = null;
    cachedUint16ArrayMemory0 = null;
    cachedUint32ArrayMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);
            } catch (e) {
                const validResponse = module.ok && expectedResponseType(module.type);

                if (validResponse && module.headers.get('Content-Type') !== 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else { throw e; }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);
    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };
        } else {
            return instance;
        }
    }

    function expectedResponseType(type) {
        switch (type) {
            case 'basic': case 'cors': case 'default': return true;
        }
        return false;
    }
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (module !== undefined) {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();
    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }
    const instance = new WebAssembly.Instance(module, imports);
    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (module_or_path !== undefined) {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (module_or_path === undefined) {
        module_or_path = new URL('synapse_wasm_bg.wasm', import.meta.url);
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

export { initSync, __wbg_init as default };
