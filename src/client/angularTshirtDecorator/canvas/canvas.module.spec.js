(function () {
/* jshint -W117, -W030 */
'use strict';
describe('canvas module:', function() {
    describe('app.canvas', function() {
        var scope;
        beforeEach(function() {

        });
        it('should exist', function() {
           module('app.canvas');
           inject(function($rootScope) {
               scope = $rootScope.$new();
           });
           expect(scope).to.be.ok;
        });
    });
});
}());