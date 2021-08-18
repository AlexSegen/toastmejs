const {src, dest, watch, series, parallel} = require('gulp');
const del = require('del');
const flatmap = require('gulp-flatmap');
const lazypipe = require('lazypipe');
const rename = require('gulp-rename');
const header = require('gulp-header');
const package = require('./package.json');


// Scripts
const ts = require('gulp-typescript');
const jshint = require('gulp-jshint');
const concat = require('gulp-concat');
const uglify = require('gulp-terser');
const optimizejs = require('gulp-optimize-js');

const babel = require('gulp-babel');

// Styles
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const minify = require('gulp-cssnano');

// BrowserSync
const browserSync = require('browser-sync');
/**
 * Settings
 * Turn on/off build features
 */

const output = process.env.NODE_ENV == "development"  ? "dist_dev" : "dist"

const settings = {
	clean: true,
	scripts: true,
	polyfills: true,
	styles: true,
	copy: true,
	reload: true
};


/**
 * Paths to project folders
 */

const paths = {
	input: 'src/',
	output,
	styles: {
		input: 'src/sass/**/*.{scss,sass}',
		output: output + '/css/'
	},
	typescript: {
		input: 'src/typescript/toastme.ts',
		output: output + "/js/"
	},
	copyIcons: {
		input: 'src/icons/**/*',
		output: output + '/icons/'
	},
	reload: './'  + output + '/'
};


/**
 * Template for banner to add to file headers
 */

const banner = {
	full:
		'/*!\n' +
		' * <%= package.name %> v<%= package.version %>\n' +
		' * <%= package.description %>\n' +
		' * (c) ' + new Date().getFullYear() + ' <%= package.author.name %> | Twitter <%= package.author.twitter %> \n' +
		' * <%= package.license %> License\n' +
		' * <%= package.repository.url %>\n' +
		' */\n\n',
	min:
		'/*!' +
		' <%= package.name %> v<%= package.version %>' +
		' | (c) ' + new Date().getFullYear() + ' <%= package.author.name %>' +
		' | <%= package.license %> License' +
		' | <%= package.repository.url %>' +
		' */\n'
};


/**
 * Gulp Tasks
 */

// Remove pre-existing content from output folders
const cleanDist = function (done) {

	// Make sure this feature is activated before running
	if (!settings.clean) return done();

	// Clean the dist folder
	del.sync([
		paths.output
	]);

	// Signal completion
	return done();

};

// Repeated JavaScript tasks
const jsTasks = lazypipe()
	.pipe(header, banner.full, {package: package})
	.pipe(babel, { presets: ['env'] })
	.pipe(dest, paths.typescript.output)
	.pipe(optimizejs)
	.pipe(dest, paths.typescript.output)
	.pipe(rename, {suffix: '.min'})
	.pipe(uglify)
	.pipe(optimizejs)
	.pipe(header, banner.min, {package: package})
	.pipe(dest, paths.typescript.output);


const buildTypescript = function (done) {
	
	// Make sure this feature is activated before running
	if (!settings.scripts) return done();

	// Run tasks on script files
	src(paths.typescript.input)
	.pipe(ts({
		noImplicitAny: false,
		//outFile: 'toastme.js',
		//module: 'amd',
		target: 'es5',
		removeComments: true
	}))
	.pipe(flatmap(function(stream, file) {

		// If the file is a directory
		if (file.isDirectory()) {

			// Setup a suffix variable
			let suffix = '';

			// If separate polyfill files enabled
			if (settings.polyfills) {

				// Update the suffix
				suffix = '.polyfills';

				// Grab files that aren't polyfills, concatenate them, and process them
				src([file.path + '/*.js', '!' + file.path + '/*' + paths.scripts.polyfills])
					.pipe(concat(file.relative + '.js'))
					.pipe(jsTasks());

			}

			// Grab all files and concatenate them
			// If separate polyfills enabled, this will have .polyfills in the filename
			src(file.path + '/*.js')
				.pipe(concat(file.relative + suffix + '.js'))
				.pipe(jsTasks());

			return stream;

		}

		// Otherwise, process the file
		return stream.pipe(jsTasks());

	}));

	done();

};	

// Lint scripts
const lintScripts = function (done) {

	// Make sure this feature is activated before running
	if (!settings.scripts) return done();

	// Lint scripts
	src(paths.typescript.input)
		.pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'));

	// Signal completion
	done();

};

// Process, lint, and minify Sass files
const buildStyles = function (done) {

	// Make sure this feature is activated before running
	if (!settings.styles) return done();

	// Run tasks on all Sass files
	src(paths.styles.input)
		.pipe(sass({
			outputStyle: 'expanded',
			sourceComments: true
		}))
		.pipe(prefix({
			browsers: ['last 2 version', '> 0.25%'],
			cascade: true,
			remove: true
		}))
		.pipe(header(banner.full, { package : package }))
		.pipe(dest(paths.styles.output))
		.pipe(rename({suffix: '.min'}))
		.pipe(minify({
			discardComments: {
				removeAll: true
			}
		}))
		.pipe(header(banner.min, { package : package }))
		.pipe(dest(paths.styles.output));

	// Signal completion
	done();

};

// Copy static files into output folder
const copyFiles = function (done) {

	// Make sure this feature is activated before running
	if (!settings.copy) return done();

	// Copy static files
	src(paths.copyIcons.input)
		.pipe(dest(paths.copyIcons.output));

	// Signal completion
	done();

};

// Watch for changes to the src directory
const startServer = function (done) {

	// Make sure this feature is activated before running
	if (!settings.reload) return done();

	// Initialize BrowserSync
	browserSync.init({
		server: {
			baseDir: paths.reload
		}
	});

	// Signal completion
	done();

};

// Reload the browser when files change
const reloadBrowser = function (done) {
	if (!settings.reload) return done();
	browserSync.reload();
	done();
};

// Watch for changes
const watchSource = function (done) {
	watch(paths.input, series(exports.default, reloadBrowser));
	done();
};


/**
 * Export Tasks
 */

// Default task
// gulp
exports.default = series(
	cleanDist,
	parallel(
		// lintScripts,
		buildTypescript,
		buildStyles,
		copyFiles
	)
);

// Watch and reload
// gulp watch
exports.watch = series(
	exports.default,
	startServer,
	watchSource
);