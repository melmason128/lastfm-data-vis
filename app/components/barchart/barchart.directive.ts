
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


                //TODO: move to binding
                var unit = 'plays';

                //TODO: define these settings elsewhere?
                //Settings
                var margin = {top: 5, left: 20, right: 20, bottom:5};
                var barHeight = 25;
                var xAxisLabelWidth = 120;
                var xAxisHeight = 35;
                //Fallback in case width is undefined. Only seems to happen in testing
                var defaultWidth = 300;
                var minimumWidth = 100;

                //colours
                var colour = d3.scale.category20();


                var render = (dataSet : IDatapoint[]) => {

                    //if the dataSet is undefined or empty, return
                    if (!dataSet || dataSet.length ===0){
                        return;
                    }

                    var svgEleWidth = parseFloat(svgEle.style('width'));
                    if (isNaN(svgEleWidth)){
                        svgEleWidth = defaultWidth;
                    }
                    var chartWidth = Math.max(minimumWidth, svgEleWidth - margin.left - margin.right);
                    var totalBarsHeight = barHeight*dataSet.length;
                    var chartHeight = totalBarsHeight + xAxisHeight;

                    var chartEle = svgEle
                        .attr('height', chartHeight + margin.top + margin.bottom)
                        .attr('width', chartWidth + margin.left + margin.right)
                        .append('g')
                        .attr('transform', `translate(${margin.left},${margin.top})`);

                    //scales
                    var xScale = d3.scale.linear()
                        .domain([0, d3.max(dataSet, (d)=>d.value)])
                        .range([0, chartWidth]);

                    var yScale = d3.scale.ordinal()
                        .domain(dataSet.map((d)=>d.label))
                        .rangeRoundBands([0,totalBarsHeight],0);

                    //axes
                    var xAxis = d3.svg.axis()
                        .scale(xScale)
                    .orient('bottom')
                    .ticks(Math.max(2, Math.round(chartWidth/xAxisLabelWidth)));

                    chartEle.append("g")
                        .attr("class", "x-axis axis")
                        .attr("transform", `translate(0,${totalBarsHeight})`)
                        .call(xAxis);


                    var yAxis = d3.svg.axis()
                        .scale(yScale)
                        .orient('left')
                        .tickFormat('')
                        .ticks(0);

                    chartEle.append("g")
                        .attr("class", "y-axis axis")
                        .call(yAxis);



                    //render bars
                    //update
                    var bars = chartEle.selectAll('.bar')
                        .data(dataSet)
                        .on('click', (d:IDatapoint)=>d.onclick())
                        .attr('width',(d:IDatapoint)=>xScale(d.value));

                    bars.enter().append('rect')
                            .attr('width',(d:IDatapoint)=> xScale(d.value))
                            .on('click', (d:IDatapoint)=>d.onclick())
                            .attr('class','bar')
                            .attr('height',yScale.rangeBand())
                            .attr('x', 0)
                            .attr('y', (d) => yScale(d.label))
                            .attr('fill',(d)=> colour(d.label));

                    bars.exit().remove();

                    var barLabels = chartEle.selectAll('.bar-label')
                        .data(dataSet)
                        .on('click', (d:IDatapoint)=>d.onclick())
                        .text((d: IDatapoint)=>d.label);

                    barLabels.enter().append('text')
                        .text((d: IDatapoint)=>d.label)
                        .on('click', (d:IDatapoint)=>d.onclick())
                        .attr('class','bar-label')
                        .attr('height',yScale.rangeBand())
                        .attr('x', 0)
                        .attr('y', (d) => yScale(d.label))
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