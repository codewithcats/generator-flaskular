'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');
var _s = require('underscore.string');


var FlaskularGenerator = yeoman.generators.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);
  },
  initializing: function () {
    this.pkg = require('../package.json');

    this.on('end', function () {
      if (!this.options['skip-install']) {
        this.installDependencies();
      }
    });
  },

  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay('Welcome to the marvelous Flaskular generator!'));

    var prompts = [{
      type: 'input',
      name: 'appName',
      message: 'Please tell me your project name?',
      default: 'Awesome App'
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.appVersion = '0.1.0';

      done();
    }.bind(this));
  },

  configuring: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('gitignore', '.gitignore');
  },

  writing: function () {
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('requirements.txt', 'requirements.txt');
    this.copy('Gruntfile.js', 'Gruntfile.js');
    this.copy('README.md', 'README.md');

    this.directory('app', _s.slugify(this.appName));
  }

});

module.exports = FlaskularGenerator;
