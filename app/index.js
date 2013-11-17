'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    fs = require('fs'),
    chalk = require('chalk'),
    path = require('path'),
    tagenvy = require('../tagenvy/');


/**
 * Generator constructor
 */
var TagenvyGenerator = module.exports = function TagenvyGenerator(args, options, config) {

    // Apply base generator constructor
    yeoman.generators.Base.apply(this, arguments);

    // Event handler that runs when generators has finished
    this.on('end', function () {

        // Change to client directory and install dependencies
        this.destinationRoot(this.destinationClientDirectory);

        // Install dependencies
        tagenvy.Art.h1('Installing dependencies...');
        this.installDependencies({
            skipInstall: options['skip-install'],
            callback: function() {

                // Emit a new event - dependencies installed
                this.emit('dependenciesInstalled');
            }.bind(this)
        });

    });

    // Event handler that runs after dependencies have been installed
    this.on('dependenciesInstalled', function () {

        // We are already in client directory so no need to change directory again

        // Run grunt
        tagenvy.Art.h1('Running GruntJS for the first time...');
        this.spawnCommand('grunt', ['build']).on('exit',
            function() {

                // Emit a new event - dependencies installed
                this.emit('gruntFinished');
            }.bind(this)
        );

    });

    // Event handler that runs when Grunt has finished
    this.on('gruntFinished', function () {
        tagenvy.Art.h1('All done!');
        console.log(tagenvy.Art.finished);
        console.log('\n\n');
    });

    // Read package.json
    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

// Inherit prototype methods from Base
util.inherits(TagenvyGenerator, yeoman.generators.Base);

/**
 * Show welcome
 */
TagenvyGenerator.prototype.showWelcome = function showWelcome() {
    console.log(tagenvy.Art.clear);
    console.log(tagenvy.Art.welcome);
};

/**
 * Ask questions
 */
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

        // Keep track of directories
        this.destinationRootDirectory = this.destinationRoot();
        this.destinationClientDirectory = path.join(this.destinationRootDirectory, this.config.name.slugified);

        cb();
    }.bind(this));
};

/**
 * Create client subdirectory
 */
TagenvyGenerator.prototype.createSubdirectory = function createSubdirectory() {
    tagenvy.Art.h1('Creating subdirectory...');
    this.mkdir(this.config.name.slugified);
    console.log('Created subdirectory ' + this.config.name.slugified);
};

/**
 * Create package.json
 */
TagenvyGenerator.prototype.createPackageJson = function createPackageJson() {
    tagenvy.Art.h1('Generating package.json...');
    this.template('_package.json', path.resolve(this.destinationClientDirectory, './package.json'), { config: this.config });
};

/**
 * Create Bower files
 */
TagenvyGenerator.prototype.createBowerFiles = function createBowerFiles() {
    tagenvy.Art.h1('Generating Bower configuration...');
    this.template('_bower.json', path.resolve(this.destinationClientDirectory, './bower.json'), { config: this.config });
    this.copy('bowerrc', path.resolve(this.destinationClientDirectory, './.bowerrc'));
};

/**
 * Create Gruntfile.js
 */
TagenvyGenerator.prototype.createGruntfiles = function createGruntfiles() {
    tagenvy.Art.h1('Generating Grunt configuration...');
    this.template('_Gruntfile.js', path.resolve(this.destinationClientDirectory, './Gruntfile.js'), { config: this.config });
};

/**
 * Create tagenvy.json
 */
TagenvyGenerator.prototype.createTagenvyJson = function createTagenvyJson() {
    tagenvy.Art.h1('Creating tagenvy.json...');
    this.write(path.resolve(this.destinationClientDirectory, './tagenvy.json'), JSON.stringify(this.config));
};

/**
 * Generate tagenvy src files
 */
TagenvyGenerator.prototype.createTagenvySrcFiles = function createTagenvySrcFiles() {
    tagenvy.Art.h1('Generating tagenvy src files...');
    this.template('src/tagenvy.js', path.resolve(this.destinationClientDirectory, './src/tagenvy.js'), { config: this.config });
};