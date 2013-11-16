'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    fs = require('fs'),
    chalk = require('chalk'),
    tagenvy = require('../tagenvy/');


var TagenvyGenerator = module.exports = function TagenvyGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.destinationRoot(this.destinationDirectory);
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
            name   : 'name',
            message: chalk.yellow('Please enter a unique name for this project:') + '\n\n' +
                'The project name is used as name of the subdirectory and as part of the generated package name.' + '\n' +
                'Don\'t use spaces or special characters. If you do, they will be converted to dashes.' + '\n\n' +
                'Unique project name (e.g. client-one):',
            validate: function(input){
                if(/.+/.test(input)){
                    return true;
                }
                return 'Please enter a name';
            }
        }
    ];

    this.prompt(prompts, function (props) {

        this.config = {

            // Originally a humanized string like "ClientOne Two_Three"
            name: {

                // String originally entered by user => "ClientOne Two_Three"
                original: props.name,

                // Camelized => clientOneTwoThree
                camelized: this._.camelize(props.name),

                // Dasherized (underscored and camelized to dashes) => client-one-two-three
                dasherized: this._.dasherize(props.name),

                // Slugified (whitespace and special chars replaced by dashes (great for url's)) => clientone-two-three
                slugified: this._.slugify(props.name),

                // Array of parts => [ 'clientone', 'two', 'three' ]
                parts: this._.slugify(props.name).split('-')
            }
        };

        this.destinationDirectory = './' + this.config.name.slugified + '/';

        cb();
    }.bind(this));
};

TagenvyGenerator.prototype.createSubdirectory = function createSubdirectory() {
    tagenvy.Art.h1('Creating subdirectory...');
    this.mkdir('./' + this.config.name.slugified);
    console.log('Created subdirectory ' + this.config.name.slugified);
};

TagenvyGenerator.prototype.createPackageJson = function createPackageJson() {
    tagenvy.Art.h1('Generating package.json...');
    this.copy('_package.json', this.destinationDirectory + 'package.json');
};

TagenvyGenerator.prototype.createBowerFiles = function createBowerFiles() {
    tagenvy.Art.h1('Generating Bower configuration...');
    this.copy('_bower.json', this.destinationDirectory + 'bower.json');
    this.copy('bowerrc', this.destinationDirectory + '.bowerrc');
};
