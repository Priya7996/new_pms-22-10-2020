"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const injection_js_1 = require("injection-js");
const transform_di_1 = require("../../../brocc/transform.di");
const downlevel_compilation_1 = require("./downlevel-compilation");
exports.DOWNLEVEL_COMPILATION_TOKEN = new injection_js_1.InjectionToken(`ng.v5.downlevelCompilation`);
exports.DOWNLEVEL_COMPILATION_TRANSFORM = transform_di_1.provideTransform({
    provide: exports.DOWNLEVEL_COMPILATION_TOKEN,
    useFactory: () => downlevel_compilation_1.downlevelCompileTransform
});
//# sourceMappingURL=downlevel-compilation.di.js.map