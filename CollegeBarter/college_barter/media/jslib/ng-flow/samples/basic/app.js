/*global angular */
'use strict';

/**
 * The main app module
 * @name app
 * @type {angular.Module}
 */
var app = angular.module('app', ['flow'])
.config(['flowFactoryProvider', function (flowFactoryProvider) {
  flowFactoryProvider.defaults = {
    target: 'upload.php',
    permanentErrors: [404, 500, 501],
    singleFile:false,
    chunkSize:1*1024*1024,
    forceChunkSize:false,
    simultaneousUploads:3,
    fileParameterName:'file',
    query:{},
    withCredentials:false,
    method:'multipart',
    testMethod:'POST',
    uploadMethod:'POST',
    allowDuplicateUploads:false
  };
  flowFactoryProvider.on('catchAll', function (event) {
    console.log('catchAll', arguments);
  });
  // Can be used with different implementations of Flow.js
  // flowFactoryProvider.factory = fustyFlowFactory;
}]);