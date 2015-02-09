// install : cordova plugin add com.mobileapptracking.matplugin
//           cordova plugin add com.mobileapptracking.ifawrapper
//           cordova plugin add com.mobileapptracking.gaidwrapper
// link    : https://github.com/MobileAppTracking/phonegap-plugin
// docs    : https://developers.mobileapptracking.com/phonegap-plugin/

angular.module('ngCordova.plugins.mobileAppTracking', [])

  .factory('$cordovaMobileAppTracking', ['$q', '$window', function ($q, $window) {

    /**
     * Basic Usage for Mobile App Tracking
     * @type {{initTracker: Function, measureSession: Function}}
     */

    var MAT = {
      mobileAppTracker: null,
      adID            : '',
      conversionKey   : '',
      gaid            : '',
      ifa             : '',

      /**
       * Minimum step to start measurement using Mobile App Tracking
       * You will need MAT Advertising ID and MAT Conversion Key from your MAT application
       *
       * You need to install cordova plugin for Mobile App Tracking
       * `cordova plugin add com.mobileapptracking.matplugin`
       *
       * Sample code on how to use the Mobile App Tracking
       * ```
       * $cordovaMobileAppTracking.initTracker(matAdID, matConversionKey)
       * .then(function(success){
       *  $cordovaMobileAppTracking.measureSession()
       *    .then(function(success){
       *      // ...
       *    }, function(error){
       *      // ...
       *    });
       * }, function(error){
       *  // ...
       * });
       * ```
       */

      initTracker   : function (matAdvertiserId, matConversionKey) {
        var d = $q.defer();

        this.adID = matAdvertiserId;
        this.conversionKey = matConversionKey;

        // keep the matPlugin and later check if the plugin is cached or not yet.
        // if not initialized, throw error that you need to initialized the mobile app tracker first.
        this.mobileAppTracker = $window.plugins.matPlugin;

        this.mobileAppTracker.initTracker(function (success) {
          d.resolve(sucecss);
        }, function (error) {
          d.reject(error);
        }, this.adID, this.conversionKey);

        return d.promise;
      },
      measureSession: function () {
        var d = $q.defer();

        if (this.mobileAppTracker) {
          this.mobileAppTracker.measureSession(function (success) {
            d.resolve(success);
          }, function (error) {
            d.reject(error);
          });
        } else {
          d.reject('You need to initialize Mobile App Tracking before you can start measuring session');
        }
        return d.promise;
      },

      /**
       * Android Tracking using Google Advertising ID
       * Require : Mobile App Tracking GAID Wrapper
       *
       * You need to install cordova plugin for Mobile App Tracking
       * `cordova plugin add com.mobileapptracking.gaidwrapper`
       *
       * e.g.:
       * Sample code on how to use the Mobile App Tracking with Google Advertising ID
       * ```
       * $cordovaMobileAppTracking.initTracker(matAdID, matConversionKey)
       * .then(function(success){
       *    $cordovaMobileAppTracking.getGoogleAdvertisingId()
       *      .then(function(result){
       *        $cordovaMobileAppTracking.setGoogleAdvertisingId(resut.gaid, result.isLAT)
       *        .then(function(success){
       *           $cordovaMobileAppTracking.measureSession()
       *           // ...
       *        }, function(error){
       *        });
       *      }, function(error){
       *        // start the measure Session when no GAID is found
       *        $cordovaMobileAppTracking.measureSession()
       *        // ...
       *      });
       * }, function(error){
       *  // ...
       * });
       * ```
       */
      getGoogleAdvertisingId: function () {
        var d = $q.defer();

        this.gaid = $window.plugins.gaidWrapperPlugin;

        this.gaid.getGoogleAdvertisingId(function (success) {
          d.resolve(success);
        }, function (error) {
          d.reject(error);
        });
        return d.promise;
      },
      setGoogleAdvertisingId: function (gaid, isLAT) {
        var d = $q.defer();

        if (this.gaid) {
          if (this.mobileAppTracker) {
            this.mobileAppTracker.setGoogleAdvertisingId(function (success) {
              d.resolve(success);
            }, function (error) {
              d.reject(error);
            }, gaid, isLAT);
          } else {
            d.reject('You need to initialize Mobile App Tracking before you can set Google Advertising ID');
          }
        } else {
          d.reject('You need to get the Google Advertising ID before you can set the Google Advertising ID');
        }
        return d.promise;
      },

      /**
       * iOS Tracking using Apple Advertising ID
       * Require : Mobile App Tracking IFA Wrapper
       *
       * You need to install cordova plugin for Mobile App Tracking
       * `cordova plugin add com.mobileapptracking.ifawrapper`
       *
       * e.g.:
       * Sample code on how to use the Mobile App Tracking with Google Advertising ID
       * ```
       * $cordovaMobileAppTracking.initTracker(matAdID, matConversionKey)
       * .then(function(success){
       *    $cordovaMobileAppTracking.getAppleAdvertisingIdentifier()
       *      .then(function(result){
       *        $cordovaMobileAppTracking.setAppleAdvertisingIdentifier(result.ifa, result.trackingEnabled)
       *        .then(function(success){
       *           $cordovaMobileAppTracking.measureSession()
       *           // ...
       *        }, function(error){
       *        });
       *      }, function(error){
       *        // start the measure Session when no IFA is found
       *        $cordovaMobileAppTracking.measureSession()
       *        // ...
       *      });
       * }, function(error){
       *  // ...
       * });
       * ```
       */
      getAppleAdvertisingIdentifier: function () {
        var d = $q.defer();

        this.ifa = $window.plugins.ifaWrapperPlugin;

        this.ifa.getAppleAdvertisingIdentifier(function (success) {
          d.resolve(success);
        }, function (error) {
          d.reject(error);
        });
        return d.promise;
      },
      setAppleAdvertisingIdentifier: function (ifa, trackingEnabled) {
        var d = $q.defer();

        if (this.ifa) {
          if (this.mobileAppTracker) {
            this.mobileAppTracker.setAppleAdvertisingIdentifier(function (success) {
              d.resolve(success);
            }, function (error) {
              d.reject(error);
            }, ifa, trackingEnabled);
          } else {
            d.reject('You need to initialize Mobile App Tracking before you can set Apple Advertising Identifier');
          }
        } else {
          d.reject('You need to get the Apple Advertising ID before you can set the Apple Advertising Identifier');
        }
        return d.promise;

      }
    };

    return MAT;
  });

