describe('progressArc', function() {
    'use strict';

    beforeEach(module('angular-progress-arc'));

    var $compile;
    var $rootScope;
    var $httpBackend;
    beforeEach(inject(function(_$compile_, _$rootScope_, _$httpBackend_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;
        $httpBackend = _$httpBackend_;
    }));

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should inject an svg with the children', function() {
        var $scope = $rootScope.$new();
        var element = $compile('<progress-arc></progress-arc>')($scope);
        $rootScope.$digest();
        expect(element[0].getElementsByTagName('svg').length).toEqual(1);
        expect(element[0].getElementsByTagName('circle').length).toEqual(1);
    });

    it('should display the background circle if the background attr is provided', function() {
        var $scope = $rootScope.$new();
        var element = $compile('<progress-arc background="\'black\'"></progress-arc>')($scope);
        $rootScope.$digest();
        expect(element[0].getElementsByTagName('svg').length).toEqual(1);
        expect(element[0].getElementsByTagName('circle').length).toEqual(2);
    });

    it('should update the stroke-dashoffset when complete is updated', function() {
        var $scope = $rootScope.$new();
        $scope.complete = 0.5;
        var element = $compile('<progress-arc complete="complete"></progress-arc>')($scope);
        $rootScope.$digest();
        var circle = angular.element(element[0].getElementsByTagName('circle'));
        expect(parseFloat(circle.attr('stroke-dashoffset'))).toBeGreaterThan(279.0);

        $scope.complete = 1.0;
        $rootScope.$digest();
        circle = angular.element(element[0].getElementsByTagName('circle'));
        expect(circle.attr('stroke-dashoffset')).toEqual('0');
    });
});

