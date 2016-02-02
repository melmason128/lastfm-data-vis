
module LastFMDataVis.Barchart{

    //TODO: consider adding D3 as dependency service

    angular.module('lastFMDataVisApp.barchart', [])
        //prefix avoids name collisions
    .directive('ldvBarchart', () => barchartDirective());

    export interface IBarchartScope extends ng.IScope{
        dataSet: IDatapoint[];
    }

    export interface IDatapoint {
        label: string;
        value: number;
        onclick?: ()=>void;
    }

    export function barchartDirective() :ng.IDirective
    {
        return {
            restrict: 'E',
            scope: {
                dataSet: '=ldvDataSet'
            },
            link: (scope : IBarchartScope, element, attrs) => {

                //TODO: check I'm selecting correct element
                //TODO: check type
                var svgEle = d3.select(element[0])
                                .append('svg');

                //TODO can this be moved to css?
                svgEle.style('width','100%');


                var render = (dataSet : IDatapoint[]) => {

                    //if the dataSet is undefined, return
                    if (!dataSet){
                        return;
                    }

                    //TODO: move to binding
                    var unit = 'plays';

                    //TODO: define these settings elsewhere?
                    var margin = {top: 2, left: 2, right: 2, bottom:2};
                    var barHeight = 20;
                    //TODO! get width
                    var chartWidth = 200 - margin.left - margin.right;
                    //TODO: include axis height?
                    var chartHeight = barHeight*dataSet.length;

                    var chartEle = svgEle
                        .attr('height', chartHeight + margin.top + margin.bottom)
                        .attr('width', chartWidth + margin.left + margin.right)
                        .append('g')
                        .attr('transform', `translate(${margin.left},${margin.top})`);

                    //scales
                    var xScale = d3.scale.linear()
                        .domain([0, d3.max(dataSet, (d)=>d.value)])
                        .range([0,chartWidth]);

                    //TODO: yscale and axis

                    //axes
                    var xAxis = d3.svg.axis()
                        .scale(xScale)
                    .orient('bottom')
                    .ticks(10,unit);

                    //render bars
                    //update
                    var bars = chartEle.selectAll('.bar')
                        .data(dataSet)
                        .on('click', (d:IDatapoint)=>d.onclick)
                        .attr('width',(d:IDatapoint)=>xScale(d.value));

                    //TODO: do y location via scales, not directly via pixels
                    //TODO: different colour for each bar
                    bars.enter().append('rect')
                            .text((d: IDatapoint)=>d.label)
                            .on('click', (d:IDatapoint)=>d.onclick)
                            .attr('class','bar')
                            .attr('height',barHeight)
                            .attr('x', 0)
                            .attr('y', (d,i) => barHeight * i)
                            .attr('width',(d:IDatapoint)=>xScale(d.value));
                    bars.exit().remove();

                    var barLabels = chartEle.selectAll('.bar-label')
                        .data(dataSet)
                        .text((d: IDatapoint)=>d.label);

                    barLabels.enter().append('text')
                        .text((d: IDatapoint)=>d.label)
                        .attr('class','bar-label')
                        .attr('height',barHeight)
                        .attr('x', 0)
                        .attr('y', function(d,i) {
                            return barHeight * i;
                        })
                        .attr("dy", "1em")
                    barLabels.exit().remove();
                };

                render(scope.dataSet);

                //TODO: watch window resize

                scope.$watchCollection((s :IBarchartScope)=>s.dataSet, (newVal,oldVal)=>{
                    render(newVal);
                });

            }
        };
    }

}