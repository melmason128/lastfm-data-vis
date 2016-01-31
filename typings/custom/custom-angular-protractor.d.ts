/**
 * Created by Mel on 31/01/2016.
 */

//The type definitions for angular protractor are several major versions out of date.
// This is a workaround for now - if problems keep occurring I should either do another search for up to date definitions
// or switch to using javascript for the protractor spec

declare module protractor {

    interface ElementFinder{
        getText(): webdriver.promise.Promise<string[]>;
    }
}