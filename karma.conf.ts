import * as karma from 'karma';
import * as webpack from 'webpack';
import { resolve } from 'path';
import { stats } from './config/webpack/webpack.helpers';

module.exports = function (config: karma.Config) {

	config.set(<karma.ConfigOptions>{
		basePath: '.',
		frameworks: [
			'jasmine'
		],
		plugins: [
			require('karma-jasmine'),
			require('karma-webpack'),
			require('karma-chrome-launcher'),
			require('karma-sourcemap-loader')
		],
		files: [
			'./config/karma/entry.ts'
		],
		exclude: [
		],
		preprocessors: {
			'./config/karma/entry.ts': ['webpack', 'sourcemap']
		},
		mime: {
			'text/x-typescript': ['ts', 'tsx']
		},
		webpack: <webpack.Configuration>{
			resolve: {
				extensions: ['.js', '.ts'],
			},
			module: {
				rules: [
					{
						test: /\.ts$/,
						loader: 'awesome-typescript-loader',
						options: {
							configFileName: resolve(__dirname, './tsconfig.spec.json')
						},
						exclude: [
							/\.(e2e)\.ts$/
						]
					}
				]
			},
			devtool: 'inline-source-map',
			plugins: [
				new webpack.ContextReplacementPlugin(
					/angular(\\|\/)core(\\|\/)@angular/,
					resolve(__dirname, './src'),
					{}
				)
			],
			stats: stats
		},
		reporters: [
			'progress'
		],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: false,
		browsers: ['Chrome'],
		singleRun: true,
		concurrency: Infinity
	})
}
