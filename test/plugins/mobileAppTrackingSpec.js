describe('Service: $cordovaMobileAppTracking', function () {

  // load the service's module
  beforeEach(module('ngCordova.plugins.mobileAppTracking'));

  // instantiate service
  var service;

  //update the injection
  beforeEach(inject(function (_$cordovaMobileAppTracking_, _$window_, _$rootScope_) {
    $cordovaMobileAppTracking = _$cordovaMobileAppTracking_;
    $window = _$window_;
    $rootScope = _$rootScope_;
  }));

  /**
   * @description
   * Sample test case to check if the service is injected properly
   * */
  it('should be injected and defined', function () {
    expect(service).toBeDefined();
  });
});
