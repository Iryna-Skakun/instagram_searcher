describe('Check browser title', function() {
    it('should have a title', function() {
        browser.get('http://localhost:8081/');

        expect(browser.getTitle()).toBe('Instagram #hashtag searcher');
    });
});