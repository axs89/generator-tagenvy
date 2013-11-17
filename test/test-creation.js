/*global describe, beforeEach, it*/
'use strict';

var path = require('path');
var helpers = require('yeoman-generator').test;


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

    it('creates expected files in client directory', function (done) {
        var expected = [
            // add files you expect inside client directory
            '.bowerrc',
            'bower.json',
            'package.json'
        ];

        helpers.mockPrompt(this.app, {
            'name': 'client-one'
        });
        this.app.options['skip-install'] = true;
        this.app.run({}, function () {
            helpers.assertFiles(expected);
            done();
        });
    });
});
