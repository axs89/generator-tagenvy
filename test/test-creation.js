/*global describe, beforeEach, it*/
'use strict';

var path = require('path'),
    helpers = require('yeoman-generator').test,
    fs = require('fs'),
    assert = require('assert'),
    defaultPromptAnswers = {
        name: 'client-one',
        bowerDependencies: {
            'console-shim' : false
        }
    };


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

    it('should create expected files in client directory', function (done) {
        var expected = [
            // add files you expect inside client directory
            'package.json'
        ];

        helpers.mockPrompt(this.app, defaultPromptAnswers);
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });

});
