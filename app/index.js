'use strict';
var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
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

  var prompts = [{
    type: 'confirm',
    name: 'someOption',
    message: 'Would you like to enable this option?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.someOption = props.someOption;

    cb();
  }.bind(this));
};

TagenvyGenerator.prototype.app = function app() {
  this.mkdir('app');
  this.mkdir('app/templates');

  this.copy('_package.json', 'package.json');
  this.copy('_bower.json', 'bower.json');
};

TagenvyGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
};
