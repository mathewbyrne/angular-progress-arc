(function () {

var polarToCartesian = function (x, y, radius, radians) {
    return [
        x + radius * Math.cos(radians),
        y + radius * Math.sin(radians)
    ];
};

var decimalToRadian = function (decimal) {
    return (decimal * 2 * Math.PI) - (Math.PI / 2);
};

var app = angular.module('angular-progress-arc', []);

app.directive('progressArc', function () {
    return {
        restrict: 'E',
        scope: {
            width:       '@',
            height:      '@',
            strokeWidth: '@',
            stroke:      '@',
            progress:    '@'
        },
        link: function (scope, element, attr) {

            if (!scope.strokeWidth) {
                scope.strokeWidth = 10;
            }

            if (!scope.stroke) {
                scope.stroke = 'black';
            }

            scope.getDescription = function () {

                if (scope.progress <= 0) {
                    return '';
                }

                var centerX = scope.width / 2;
                var centerY = scope.height / 2;
                var radius = (Math.min(scope.width, scope.height) - scope.strokeWidth) / 2;
                var largeArc = scope.progress > 0.5 ? 1 : 0;
                var p1 = polarToCartesian(centerX, centerY, radius, decimalToRadian(0));
                var p2 = polarToCartesian(centerX, centerY, radius, decimalToRadian(
                    scope.progress >= 1.0 ? 0.9 : scope.progress
                ));

                var d =[
                    'M', p1[0], p1[1],
                    'A', radius, radius, 0, largeArc, 1, p2[0], p2[1]
                ];

                if (scope.progress >= 1.0) {
                    d = d.concat([
                        'A', radius, radius, 0, 0, 1, p1[0], p1[1]
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
