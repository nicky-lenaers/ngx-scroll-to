/// <reference path="./karma.entry.d.ts" />

// This file is required by karma.conf.js and loads recursively all the .spec and framework files
import 'core-js/es6/reflect';
import 'core-js/es7/reflect';
import 'zone.js/dist/zone';

import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

// Prevent Karma from running prematurely
__karma__.loaded = function () { };

// Initialize the Angular Testing Environment
getTestBed()
	.initTestEnvironment(
		BrowserDynamicTestingModule,
		platformBrowserDynamicTesting()
	);

// Find all the Tests
const context = require.context('../../src/', true, /\.spec\.ts$/);

// Load Modules.
context.keys().map(context);

// Start Karma to run the Tests
__karma__.start();
