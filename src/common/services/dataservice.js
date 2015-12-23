(function() {
    'use strict';

    angular
        .module('dataservice.module')
        .factory('dataservice', dataservice);
    /* @ngInject */
    function dataservice($http, instagramConfig) {
        var service = {
            getSearchData: getSearchData
        };

        return service;

        function getSearchData(hashtag) {
            var hashtagValue = hashtag || 'levi9',
                instagramUrl = 'https://api.instagram.com/v1/tags/' + hashtagValue + '/media/recent?';

            return $http.jsonp(instagramUrl, {params: instagramConfig})
                .then(onGetSearchDataComplete);
        }

        function onGetSearchDataComplete(response) {
            return response.data;
        }
    }
}());