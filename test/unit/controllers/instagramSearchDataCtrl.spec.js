describe('instagramSearchDataCtrl controller', function () {
    var instagramSearchDataCtrl;
    var dataserviceMock;
    var $timeout;
    var response = {
        data: {
            "tags": "levi9",
            "type": "image",
            "location": {"latitude": 52.3712387, "name": "Backbase", "longitude": 4.9278002, "id": 4113819}
        }
    };
    beforeEach(function () {
        module('app');
    });

    beforeEach(function () {
        inject(function ($controller, $q, _$timeout_) {
            dataserviceMock = jasmine.createSpyObj('dataservice', ['getSearchData']);
            dataserviceMock.getSearchData.and.returnValue($q.when(response));
            $timeout = _$timeout_;
            instagramSearchDataCtrl = $controller('instagramSearchDataCtrl',
                {
                    dataservice: dataserviceMock
                });
        });
    });

    it('should be defined', function () {
        expect(instagramSearchDataCtrl).toBeDefined();
    });

    it('should call getSearchData on controller initialization', function () {
        expect(dataserviceMock.getSearchData).toHaveBeenCalled();
    });

    it('should get instaData', function () {
        $timeout.flush();
        expect(instagramSearchDataCtrl.instagramDatas.tags).toBe("levi9");
    })
})