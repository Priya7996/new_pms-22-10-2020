import { DestinationFiles } from '../ng-package-format/shared';
/**
 * Get an array of globs and file paths for JS or JS Map files for this entry point.
 */
export declare function getGlobForMapWork(destinationFiles: DestinationFiles, shouldAppendMapExtention?: boolean): string[];
