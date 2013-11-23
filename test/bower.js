/*global describe, beforeEach, it*/
'use strict';

var path = require('path'),
    helpers = require('yeoman-generator').test,
    fs = require('fs'),
    assert = require('assert'),
    config = require('./config');


describe('tagenvy generator', function () {

    beforeEach(function (done) {
        helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
            if (err) {
                return done(err);
            }

            this.app = helpers.createGenerator('tagenvy:app', [
                '../../app'
            ]);
            done();
        }.bind(this));
    });

    describe('bower configuration generator', function () {

        it('should create bower configuration files in client directory', function (done) {
            var expected = [
                // add files you expect inside client directory
                '.bowerrc',
                'bower.json'
            ];

            helpers.mockPrompt(this.app, config.defaultPromptAnswers);
            this.app.options['skip-install'] = true;
            this.app.run({}, function () {

                // Check if expected Bower files are there
                helpers.assertFiles(expected);

                done();
            });
        });

        it('should handle the console-shim dependency correctly', function (done) {
            var expected = [
                // add files you expect inside client directory
                '.bowerrc',
                'bower.json'
            ];

            var answers = config.defaultPromptAnswers;
            answers.bowerDependencies['console-shim'] = true;

            helpers.mockPrompt(this.app, answers);
            this.app.options['skip-install'] = true;
            this.app.run({}, function () {

                // Check if dependency is specified in bower.json
                var bowerConfig = JSON.parse(fs.readFileSync('bower.json', 'utf8'));
                assert(bowerConfig.dependencies['console-shim'], 'console-shim not in bower dependencies');
                console.log(bowerConfig);

                done();
            });
        });

    });

});
