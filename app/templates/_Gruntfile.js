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
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-bower-concat');

    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['bower_concat', 'concat']);
};