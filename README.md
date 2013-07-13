# TVM

[![Build Status](https://travis-ci.org/watilde/tvm.png?branch=master)](https://travis-ci.org/watilde/tvm)

TypeScript Version Manager.

## Install

Using npm.

    $ npm install -g tvm

Confirm.

    $ tvm help

## Usage

    tvm help                   Show this message
    tvm list                   List installed versions
    tvm list known             List registry versions
    tvm install <version>      Install a version
    tvm use <version>          Use <version>
    tvm tsc <file>             Compile <file>
    tvm uninstall <version>    Uninstall a version
    tvm clean                  Remove source file

## Example

Install.

    $ tvm install 0.9.0
    Searching...

    Done

Switch use version.

    $ tvm use 0.9.0
    $ tvm tsc -v
    Version 0.9.0

Use tsc.

    $ tvm tsc foo.ts

View all installed version list.

    $ tvm list
    v0.9.0


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

Uninstall.

    $ tvm uninstall 0.9.0

    Done

Update tvm.

    $ npm update -g tvm
