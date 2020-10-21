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
const sorcery = require("sorcery");
const log = require("../util/log");
const glob_1 = require("../util/glob");
/**
 * Re-maps the source `.map` file for the given `sourceFile` or `Glob Pattern`. This keeps source maps intact over
 * a series of transpilations!
 *
 * @param globPattern Source file or Glob pattern
 */
function remapSourceMap(globPattern) {
    return __awaiter(this, void 0, void 0, function* () {
        // read and create chains
        const filesPath = yield glob_1.globFiles(globPattern);
        const chains = yield Promise.all(filesPath.map(sourceFile => {
            log.debug(`re-mapping sources for ${sourceFile}`);
            return sorcery.load(sourceFile);
        }));
        // write re-mapped sourcemaps
        const opts = {
            inline: false,
            includeContent: true
        };
        return Promise.all(chains.map(x => x.write(opts)));
    });
}
exports.remapSourceMap = remapSourceMap;
//# sourceMappingURL=remap.js.map