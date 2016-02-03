var LastFMDataVis;
(function (LastFMDataVis) {
    var Barchart;
    (function (Barchart) {
        //TODO: consider adding D3 as dependency service
        angular.module('lastFMDataVisApp.barchart', [])
            .directive('ldvBarchart', function () { return barchartDirective(); });
        function barchartDirective() {
            return {
                restrict: 'E',
                scope: {
                    dataSet: '=ldvDataSet'
                },
                link: function (scope, element, attrs) {
                    //TODO: check I'm selecting correct element
                    //TODO: check type
                    var svgEle = d3.select(element[0])
                        .append('svg');
                    //TODO can this be moved to css?
                    svgEle.style('width', '100%');
                    var render = function (dataSet) {
                        //if the dataSet is undefined or empty, return
                        if (!dataSet || dataSet.length === 0) {
                            return;
                        }
                        //TODO: move to binding
                        var unit = 'plays';
                        //TODO: define these settings elsewhere?
                        //Settings
                        var margin = { top: 5, left: 20, right: 20, bottom: 5 };
                        var barHeight = 20;
                        var defaultWidth = 300;
                        var minimumWidth = 100;
                        //TODO: error handling when width is < margins
                        var svgEleWidth = parseFloat(svgEle.style('width'));
                        //Fallback in case width is undefined. Only seems to happen in testing
                        if (isNaN(svgEleWidth)) {
                            svgEleWidth = defaultWidth;
                        }
                        var chartWidth = Math.max(minimumWidth, svgEleWidth - margin.left - margin.right);
                        //TODO: include axis height?
                        var chartHeight = barHeight * dataSet.length;
                        var chartEle = svgEle
                            .attr('height', chartHeight + margin.top + margin.bottom)
                            .attr('width', chartWidth + margin.left + margin.right)
                            .append('g')
                            .attr('transform', "translate(" + margin.left + "," + margin.top + ")");
                        //scales
                        var xScale = d3.scale.linear()
                            .domain([0, d3.max(dataSet, function (d) { return d.value; })])
                            .range([0, chartWidth]);
                        var yScale = d3.scale.ordinal()
                            .domain(dataSet.map(function (d) { return d.label; }))
                            .rangeRoundBands([0, chartHeight], 0.1);
                        //axes
                        //TODO: add to chart
                        var xAxis = d3.svg.axis()
                            .scale(xScale)
                            .orient('bottom')
                            .ticks(10, unit);
                        //TODO: yAxis?
                        //render bars
                        //update
                        var bars = chartEle.selectAll('.bar')
                            .data(dataSet)
                            .on('click', function (d) { return d.onclick; })
                            .attr('width', function (d) { return xScale(d.value); });
                        //TODO: different colour for each bar
                        bars.enter().append('rect')
                            .text(function (d) { return d.label; })
                            .on('click', function (d) { return d.onclick; })
                            .attr('class', 'bar')
                            .attr('height', yScale.rangeBand())
                            .attr('x', 0)
                            .attr('y', function (d) { return yScale(d.label); })
                            .attr('width', function (d) { return xScale(d.value); });
                        bars.exit().remove();
                        var barLabels = chartEle.selectAll('.bar-label')
                            .data(dataSet)
                            .text(function (d) { return d.label; });
                        barLabels.enter().append('text')
                            .text(function (d) { return d.label; })
                            .attr('class', 'bar-label')
                            .attr('height', yScale.rangeBand())
                            .attr('x', 0)
                            .attr('y', function (d) { return yScale(d.label); })
                            .attr("dy", "1em");
                        barLabels.exit().remove();
                    };
                    render(scope.dataSet);
                    //TODO: watch window resize
                    scope.$watchCollection(function (s) { return s.dataSet; }, function (newVal, oldVal) {
                        render(newVal);
                    });
                }
            };
        }
        Barchart.barchartDirective = barchartDirective;
    })(Barchart = LastFMDataVis.Barchart || (LastFMDataVis.Barchart = {}));
})(LastFMDataVis || (LastFMDataVis = {}));
//# sourceMappingURL=barchart.directive.js.map