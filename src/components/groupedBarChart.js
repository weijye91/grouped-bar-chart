(function() {
    'use strict';

    define([
        'd3'
    ], function(d3) {
        // Constructor function.
        function GroupedBarChart(config, dataModel) {
            // Constant variable. DO NOT OVERWRITE from other places within this file.
            var MIN_WIDTH = 800;
            var MIN_HEIGHT = 500;

            // Input validation.
            if (config.width) {
                if (typeof config.width !== 'number') {throw new Error('config.width must be a number.');}
                if (config.width < MIN_WIDTH) {throw new Error('config.width must be ' + MIN_WIDTH + ' at minimum.');}
            }
            if (config.height) {
                if (typeof config.height !== 'number') {throw new Error('config.height must be a number.');}
                if (config.height < MIN_HEIGHT) {throw new Error('config.height must be ' + MIN_HEIGHT + ' at minimum.');}
            }
            if (!config.targetedElementID) {
                throw new Error('config.targetedElementID is undefined.');
            }
            if (config.highlightColor) {
                if (typeof config.highlightColor !== 'string') {throw new Error('config.highlightColor must be a string.');}
            }


            if (!dataModel) {
                throw new Error('Data model is undefined.');
            }

            if (typeof dataModel !== 'object' || Array.isArray(dataModel)) {
                throw new Error('Data model must be a JavaScript object.');
            }

            if (dataModel.chartTitle) {
                if (typeof dataModel.chartTitle !== 'string') {throw new Error('data.chartTitle must be a string.');}
            }

            if (dataModel.xAxisTitle) {
                if (typeof dataModel.xAxisTitle !== 'string') {throw new Error('data.xAxisTitle must be a string.');}
            }

            if (dataModel.yAxisTitle) {
                if (typeof dataModel.yAxisTitle !== 'string') {throw new Error('data.yAxisTitle must be a string.');}
            }

            if (dataModel.seriesKeys) {
                if (!Array.isArray(dataModel.seriesKeys)) {throw new Error('data.seriesKeys must be an array.')}
            }

            // Private variables. Default config value will be used if user does not provide.
            var WIDTH = config.width || 1200;
            var HEIGHT = config.height || 600;
            var PADDING = 80;
            var TARGETED_ELEMENT = config.targetedElementID;
            var COLOR =  config.color || d3.scale.category20();
            var HIGHLIGHT_COLOR = config.highlightColor || '#E90E0E';
            var svg;
            var legend;
            var data = dataModel;
            var x0, x1, y;
            var xAxis, yAxis;
            var hasLegend = false;

            // Render the chart for the first time when this chart constructor is being called.
            myChart();

            function myChart() {
                // TODO: Start plotting the chart here.
                render();
            }

            /***********************************************************
             * Private functions.
             **********************************************************/
            function constructSvg() {
                return d3.select(TARGETED_ELEMENT)
                    .append("svg")
                    .attr("class", "svg")
                    .attr("width", WIDTH)
                    .attr("height", HEIGHT);
            }

            function drawChartContainer(svg) {
                svg.append("rect")
                    .attr("fill", "grey")
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("width", WIDTH) // Margin left + margin right.
                    .attr("height", HEIGHT)// Margin top + margin bottom.
                    .attr("fill-opacity", 0.1);
            }

            function drawChartBorder(svg) {
                return svg.append("g")
                    .attr("transform", "translate(" + 20 + "," + 0 + ")")
                    .style("width", WIDTH)
                    .style("height", HEIGHT);

            }

            function createChartTitle(svg, data) {
                svg.append("text")
                    .attr("x", WIDTH / 2)
                    //.attr("y", padding)
                    .attr("y", 30)
                    .attr("text-anchor", "middle")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "20px")
                    .attr("font-weight", "bold")
                    .attr("fill", "purple")
                    .text(data.chartTitle);
            }

            function createScales(width, height, padding) {
                var x0 = d3.scale.ordinal()
                    .rangeRoundBands([0 + padding, width - padding], 0.3);
                var x1 = d3.scale.ordinal();
                var y = d3.scale.linear()
                    .range([height - padding, 0 + padding]);

                return [x0, x1, y];
            }

            function constructXScale(x0, x1, data) {
                var xAxis = d3.svg.axis()
                    .scale(x0)
                    .orient("bottom");

                // Define a list of x ordinal data in x-axis.
                x0.domain(data.points.map(function (d) {
                    return d.x;
                }));
                // D3 function .rangeBand() return the length of a chunk splitted from the axis depending on scaling.
                x1.domain(data.seriesKeys).rangeRoundBands([0, x0.rangeBand()]);

                return xAxis;
            }

            function constructYScale(y, data) {
                var yAxis = d3.svg.axis()
                    .scale(y)
                    .orient("left");

                // The data of each series is 2 level deep (a list in a list). So we need to use nested d3.min() function to get the lowest numeric data among all series.
                var yMin = d3.min(data.points, function (d) {
                    return d3.min(d.y, function (d) {
                        return d.data;
                    });
                });
                var yMax = d3.max(data.points, function (d) {
                    return d3.max(d.y, function (d) {
                        return d.data;
                    });
                });

                // TODO: Currently we force the yAxis to scale start from zero. In the future try to enhance this to a minimum scale set by user.
                //if (yMin > 0) {
                yMin = 0;
                //}

                // Set the data to do scaling.
                y.domain([yMin, yMax]);

                return yAxis;
            }

            function groupInit(x0, xPos, svg, data, padding) {
                var group = svg.selectAll(".group")
                    .data(data.points)
                    .enter().append("g")
                    .attr("class", "group")
                    .attr("transform", function (d) {
                        xPos.push(x0(d.x));
                        return "translate(" + x0(d.x) + "," + (-0 - padding) + ")";
                    });

                return [group, xPos];
            }

            function drawBars(group, svg, data, x1, y, xPos, padding) {
                group.selectAll("rect")
                    .data(function (d) {
                        return d.y;
                    })
                    .enter().append("rect")
                    .attr("class", "bar")
                    .attr("data-group-index", function (d) {
                        return d.groupIndex;
                    })
                    .attr("data-series", function (d) {
                        return d.series;
                    })
                    .attr("width", x1.rangeBand())
                    .attr("x", function (d) {
                        return x1(d.series);
                    })
                    .attr("y", function (d) {
                        return y(d.data) + padding;
                    })
                    .attr("height", function (d) {
                        return HEIGHT - y(d.data) - padding;
                    })
                    .style("fill", function (d) {
                        return COLOR(d.series);
                    })
                    .on("mouseover", function (d) {
                        highlightBar(this, data, HIGHLIGHT_COLOR);
                        createToolTipLabel(svg, x1, d, this, xPos);
                    })
                    .on("mouseout", function (d) {
                        dehighlightBar(d, data, this, HIGHLIGHT_COLOR);
                    })
                    .on("click", function () {
                        mouseClickedHandler(data, COLOR, this, group, HIGHLIGHT_COLOR);
                    });
            }

            function constructXAxis(svg, xAxis, height, width, data, padding) {
                svg.append("g")
                    .attr("class", "x axis")
                    .attr("transform", "translate(0," + (height - padding) + ")")
                    .style({ "stroke": "Black", "fill": "None", "stroke-width": "1"})
                    .call(xAxis)
                    .append("text")
                    .attr("x", width / 2)
                    .attr("y", 40)
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "13px")
                    .attr("font-weight", "bold")
                    .style({ 'fill': 'Black', "stroke-width": "0px"})
                    .attr("fill", "Black")
                    .text(data.xAxisTitle);
            }

            function constructYAxis(svg, yAxis, height, data, padding) {
                svg.append("g")
                    .attr("class", "y axis")
                    .style({ "stroke": "Black", "fill": "None", "stroke-width": "1px"})
                    .attr("transform", "translate(" + padding + ", 0)")
                    .call(yAxis)
                    .append("text")
                    .attr("x", height / 2 * -1)
                    .attr("y", -55)
                    .attr("transform", "rotate(-90)")
                    .attr("text-anchor", "middle")
                    .attr("dy", "1.1em")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "13px")
                    .attr("font-weight", "bold")
                    .style({ 'fill': 'Black', "stroke-width": "0px"})
                    .text(data.yAxisTitle);
            }

            function legendInit(svg, data) {
                return svg.selectAll(".legend")
                    .data(data.seriesKeys)
                    // Use this function if you want to filter some of the series key from the list.
                    //.data(data.seriesKeys.slice())
                    .enter().append("g")
                    .attr("class", "legend")
                    .attr("transform", function (d, i) {
                        return "translate(0," + i * 25 + ")";
                        //return "translate(" + width/2 + "," + i * 20 + ")";
                    }); // Variable i here will return the index number of "d" list.
            }

            function drawLegendBoxes(legend) {
                legend.append("rect")
                    .attr("x", WIDTH - 120)
                    .attr("y", 5)
                    .attr("width", 20)
                    .attr("height", 20)
                    .style("fill", COLOR);
            }

            function createLegendLabel(legend) {
                legend.append("text")
                    .attr("class", "glabel")
                    .attr("x", WIDTH - 94)
                    .attr("y", 13)
                    .attr("dy", "0.5em")
                    .style("text-anchor", "start")
                    .text(function (d) {
                        return d;
                    });
            }

            function highlightBar(unit, data, hightlightColor) {
                var groupIndex = d3.select(unit).attr("data-group-index");

                if (data.points[groupIndex].groupToggle) {
                    d3.select(unit).style("fill", "#FFF227");
                }
                else {
                    d3.select(unit).style("fill", hightlightColor);
                }
            }

            function createToolTipLabel(svg, x1, d, unit, xPos) {
                //Get this bar"s x and y values, then augment for the tooltip.
                var xPosition = xPos[parseFloat(d3.select(unit).attr("data-group-index"))] + parseFloat(d3.select(unit).attr("x")) + parseFloat(x1.rangeBand() / 2);
                var yPosition = parseFloat(d3.select(unit).attr("y")) + -10 - PADDING;

                //Create the tooltip text label.
                svg.append("text")
                    .attr("id", "tooltip")
                    .attr("x", xPosition)
                    .attr("y", yPosition)
                    .attr("text-anchor", "middle")
                    .attr("font-family", "sans-serif")
                    .attr("font-size", "14px")
                    .attr("font-weight", "bold")
                    .text(d.data);
            }

            function dehighlightBar(d, data, unit, groupSelectColor) {
                var groupIndex = d3.select(unit).attr("data-group-index");

                if (data.points[groupIndex].groupToggle) {
                    d3.select(unit)
                        .transition()
                        .duration(120)
                        .style("fill", groupSelectColor);
                }
                else {
                    d3.select(unit)
                        .transition()
                        .duration(120)
                        .style("fill", COLOR(d.series));
                }

                // Remove the tooltip when mouse pointer has exited from the unit area.
                d3.select("#tooltip").remove();
            }

            function highlightGroup(data, unit, groupIndex, hightlightGroupColor) {
                var i;

                for (i = 0; i < data.seriesKeys.length; ++i) {
                    d3.select(unit.parentNode.childNodes[i])
                        //TODO: Enable transition and duration to be passed it through setting.
                        .transition()
                        .duration(800)
                        .style("fill", hightlightGroupColor);
                }
                data.points[groupIndex].groupToggle = true;
                d3.select(unit)
                    .transition()
                    .duration(400)
                    .style("fill", "#FFF227");
            }

            function dehighlightGroup(data, unit, groupIndex) {
                var i;

                for (i = 0; i < data.seriesKeys.length; ++i) {
                    d3.select(unit.parentNode.childNodes[i])
                        //TODO: Enable transition and duration to be passed it through setting.
                        .transition()
                        .duration(400)
                        .style("fill", function (d) {
                            return COLOR(d.series);
                        });
                }
                data.points[groupIndex].groupToggle = false;
            }

            function mouseClickedHandler(data, color, unit, group, hightlightGroupColor) {
                var groupIndex = d3.select(unit).attr("data-group-index");

                if (data.points[groupIndex].groupToggle) {
                    dehighlightGroup(data, unit, groupIndex, hightlightGroupColor);
                    return;
                }

                group.selectAll("rect.bar")
                    .transition()
                    .duration(400)
                    .style("fill", function (d) {
                        return color(d.series);
                    });

                data.points.forEach(function (d) {
                    d.groupToggle = false;
                });

                //if (!data.points[groupIndex].groupToggle) {
                highlightGroup(data, unit, groupIndex, hightlightGroupColor);
                //}
            }

            function render() {
                if(!svg) {
                    // Create a svg with height and width. This svg will be used to plot graphical objects.
                    svg = constructSvg();
                }


                // Construct a grey area (container) that wrap the bar chart.
                drawChartContainer(svg);

                // Plot the chart border.
                svg = drawChartBorder(svg);


                if (data.chartTitle) {
                    createChartTitle(svg, data);
                }

                // Set up the scaling and the ordinal data for the xAxis and yAxis.
                var scales = createScales(WIDTH, HEIGHT, PADDING);
                x0 = scales[0];
                x1 = scales[1];
                y = scales[2];

                if (data.points && data.seriesKeys) {
                    xAxis = constructXScale(x0, x1, data);
                    yAxis = constructYScale(y, data);

                    // This variable is used to keep track of the x position used to translate the group.
                    var xPos = [];
                    var groupObj = groupInit(x0, xPos, svg, data, PADDING);
                    var group = groupObj[0];
                    xPos = groupObj[1];

                    // Draw the bars.
                    drawBars(group, svg, data, x1, y, xPos, PADDING);
                }

                // Construct the x and y axis after the canvas has been drawn to that the axis will appear in front of the canvas.
                if (data.xAxisTitle) {
                    constructXAxis(svg, xAxis, HEIGHT, WIDTH, data, PADDING);
                }

                if (data.yAxisTitle) {
                    constructYAxis(svg, yAxis, HEIGHT, data, PADDING);
                }

                if (hasLegend) {
                    myChart.createLegend();
                }
            }

            /***********************************************************
             * Private functions.
             **********************************************************/
            // Create legend for this chart.
            myChart.createLegend = function() {
                legend = legendInit(svg, data);
                drawLegendBoxes(legend);
                createLegendLabel(legend);
                hasLegend = true;
                return myChart;
            };

            // Delete the legend in this chart.
            myChart.deleteLegend = function() {
                if (!hasLegend) {
                    throw new Error("No legend is found. Cannot delete legend.");
                }

                svg.selectAll(".legend").remove();
                hasLegend = false;
                //myChart.render();
                return myChart;
            };

            // Refresh or redraw the chart. Use this to reflect or update the changes made to the chart.
            myChart.render = function() {
                // Remove everything from the chart before drawing anything.
                svg.selectAll("*").remove();

                render();
                return myChart;
            };

            // Delete the chart.
            myChart.deleteChart = function() {
                d3.select(TARGETED_ELEMENT)
                    .select("svg")
                    .remove();
                return myChart;
            };

            /********************************************************************
             * Chart function members for setting and getting properties value.
             *******************************************************************/

            /**
             * Set or get the chart width.
             * @param {number} value
             * @returns {*}
             */
            myChart.width = function(value) {
                if (!arguments.length) {
                    return WIDTH;
                }

                if (typeof value !== 'number') {throw new Error('Width is not a number.');}
                if (value < MIN_WIDTH) {throw new Error('Width must be ' + MIN_WIDTH +' at minimum.');}

                console.log('Setting width to', value);
                WIDTH = value;

                // TODO: Need to create functions to update the changes.
                //myChart.deleteChart();
                //myChart.render();
                return myChart;
            };

            /**
             * Set or get the chart height.
             * @param {number} value
             * @returns {*}
             */
            myChart.height = function(value) {
                if (!arguments.length) {
                    return HEIGHT;
                }

                if (typeof value !== 'number') {throw new Error('Height is not a number.');}
                if (value < MIN_HEIGHT) {throw new Error('Height must be ' + MIN_HEIGHT + ' at minimum.');}

                console.log('Setting height to', value);
                HEIGHT = value;

                // TODO: Need to create functions to update the changes.
                //myChart.deleteChart();
                //myChart.render();
                return myChart;
            };

            return myChart;
        } // End of GroupedBarChart constructor function.

        return GroupedBarChart;
    }); // End of define function.
})(); // End of wrapper.
