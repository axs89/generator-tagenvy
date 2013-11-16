'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    fs = require('fs'),
    tagenvy = require('../tagenvy/');


var TagenvyGenerator = module.exports = function TagenvyGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(TagenvyGenerator, yeoman.generators.Base);

/**
 * Show welcome
 */
TagenvyGenerator.prototype.showWelcome = function showWelcome() {
    console.log(tagenvy.Art.clear);
    console.log(tagenvy.Art.welcome);
};

TagenvyGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    var prompts = [
        {
            type   : 'input',
            name   : 'subdirectory',
            message: 'Please enter a valid subdirectory name:'
        }
    ];

    this.prompt(prompts, function (answers) {

        this.config = {
            subdirectory: answers.subdirectory
        };

        cb();
    }.bind(this));
};

TagenvyGenerator.prototype.createSubdirectory = function createSubdirectory() {

};

TagenvyGenerator.prototype.projectfiles = function projectfiles() {
    this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
};
