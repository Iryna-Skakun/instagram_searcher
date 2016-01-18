describe('dataservice service', function () {
    var dataserviceFactory,
        httpBackend,
        response = {
            data: {
                "tags": "levi9",
                "type": "image",
                "location": {"latitude": 52.3712387, "name": "Backbase", "longitude": 4.9278002, "id": 4113819}
            }
        };

    beforeEach(function () {
        module('dataservice.module');
    });

    beforeEach(inject(function (_dataservice_, $httpBackend) {
        httpBackend = $httpBackend;
        dataserviceFactory = _dataservice_;
    }));

    it('should be defined', function () {
        expect(dataserviceFactory).toBeDefined();
    });

    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    it('calls http backend to get data', function () {
        httpBackend.whenJSONP('https://api.instagram.com/v1/tags/levi9/media/recent?&access_token=335399504.1fb234f.833245afafb04e0b82ac075243410227&callback=JSON_CALLBACK&count=28').respond(response);
        dataserviceFactory.getSearchData().then(function (result) {
            // check that returned result contains
            expect(result.data.tags).toBe("levi9");
        });
        httpBackend.flush();
    });
});

