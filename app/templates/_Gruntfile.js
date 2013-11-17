module.exports = function (grunt) {

    grunt.initConfig({

        // Read tagenvy.json so we can access the config
        tagenvy: grunt.file.readJSON('tagenvy.json'),

        // Task to concatenate bower components
        bower_concat: {
            all: {
                dest: 'dist/_bower.js'
            }
        }
    });

    grunt.loadNpmTasks('grunt-bower-concat');

    grunt.registerTask('default', ['bower_concat']);
    grunt.registerTask('build', []);
};