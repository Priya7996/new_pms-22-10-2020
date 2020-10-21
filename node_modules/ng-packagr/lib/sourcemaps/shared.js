"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
/**
 * Get an array of globs and file paths for JS or JS Map files for this entry point.
 */
function getGlobForMapWork(destinationFiles, shouldAppendMapExtention = false) {
    return Object.keys(destinationFiles)
        .map((key) => {
        // we need to modify this as we need the glob for all the files in esm5 and esm2015 directory
        const file = destinationFiles[key];
        if (key === 'esm5' || key === 'esm2015') {
            return `${path.dirname(file)}/**/*.js`;
        }
        return file;
    })
        .filter(x => x.endsWith('.js'))
        .map(x => (shouldAppendMapExtention ? `${x}.map` : x));
}
exports.getGlobForMapWork = getGlobForMapWork;
//# sourceMappingURL=shared.js.map