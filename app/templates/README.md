# TagEnvy client library

This package contains an automatically generated Tagenvy client library that can be further customized with Bower and Grunt.

## Use Bower to manage dependencies:

    // Install components
    $ bower install <component>

    // Uninstall components
    $ bower uninstall <components>

    // View all available commands
    $ bower

## Use Grunt to perform tasks

    // Build dist/tagenvy.js that can be used in production
    $ grunt build

    // Run tests
    $ grunt test

    // Run tests and build
    $ grunt

## A sample scenario:

    // Add jquery component
    $ bower install jquery

    // Build library
    $ grunt

    // At this point the dist/tagenvy.js will contain the jquery library

    // Remove jquery component
    $ bower uninstall jquery

    // Build library
    $ grunt

    // Now dist/tagenvy.js will no longer container the jquery library

## Generated files

The build process generates 2 versions of the TagEnvy client library:

    // File containing all dependencies followed by code from src/tagenvy.js
    $ dist/tagenvy.js

    // Minified and uglified version
    $ dist/tagenvy.min.js