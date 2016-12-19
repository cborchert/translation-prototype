module.exports = function(grunt) {
	var webpack = require('webpack');
	var webpackConfig = require('./webpack.config.js');
	var autoprefixer = require('autoprefixer');
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
				options: {
					'trace': true,
					'style': 'expanded'
				},
				files: {
					'build/style.dev.css': 'src/scss/main.scss'
				}
			}
		},
		postcss: {
			options: {
				map: true, // inline sourcemaps
				processors: [
					require('autoprefixer')({
						browsers: ['last 10 versions']
					}) // add vendor prefixes
				]
			},
				dist: {
					src: 'build/style.dev.css',
					dest: 'build/style.css'
				}
		},
		webpack: {
			options: webpackConfig,
			build: { }, //this is handled in the webpack config
			'build-dev': {
				devtool: 'sourcemap',
				debug: true,
			}
		},
		watch: {
			css: {
				files: '**/*.scss',
				tasks: ['sass', 'postcss']
			},
			 scripts: {
				 files: ['src/**/*.jsx', 'src/**/*.js'],
				 tasks: ['webpack:build']
			 }
		}
	});
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-webpack');
	//
	grunt.registerTask('default', ['watch']);
	grunt.registerTask('build', ['webpack:build', 'sass:dist']);
	grunt.registerTask('dev', ['webpack:build-dev', 'sass:dist']);
}