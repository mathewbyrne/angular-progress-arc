(function () {

var TAU = Math.PI * 2;
var ANGLE_OFFSET = -Math.PI / 2;
var ANGLE_MAX = TAU * 0.9;

var polarToCartesian = function (x, y, radius, radians) {
    return [
        x + radius * Math.cos(radians),
        y + radius * Math.sin(radians)
    ];
};

var decimalToRadian = function (decimal) {
    return (decimal * TAU);
};

var app = angular.module('angular-progress-arc', []);

app.directive('progressArc', function () {
    return {
        restrict: 'E',
        scope: {
            width: '@',
            height: '@',
            strokeWidth: '@',
            stroke: '@',
            progress: '@',
            counterClockwise: '@'
        },
        link: function (scope, element, attr) {

            scope.getDescription = function () {

                if (scope.progress <= 0) {
                    return 'M 0 0';
                }

                var centerX = scope.width / 2;
                var centerY = scope.height / 2;
                var minDimension = Math.min(scope.width, scope.height);

                // Cap stroke width so that it's not larger than the radius.
                if (scope.strokeWidth * 2 > minDimension) {
                    scope.strokeWidth = minDimension / 2;
                }

                var radius = (minDimension - scope.strokeWidth) / 2;
                var largeArc = scope.progress > 0.5 ? 1 : 0;
                var p1 = polarToCartesian(centerX, centerY, radius, ANGLE_OFFSET);
                var clockwise = parseInt(scope.counterClockwise) ? 0 : 1;
                var angle = scope.progress >= 1.0
                    ? ANGLE_MAX
                    : decimalToRadian(scope.progress);
                var p2 = polarToCartesian(
                    centerX,
                    centerY,
                    radius,
                    clockwise ? ANGLE_OFFSET + angle : ANGLE_OFFSET - angle
                );

                var d = [
                    'M', p1[0], p1[1],
                    'A', radius, radius, 0, largeArc, clockwise, p2[0], p2[1]
                ];

                // A complete circle is not possible with a path and a single
                // arc call. So an additional arc is created here to join back
                // to the initial point.
                if (scope.progress >= 1.0) {
                    d = d.concat([
                        'A', radius, radius, 0, 0, clockwise, p1[0], p1[1]
                    ]);
                }

                return d.join(' ');
            };
        },
        template:
            '<svg ng-attr-width="{{ width }}" ng-attr-height="{{ height }}">' +
                '<path fill="none" ng-attr-stroke="{{ stroke }}" ng-attr-stroke-width="{{ strokeWidth }}" ng-attr-d="{{ getDescription() }}">' +
            '</svg>'
    };
});

})();
