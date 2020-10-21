"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const injection_js_1 = require("injection-js");
const transform_di_1 = require("../../brocc/transform.di");
const remap_source_maps_transform_1 = require("./remap-source-maps.transform");
exports.REMAP_SOURCE_MAPS_TRANSFORM_TOKEN = new injection_js_1.InjectionToken(`ng.v5.remapSourceMapsTransform`);
exports.REMAP_SOURCE_MAPS_TRANSFORM = transform_di_1.provideTransform({
    provide: exports.REMAP_SOURCE_MAPS_TRANSFORM_TOKEN,
    useFactory: () => remap_source_maps_transform_1.remapSourceMapsTransform
});
//# sourceMappingURL=remap-source-maps.di.js.map