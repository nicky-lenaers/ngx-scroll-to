import * as karma from 'karma';
import * as webpack from 'webpack';
import { resolve } from 'path';
import { stats } from './config/webpack/webpack.helpers';
import { getConfig as getWebpackTestConfig } from './config/webpack/webpack.test';

interface CustomKarmaConfigOptions {
	mime?: any;
	webpack?: any;
}

module.exports = function (config: karma.Config) {

	let configOptions: karma.ConfigOptions | CustomKarmaConfigOptions = {
		basePath: '.',
		frameworks: [
			'jasmine'
		],
		plugins: [
			require('karma-jasmine'),
			require('karma-jasmine-html-reporter'),
			require('karma-webpack'),
			require('karma-chrome-launcher'),
			require('karma-sourcemap-loader')
		],
		client: {
			clearContext: false
		},
		files: [
			'./config/karma/karma.entry.ts'
		],
		exclude: [
		],
		preprocessors: {
			'./config/karma/karma.entry.ts': [
				'webpack',
				'sourcemap'
			]
		},
		mime: {
			'text/x-typescript': [
				'ts',
				'tsx'
			]
		},
		webpack: getWebpackTestConfig(),
		reporters: [
			'progress',
			'kjhtml'
		],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ['Chrome'],
		singleRun: true,
		concurrency: Infinity
	};

	config.set(<karma.ConfigOptions>configOptions);
}
