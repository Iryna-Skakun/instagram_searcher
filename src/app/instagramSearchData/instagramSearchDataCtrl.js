(function() {
    'use strict';

    angular
        .module('app')
        .controller('instagramSearchDataCtrl', instagramSearchDataCtrl);
    /* @ngInject */
    function instagramSearchDataCtrl($scope, dataservice) {

        initInstagramSearchData();

        $scope.getHashTag = function(hashtag) {
            initInstagramSearchData(hashtag);
        };
        function initInstagramSearchData(hashtag) {
            dataservice.getSearchData(hashtag).then(
                function(data) {
                    $scope.instagramDatas = data.data;
                });
        }
    }
}());
