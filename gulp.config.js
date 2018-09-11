'use strict';

module.exports = function ctor() {
    this.source = './src';
    this.destination = './dest';
    this.sourceFiles = `${this.source}/**/*.ts`;
    this.testSource = 'specs';
    this.jsTestFiles = `${this.destination}/${this.testSource}/**/*.spec.js`;
}