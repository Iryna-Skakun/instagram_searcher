(function() {
    /*jshint validthis: true */
    'use strict';

    angular
        .module('app')
        .controller('instagramSearchDataCtrl', instagramSearchDataCtrl);
    /* @ngInject */
    function instagramSearchDataCtrl(dataservice) {
        var vm = this;
        initInstagramSearchData();

        vm.getHashTag = function(hashtag) {
            initInstagramSearchData(hashtag);
        };

        function initInstagramSearchData(hashtag) {
            dataservice.getSearchData(hashtag).then(
                function(data) {
                    vm.instagramDatas = data.data;
                });
        }
    }
}());
