module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.config('clean', {
        'js': ['<%= _.slugify(appName) %>/static/js/'],
        'css': ['<%= _.slugify(appName) %>/static/css/']
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
                    dest: '<%= _.slugify(appName) %>/static/js/lib/',
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
                    dest: '<%= _.slugify(appName) %>/static/css/lib/',
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
                    dest: '<%= _.slugify(appName) %>/static/css/fonts'
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
                '<%= _.slugify(appName) %>/static/js/app.js': [
                    '<%= _.slugify(appName) %>/static/coffee/modules.coffee',
                    '<%= _.slugify(appName) %>/static/coffee/**/*.coffee'
                ]
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.config('less', {
        'app': {
            options: {
                paths: ['<%= _.slugify(appName) %>/static/less/']
            },
            files: {
                '<%= _.slugify(appName) %>/static/css/app.css': '<%= _.slugify(appName) %>/static/less/app.less'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.config('watch', {
        'coffee': {
            files: [
                '<%= _.slugify(appName) %>/static/coffee/**/*.coffee'
            ],
            tasks: ['clean:js', 'coffee:app', 'copy:js-lib']
        },
        'less': {
            files: [
                '<%= _.slugify(appName) %>/static/less/**/*.less'
            ],
            tasks: ['less:app']
        },
        'live': {
            files: [
                '<%= _.slugify(appName) %>/static/js/app.js',
                '<%= _.slugify(appName) %>/static/css/app.css',
                '<%= _.slugify(appName) %>/templates/**/*.html'
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
