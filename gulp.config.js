'use strict';

module.exports = function ctor() {
    this.source = "./src";
    this.destination = "./dist";
    this.sourceFiles = this.source + "/**/*.ts";
}