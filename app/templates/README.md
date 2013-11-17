# TagEnvy library

## Bower

You can use Bower to manage dependencies:

    // Install components
    $ bower install <component>

    // Uninstall components
    $ bower uninstall <components>

    // View all available commands
    $ bower

## Grunt

You can use Grunt to:

    // Build dist/tagenvy.js that can be used in production
    $ grunt build

    // Run tests
    $ grunt test

    // Run tests and build
    $ grunt

## Scenario

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