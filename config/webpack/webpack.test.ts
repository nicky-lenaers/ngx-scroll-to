import * as webpack from 'webpack';
import { root, stats } from './webpack.helpers';

export function getConfig(): webpack.Configuration {

	let config: webpack.Configuration = {
		resolve: {
			extensions: ['.js', '.ts'],
		},
		module: {
			rules: [
				{
					test: /\.ts$/,
					loader: 'awesome-typescript-loader',
					options: {
						configFileName: root('./config/tsconfig/tsconfig.spec.json')
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
				root('./src'),
				{}
			)
		],
		stats: stats
	}

	return config;
}
