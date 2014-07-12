(function (angular) {

    'use strict';

    /**
     * Converts a polar coordinate into a pair of cartesian points.
     * @param {number} x
     * @param {number} y
     * @param {number} radius
     * @param {number} radians
     * @returns {*[]}
     */
    var polarToCartesian = function (x, y, radius, radians) {
        return [
            x + radius * Math.cos(radians),
            y + radius * Math.sin(radians)
        ];
    };

    /**
     * Converts a float values between 0 and 1 to radians between 0 and 2π
     * @param {number} float
     * @returns {number}
     */
    var floatToRadians = function (float) {
        return (float * Math.PI * 2);
    };

    /**
     * Converts a string into a boolean value if the lowercased string equals
     * a truthy value.
     * @param {string} input
     * @returns {boolean}
     */
    var resolveBoolean = function (input) {
        input = input.toLowerCase();
        var truthValues = ['true', 'yes', '1'];
        for (var i = 0; i < truthValues.length; i++) {
            if (truthValues[i] === input) {
                return true;
            }
        }
        return false;
    };

    var ANGLE_OFFSET = -Math.PI / 2;
    var ANGLE_MAX = floatToRadians(0.99);

    /**
     * Generates a string that describes how to draw an SVG arc. Suitable for
     * binding to the d attribute of an SVG path element.
     * @param {number,string} size width & height of the drawing area.
     * @param {number,string} strokeWidth width of the arc.
     * @param {number} progress value between 0.0 and 1.0 to indicate arc progress.
     * @param {boolean} counterClockwise set true to draw counter-clockwise
     * @returns {string}
     */
    var getPathDescription = function (size, strokeWidth, progress, counterClockwise) {

        // Cap stroke width so that it's not larger than the radius.
        size = parseInt(size);
        strokeWidth = Math.min(parseInt(strokeWidth), size / 2);

        if (progress <= 0.0) {
            return 'M 0 0'; // Empty string causes error on Chrome.
        }

        var center = size / 2;

        // -1 from radius to prevent clipping edge of svg element.
        var radius = (size - strokeWidth) / 2 - 1;

        var startPoint = polarToCartesian(center, center, radius, ANGLE_OFFSET);

        var largeArc = progress > 0.5 ? 1 : 0;

        var angle = progress >= 1.0 ? ANGLE_MAX : floatToRadians(progress);
        var endPoint = polarToCartesian(
            center,
            center,
            radius,
            counterClockwise ? ANGLE_OFFSET - angle : ANGLE_OFFSET + angle
        );

        var d = [
            'M', startPoint[0], startPoint[1],
            'A', radius, radius, 0, largeArc, counterClockwise ? 0 : 1, endPoint[0], endPoint[1]
        ];

        // A complete circle is not possible with a path and a single arc call.
        // So an additional arc is created here to join back to the initial point.
        if (progress >= 1.0) {
            d = d.concat([
                'A', radius, radius, 0, 0, counterClockwise ? 0 : 1, startPoint[0], startPoint[1]
            ]);
        }

        return d.join(' ');
    };

    var defaults = {
        size: 200,
        strokeWidth: 20,
        stroke: 'black'
    };

    var app = angular.module('angular-progress-arc', []);
    app.directive('progressArc', function () {
        return {
            restrict: 'E',
            scope: {
                size:             '@', // Size of element in pixels.
                strokeWidth:      '@', // Width of progress arc stroke.
                stroke:           '@', // Color/appearance of stroke.
                counterClockwise: '@', // Boolean value indicating
                progress:         '&'  // Expression evaluating to float [0.0, 1.0]
            },
            compile: function (element, attr) {

                // Resolve default values.
                angular.forEach(defaults, function (value, key) {
                    if (!attr[key]) {
                        attr[key] = value;
                    }
                });

                return function (scope, element, attr) {
                    scope.getDescription = function () {
                        return getPathDescription(scope.size, scope.strokeWidth, scope.progress(), resolveBoolean(scope.counterClockwise));
                    };
                };
            },
            template:
                '<svg ng-attr-width="{{ size }}" ng-attr-height="{{ size }}">' +
                    '<path fill="none" ng-attr-stroke="{{ stroke }}" ng-attr-stroke-width="{{ strokeWidth }}" ng-attr-d="{{ getDescription() }}">' +
                '</svg>'
        };
    });

})(window.angular);
