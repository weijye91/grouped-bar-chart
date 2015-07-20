(function() {
    'use strict';
    define([
        'groupedBarChart'
    ], function(groupedBarChart) {
        function createElement(id) {
            var ele = document.createElement('div');
            ele.id = id;
            document.body.appendChild(ele);
        }

        createElement('groupedBarChart');

        // The configuration or settings for the bar chart.
        var config = {};
        config.width = 0;
        config.height = 0;
        config.targetedElementID = '#groupedBarChart'; // Use hashtag # for id.
        config.highlightColor = '#E90E0E';

        var data = {};
        data.chartTitle = 'The Title';
        data.xAxisTitle = 'X Axis Title';
        data.yAxisTitle = 'Y Axis Title';
        data.seriesKeys = ['Series 1', 'Series 2', 'Series 3', 'Series 4', 'Series 5'];
        data.points = [
            {
                x: 2010,
                y: [
                    {
                        series: 'Series 1',
                        data: 58,
                        groupIndex: 0
                    },
                    {
                        series: 'Series 2',
                        data: 43,
                        groupIndex: 0
                    },
                    {
                        series: 'Series 3',
                        data: 89,
                        groupIndex: 0
                    },
                    {
                        series: 'Series 4',
                        data: 76,
                        groupIndex: 0
                    },
                    {
                        series: 'Series 5',
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
                        series: 'Series 1',
                        data: 38,
                        groupIndex: 1
                    },
                    {
                        series: 'Series 2',
                        data: 92,
                        groupIndex: 1
                    },
                    {
                        series: 'Series 3',
                        data: 76,
                        groupIndex: 1
                    },
                    {
                        series: 'Series 4',
                        data: 100,
                        groupIndex: 1
                    },
                    {
                        series: 'Series 5',
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
                        series: 'Series 1',
                        data: 42,
                        groupIndex: 2
                    },
                    {
                        series: 'Series 2',
                        data: 72,
                        groupIndex: 2
                    },
                    {
                        series: 'Series 3',
                        data: 49,
                        groupIndex: 2
                    },
                    {
                        series: 'Series 4',
                        data: 92,
                        groupIndex: 2
                    },
                    {
                        series: 'Series 5',
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
                        series: 'Series 1',
                        data: 38,
                        groupIndex: 3
                    },
                    {
                        series: 'Series 2',
                        data: 92,
                        groupIndex: 3
                    },
                    {
                        series: 'Series 3',
                        data: 76,
                        groupIndex: 3
                    },
                    {
                        series: 'Series 4',
                        data: 100,
                        groupIndex: 3
                    },
                    {
                        series: 'Series 5',
                        data: 90,
                        groupIndex: 3
                    }
                ],
                groupToggle: false
            }
        ];
        
        // Use the component constructor to build the chart.
        var barChart = groupedBarChart(config, data);
        barChart.createLegend();
        barChart.render();

        console.log('Bar chart Width:', barChart.width());
        console.log('Bar chart Height:', barChart.height());

        // Create angular controller for the view.
        angular.module('bar', []);
        var barModule = angular.module('bar');
        var barControllerInterjectables = ['$scope'];
        function barController($scope) {
            var self = this;
        }
        barModule.controller('barController', barControllerInterjectables.concat([barController]));

        return barModule;
    }); // End of define function.
})(); // End of wrapper.