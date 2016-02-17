describe('progressArcDefaults', function() {
    'use strict';

    var progressArcDefaults;
    beforeEach(function() {
        module('angular-progress-arc');
        angular.module('progressArcDefaults', [])
        .config(function(_progressArcDefaults_) {
            progressArcDefaults = _progressArcDefaults_;
        });
        inject();
    });

    it('should set values appropriately', function() {
        progressArcDefaults.setDefault('size', 100);
        var target = {};
        progressArcDefaults(target);
        expect(target.size).toEqual(100);
    });
});
