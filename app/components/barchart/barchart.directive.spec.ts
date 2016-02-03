
import IBarchartScope = LastFMDataVis.Barchart.IBarchartScope;
import IDatapoint = LastFMDataVis.Barchart.IDatapoint;
import IDirective = angular.IDirective;
import IAugmentedJQuery = angular.IAugmentedJQuery;

describe('LastFMDataVis',() => {


    describe('barchart directive', ()=> {

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
        var defaultDataSet : IDatapoint[];
        var getDirective: (data?: IDatapoint[]) => IAugmentedJQuery;
        var onclickFuncObj;

        beforeEach(()=>{angular.mock.module('lastFMDataVisApp')});

        beforeEach(inject(($compile, $rootScope)=> {

            getDirective = ( data?:IDatapoint[])=> {

                onclickFuncObj ={
                    onclick : (label:string) => {}
                };

                spyOn(onclickFuncObj, 'onclick');

                defaultDataSet = [
                    {label: 'point1', value: 35, onclick: ()=>onclickFuncObj.onclick('point1')},
                    {label: 'point2', value: 50, onclick: ()=>onclickFuncObj.onclick('point2')},
                    {label: 'point3', value: 3, onclick: ()=>onclickFuncObj.onclick('point3')}
                ];

                scope = $rootScope.$new();

                scope.data = data || defaultDataSet;

                var element =  $compile(template)(scope);

                return element;
            };
        }));

        it('should show a bar per datapoint', () => {
            var ele : IAugmentedJQuery = getDirective();
            expect(ele.find('.bar').length).toBe(defaultDataSet.length);
        });

        it('should have bars proportional to the datapoint\'s value', ()=>{
            //check it's not a trivial case
            expect(defaultDataSet[0].value).not.toBe(defaultDataSet[1].value);

            var ele : IAugmentedJQuery = getDirective();
            var bars = ele.find('.bar');
            //ratio between two bar widths and two data values should be same
            expect(parseFloat(bars[0].getAttribute('width'))/parseFloat(bars[1].getAttribute('width')))
                .toBe(defaultDataSet[0].value/defaultDataSet[1].value);
        });

        it('should show a label per datapoint', ()=>{
            var ele : IAugmentedJQuery = getDirective();
            expect(ele.find('.bar-label').length).toBe(defaultDataSet.length);
        });

        it('should show the correct label on each bar', ()=>{
            var ele : IAugmentedJQuery = getDirective();
            var labels = ele.find('.bar-label');
            expect(labels[1].textContent).toBe(defaultDataSet[1].label);
        });




        it('should map the onclick event to each bar', ()=>{
            var ele : IAugmentedJQuery = getDirective();
            var bars = ele.find('.bar');
            expect(onclickFuncObj.onclick).not.toHaveBeenCalled();

            d3Click($(<any>bars[0]));
            expect(onclickFuncObj.onclick).toHaveBeenCalledWith(defaultDataSet[0].label);
            expect(onclickFuncObj.onclick).toHaveBeenCalledTimes(1);

            d3Click($(<any>bars[1]));
            expect(onclickFuncObj.onclick).toHaveBeenCalledWith(defaultDataSet[1].label);
            expect(onclickFuncObj.onclick).toHaveBeenCalledTimes(2);

            d3Click($(<any>bars[1]));
            expect(onclickFuncObj.onclick).toHaveBeenCalledWith(defaultDataSet[1].label);
            expect(onclickFuncObj.onclick).toHaveBeenCalledTimes(3);

        });

    });

});