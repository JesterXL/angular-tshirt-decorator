(function () {
/* jshint -W117, -W030 */
'use strict';
describe('app:', function() {
    describe('app', function() {
        var scope;
        beforeEach(function() {

        });
        it('should exist', function() {
           module('app');
           inject(function($rootScope) {
               scope = $rootScope.$new();
           });
           expect(scope).to.be.ok;
        });
    });
});
}());