module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.config('clean', {
        'js': ['eidos-bs/static/js/'],
        'css': ['eidos-bs/static/css/']
    });
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.config('copy', {
        'js-lib': {
            files: [
                {
                    expand: true,
                    src: [
                        'bower_components/angular/angular.min.js',
                        'bower_components/angular/angular.min.js.map',
                        'bower_components/lodash/dist/lodash.min.js'
                    ],
                    dest: 'eidos-bs/static/js/lib/',
                    flatten: true
                }
            ]
        },
        'css-lib': {
            files: [
                {
                    expand: true,
                    src: [
                        'bower_components/bootstrap/dist/css/bootstrap.min.css',
                        'bower_components/bootstrap/dist/css/bootstrap.css.map',
                        'bower_components/flat-ui-official/css/flat-ui.css'
                    ],
                    dest: 'eidos-bs/static/css/lib/',
                    flatten: true
                }
            ]
        },
        'fonts': {
            files: [
                {
                    expand: true,
                    cwd: 'bower_components/flat-ui-official/fonts/',
                    src: [
                        '**/*'
                    ],
                    dest: 'eidos-bs/static/css/fonts'
                }
            ]
        }
    });
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.config('coffee', {
        'app': {
            options: {
                join: true
            },
            files: {
                'eidos-bs/static/js/app.js': [
                    'eidos-bs/static/coffee/modules.coffee',
                    'eidos-bs/static/coffee/**/*.coffee'
                ]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.config('less', {
        'app': {
            options: {
                paths: ['eidos-bs/static/less/']
            },
            files: {
                'eidos-bs/static/css/app.css': 'eidos-bs/static/less/app.less'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.config('watch', {
        'coffee': {
            files: [
                'eidos-bs/static/coffee/**/*.coffee'
            ],
            tasks: ['clean:js', 'coffee:app', 'copy:js-lib']
        },
        'less': {
            files: [
                'eidos-bs/static/less/**/*.less'
            ],
            tasks: ['less:app']
        },
        'live': {
            files: [
                'eidos-bs/static/js/app.js',
                'eidos-bs/static/css/app.css',
                'eidos-bs/templates/**/*.html'
            ],
            options: {
                livereload: true
            }
        }
    });
    grunt.registerTask('build', [
        'clean:js',
        'clean:css',
        'coffee:app',
        'copy:js-lib',
        'copy:css-lib',
        'copy:fonts',
        'less:app'
    ]);
};
