module.exports = function(grunt) {

  grunt.util.linefeed = '\n';

  RegExp.quote = function (string) {
	return string.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&');
  };

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    meta: {
      defaultPath: 'bootflat'
    },

    banner: '/*\n * <%= pkg.name %> Jisuanke-UI \n' +
		    ' *\n' +
		    ' * Description: <%= pkg.description %>\n' +
		    ' *\n' +
		    ' * Homepage: <%= pkg.homepage %>\n' +
		    ' *\n' +
		    ' * By @<%= pkg.author %>\n' +
		    ' *\n' +
		    ' * Last modify time: <%= grunt.template.today("yyyy-mm-dd") %>\n' +
		    ' *\n' +
		    ' * Licensed under the MIT license. Please see LICENSE for more information.\n' +
		    ' *\n' +
		    ' * Copyright 2014 Jisuanke.\n' +
		    ' *\n' +
		    ' */\n',

    clean:  {
        dist: ['<%= meta.defaultPath %>/css/'],
    },

    copy: {
        main: {
            expand: true,
            src: ['./bower_components/fontawesome/fonts/*'],
            dest: './fonts/',
            flatten: true,
            filter: 'isFile',
        },
        other: {
            expand: true,
            src: ['./bower_components/bootstrap-datetimepicker/src/js/*', './bower_components/bootstrap-datetimepicker/build/js/*'],
            dest: './js/',
            flatten: true,
            filter: 'isFile',
        },
    },

    uglify: {
      options: {
          banner: '<%= banner %>',
          sourceMap: true,
          sourceMapIncludeSources: true
      },
      dist: {
        files: {
          'js/site.min.js': [
            'js/jquery-1.10.1.min.js',
            'js/bootstrap.min.js',
            '<%= meta.defaultPath %>/js/icheck.min.js',
            '<%= meta.defaultPath %>/js/optionList.js',
            '<%= meta.defaultPath %>/js/jquery.fs.stepper.min.js',
            '<%= meta.defaultPath %>/js/amazeui.chosen.min.js',
            'js/application.js',
            'js/popover.js',
            'js/jstree.min.js'
          ]
        }
      }
    },
    csscomb: {
      options: {
        config: '<%= meta.defaultPath %>/scss/.csscomb.json'
      },
      dist: {
        files: {
          '<%= meta.defaultPath %>/css/<%= pkg.name %>.css': 'bootflat/css/<%= pkg.name %>.css'
        }
      }
    },
    cssmin: {
      options: {
          keepSpecialComments: 0,
          banner: '<%= banner %>',
      },
      dist: {
        files: {
          'css/site.min.css': [
            'css/bootstrap.min.css',
            '<%= meta.defaultPath %>/css/<%= pkg.name %>.css',
            'css/site.css',
            'css/amazeui.chosen.min.css',
            'css/jsTreeStyle.min.css'
          ],
          '<%= meta.defaultPath %>/css/<%= pkg.name %>.min.css': '<%= meta.defaultPath %>/css/<%= pkg.name %>.css'
        }
      }
    },
    sass: {
      dist: {
        files: {
          '<%= meta.defaultPath %>/css/<%= pkg.name %>.css': '<%= meta.defaultPath %>/scss/<%= pkg.name %>.scss'
        },
        options: {
          style: 'expanded',
        }
      }
    },
    csslint: {
      options: {
        csslintrc: '<%= meta.defaultPath %>/scss/.csslintrc'
      },
      src: [
          '<%= meta.defaultPath %>/css/<%= pkg.name %>.css'
      ]
    },
    validation: {
      options: {
        charset: 'utf-8',
        doctype: 'HTML5',
        failHard: true,
        reset: true,
        relaxerror: [
          'Bad value apple-mobile-web-app-title for attribute name on element meta: Keyword apple-mobile-web-app-title is not registered.',
          'Bad value apple-mobile-web-app-status-bar-style for attribute name on element meta: Keyword apple-mobile-web-app-status-bar-style is not registered.',
          'Bad value X-UA-Compatible for attribute http-equiv on element meta.',
          'Attribute ontouchstart not allowed on element body at this point.'
        ]
      },
      files: {
        src: '*.html'
      }
    },
    htmlmin: {
        dist: {
            options: {
                removeComments: true,
                collapseWhitespace: true,
                removeEmptyAttributes: true,
                removeCommentsFromCDATA: true,
                removeRedundantAttributes: true,
                collapseBooleanAttributes: true
            },
            files: {
                // Destination : Source
                './htmlmin/index.html': './index.html',
                './htmlmin/getting-started.html': './getting-started.html',
                './htmlmin/free-psd.html': './free-psd.html',
                './htmlmin/documentation.html': './documentation.html',
                './htmlmin/color-picker.html': './color-picker.html',
                './htmlmin/color-picker-blue.html': './color-picker-blue.html',
                './htmlmin/color-picker-gray.html': './color-picker-gray.html',
                './htmlmin/color-picker-green.html': './color-picker-green.html',
                './htmlmin/color-picker-pink.html': './color-picker-pink.html',
                './htmlmin/color-picker-purple.html': './color-picker-purple.html',
                './htmlmin/color-picker-red.html': './color-picker-red.html',
                './htmlmin/color-picker-yellow.html': './color-picker-yellow.html'
            }
        }
    },
    jshint: {
            /*
                Note:
                In case there is a /release/ directory found, we don't want to lint that
                so we use the ! (bang) operator to ignore the specified directory
            */
            files: ['Gruntfile.js', 'js/application.js'],
            options: {
                curly:   true,
                eqeqeq:  true,
                immed:   true,
                latedef: true,
                newcap:  true,
                noarg:   true,
                sub:     true,
                undef:   true,
                boss:    true,
                eqnull:  true,
                browser: true,

                globals: {
                    // AMD
                    module:     true,
                    require:    true,
                    requirejs:  true,
                    define:     true,

                    // Environments
                    console:    true,

                    // General Purpose Libraries
                    $:          true,
                    jQuery:     true,

                    // Testing
                    sinon:      true,
                    describe:   true,
                    it:         true,
                    expect:     true,
                    beforeEach: true,
                    afterEach:  true
                }
            }
    },

   sed: {
      versionNumber: {
        pattern: (function () {
          var old = grunt.option('oldver');
          return old ? RegExp.quote(old) : old;
        })(),
        replacement: grunt.option('newver'),
        recursive: true
      }
    }

  });

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.registerTask('task-css', ['sass', 'csscomb', 'cssmin']);
  grunt.registerTask('task-html', ['htmlmin']);
  grunt.registerTask('task-js', ['uglify']);
  grunt.registerTask('task', ['clean', 'task-css', 'task-js','copy']);
  grunt.registerTask('build', ['task']);
  grunt.registerTask('default', ['task']);
  grunt.registerTask('check-call', ['csslint', 'validation', 'jshint']);
  grunt.registerTask('check-css', ['csslint']);
  grunt.registerTask('check-html', ['validation']);
  grunt.registerTask('check-js', ['jshint']);


  grunt.registerTask('change-version-number', 'sed');
};
