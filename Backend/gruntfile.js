'use strict';

module.exports = function(grunt) {
	// Unified Watch Object
	var watchFiles = {
		serverViews: ['app/views/**/*.*'],
		serverJS: ['gruntfile.js', 'server.js', 'config/**/*.js', 'api/**/*.js'],
		clientViews: ['public/modules/**/views/**/*.html'],
		clientJS: ['public/js/*.js', 'public/modules/**/*.js'],
		clientCSS: ['public/modules/**/*.css'],
		mochaTests: ['app/tests/**/*.js']
	};

	// Project Configuration
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		watch: {
			serverViews: {
				files: watchFiles.serverViews,
				options: {
					livereload: true
				}
			},
			serverJS: {
				files: watchFiles.serverJS,
				tasks: ['newer:jshint'],
				options: {
					livereload: true
				}
			}			
		},
		jshint: {
			all: {
				src: watchFiles.clientJS.concat(watchFiles.serverJS),
				options: {
					jshintrc: true,
					message: 'Less task complete'
				}
			}
		},
		csslint: {
			options: {
				csslintrc: '.csslintrc'
			},
			all: {
				src: watchFiles.clientCSS
			}
		},
		/// build tasks ///
		clean: {
			build: ["public/dist"],
			temp: ["public/dist/temp"]
		},

		// Copie et optimisation des 	assets
		copy: {
			fonts: {
				expand: true,
				flatten: true,
				src: ['public/modules/core/fonts/*'],
				dest: 'public/dist/assets/fonts',
				filter: 'isFile'
			},
			css: {
				expand: true,
				flatten: true,
				src: ['public/modules/core/css-print/print.css'],
				dest: 'public/dist/assets/css',
				filter: 'isFile'
			},
			svg: {
				expand: true,
				flatten: true,
				src: ['public/modules/**/*.svg'],
				dest: 'public/dist/assets/img',
				filter: 'isFile'
			},
		},
		imagemin: {
			png: {
				options: {
					optimizationLevel: 7
				},
				files: [{
					flatten: true,
					expand: true,
					cwd: 'public/modules/',
					src: ['**/*.png'],
					dest: 'public/dist/assets/img',
					ext: '.png'
				}]
			},
			jpg: {
				options: {
					progressive: true
				},
				files: [{
					flatten: true,
					expand: true,
					cwd: 'public/modules/',
					src: ['**/*.jpg'],
					dest: 'public/dist/assets/img',
					ext: '.jpg'
				}]
			}
		},

		// Concaténisation
		ngtemplates: {
			options: {
				htmlmin: {
					collapseWhitespace: true,
					removeComments: true
				},
				url: function(url) {
					return url.replace('public/', '');
				},
			},
			'gestats': {
				src: 'public/modules/**/**.html',
				dest: 'public/dist/temp/templates.js'
			}
		},
		concat: {
			build: {
				options: {
					stripBanners: true
				},
				files: {
					'public/dist/temp/vendor.js': '<%= vendorJavaScriptFiles %>',
				}
			}
		},



		// Minification
		ngmin: {
			main: {
				src: ['<%= applicationJavaScriptFiles %>'],
				dest: 'public/dist/temp/application.js'
			}
		},
		uglify: {
			production: {
				options: {
					mangle: true,
					compress: true,
					properties: false //https://github.com/angular/angular.js/issues/9128
				},
				files: {
					'public/dist/application.min.js': 'public/dist/temp/application.js',
					'public/dist/templates.min.js': 'public/dist/temp/templates.js',
					'public/dist/vendor.min.js': 'public/dist/temp/vendor.js'
				}
			}
		},
		cssmin: {
			combine: {
				files: {
					'public/dist/assets/css/application.min.css': '<%= applicationCSSFiles %>',
				}
			}
		},

		shell: {
			mongo: {
				command: 'mongod --dbpath data/database --smallfiles',
				options: {
					async: true
				}
			}
		},
		nodemon: {
			dev: {
				script: 'server.js',
				options: {
					nodeArgs: ['--debug'],
					ext: 'js,html',
					watch: watchFiles.serverViews.concat(watchFiles.serverJS)
				}
			}
		},
		concurrent: {
			default: ['nodemon', 'watch'],
			debug: ['nodemon', 'watch'],
			options: {
				logConcurrentOutput: true,
				limit: 10
			}
		},
		env: {
			test: {
				NODE_ENV: 'test'
			},
			secure: {
				NODE_ENV: 'secure'
			},
			build: {
				NODE_ENV: 'build'
			},
			production: {
				NODE_ENV: 'production'
			},
			development: {
				NODE_ENV: 'development'
			}
		},
		mochaTest: {
			src: watchFiles.mochaTests,
			options: {
				reporter: 'spec',
				require: 'server.js'
			}
		},
		karma: {
			unit: {
				configFile: 'karma.conf.js'
			}
		}
	});

	// Load NPM tasks
	require('load-grunt-tasks')(grunt);

	// Making grunt default to force in order not to break the project.
	grunt.option('force', true);


	// A Task for loading the configuration object
	grunt.task.registerTask('loadConfig', 'Task that loads the config into a grunt option.', function() {
		var init = require('./config/init')(),
			config = require('./config/config');

		grunt.config.set('vendorJavaScriptFiles', config.assets.lib.js);
		grunt.config.set('applicationJavaScriptFiles', config.assets.js);
		grunt.config.set('applicationCSSFiles', config.assets.css);
	});

	// Default task(s).
	grunt.registerTask('default', ['lint', 'concurrent:default']);

	// Debug task.
	grunt.registerTask('debug', ['lint', 'concurrent:debug']);

	// Secure task(s).
	grunt.registerTask('secure', ['env:secure', 'lint', 'concurrent:default']);

	// Lint task(s).
	grunt.registerTask('lint', ['newer:jshint', 'newer:csslint']);



	// MY TASKS
	grunt.registerTask('dev', ['shell:mongo', 'env:development', 'nodemon']);

	grunt.registerTask('build-clean', ['env:build', 'loadConfig', 'clean:build']);
	grunt.registerTask('build-concat', ['copy', 'imagemin', 'ngtemplates', 'concat']);
	grunt.registerTask('build-min', ['ngmin', 'uglify', 'cssmin']);
	grunt.registerTask('build-post', ['clean:temp']);
	grunt.registerTask('build', ['build-clean', 'build-concat', 'build-min', 'build-post']);

	grunt.registerTask('prod', ['env:production', 'concurrent:default']);

	// Test task.
	grunt.registerTask('test', ['env:test', 'mochaTest', 'karma:unit', ]);

};