describe('LastFMDataVis', function () {
    it('should redirect to /dashboard by default', function () {
        browser.get('index.html');
        expect(browser.getLocationAbsUrl()).toMatch('/dashboard');
    });
    describe('dashboard', function () {
        beforeEach(function () {
            browser.get('index.html#/dashboard');
        });
        it('should render the dashboard view on /dashboard', function () {
            expect(element.all(by.css('[ng-view] h3')).first().getText()).toMatch(/Dashboard/);
        });
    });
});
//# sourceMappingURL=scenarios.js.map