module.exports = function (grunt) {

    grunt.initConfig({
        tagenvy: grunt.file.readJSON('tagenvy.json'),
        concat_bower: {
            options: {
                separator: ' ',
                punctuation: ''
            },
            files: {
                'dist/bower.js': ['bower']
            }
        }
    });

    grunt.loadNpmTasks('grunt-concat-bower');

    grunt.registerTask('default', ['build']);
    grunt.registerTask('build', ['concat_bower']);
};