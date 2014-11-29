module.exports = function (grunt) {
    'use strict';
    
    var pkg                            = grunt.file.readJSON('package.json');
    
    var PROJECT_NAME                   = pkg.name;
    var SOURCE_DIRECTORY               = 'src/client';
    var BUILD_DIRECTORY                = 'build';
    var MAIN_LESS_FILE                 = SOURCE_DIRECTORY + '/' + PROJECT_NAME + '/' + 'app.less';
    var COMPILED_LESS_FILE             = BUILD_DIRECTORY + '/' + PROJECT_NAME + '.css';
    var JS_CONCATENATED_FILENAME       = PROJECT_NAME + '.js';
    var JS_CONCATENATED_PATH           = BUILD_DIRECTORY + '/' + JS_CONCATENATED_FILENAME;
    var JS_BOWER_CONCATENATED_FILENAME = PROJECT_NAME + '.bowerDependencies.js';
    var JS_BOWER_CONCATENATED_PATH     = BUILD_DIRECTORY + '/' + JS_BOWER_CONCATENATED_FILENAME;
    var CSS_BOWER_CONCATENATED_FILENAME = PROJECT_NAME + '.bowerDependencies.css';
    var CSS_BOWER_CONCATENATED_PATH     = BUILD_DIRECTORY + '/' + CSS_BOWER_CONCATENATED_FILENAME;

    if (grunt.option('dev')) {
        process.env.NODE_ENV = 'dev';
    } else {
        process.env.NODE_ENV = 'build';
    }

   grunt.loadNpmTasks('grunt-contrib-jshint');
   grunt.loadNpmTasks('grunt-jscs');
   grunt.loadNpmTasks('grunt-karma');
   grunt.loadNpmTasks('grunt-contrib-clean');
   grunt.loadNpmTasks('grunt-contrib-less');
   grunt.loadNpmTasks('grunt-autoprefixer');
   grunt.loadNpmTasks('grunt-contrib-copy');
   grunt.loadNpmTasks('grunt-contrib-concat');
   grunt.loadNpmTasks('grunt-ng-annotate');
   grunt.loadNpmTasks('grunt-contrib-uglify');
   grunt.loadNpmTasks('grunt-angular-templates');
   grunt.loadNpmTasks('grunt-wiredep');
   grunt.loadNpmTasks('grunt-injector');
   grunt.loadNpmTasks('grunt-filerev');
   grunt.loadNpmTasks('grunt-contrib-watch');
   grunt.loadNpmTasks('grunt-express');
   grunt.loadNpmTasks('grunt-usemin');

    var bowerClasses = [];
    bowerClasses = require('wiredep')().js;
    console.log("*** bowerClasses ***");
    console.log(bowerClasses);

    var bowerCss = [];
    bowerCss = require('wiredep')().css;

    
    var tasks = {
        PROJECT_NAME: PROJECT_NAME,
        MAIN_LESS_FILE: MAIN_LESS_FILE,
        COMPILED_LESS_FILE: COMPILED_LESS_FILE,
        JS_CONCATENATED_FILENAME: JS_CONCATENATED_FILENAME,
        JS_CONCATENATED_PATH: JS_CONCATENATED_PATH,
        JS_BOWER_CONCATENATED_PATH: JS_BOWER_CONCATENATED_PATH,
        CSS_BOWER_CONCATENATED_PATH: CSS_BOWER_CONCATENATED_PATH,

        jshint: {
            options: {
                force: true,
                jshintrc: '.jshintrc'
            },

            src: ['src/client/**/*.js', '!Gruntfile.js']
        },

        jscs: {
            options: {
                force: true,
                config: '.jscsrc'
            },
            src: ['src/client/**/*.js', '!Gruntfile.js']
        },

        karma: {
            test: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        clean: {
            dev: {
                src: 'build'
            },

            devCSS: {
                src: ['build/**/*.css']
            },

            prod: {
                src: 'build'
            },

            prodTmp: {
                src: '.tmp'
            },

            prodCSS: {
                src: ['build/**/*.css']
            }
        },

        copy: {
            devJS: {
                expand: true,
                cwd: 'src/client/<%= PROJECT_NAME %>',
                src: ['*.js','**/*.js', '!**/*spec*.js', '!test/**'],
                dest: 'build/<%= PROJECT_NAME %>'
            },

            devAssets: {
                expand: true,
                cwd: 'src/client/<%= PROJECT_NAME %>/images',
                src: ['**/*.{jpg,png,svg,gif,ico}'],
                dest: 'build/<%= PROJECT_NAME %>/images'
            },

            devTemplates: {
                expand: true,
                cwd: 'src/client/<%= PROJECT_NAME %>',
                src: ['**/*.html'],
                dest: 'build/<%= PROJECT_NAME %>'
            },

            prodHTML: {
                expand: false,
                cwd: '.',
                src: 'src/client/index.html',
                dest: 'build/index.html'
            }
        },

        less: {
            dev: {
                files: {
                  '<%= COMPILED_LESS_FILE %>': '<%= MAIN_LESS_FILE %>'
                }
            },

            prod: {
                options: {
                    compress: true,
                    cleancss: true
                },
                files: {
                    '<%= COMPILED_LESS_FILE %>': MAIN_LESS_FILE
                }
            }
        },

        autoprefixer: {
            options: {
                map: false
            },
            prod: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp',
                        src: '{,*/}*.css',
                        dest: '.tmp'
                    }
                ]
            }
        },

        ngAnnotate: {
            prod: {
                options: {
                    and: true,
                    singleQuotes: true
                },
                files: [{
                    expand: true,
                    cwd: 'src/client/<%= PROJECT_NAME %>',
                    src: [
                        '*.js',
                        '**/**.js',
                        '!test/**.js',
                        '!**/**.spec.js'
                    ],
                    dest: '.tmp/scripts'
                }] 
            }
        },

        concat: {
            prod: {
                cwd: '.',
                expand: true,
                files: {
                    '<%= JS_CONCATENATED_PATH %>': [
                        '.tmp/scripts/*.js',
                        '.tmp/scripts/**/*.module.js',
                        '.tmp/scripts/**/*.js'],
                    '<%= JS_BOWER_CONCATENATED_PATH %>': bowerClasses,
                    '<%= CSS_BOWER_CONCATENATED_PATH %>': bowerCss
                }
                
            }
        },

        uglify: {
            prod: {
                files: {
                    '<%= JS_CONCATENATED_PATH %>': JS_CONCATENATED_PATH
                }
            }
        },

        ngtemplates: {
            prod: {
                options: {
                    module: PROJECT_NAME,
                    standalone: false,
                    append: true,
                    htmlmin: {
                        collapseWhitespace: true,
                        conservativeCollapse: true,
                        collapseBooleanAttributes: true,
                        removeCommentsFromCDATA: true,
                        removeOptionalTags: true
                    }
                },
                cwd: 'src/client',
                src: ['**/*.html', '!index.html'],
                dest: JS_CONCATENATED_PATH
            }
        },

        filerev: {
            prod: {
                src: [
                    'build/**/*',
                    '!build/**/*.{ico,html,xml}'
                ],
                filter: 'isFile'
            }
        },
        
        wiredep: {
            client: {
                src: 'src/client/index.html',
                ignorePath: /\.\./
            },
            build: {
                src: 'build/index.html',
                ignorePath: /\.\./
            }
        },

        usemin: {
            'optimize-html': {
                options: {
                    type: 'html'
                },
                files: [{
                    src: ['build/index.html']
                }]
            },
            'optimize-css': {
                options: {
                    type: 'css',
                    assetsDirs: ['build/images']
                },
                files: [{
                    src: ['build/**/*.css']
                }]
            }         
        },

        injector: {
            options: {
                template: 'build/index.html',
                addRootSlash: true,
                ignorePath: 'build/'
            },
            prod: {
                dest: 'build/index.html',
                src: [
                    'build/*.css',
                    'build/<%= PROJECT_NAME %>.js'
                ]
            },
            dev: {
                files: {
                    'build/index.html': [
                        'build/*.js', 
                        'build/**/*.module.js',
                        'build/**/*.js', 
                        'build/**/*.css', 
                        'build/*.css'
                    ]
                }
            }
        },

        express: {
            localServer:
            {
                options:
                {
                    port: 8626,
                    bases: './',
                    debug: true,
                    open: true,
                    server: './src/static/server.js'
                }
            }
        },

        watch: {
            options: {
                livereload: true
            },

            dev: {
                files: 'src/client/**/*',
                tasks: 'build_dev'
            },

            prod: {
                files: 'src/client/**/*',
                tasks: 'build_prod'
            }
        }
    };

    grunt.initConfig(tasks);

    grunt.registerTask('analyze',
        'Validates your code and ensures it follows consistent styling.', [
            'jshint',
            'jscs'
    ]);
    grunt.registerTask('test',
        'Runs all unit tests based on the karm.conf.js configurations.', [
            'karma'
    ]);

    grunt.registerTask('css_dev', [
        'clean:devCSS',
        'less:dev'
    ]);

    grunt.registerTask('html_prod', [
        'clean:prod',
        'copy:prodHTML',
        'wiredep:build'
    ]);

    grunt.registerTask('build_dev', [
        'clean:dev',
        'css_dev',
        'copy:devJS',
        'copy:devAssets',
        'copy:devTemplates',
        'copy:prodHTML',
        'wiredep:build',
        'injector:dev'
    ]);
    
    grunt.registerTask('build_prod', [
        'clean:prod',
        'clean:prodCSS',
        'analyze',
        'test',
        'copy:devAssets',
        'less:prod',
        'autoprefixer:prod',
        'ngAnnotate:prod',
        'concat:prod',
        'ngtemplates:prod',
        'copy:prodHTML',
        'injector:prod',
        'wiredep:build',
        'uglify',
        'filerev',
        'usemin:optimize-html',
        'usemin:optimize-css',
        'clean:prodTmp'
    ]);

    if (process.env.NODE_ENV === 'dev') {
        grunt.registerTask('build', ['build_dev']);
        grunt.registerTask('serve',
            'Validates your code, ensures styling is consistent, and then runs a local node server to test your application. It will then watch your local files. If they change, it will automatically reload.', [
            'build_dev',
            'express:localServer',
            'watch:dev'
        ]);
    }
    else {
        grunt.registerTask('build', ['build_prod']);
        grunt.registerTask('serve',
            'Validates your code, ensures styling is consistent, runs all of your unit tests, and concatenates and uglifies your CSS, HTML, and JavaScript together for production deployment. It then runs a local node server to test your application, and will then watch your local files. If they change, it will automatically reload.', [
                'build_prod',
                'express:localServer',
                'express-keepalive'
        ]);
    }
};