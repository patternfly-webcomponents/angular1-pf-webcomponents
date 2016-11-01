angular.module( 'demoApp' )
  .directive('bindEvents', function() {
    return {
      restrict: 'A',
      link: function(scope, element, attrs) {
        eventNames = attrs.bindEvents.split(',');
        eventNames.forEach(function(eventName) {
          element.bind(eventName, scope[eventName]);
        });
      }
    }
  })
  .controller( 'appCtrl', function( $scope, $interval) {
  $scope.used = 10;

  $interval(function() {
    if($scope.used > 100) {
      $scope.used = 10;
    } else {
      $scope.used += 10;
    }
  }, 1000);

  $scope.thresholdChangedTextClass = 'ok-text';
  $scope.thresholdChangedMsg = "Whew...Everythings normal :-)";

  $scope.thresholdSet = function(e) {
    var threshold = e.detail.threshold;
    var msg = threshold.substr(threshold.lastIndexOf('-') + 1);
    if (msg === 'warning') {
      $scope.thresholdChangedMsg = "Warning! You should look at this.";
      $scope.thresholdChangedTextClass = 'warning-text';
    } else if (msg === 'danger') {
      $scope.thresholdChangedMsg = "Danger!!  Seriously, something's wrong!";
      $scope.thresholdChangedTextClass = 'danger-text';
    } else if (msg === 'success') {
      $scope.thresholdChangedMsg = "Whew...Everythings normal :-)";
      $scope.thresholdChangedTextClass = 'ok-text';
    }
  };

});
