const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.react('resources/js/app.js', 'public/js')
    .sass('resources/sass/app.scss', 'public/css');

// Copy into dist folder for production
if (mix.inProduction()) {    
	// App
	mix.copyDirectory('app', 'dist/portfolio/app');
    mix.copyDirectory('bootstrap', 'dist/portfolio/bootstrap');
	mix.copyDirectory('config', 'dist/portfolio/config');
	mix.copyDirectory('database', 'dist/portfolio/database');
	mix.copyDirectory('resources', 'dist/portfolio/resources');
	mix.copyDirectory('routes', 'dist/portfolio/routes');
    mix.copyDirectory('storage', 'dist/portfolio/storage');
	mix.copyDirectory('tests', 'dist/portfolio/tests');

	// Public
	mix.copyDirectory('public/css', 'dist/portfolio.angelin.dev/css');
	mix.copyDirectory('public/js', 'dist/portfolio.angelin.dev/js');
}