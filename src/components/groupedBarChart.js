(function() {
    'use strict';

    define([
        'd3'
    ], function(d3) {
        // Constructor function.
        function GroupedBarChart(config, dataModel) {
            // Constant variable. DO NOT OVERWRITE from other place of the code.
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

            function myChart() {
                // TODO: Start plotting the chart here.
            }

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

        } // End of GroupedBarChart constructor function.

        return GroupedBarChart;
    }); // End of define function.
})(); // End of wrapper.
