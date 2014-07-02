'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');
var yosay = require('yosay');
var chalk = require('chalk');


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
    }, {
      type: 'input',
      name: 'appDescription',
      message: 'Give me your project description'
    }, {
      type: 'input',
      name: 'authorName',
      message: 'Who are you?'
    }, {
      type: 'input',
      name: 'appRepository',
      message: 'Where is a project repository?'
    }];

    this.prompt(prompts, function (props) {
      this.appName = props.appName;
      this.appDescription = props.appDescription;
      this.authorName = props.authorName;
      this.appRepository = props.appRepository;
      this.appVersion = '0.1.0';

      done();
    }.bind(this));
  },

  configuring: function () {
    this.copy('editorconfig', '.editorconfig');
    this.copy('gitignore', '.gitignore');
  },

  writing: function () {
    this.template('_package.json', 'package.json');
    this.template('_bower.json', 'bower.json');
    this.copy('_requirements.txt', 'requirements.txt');
  }

});

module.exports = FlaskularGenerator;
