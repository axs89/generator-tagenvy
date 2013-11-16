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
            message: 'Please enter a valid subdirectory name:',
            filter: function(input){
                return './' + input;
            },
            validate: function(input){
                var path = './' + input;
                if(fs.existsSync(path)){
                    return 'A file or subdirectory with that name already exists, please enter another name';
                }
                return true;
            }
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
    tagenvy.Art.h1('Create subdirectory');
    this.mkdir(this.config.subdirectory);
    console.log('Created subdirectory ' + this.config.subdirectory);
};
