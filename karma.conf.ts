import * as karma from 'karma';
import * as webpack from 'webpack';

const webpackConfig = require('./webpack.config');

module.exports = function (config: karma.Config) {

	config.set(<karma.ConfigOptions>{
		basePath: './',
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
		webpack: webpackConfig,
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
