angular
  .module('azPagination', [])
  .directive('azPagination', pagination)
;

function pagination() {
  return {
    restrict: 'E',
    templateUrl: 'azPagination.html',
    transclude: true,
    scope: {
      currentPageNumber: '@',
      numberOfPagesToShowAtOnce: '@',
      endpointRoot: '@',
      collectionName: '@'
    },
    controller: function($scope, $http) {
      $scope.getPage = function(pageNumber) {
        $http
          .get($scope.endpointRoot + pageNumber)
          .then(function(response) {
            $scope[$scope.collectionName] = response.data[$scope.collectionName];
            $scope.currentPageNumber = pageNumber;
            $scope.totalPages = response.data.totalPages;
            $scope.pagesToShow = getPagesToShow($scope.currentPageNumber, $scope.numberOfPagesToShowAtOnce, $scope.totalPages);
          })
          .catch(function(response) {
            console.log('error: ', response);
          })
        ;
      };

      $scope.getPage($scope.currentPageNumber);
    }
  };

  function getPagesToShow(currentPage, numberOfPagesToShowAtOnce, totalPages) {
    currentPage = Number(currentPage);
    numberOfPagesToShowAtOnce = Number(numberOfPagesToShowAtOnce);
    var toReturn = [];
    var onEachSide = Math.floor(numberOfPagesToShowAtOnce / 2);
    var start = currentPage - onEachSide;
    var end = currentPage + onEachSide;

    if (numberOfPagesToShowAtOnce % 2 === 0) {
      end--;
    }

    if (start <= 0) {
      end -= start - 1;
      start = 1;
    }

    if (end > totalPages) {
      end = totalPages;
      start -= 1;
    }

    for (var i = start; i <= end; i++) {
      toReturn.push(i);
    }

    return toReturn;
  }
}
