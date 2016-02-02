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
                        //if the dataSet is undefined, return
                        if (!dataSet) {
                            return;
                        }
                        //TODO: move to binding
                        var unit = 'plays';
                        //TODO: define these settings elsewhere?
                        var margin = { top: 2, left: 2, right: 2, bottom: 2 };
                        var barHeight = 20;
                        //TODO! get width
                        var chartWidth = 200 - margin.left - margin.right;
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
                        //TODO: yscale and axis
                        //axes
                        var xAxis = d3.svg.axis()
                            .scale(xScale)
                            .orient('bottom')
                            .ticks(10, unit);
                        //render bars
                        //update
                        var bars = chartEle.selectAll('.bar')
                            .data(dataSet)
                            .on('click', function (d) { return d.onclick; })
                            .attr('width', function (d) { return xScale(d.value); });
                        //TODO: do y location via scales, not directly via pixels
                        //TODO: different colour for each bar
                        bars.enter().append('rect')
                            .text(function (d) { return d.label; })
                            .on('click', function (d) { return d.onclick; })
                            .attr('class', 'bar')
                            .attr('height', barHeight)
                            .attr('x', 0)
                            .attr('y', function (d, i) { return barHeight * i; })
                            .attr('width', function (d) { return xScale(d.value); });
                        bars.exit().remove();
                        var barLabels = chartEle.selectAll('.bar-label')
                            .data(dataSet)
                            .text(function (d) { return d.label; });
                        barLabels.enter().append('text')
                            .text(function (d) { return d.label; })
                            .attr('class', 'bar-label')
                            .attr('height', barHeight)
                            .attr('x', 0)
                            .attr('y', function (d, i) {
                            return barHeight * i;
                        })
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