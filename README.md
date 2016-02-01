# lastfm-data-vis
A sample app using Angular JS and D3 to display statistics from LastFM.

##Development

- Uses gulp to concatenate, minify and add angular annotations to the app scripts. The output is app/all.min.js. `gulp` builds all of the scripts once. `gulp watch` sets up a watch on the scripts for changes.
- Karma is the test runner. Can be started up with `npm test`.
- Protractor handles end to end tests. Run using `npm run protractor`

All pushed changes are built on travis-ci, where jasmine and protractor tests are run. See .travis.yml for details of build and testing process.

###Code style
Naming conventions and folder structure based on [johnpapa's styleguide](https://github.com/johnpapa/angular-styleguide). Note that all tests should end in *.spec.js.

###Typescript
All javascript files (save all.min.js) are currently included in git commit for ease of automated testing. May add a typescript compilation stage to the build script later.

tsconfig.json controls which .ts files are compiled. Currently it specifies each file individually, as tsconfig doesn't support fileglobs unless you're using atom typescript. The default behaviour is to compile all files, but as typings installs duplicate versions of type definitions in browser and main, and we only want to reference browser.d.ts, this would cause errors.

Type definitions are obtained using typings (used to be [tsd](http://definitelytyped.org/tsd/) and most of the documentation is still under that name).

  `typings install <nameofpackage> --save --ambient`

The ambient marker is neccessary to find most of the type def files. All currently installed type definition files are stored in the typings folder, and listed in the typings.json file. typings/custom contains type definitions not installed via typings.


##Testing
Based on [angular-seed](https://github.com/angular/angular-seed) - most of the build and test commands remain the same.

    Running Unit Tests
    
    The angular-seed app comes preconfigured with unit tests. These are written in Jasmine, which we run with the Karma Test Runner. We provide a Karma configuration file to run them.
    
        the configuration is found at karma.conf.js
        the unit tests are found next to the code they are testing and are named as ..._test.js.
    
    The easiest way to run the unit tests is to use the supplied npm script:
    
    npm test
    
    This script will start the Karma test runner to execute the unit tests. Moreover, Karma will sit and watch the source and test files for changes and then re-run the tests whenever any of them change. This is the recommended strategy; if your unit tests are being run every time you save a file then you receive instant feedback on any changes that break the expected code functionality.
    
    You can also ask Karma to do a single run of the tests and then exit. This is useful if you want to check that a particular version of the code is operating as expected. The project contains a predefined script to do this:
    
    npm run test-single-run
    
    End to end testing
    
    The angular-seed app comes with end-to-end tests, again written in Jasmine. These tests are run with the Protractor End-to-End test runner. It uses native events and has special features for Angular applications.
    
        the configuration is found at e2e-tests/protractor-conf.js
        the end-to-end tests are found in e2e-tests/scenarios.js
    
    Protractor simulates interaction with our web app and verifies that the application responds correctly. Therefore, our web server needs to be serving up the application, so that Protractor can interact with it.
    
    npm start
    
    In addition, since Protractor is built upon WebDriver we need to install this. The angular-seed project comes with a predefined script to do this:
    
    npm run update-webdriver
    
    This will download and install the latest version of the stand-alone WebDriver tool.
    
    Once you have ensured that the development web server hosting our application is up and running and WebDriver is updated, you can run the end-to-end tests using the supplied npm script:
    
    npm run protractor
    
    This script will execute the end-to-end tests against the application being hosted on the development server.
