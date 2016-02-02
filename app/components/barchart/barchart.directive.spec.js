describe('LastFMDataVis', function () {
    describe('barchart directive', function () {
        var scope;
        var template = '<ldv-barchart ldv-data-set="data"></ldv-barchart>';
        var defaultDataSet;
        var getDirective;
        beforeEach(function () { angular.mock.module('lastFMDataVisApp'); });
        beforeEach(inject(function ($compile, $rootScope) {
            getDirective = function (data) {
                defaultDataSet = [
                    { label: 'point1', value: 35 },
                    { label: 'point2', value: 50 },
                    { label: 'point3', value: 3 }
                ];
                scope = $rootScope.$new();
                scope.data = data || defaultDataSet;
                var element = $compile(template)(scope);
                return element;
            };
        }));
        it('should show a bar per datapoint', function () {
            var ele = getDirective();
            expect(ele.find('.bar').length).toBe(defaultDataSet.length);
        });
        it('should have bars proportional to the datapoint\'s value', function () {
            //check it's not a trivial case
            expect(defaultDataSet[0].value).not.toBe(defaultDataSet[1].value);
            var ele = getDirective();
            var bars = ele.find('.bar');
            //ratio between two bar widths and two data values should be same
            expect(parseFloat(bars[0].getAttribute('width')) / parseFloat(bars[1].getAttribute('width')))
                .toBe(defaultDataSet[0].value / defaultDataSet[1].value);
        });
        it('should show a label per datapoint', function () {
            var ele = getDirective();
            expect(ele.find('.bar-label').length).toBe(defaultDataSet.length);
        });
        it('should show the correct label on each bar', function () {
            var ele = getDirective();
            var labels = ele.find('.bar-label');
            expect(labels[1].textContent).toBe(defaultDataSet[1].label);
        });
    });
});
//# sourceMappingURL=barchart.directive.spec.js.map