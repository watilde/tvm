# TVM

TypeScript Version Manager.

## Badges
+ [![NPM Version](http://img.shields.io/npm/v/tvm.svg)](https://www.npmjs.org/package/tvm)
+ [![Build Status](https://travis-ci.org/watilde/tvm.png?branch=master)](https://travis-ci.org/watilde/tvm)
+ [![Dependency Status](https://gemnasium.com/watilde/tvm.svg)](https://gemnasium.com/watilde/tvm)
+ [![MIT LICENSE](http://img.shields.io/badge/license-MIT-brightgreen.svg)](https://github.com/watilde/tvm/blob/master/LICENSE)

## Install

Using npm.

    $ npm install -g tvm

Confirm.

    $ tvm usage

## Usage

    tvm usage                  Show this message
    tvm list                   List installed versions
    tvm list known             List registry versions
    tvm install <version>      Install a version
    tvm install latest         Install a latest version
    tvm use <version>          Use <version>
    tvm tsc <file>             Compile <file>
    tvm uninstall <version>    Uninstall a version
    tvm clean                  Remove all source files

## Example

Install.

    $ tvm install 0.9.5
    Searching...

    Done

Switch use version.

    $ tvm use 0.9.5
    $ tvm tsc -v
    Version 0.9.5

Use tsc.

    $ tvm tsc foo.ts

View all installed version list.

    $ tvm list
    v0.9.5


View Remote version.

    $ tvm list known
    Searching...

    v0.8.0
    v0.8.1
    v0.8.1-1
    v0.8.2
    v0.8.3
    v0.9.0
    v0.9.0-1
    v0.9.1
    v0.9.1-1
    v0.9.5

Uninstall.

    $ tvm uninstall 0.9.5

    Done

Update tvm.

    $ npm update -g tvm

Uninstall tvm.

    $ npm uninstall -g tvm

## Add tsc PATH
Add the following line to the end of your .bashrc or .zshrc.

    alias tsc='tvm tsc'

Reload config.

    $ source ~/.zshrc

Confirm.

    $ tsc -v

## Task runner plugins
 + Grunt plugin: [grunt-tvm-tsc](https://github.com/watilde/grunt-tvm-tsc)
 + gulp plugin: [gulp-tvm-tsc](https://github.com/watilde/gulp-tvm-tsc)
