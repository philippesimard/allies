'use strict';

module.exports = function (grunt) {

  require('jit-grunt')(grunt, {
    ngconstant: 'grunt-ng-constant',
    ngtemplates: 'grunt-angular-templates',
    useminPrepare: 'grunt-usemin',
    comments: 'grunt-stripcomments'
  });
  require('time-grunt')(grunt);

  var gruntConfig = {

    yeoman: {
      app: 'app',
      dist: 'dist',
      temp: '.tmp'
    },

    watch: {

      options: {
        livereload: true
      },

      bower: {
        files: ['bower.json'],
        tasks: ['inject:dev']
      },

      js: {
        files: ['<%= yeoman.app %>/js/*.js', '<%= yeoman.app %>/modules/*/*.js', '<%= yeoman.app %>/modules/*/{,*/}*.js'],
        tasks: ['newer:jshint:all', 'newer:jsbeautifier:all']
      },

      html: {
        files: ['<%= yeoman.app %>/modules/**/views/*.html'],
        tasks: []
      },

      styles: {
        files: ['<%= yeoman.app %>/css/*.css'],
        tasks: ['newer:autoprefixer:dev']
      },

      gruntfile: {
        files: ['Gruntfile.js']
      },

      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/*.html',
          '<%= yeoman.app %>/css/{,*/}*.css',
          '<%= yeoman.app %>/img/**/*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            '.tmp',
            '<%= yeoman.app %>'
          ]
        }
      },
      dist: {
        options: {
          open: true,
          base: ['<%= yeoman.dist %>']
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js', '<%= yeoman.app %>/modules/*/{,*/}*.js'
      ]
    },

    jsbeautifier: {
      all: {
        src: ['Gruntfile.js', '<%= yeoman.app %>/js/*.js', '<%= yeoman.app %>/modules/*/{,*/}*.js'],
        options: {
          config: '.jsbeautifyrc'
        }
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '<%= yeoman.temp %>',
            '<%= yeoman.dist %>'
          ]
        }]
      },
      postDist: {
        files: [{
          dot: true,
          src: ['<%= yeoman.temp %>']
        }]
      }
    },

    autoprefixer: {
      dev: {
        expand: true,
        cwd: '<%= yeoman.app %>/css',
        src: '*.css',
        dest: '<%= yeoman.app %>/css'
      },
      dist: {
        expand: true,
        cwd: '<%= yeoman.app %>/css',
        src: '*.css',
        dest: '<%= yeoman.app %>/css'
      },
    },

    /**
     * Strip comments from the distribution code
     */
    comments: {
      dist: {
        options: {
          singleline: true,
          multiline: true
        },
        src: ['www/scripts/custom.js']
      },
    },

    rev: {
      dist: {
        files: {
          src: [
            '<%= yeoman.dist %>/scripts/custom.js',
            '<%= yeoman.dist %>/scripts/vendor.js',
            '<%= yeoman.dist %>/styles/*.css',
            '<%= yeoman.dist %>/img/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
          ]
        }
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/index.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on rev and the useminPrepare configurat**ion
    usemin: {
      html: ['<%= yeoman.dist %>/index.html'],
      js: ['<%= yeoman.dist %>/scripts/*.js'],
      css: ['<%= yeoman.dist %>/styles/*.css']
    },

    // The following *-min tasks produce minified files in the dist folder
    cssmin: {
      options: {} // correction d'un bug (https://github.com/yeoman/yeoman/issues/824)
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/img',
          src: '{,*/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/img'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/img',
          src: '{,*/}*.svg',
          dest: '<%= yeoman.dist %>/img'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html', '<%= yeoman.app %>/modules/*/views/*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    ngconstant: {
      options: {
        name: 'config',
        wrap: '\'use strict\';\n\n{%= __ngModule %}',
        space: '  ',
        dest: '<%= yeoman.app %>/js/constants.js'
      },
      dev: {
        constants: {
          BACKEND: 'http://localhost:9001',
          ENV: 'dev'
        }
      },
      dist: {
        constants: {
          BACKEND: 'http://vps54578.vps.ovh.ca',
          ENV: 'prod'
        }
      }
    },

    ngAnnotate: {
      options: {
        singleQuotes: true
      },
      dist: {
        src: '<%= yeoman.dist %>/scripts/custom.js',
        dest: '<%= yeoman.dist %>/scripts/custom.js'
      }
    },

    concat: {
      options: {
        separator: ';\n',
      },
      templates: {
        src: ['<%= yeoman.dist %>/scripts/custom.js', '<%= yeoman.temp %>/templates.js'],
        dest: '<%= yeoman.dist %>/scripts/custom.js',
      },
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.ico',
            '.htaccess',
            'index.html'
          ]
        }]
      },
      fonts: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>/lib/materialize',
          dest: '<%= yeoman.dist %>',
          src: 'font/roboto/*'
        }]
      },
      socialFonts: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>/lib/social-share-kit/dist',
          dest: '<%= yeoman.dist %>',
          src: 'fonts/*'
        }]
      },
      materializeCss: {
        dest: '<%= yeoman.dist %>/lib/materialize/templates/starter-template/css/style.css',
        src: '<%= yeoman.app %>/lib/materialize/templates/starter-template/css/style.css'
      }
    },

    ngtemplates: {
      options: {
        module: 'angularjsapp',
        htmlmin: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeComments: true,
          removeEmptyAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true
        }
      },
      app: {
        cwd: '<%= yeoman.app %>',
        src: 'modules/**/views/{,*/}*.html',
        dest: '<%= yeoman.temp %>/templates.js'
      }
    },

    uglify: {
      build: {
        options: {
          mangle: true,
          compress: {},
          preserveComments: false
        },
        files: {
          '<%= yeoman.dist %>/scripts/custom.js': '<%= yeoman.dist %>/scripts/custom.js',
        }
      }
    },

    // Run some tasks in parallel to speed up the build process
    concurrent: {
      dev: [
        'ngconstant:dev',
        'newer:jsbeautifier:all'
      ],
      dist: [
        'ngconstant:dist',
        'imagemin',
        'svgmin',
        'ngtemplates'
      ],
      dist2: [
        'copy:dist',
        'concat:templates',
      ]
    }
  };

  grunt.initConfig(gruntConfig);

  function getDevInjector() {
    return {
      options: {
        ignorePath: ['app/', '.tmp/'],
      },
      localDependencies: {
        files: {
          'app/index.html': [
            'app/js/config.js',
            'app/js/application.js',
            'app/js/constants.js',
            'app/modules/*/*.js',
            'app/modules/*/config/*.js',
            'app/modules/*/services/*.js',
            'app/modules/*/directives/*.js',
            'app/modules/*/filters/*.js',
            'app/modules/*/controllers/*.js',
            'app/css/*.css'
          ]
        }
      },
      bowerDependencies: {
        files: {
          'app/index.html': ['bower.json'],
        }
      }
    };
  }

  function getProdInjector() {
    return {
      options: {
        ignorePath: ['app/'],
        min: true
      },
      localDependencies: {
        files: {
          'app/index.html': [
            'app/js/config.js',
            'app/js/application.js',
            'app/js/constants.js',
            'app/modules/*/*.js',
            'app/modules/*/config/*.js',
            'app/modules/*/services/*.js',
            'app/modules/*/directives/*.js',
            'app/modules/*/filters/*.js',
            'app/modules/*/controllers/*.js',
            'app/css/*.css'
          ]
        }
      },
      bowerDependencies: {
        files: {
          'app/index.html': ['bower.json'],
        }
      }
    };
  }

  grunt.registerTask('inject', function (mode) {
    var injector;
    if (mode === 'dev') {
      injector = getDevInjector();
    } else if (mode === 'prod') {
      injector = getProdInjector();
    }
    injector.options.addRootSlash = false;
    injector.options.bowerPrefix = 'bower';
    gruntConfig.injector = injector;
    grunt.task.run('injector');
  });

  grunt.registerTask('dev', [
    'newer:jshint:all',
    'concurrent:dev',
    'autoprefixer:dev',
    'inject:dev',
    'connect:livereload',
    'watch'
  ]);

  grunt.registerTask('prod', [
    'build',
    'connect:dist:keepalive'
  ]);

  grunt.registerTask('build', [
    'clean:dist',
    'concurrent:dist',
    'autoprefixer:dist',
    'inject:prod',
    'useminPrepare',
    'concat',
    'ngAnnotate:dist',
    'concurrent:dist2',
    'copy:dist',
    'copy:fonts',
    'copy:socialFonts',
    'copy:materializeCss',
    'cssmin',
    'uglify',
    //'rev:dist',
    'usemin',
    'htmlmin',
    'comments:dist',
    'clean:postDist'
  ]);
};
