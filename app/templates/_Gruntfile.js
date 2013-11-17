module.exports = function (grunt) {

    grunt.initConfig({

        // Read tagenvy.json so we can access the config
        tagenvy: grunt.file.readJSON('tagenvy.json'),

        // Concatenate bower components
        bower_concat: {
            all: {
                dest: 'src/bower.js'
            }
        },

        // Concatenate tagenvy.js and _bower.js
        concat: {
            options: {
                separator: ';\n\n'
            },
            tagenvy: {
                src: ['src/bower.js', 'src/tagenvy.js'],
                dest: 'dist/tagenvy.js'
            }
        },

        // Check JavaScript code
        jshint: {
            afterConcat: {
                options: {
                    '-W032': true // Ignore warning 'W032: Unnecessary semicolon'
                },
                src: [
                    '<%%= concat.tagenvy.dest %>'
                ]
            },
            options: {
                // options here to override JSHint defaults
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true,
                    angular: true
                },
                globalstrict: false
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-concat');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['build']);
    grunt.registerTask('test', ['jshint']);
    grunt.registerTask('build', ['bower_concat', 'concat']);
};