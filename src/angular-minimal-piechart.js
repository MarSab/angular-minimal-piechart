angular.module('minimalPiechart', []);


angular.module('minimalPiechart').directive('piechart', function () {
  return {
    restrict: 'E',
    templateUrl: 'min-piechart.html',
    scope: {
      value: '='
    }
  };
});


angular.module('minimalPiechart').directive('donutchart', function () {
  return {
    restrict: 'E',
    templateUrl: 'min-piechart.html',
    scope: {
      value: '='
    }
  };
});
