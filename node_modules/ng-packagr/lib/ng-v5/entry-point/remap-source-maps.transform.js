"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const transform_1 = require("../../brocc/transform");
const remap_1 = require("../../sourcemaps/remap");
const log = require("../../util/log");
const nodes_1 = require("../nodes");
const shared_1 = require("../../sourcemaps/shared");
exports.remapSourceMapsTransform = transform_1.transformFromPromise((graph) => __awaiter(this, void 0, void 0, function* () {
    const entryPoint = graph.find(nodes_1.isEntryPointInProgress());
    log.info('Remap source maps');
    const patterns = shared_1.getGlobForMapWork(entryPoint.data.destinationFiles);
    yield remap_1.remapSourceMap(patterns);
    return graph;
}));
//# sourceMappingURL=remap-source-maps.transform.js.map