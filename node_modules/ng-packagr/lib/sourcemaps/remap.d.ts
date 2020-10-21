/**
 * Re-maps the source `.map` file for the given `sourceFile` or `Glob Pattern`. This keeps source maps intact over
 * a series of transpilations!
 *
 * @param globPattern Source file or Glob pattern
 */
export declare function remapSourceMap(globPattern: string | string[]): Promise<any>;
