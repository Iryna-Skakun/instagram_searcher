(function() {
    'use strict';

    angular
        .module('app')
        .directive('instagramSearchData', instagramSearchData);

    function instagramSearchData() {
        return {
            restrict: 'E',
            templateUrl: 'app/instagramSearchData/instagram-search-data.html',
            controller: 'instagramSearchDataCtrl',
            controllerAs: 'vm'
        };
    }
}());
