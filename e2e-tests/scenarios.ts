/**
 * Created by Mel on 31/01/2016.
 */
/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('LastFMDataVis', ()=> {

    it('should redirect to /dashboard by default', ()=>{
        browser.get('index.html');
        expect(browser.getLocationAbsUrl()).toMatch('/dashboard');
    });


    it('should run protractor tests without timing out', ()=>{
        expect(1).toBe(1);
    });

    describe('dashboard', ()=>{

        beforeEach(() => {
            browser.get('index.html#/dashboard');
        });

        it('should render the dashboard view on /dashboard', (done)=>{
            (<any>(element.all(by.css('[ng-view] h3')).first())).getText().then(
                (result) => {
                    expect(result).toMatch(/Dashboard/);
                    done();
                }
            );
        });


    });


});