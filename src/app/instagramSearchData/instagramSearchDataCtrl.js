(function () {
    /*jshint validthis: true */
    'use strict';

    angular
        .module('app')
        .controller('instagramSearchDataCtrl', instagramSearchDataCtrl);
    /* @ngInject */
    function instagramSearchDataCtrl(dataservice) {
        var vm = this;
        vm.getHashTag = function (hashtag) {
            dataservice.getSearchData(hashtag).then(
                function (data) {
                    vm.instagramDatas = data.data;
                });
        };
        vm.getHashTag();
    }
}());
