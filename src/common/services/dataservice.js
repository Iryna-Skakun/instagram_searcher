(function() {
    'use strict';

    angular
        .module('dataservice.module')
        .factory('dataservice', dataservice);
    /* @ngInject */
    function dataservice($http) {
        var service = {};
        service.getSearchData = function(hashtag) {
            var hashtagValue = hashtag ? hashtag : 'levi9',
                accessToken = '335399504.1fb234f.833245afafb04e0b82ac075243410227',
                searchItemsCount = 28,
                config = {
                    access_token: accessToken,
                    callback: 'JSON_CALLBACK',
                    count: searchItemsCount
                },
                instagramUrl = 'https://api.instagram.com/v1/tags/' + hashtagValue + '/media/recent?';

            return $http.jsonp(instagramUrl, {params: config})
                .then(onGetSearchDataComplete);
        };
        function onGetSearchDataComplete(response) {
            return response.data;
        }
        return service;
    }
}());

