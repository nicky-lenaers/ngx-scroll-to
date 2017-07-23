import * as webpack from 'webpack';
import { resolve } from 'path';

/**
 * Retrieves the root relative to the current document path.
 *
 * @param path 		The path to evaluate
 */
export function root(path: string): string {
	return resolve(__dirname, '../..', path);
}

export const stats: webpack.Options.Stats = {
	colors: true,
	hash: true,
	timings: true,
	chunks: true,
	chunkModules: false,
	children: false,
	errors: true,
	errorDetails: true,
	modules: false,
	reasons: false,
	warnings: true,
	assets: false,
	version: false
}
