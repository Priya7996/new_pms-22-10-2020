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
const path = require("path");
const log = require("../../../util/log");
const transform_1 = require("../../../brocc/transform");
const nodes_1 = require("../../nodes");
const downlevel_transformer_1 = require("../../../ts/downlevel-transformer");
exports.downlevelCompileTransform = transform_1.transformFromPromise((graph) => __awaiter(this, void 0, void 0, function* () {
    log.info(`Downleveling ESM2015 sources through tsc`);
    const entryPoint = graph.find(nodes_1.isEntryPointInProgress());
    const { esm2015, esm5 } = entryPoint.data.destinationFiles;
    yield downlevel_transformer_1.downlevelEmitWithTsc(esm2015, path.dirname(esm5));
    return graph;
}));
//# sourceMappingURL=downlevel-compilation.js.map