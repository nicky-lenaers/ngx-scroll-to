export default {
    entry: 'dist/index.js',
    dest: 'dist/bundles/ngx-scroll-to.umd.js',
    sourceMap: false,
    format: 'umd',
    moduleName: 'ng.ngx-scroll-to',
    globals: {
        '@angular/core': 'ng.core',
        '@angular/common': 'ng.common',
        '@angular/platform-browser': 'ng.platformBrowser',
        'rxjs/Observable': 'Rx',
        'rxjs/ReplaySubject': 'Rx'
    },
    external: [
        '@angular/core',
        '@angular/common',
		'@angular/platform-browser',
		'rxjs'
    ]
}
