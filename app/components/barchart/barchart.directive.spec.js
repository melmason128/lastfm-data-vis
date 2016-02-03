describe('LastFMDataVis', function () {
    describe('barchart directive', function () {
        //Taken from http://stackoverflow.com/questions/9063383/how-to-invoke-click-event-programmatically-in-d3.
        // Works around issue with jquery click events not triggering d3 click events
        var d3Click = function (ele) {
            ele.each(function (i, e) {
                var evt = new MouseEvent("click");
                e.dispatchEvent(evt);
            });
        };
        var scope;
        var template = '<div style="width:300px"><ldv-barchart ldv-data-set="data"></ldv-barchart></div>';
        var defaultDataSet;
        var getDirective;
        var onclickFuncObj;
        beforeEach(function () { angular.mock.module('lastFMDataVisApp'); });
        beforeEach(inject(function ($compile, $rootScope) {
            getDirective = function (data) {
                onclickFuncObj = {
                    onclick: function (label) { }
                };
                spyOn(onclickFuncObj, 'onclick');
                defaultDataSet = [
                    { label: 'point1', value: 35, onclick: function () { return onclickFuncObj.onclick('point1'); } },
                    { label: 'point2', value: 50, onclick: function () { return onclickFuncObj.onclick('point2'); } },
                    { label: 'point3', value: 3, onclick: function () { return onclickFuncObj.onclick('point3'); } }
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
        it('should map the onclick event to each bar', function () {
            var ele = getDirective();
            var bars = ele.find('.bar');
            expect(onclickFuncObj.onclick).not.toHaveBeenCalled();
            d3Click($(bars[0]));
            expect(onclickFuncObj.onclick).toHaveBeenCalledWith(defaultDataSet[0].label);
            expect(onclickFuncObj.onclick).toHaveBeenCalledTimes(1);
            d3Click($(bars[1]));
            expect(onclickFuncObj.onclick).toHaveBeenCalledWith(defaultDataSet[1].label);
            expect(onclickFuncObj.onclick).toHaveBeenCalledTimes(2);
            d3Click($(bars[1]));
            expect(onclickFuncObj.onclick).toHaveBeenCalledWith(defaultDataSet[1].label);
            expect(onclickFuncObj.onclick).toHaveBeenCalledTimes(3);
        });
    });
});
//# sourceMappingURL=barchart.directive.spec.js.map