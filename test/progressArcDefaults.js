describe('progressArcDefaults', function() {
    'use strict';

    beforeEach(module('angular-progress-arc'));

    it('should set values appropriately', inject(function(progressArcDefaults) {
        var target = {};
        progressArcDefaults(target);
        expect(target.size).toEqual(200);
        expect(target.strokeWidth).toEqual(20);
        expect(target.stroke).toEqual('black');
        expect(target.background).toBeNull();
    }));
});
