import * as webpack from 'webpack';
import { resolve } from 'path';
import { AotPlugin } from '@ngtools/webpack';
import * as HtmlWebpackPlugin from 'html-webpack-plugin';

/**
 * @todo generic 'stats'
 * @todo seperate files
 * @todo webpack helper file
 */
export = function () {

	let config: webpack.Configuration = {
		entry: {
			main: './demo/main.ts'
		},
		output: {
			path: resolve(__dirname, './', './dist'),
			filename: '[name].bundle.js'
		},
		resolve: {
			extensions: ['.js', '.ts', '.json']
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					loader: '@ngtools/webpack'
				},
				{
					test: /\.html$/,
					loader: 'raw-loader'
				},
				{
					test: /\.scss$/,
					include: [
						resolve(__dirname, './', './demo/app')
					],
					use: [
						{
							loader: 'raw-loader'
						},
						{
							loader: 'sass-loader'
						}
					]
				},
			]
		},
		devtool: 'inline-source-map',
		stats: {
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
		},
		plugins: [
			new AotPlugin({
				tsConfigPath: resolve(__dirname, './', './demo/tsconfig.demo.json'),
				skipCodeGeneration: true
			}),
			new HtmlWebpackPlugin({
				template: resolve(__dirname, './', './demo/index.html')
			})
		],
		devServer: {
			publicPath: '/',
			contentBase: resolve(__dirname, './', './demo'),
			port: 3000,
			stats: {
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
		}
	};

	return config;
};
