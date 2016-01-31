describe('LastFMDataVis', function () {
    it('should redirect to /dashboard by default', function () {
        browser.get('index.html');
        expect(browser.getLocationAbsUrl()).toMatch('/dashboard');
    });
    it('should run protractor tests without timing out', function () {
        expect(1).toBe(1);
    });
    describe('dashboard', function () {
        beforeEach(function () {
            browser.get('index.html#/dashboard');
        });
        it('should render the dashboard view on /dashboard', function (done) {
            (element.all(by.css('[ng-view] h3')).first()).getText().then(function (result) {
                expect(result).toMatch(/Dashboard/);
                done();
            });
        });
    });
});
//# sourceMappingURL=scenarios.js.map