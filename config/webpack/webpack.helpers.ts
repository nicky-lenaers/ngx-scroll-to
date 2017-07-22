import * as webpack from 'webpack';

export const stats: webpack.Options.Stats = {
	colors: true,
	hash: true,
	timings: true,
	chunks: true,
	chunkModules: false,
	children: false,
	modules: false,
	reasons: false,
	warnings: true,
	assets: false,
	version: false
}
