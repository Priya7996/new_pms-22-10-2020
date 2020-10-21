import { InjectionToken } from 'injection-js';
import { Transform } from '../../../brocc/transform';
import { TransformProvider } from '../../../brocc/transform.di';
export declare const DOWNLEVEL_COMPILATION_TOKEN: InjectionToken<Transform>;
export declare const DOWNLEVEL_COMPILATION_TRANSFORM: TransformProvider;
