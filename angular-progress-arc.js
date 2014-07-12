(function (angular) {

    'use strict';

    var polarToCartesian = function (x, y, radius, radians) {
        return [
            x + radius * Math.cos(radians),
            y + radius * Math.sin(radians)
        ];
    };

    var decimalToRadian = function (decimal) {
        return (decimal * Math.PI * 2);
    };

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
    var ANGLE_MAX = decimalToRadian(0.99);

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
            link: function (scope, element, attr) {

                scope.getDescription = function () {

                    var progress = scope.progress();

                    if (progress <= 0.0) {
                        return 'M 0 0'; // Empty string causes error on Chrome.
                    }

                    var center = scope.size / 2;

                    // Cap stroke width so that it's not larger than the radius.
                    scope.strokeWidth = Math.min(scope.strokeWidth, scope.size / 2);

                    // -1 from radius to prevent clipping edge of svg element.
                    var radius = (scope.size - scope.strokeWidth) / 2 - 1;

                    var startPoint = polarToCartesian(center, center, radius, ANGLE_OFFSET);

                    var largeArc = progress > 0.5 ? 1 : 0;

                    var counterClockwise = resolveBoolean(scope.counterClockwise);

                    var angle = progress >= 1.0 ? ANGLE_MAX : decimalToRadian(progress);
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

                    // A complete circle is not possible with a path and a single
                    // arc call. So an additional arc is created here to join back
                    // to the initial point.
                    if (progress >= 1.0) {
                        d = d.concat([
                            'A', radius, radius, 0, 0, counterClockwise ? 0 : 1, startPoint[0], startPoint[1]
                        ]);
                    }

                    return d.join(' ');
                };
            },
            template:
                '<svg ng-attr-width="{{ size }}" ng-attr-height="{{ size }}">' +
                    '<path fill="none" ng-attr-stroke="{{ stroke }}" ng-attr-stroke-width="{{ strokeWidth }}" ng-attr-d="{{ getDescription() }}">' +
                '</svg>'
        };
    });

})(window.angular);
