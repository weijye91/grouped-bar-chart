// This file is ported from my original project for reference.

(function() {
    "use strict";
    define(["wdkMultiSeriesBarChart", "d3"], function(wdkMultiSeriesChart, d3) {
        var fireEvent = function(element, event) {
            var evt;
            var isString = function(it) {
                return typeof it == "string" || it instanceof String;
            };
            element = (isString(element)) ? document.getElementById(element) : element;
            if (document.createEventObject) {
                // dispatch for IE
                evt = document.createEventObject();
                return element.fireEvent('on' + event, evt)
            }
            else {
                // dispatch for firefox + others
                evt = document.createEvent("HTMLEvents");
                evt.initEvent(event, true, true); // event type,bubbling,cancelable
                return !element.dispatchEvent(evt);
            }
        };

        describe("WDK bar config", function() {
            it("should prompt error if the width is invalid", function() {
                var config = {};
                config.targetedElementID = "#test";
                config.width = 10 ;
                expect(function() {wdkMultiSeriesChart(config);}).toThrow(new Error("config.width must be 800 at minimum."));
                config.width = "a string";
                expect(function() {wdkMultiSeriesChart(config);}).toThrow(new Error("config.width must be a number."));
                config.width = [];
                expect(function() {wdkMultiSeriesChart(config);}).toThrow(new Error("config.width must be a number."));
                config.width = {};
                expect(function() {wdkMultiSeriesChart(config);}).toThrow(new Error("config.width must be a number."));
                config.width = function() {};
                expect(function() {wdkMultiSeriesChart(config);}).toThrow(new Error("config.width must be a number."));
                config.width = 799;
                expect(function() {wdkMultiSeriesChart(config);}).toThrow(new Error("config.width must be 800 at minimum."));
            });

            it("should prompt error if the height is invalid", function() {
                var config = {};
                config.targetedElementID = "#test";
                config.height = 10;
                expect(function() {wdkMultiSeriesChart(config);}).toThrow(new Error("config.height must be 400 at minimum."));
                config.height = "a string";
                expect(function() {wdkMultiSeriesChart(config);}).toThrow(new Error("config.height must be a number."));
                config.height = [];
                expect(function() {wdkMultiSeriesChart(config);}).toThrow(new Error("config.height must be a number."));
                config.height = {};
                expect(function() {wdkMultiSeriesChart(config);}).toThrow(new Error("config.height must be a number."));
                config.height = function() {};
                expect(function() {wdkMultiSeriesChart(config);}).toThrow(new Error("config.height must be a number."));
                config.height = 399;
                expect(function() {wdkMultiSeriesChart(config);}).toThrow(new Error("config.height must be 400 at minimum."));
            });

            it("should not prompt any error when the width and height is valid", function() {
                var config = {};
                var data = {};
                config.targetedElementID = "#test";
                config.width = 800;
                expect(function() {wdkMultiSeriesChart(config, data);}).not.toThrow();
                config.height = 400;
                expect(function() {wdkMultiSeriesChart(config, data);}).not.toThrow();
            });

            it("should prompt error if the targetedElementID is undefined", function() {
                var config = {};
                expect(function() {wdkMultiSeriesChart(config);}).toThrow(new Error("config.targetedElementID is undefined."));
            });

            //it("should prompt error if the targetedElementID is invalid", function() {
            //    var config = {};
            //    config.targetedElementID = 123;
            //    expect(function() {wdkMultiSeriesChart(config);}).toThrow(new Error("config.targetedElementID must be a string."));
            //    config.targetedElementID = [];
            //    expect(function() {wdkMultiSeriesChart(config);}).toThrow(new Error("config.targetedElementID must be a string."));
            //    config.targetedElementID = {};
            //    expect(function() {wdkMultiSeriesChart(config);}).toThrow(new Error("config.targetedElementID must be a string."));
            //    config.targetedElementID = function() {};
            //    expect(function() {wdkMultiSeriesChart(config);}).toThrow(new Error("config.targetedElementID must be a string."));
            //});

            it("should prompt error if the highlightColor is invalid", function() {
                var config = {};
                config.targetedElementID = "#test";
                config.highlightColor = 123;
                expect(function() {wdkMultiSeriesChart(config);}).toThrow(new Error("config.highlightColor must be a string."));
                config.highlightColor = {};
                expect(function() {wdkMultiSeriesChart(config);}).toThrow(new Error("config.highlightColor must be a string."));
                config.highlightColor = [];
                expect(function() {wdkMultiSeriesChart(config);}).toThrow(new Error("config.highlightColor must be a string."));
                config.highlightColor = function() {};
                expect(function() {wdkMultiSeriesChart(config);}).toThrow(new Error("config.highlightColor must be a string."));
            });

            it("should use the default settings for width & height if the config is not provided, or, it is zero or null", function() {
                var config = {};
                config.targetedElementID = "#test";
                var data = {};
                var barChart = wdkMultiSeriesChart(config, data);
                expect(barChart.width()).toEqual(1200);
                expect(barChart.height()).toEqual(600);

                config.width = 0;
                config.height = 0;
                var chart = wdkMultiSeriesChart(config, data);
                expect(chart.width()).toEqual(1200);
                expect(chart.height()).toEqual(600);

                config.width = null ;
                config.height = null;
                chart = wdkMultiSeriesChart(config, data);
                expect(chart.width()).toEqual(1200);
                expect(chart.height()).toEqual(600);
            });

            it("should use the default settings for highlight color if the config is not provided, or, it is null", function() {
                var config = {};
                config.targetedElementID = "#test";
                var data = {};
                var barChart = wdkMultiSeriesChart(config, data);
                expect(barChart.highlightColor()).toEqual("#E90E0E");
            });

        });

        describe("WDK bar data model", function() {
            it("should prompt error when data model is undefined", function() {
                var config = {};
                config.targetedElementID = "#test";
                var data;
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("Data model is undefined."));
            });

            it("should prompt error when data model is invalid", function() {
                var config = {};
                config.targetedElementID = "#test";
                var data = 123;
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("Data model must be a JavaScript object."));

                data = [];
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("Data model must be a JavaScript object."));

                data = "123";
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("Data model must be a JavaScript object."));

                data = true;
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("Data model must be a JavaScript object."));

                data = function() {};
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("Data model must be a JavaScript object."));
            });

            it("should prompt error when chart title is invalid type", function() {
                var config = {};
                config.targetedElementID = "#test";
                var data = {};

                data.chartTitle = 123;
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("data.chartTitle must be a string."));

                data.chartTitle = {};
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("data.chartTitle must be a string."));

                data.chartTitle = [];
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("data.chartTitle must be a string."));

                data.chartTitle = true;
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("data.chartTitle must be a string."));

                data.chartTitle = function() {};
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("data.chartTitle must be a string."));
            });

            it("should prompt error when x-axis title is invalid type", function() {
                var config = {};
                config.targetedElementID = "#test";
                var data = {};

                data.xAxisTitle = 123;
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("data.xAxisTitle must be a string."));

                data.xAxisTitle = {};
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("data.xAxisTitle must be a string."));

                data.xAxisTitle = [];
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("data.xAxisTitle must be a string."));

                data.xAxisTitle = true;
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("data.xAxisTitle must be a string."));

                data.xAxisTitle = function() {};
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("data.xAxisTitle must be a string."));
            });

            it("should prompt error when y-axis title is invalid type", function() {
                var config = {};
                config.targetedElementID = "#test";
                var data = {};

                data.yAxisTitle = 123;
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("data.yAxisTitle must be a string."));

                data.yAxisTitle = {};
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("data.yAxisTitle must be a string."));

                data.yAxisTitle = [];
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("data.yAxisTitle must be a string."));

                data.yAxisTitle = true;
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("data.yAxisTitle must be a string."));

                data.yAxisTitle = function() {};
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("data.yAxisTitle must be a string."));
            });

            it("should prompt error when series keys is invalid type", function() {
                var config = {};
                config.targetedElementID = "#test";
                var data = {};

                data.seriesKeys = {};
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("data.seriesKeys must be an array."));

                data.seriesKeys = 123;
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("data.seriesKeys must be an array."));

                data.seriesKeys = "a string";
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("data.seriesKeys must be an array."));

                data.seriesKeys = function() {};
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("data.seriesKeys must be an array."));
            });

            it("should prompt error when data points is invalid", function() {
                var config = {};
                config.targetedElementID = "#test";
                var data = {};

                data.points = {};
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("data.points must be an array."));

                data.points = 123;
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("data.points must be an array."));

                data.points = "a string";
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("data.points must be an array."));

                data.points = function() {};
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("data.points must be an array."));

                // Validate the second level model.
                data.points = [];
                data.points.push(123);
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("data.points must be a JavaScript object."));
                data.points.push("test");
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("data.points must be a JavaScript object."));
                data.points.push([123, 123]);
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("data.points must be a JavaScript object."));
                var func = function() {};
                data.points.push(func);
                expect(function() {wdkMultiSeriesChart(config, data);}).toThrow(new Error("data.points must be a JavaScript object."));
            });

            it("should not prompt error when data points is valid", function() {
                var config = {};
                config.targetedElementID = "#test";
                var data = {};
                data.seriesKeys = ["Series 1", "Series 2"];
                data.points = [
                    {
                        x: 2010,
                        y: [
                            {
                                series: "Series 1",
                                data: 58,
                                groupIndex: 0
                            },
                            {
                                series: "Series 2",
                                data: 43,
                                groupIndex: 0
                            }
                        ],
                        groupToggle: false
                    }
                ];
                expect(function() {wdkMultiSeriesChart(config, data);}).not.toThrow();
            });
        });

        describe("WDK bar setter and getter", function() {
            it("should be able to prompt error when setting invalid height and width", function() {
                var config = {};
                config.targetedElementID = "#test";
                var data = {};
                var chart = wdkMultiSeriesChart(config, data);

                expect(function() {chart.width("123");}).toThrow(new Error("Width is not a number."));
                expect(function() {chart.width(true);}).toThrow(new Error("Width is not a number."));
                expect(function() {chart.width({});}).toThrow(new Error("Width is not a number."));
                expect(function() {chart.width([]);}).toThrow(new Error("Width is not a number."));
                expect(function() {chart.width(function() {});}).toThrow(new Error("Width is not a number."));
                expect(function() {chart.width(700);}).toThrow(new Error("Width must be 800 at minimum."));
                expect(function() {chart.height("123");}).toThrow(new Error("Height is not a number."));
                expect(function() {chart.height(false);}).toThrow(new Error("Height is not a number."));
                expect(function() {chart.height({});}).toThrow(new Error("Height is not a number."));
                expect(function() {chart.height([]);}).toThrow(new Error("Height is not a number."));
                expect(function() {chart.height(function() {});}).toThrow(new Error("Height is not a number."));
                expect(function() {chart.height(200);}).toThrow(new Error("Height must be 400 at minimum."));
            });

            it("should be able to prompt error when setting invalid highlight color", function() {
                var config = {};
                config.targetedElementID = "#test";
                var data = {};
                var chart = wdkMultiSeriesChart(config, data);

                expect(function() {chart.highlightColor(1000);}).toThrow(new Error("highlightColor is not a string."));
                expect(function() {chart.highlightColor(true);}).toThrow(new Error("highlightColor is not a string."));
                expect(function() {chart.highlightColor({});}).toThrow(new Error("highlightColor is not a string."));
                expect(function() {chart.highlightColor([]);}).toThrow(new Error("highlightColor is not a string."));
                expect(function() {chart.highlightColor(function() {});}).toThrow(new Error("highlightColor is not a string."));
            });

            it("should be able to get and set height and width properly.", function() {
                var config = {};
                config.targetedElementID = "#test";
                var data = {};
                var chart = wdkMultiSeriesChart(config, data);

                spyOn(chart, "width").and.callThrough();
                spyOn(chart, "height").and.callThrough();
                chart.width(1000).height(700);

                expect(chart.width).toHaveBeenCalledWith(1000);
                expect(chart.height).toHaveBeenCalledWith(700);
                expect(chart.width()).toEqual(1000);
                expect(chart.height()).toEqual(700);
            });

            it("should be able to get and set highlightColor properly", function() {
                var config = {};
                config.targetedElementID = "#test";
                config.highlightColor = "#E90E0E";
                var data = {};
                var chart = wdkMultiSeriesChart(config, data);
                expect(chart.highlightColor()).toEqual("#E90E0E");
                spyOn(chart, "highlightColor").and.callThrough();
                chart.highlightColor("red");

                expect(chart.highlightColor).toHaveBeenCalledWith("red");
                expect(chart.highlightColor()).toEqual("red");
            });

            it("should be able to get and set data model properly", function() {
                var config = {};
                config.targetedElementID = "#test";
                var data = {};
                data.chartTitle = "The Title";
                data.xAxisTitle = "X Axis Title";
                data.yAxisTitle = "Y Axis Title";
                data.seriesKeys = ["Series 1", "Series 2", "Series 3", "Series 4", "Series 5"];
                data.points = [
                    {
                        x: 2010,
                        y: [
                            {
                                series: "Series 1",
                                data: 58,
                                groupIndex: 0
                            },
                            {
                                series: "Series 2",
                                data: 43,
                                groupIndex: 0
                            },
                            {
                                series: "Series 3",
                                data: 89,
                                groupIndex: 0
                            },
                            {
                                series: "Series 4",
                                data: 76,
                                groupIndex: 0
                            },
                            {
                                series: "Series 5",
                                data: 58,
                                groupIndex: 0
                            }
                        ],
                        groupToggle: false
                    },
                    {
                        x: 2011,
                        y: [
                            {
                                series: "Series 1",
                                data: 38,
                                groupIndex: 1
                            },
                            {
                                series: "Series 2",
                                data: 92,
                                groupIndex: 1
                            },
                            {
                                series: "Series 3",
                                data: 76,
                                groupIndex: 1
                            },
                            {
                                series: "Series 4",
                                data: 100,
                                groupIndex: 1
                            },
                            {
                                series: "Series 5",
                                data: 50,
                                groupIndex: 1
                            }
                        ],
                        groupToggle: false
                    },
                    {
                        x: 2012,
                        y: [
                            {
                                series: "Series 1",
                                data: 42,
                                groupIndex: 2
                            },
                            {
                                series: "Series 2",
                                data: 72,
                                groupIndex: 2
                            },
                            {
                                series: "Series 3",
                                data: 49,
                                groupIndex: 2
                            },
                            {
                                series: "Series 4",
                                data: 92,
                                groupIndex: 2
                            },
                            {
                                series: "Series 5",
                                data: 60,
                                groupIndex: 2
                            }
                        ],
                        groupToggle: false
                    },
                    {
                        x: 2013,
                        y: [
                            {
                                series: "Series 1",
                                data: 38,
                                groupIndex: 3
                            },
                            {
                                series: "Series 2",
                                data: 92,
                                groupIndex: 3
                            },
                            {
                                series: "Series 3",
                                data: 76,
                                groupIndex: 3
                            },
                            {
                                series: "Series 4",
                                data: 100,
                                groupIndex: 3
                            },
                            {
                                series: "Series 5",
                                data: 90,
                                groupIndex: 3
                            }
                        ],
                        groupToggle: false
                    }
                ];
                // Set the data using constructor
                var chart = wdkMultiSeriesChart(config, data);
                expect(chart.data()).toEqual(data);

                // Set new data with setter.
                spyOn(chart, "data").and.callThrough();
                var newData = {};
                data.chartTitle = "New Title";
                data.xAxisTitle = "Test";
                data.yAxisTitle = "Test";
                data.seriesKeys = ["Series 1", "Series 2", "Series 3", "Series 4", "Series 5"];
                chart.data(newData);
                expect(chart.data).toHaveBeenCalledWith(newData);
                expect(chart.data()).toEqual(newData);
            });
        });

        describe("WDK bar api", function() {
            var config, data, ele;
            beforeEach(function() {
                ele = document.createElement("div");
                ele.id = "test";
                document.body.appendChild(ele);

                config = {};
                config.targetedElementID = "#test";
                data = {};
                data.chartTitle = "The Title";
                data.xAxisTitle = "X Axis Title";
                data.yAxisTitle = "Y Axis Title";
                data.seriesKeys = ["Series 1", "Series 2", "Series 3", "Series 4", "Series 5"];
                data.points = [
                    {
                        x: 2010,
                        y: [
                            {
                                series: "Series 1",
                                data: 58,
                                groupIndex: 0
                            },
                            {
                                series: "Series 2",
                                data: 43,
                                groupIndex: 0
                            },
                            {
                                series: "Series 3",
                                data: 89,
                                groupIndex: 0
                            },
                            {
                                series: "Series 4",
                                data: 76,
                                groupIndex: 0
                            },
                            {
                                series: "Series 5",
                                data: 58,
                                groupIndex: 0
                            }
                        ],
                        groupToggle: false
                    },
                    {
                        x: 2011,
                        y: [
                            {
                                series: "Series 1",
                                data: 38,
                                groupIndex: 1
                            },
                            {
                                series: "Series 2",
                                data: 92,
                                groupIndex: 1
                            },
                            {
                                series: "Series 3",
                                data: 76,
                                groupIndex: 1
                            },
                            {
                                series: "Series 4",
                                data: 100,
                                groupIndex: 1
                            },
                            {
                                series: "Series 5",
                                data: 50,
                                groupIndex: 1
                            }
                        ],
                        groupToggle: false
                    },
                    {
                        x: 2012,
                        y: [
                            {
                                series: "Series 1",
                                data: 42,
                                groupIndex: 2
                            },
                            {
                                series: "Series 2",
                                data: 72,
                                groupIndex: 2
                            },
                            {
                                series: "Series 3",
                                data: 49,
                                groupIndex: 2
                            },
                            {
                                series: "Series 4",
                                data: 92,
                                groupIndex: 2
                            },
                            {
                                series: "Series 5",
                                data: 60,
                                groupIndex: 2
                            }
                        ],
                        groupToggle: false
                    },
                    {
                        x: 2013,
                        y: [
                            {
                                series: "Series 1",
                                data: 38,
                                groupIndex: 3
                            },
                            {
                                series: "Series 2",
                                data: 92,
                                groupIndex: 3
                            },
                            {
                                series: "Series 3",
                                data: 76,
                                groupIndex: 3
                            },
                            {
                                series: "Series 4",
                                data: 100,
                                groupIndex: 3
                            },
                            {
                                series: "Series 5",
                                data: 90,
                                groupIndex: 3
                            }
                        ],
                        groupToggle: false
                    }
                ];
            });

            afterEach(function() {
                document.body.removeChild(ele);
                d3.select("#test")
                    .select("svg")
                    .remove();

                config = null;
                data = null;
            });

            it("create legend should perform correctly", function() {
                var chart = wdkMultiSeriesChart(config, data);
                chart.createLegend();

                var legendGroups = d3.select("#test").select("svg").selectAll(".legend")[0];


                expect(legendGroups.parentNode.nodeName).toEqual("svg");
                expect(legendGroups.length).toEqual(5);

                for (var i = 0; i < legendGroups.length; i++) {
                    expect(legendGroups[i].nodeName).toEqual("g");
                    expect(legendGroups[i].className.baseVal).toEqual("legend");
                    expect(legendGroups[i].children.length).toEqual(2);

                    expect(legendGroups[i].children[0].tagName).toEqual("rect");
                    expect(legendGroups[i].children[0].attributes.length).toEqual(5);
                    expect(legendGroups[i].children[0].attributes[0].name).toEqual("x");
                    expect(legendGroups[i].children[0].attributes[1].name).toEqual("y");
                    expect(legendGroups[i].children[0].attributes[2].name).toEqual("width");
                    expect(legendGroups[i].children[0].attributes[3].name).toEqual("height");
                    expect(legendGroups[i].children[0].attributes[4].name).toEqual("style");


                    expect(legendGroups[i].children[1].tagName).toEqual("text");
                    expect(legendGroups[i].children[1].attributes.length).toEqual(5);
                    expect(legendGroups[i].children[1].attributes[0].name).toEqual("class");
                    expect(legendGroups[i].children[1].attributes[1].name).toEqual("x");
                    expect(legendGroups[i].children[1].attributes[2].name).toEqual("y");
                    expect(legendGroups[i].children[1].attributes[3].name).toEqual("dy");
                    expect(legendGroups[i].children[1].attributes[4].name).toEqual("style");
                }

                expect(legendGroups[0].children[0].attributes[0].value).toEqual("1080");
                expect(legendGroups[1].children[0].attributes[0].value).toEqual("1080");
                expect(legendGroups[2].children[0].attributes[0].value).toEqual("1080");
                expect(legendGroups[3].children[0].attributes[0].value).toEqual("1080");

                expect(legendGroups[0].children[0].attributes[1].value).toEqual("5");
                expect(legendGroups[1].children[0].attributes[1].value).toEqual("5");
                expect(legendGroups[2].children[0].attributes[1].value).toEqual("5");
                expect(legendGroups[3].children[0].attributes[1].value).toEqual("5");

                expect(legendGroups[0].children[0].attributes[2].value).toEqual("20");
                expect(legendGroups[1].children[0].attributes[2].value).toEqual("20");
                expect(legendGroups[2].children[0].attributes[2].value).toEqual("20");
                expect(legendGroups[3].children[0].attributes[2].value).toEqual("20");

                expect(legendGroups[0].children[0].attributes[3].value).toEqual("20");
                expect(legendGroups[1].children[0].attributes[3].value).toEqual("20");
                expect(legendGroups[2].children[0].attributes[3].value).toEqual("20");
                expect(legendGroups[3].children[0].attributes[3].value).toEqual("20");

                expect(legendGroups[0].children[0].attributes[4].value).toEqual("fill: rgb(31, 119, 180);");
                expect(legendGroups[1].children[0].attributes[4].value).toEqual("fill: rgb(174, 199, 232);");
                expect(legendGroups[2].children[0].attributes[4].value).toEqual("fill: rgb(255, 127, 14);");
                expect(legendGroups[3].children[0].attributes[4].value).toEqual("fill: rgb(255, 187, 120);");

                expect(legendGroups[0].children[1].attributes[0].value).toEqual("glabel");
                expect(legendGroups[1].children[1].attributes[0].value).toEqual("glabel");
                expect(legendGroups[2].children[1].attributes[0].value).toEqual("glabel");
                expect(legendGroups[3].children[1].attributes[0].value).toEqual("glabel");

                expect(legendGroups[0].children[1].attributes[1].value).toEqual("1106");
                expect(legendGroups[1].children[1].attributes[1].value).toEqual("1106");
                expect(legendGroups[2].children[1].attributes[1].value).toEqual("1106");
                expect(legendGroups[3].children[1].attributes[1].value).toEqual("1106");

                expect(legendGroups[0].children[1].attributes[2].value).toEqual("13");
                expect(legendGroups[1].children[1].attributes[2].value).toEqual("13");
                expect(legendGroups[2].children[1].attributes[2].value).toEqual("13");
                expect(legendGroups[3].children[1].attributes[2].value).toEqual("13");

                expect(legendGroups[0].children[1].attributes[3].value).toEqual("0.5em");
                expect(legendGroups[1].children[1].attributes[3].value).toEqual("0.5em");
                expect(legendGroups[2].children[1].attributes[3].value).toEqual("0.5em");
                expect(legendGroups[3].children[1].attributes[3].value).toEqual("0.5em");

                expect(legendGroups[0].children[1].attributes[4].value).toEqual("text-anchor: start;");
                expect(legendGroups[1].children[1].attributes[4].value).toEqual("text-anchor: start;");
                expect(legendGroups[2].children[1].attributes[4].value).toEqual("text-anchor: start;");
                expect(legendGroups[3].children[1].attributes[4].value).toEqual("text-anchor: start;");
            });

            it("delete legend should prompt error when there is no existing legend to delete", function() {
                var chart = wdkMultiSeriesChart(config, data);
                expect(function() {chart.deleteLegend();}).toThrow(new Error("No legend is found. Cannot delete legend."));
            });

            it("delete legend should perform correctly", function() {
                var chart = wdkMultiSeriesChart(config, data);
                chart.createLegend();
                chart.deleteLegend();
                var legendGroups = d3.select("#test").select("svg").selectAll(".legend")[0];
                expect(legendGroups.length).toEqual(0);
                expect(legendGroups[0]).toBeUndefined();
            });

            it("render and deleteChart should perform correctly", function() {
                var chart = wdkMultiSeriesChart(config, data);
                chart.render();
                var svgNode = d3.select("#test").select("svg")[0];
                var chartHTML_String = '<rect fill="grey" x="0" y="0" width="1200" height="600" fill-opacity="0.1"></rect><g transform="translate(20,0)" style="width: 1200px; height: 600px;"><rect fill="grey" x="0" y="0" width="1200" height="600" fill-opacity="0.1"></rect><g transform="translate(20,0)" style="width: 1200px; height: 600px;"><text x="600" y="30" text-anchor="middle" font-family="sans-serif" font-size="20px" font-weight="bold" fill="purple">The Title</text><g class="group" transform="translate(154,-80)"><rect class="bar" data-group-index="0" data-series="Series 1" width="33" x="2" y="344.8" height="255.2" style="fill: rgb(31, 119, 180);"></rect><rect class="bar" data-group-index="0" data-series="Series 2" width="33" x="35" y="410.8" height="189.2" style="fill: rgb(174, 199, 232);"></rect><rect class="bar" data-group-index="0" data-series="Series 3" width="33" x="68" y="208.4" height="391.6" style="fill: rgb(255, 127, 14);"></rect><rect class="bar" data-group-index="0" data-series="Series 4" width="33" x="101" y="265.6" height="334.4" style="fill: rgb(255, 187, 120);"></rect><rect class="bar" data-group-index="0" data-series="Series 5" width="33" x="134" y="344.8" height="255.2" style="fill: rgb(44, 160, 44);"></rect></g><g class="group" transform="translate(395,-80)"><rect class="bar" data-group-index="1" data-series="Series 1" width="33" x="2" y="432.79999999999995" height="167.20000000000005" style="fill: rgb(31, 119, 180);"></rect><rect class="bar" data-group-index="1" data-series="Series 2" width="33" x="35" y="195.2" height="404.8" style="fill: rgb(174, 199, 232);"></rect><rect class="bar" data-group-index="1" data-series="Series 3" width="33" x="68" y="265.6" height="334.4" style="fill: rgb(255, 127, 14);"></rect><rect class="bar" data-group-index="1" data-series="Series 4" width="33" x="101" y="160" height="440" style="fill: rgb(255, 187, 120);"></rect><rect class="bar" data-group-index="1" data-series="Series 5" width="33" x="134" y="380" height="220" style="fill: rgb(44, 160, 44);"></rect></g><g class="group" transform="translate(636,-80)"><rect class="bar" data-group-index="2" data-series="Series 1" width="33" x="2" y="415.20000000000005" height="184.79999999999995" style="fill: rgb(31, 119, 180);"></rect><rect class="bar" data-group-index="2" data-series="Series 2" width="33" x="35" y="283.20000000000005" height="316.79999999999995" style="fill: rgb(174, 199, 232);"></rect><rect class="bar" data-group-index="2" data-series="Series 3" width="33" x="68" y="384.4" height="215.60000000000002" style="fill: rgb(255, 127, 14);"></rect><rect class="bar" data-group-index="2" data-series="Series 4" width="33" x="101" y="195.2" height="404.8" style="fill: rgb(255, 187, 120);"></rect><rect class="bar" data-group-index="2" data-series="Series 5" width="33" x="134" y="336" height="264" style="fill: rgb(44, 160, 44);"></rect></g><g class="group" transform="translate(877,-80)"><rect class="bar" data-group-index="3" data-series="Series 1" width="33" x="2" y="432.79999999999995" height="167.20000000000005" style="fill: rgb(31, 119, 180);"></rect><rect class="bar" data-group-index="3" data-series="Series 2" width="33" x="35" y="195.2" height="404.8" style="fill: rgb(174, 199, 232);"></rect><rect class="bar" data-group-index="3" data-series="Series 3" width="33" x="68" y="265.6" height="334.4" style="fill: rgb(255, 127, 14);"></rect><rect class="bar" data-group-index="3" data-series="Series 4" width="33" x="101" y="160" height="440" style="fill: rgb(255, 187, 120);"></rect><rect class="bar" data-group-index="3" data-series="Series 5" width="33" x="134" y="204" height="396" style="fill: rgb(44, 160, 44);"></rect></g><g class="x axis" transform="translate(0,520)" style="stroke: rgb(0, 0, 0); fill: none; stroke-width: 1px;"><g class="tick" transform="translate(238.5,0)" style="opacity: 1;"><line y2="6" x2="0"></line><text dy=".71em" y="9" x="0" style="text-anchor: middle;">2010</text></g><g class="tick" transform="translate(479.5,0)" style="opacity: 1;"><line y2="6" x2="0"></line><text dy=".71em" y="9" x="0" style="text-anchor: middle;">2011</text></g><g class="tick" transform="translate(720.5,0)" style="opacity: 1;"><line y2="6" x2="0"></line><text dy=".71em" y="9" x="0" style="text-anchor: middle;">2012</text></g><g class="tick" transform="translate(961.5,0)" style="opacity: 1;"><line y2="6" x2="0"></line><text dy=".71em" y="9" x="0" style="text-anchor: middle;">2013</text></g><path class="domain" d="M80,6V0H1120V6"></path><text x="600" y="40" font-family="sans-serif" font-size="13px" font-weight="bold" fill="Black" style="fill: rgb(0, 0, 0); stroke-width: 0px;">X Axis Title</text></g><g class="y axis" transform="translate(80, 0)" style="stroke: rgb(0, 0, 0); fill: none; stroke-width: 1px;"><g class="tick" transform="translate(0,520)" style="opacity: 1;"><line x2="-6" y2="0"></line><text dy=".32em" x="-9" y="0" style="text-anchor: end;">0</text></g><g class="tick" transform="translate(0,476)" style="opacity: 1;"><line x2="-6" y2="0"></line><text dy=".32em" x="-9" y="0" style="text-anchor: end;">10</text></g><g class="tick" transform="translate(0,432)" style="opacity: 1;"><line x2="-6" y2="0"></line><text dy=".32em" x="-9" y="0" style="text-anchor: end;">20</text></g><g class="tick" transform="translate(0,388)" style="opacity: 1;"><line x2="-6" y2="0"></line><text dy=".32em" x="-9" y="0" style="text-anchor: end;">30</text></g><g class="tick" transform="translate(0,344)" style="opacity: 1;"><line x2="-6" y2="0"></line><text dy=".32em" x="-9" y="0" style="text-anchor: end;">40</text></g><g class="tick" transform="translate(0,300)" style="opacity: 1;"><line x2="-6" y2="0"></line><text dy=".32em" x="-9" y="0" style="text-anchor: end;">50</text></g><g class="tick" transform="translate(0,256)" style="opacity: 1;"><line x2="-6" y2="0"></line><text dy=".32em" x="-9" y="0" style="text-anchor: end;">60</text></g><g class="tick" transform="translate(0,212.00000000000003)" style="opacity: 1;"><line x2="-6" y2="0"></line><text dy=".32em" x="-9" y="0" style="text-anchor: end;">70</text></g><g class="tick" transform="translate(0,167.99999999999997)" style="opacity: 1;"><line x2="-6" y2="0"></line><text dy=".32em" x="-9" y="0" style="text-anchor: end;">80</text></g><g class="tick" transform="translate(0,123.99999999999999)" style="opacity: 1;"><line x2="-6" y2="0"></line><text dy=".32em" x="-9" y="0" style="text-anchor: end;">90</text></g><g class="tick" transform="translate(0,80)" style="opacity: 1;"><line x2="-6" y2="0"></line><text dy=".32em" x="-9" y="0" style="text-anchor: end;">100</text></g><path class="domain" d="M-6,80H0V520H-6"></path><text x="-300" y="-55" transform="rotate(-90)" text-anchor="middle" dy="1.1em" font-family="sans-serif" font-size="13px" font-weight="bold" style="fill: rgb(0, 0, 0); stroke-width: 0px;">Y Axis Title</text></g></g></g>';

                expect(svgNode[0].innerHTML).toEqual(chartHTML_String);
                chart.deleteChart();
                svgNode = d3.select("#test").select("svg")[0];
                expect(svgNode[0]).toEqual(null);
            });

            it("respond to the mouse event correctly", function() {
                // This part is to cover the private functions triggered by events.
                var chart = wdkMultiSeriesChart(config, data);
                chart.createLegend();

                // Select one bar to trigger mouse click event on it.
                //var rect = d3.select("#test").select("svg")[0];
                var rect = d3.select("#test").select("svg").select("g").select("g").selectAll("rect")[0];
                fireEvent(rect[0], "click");
                fireEvent(rect[0], "mouseover");
                fireEvent(rect[0], "mouseout");
                fireEvent(rect[1], "mouseover");
                fireEvent(rect[1], "mouseout");
                fireEvent(rect[0], "click");
                fireEvent(rect[0], "mouseover");
                fireEvent(rect[0], "mouseout");
                fireEvent(rect[1], "mouseover");
                fireEvent(rect[1], "mouseout");
                chart.deleteLegend();
                chart.createLegend();
                chart.render();

                rect = d3.select("#test").select("svg").select("g").select("g").selectAll("rect")[0];
            });
        });
    });

})();
