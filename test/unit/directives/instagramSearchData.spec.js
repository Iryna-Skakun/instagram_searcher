describe('instagramSearchData directive', function() {
    var $compile,
        $rootScope;

    beforeEach(module('app'));
    beforeEach(module('intagramTemplate')); // generated in karma.conf
    // Store references to $rootScope and $compile
    // so they are available to all tests in this describe block
    beforeEach(inject(function(_$compile_, _$rootScope_){
        // The injector unwraps the underscores (_) from around the parameter names when matching
        $compile = _$compile_;
        $rootScope = _$rootScope_;
    }));

    it('Check that the compiled element contains the templated content', function() {
        // Compile a piece of HTML containing the directive
        var element = $compile('<label for="instagramInputData">Hashtag</label>')($rootScope);
        $rootScope.$digest();
        expect(element.html()).toContain("Hashtag");
    });
});