angular
  .module('azPagination')
  .config(config)
;

function config($httpProvider) {
  // mock data
  var people = [{
    name: 'Dean'
  }, {
    name: 'Robert'
  }, {
    name: 'Adam'
  }, {
    name: 'Cameron'
  }, {
    name: 'Daniel'
  }, {
    name: 'Marcel'
  }, {
    name: 'Tony'
  }, {
    name: 'Kurt'
  }];

  function getPage(pageNumber, itemsPerPage) {
    var peopleResponse = [];
    var index;

    for (var i = 0; i < itemsPerPage; i++) {
      index = (pageNumber - 1) * itemsPerPage + i;
      peopleResponse.push(people[index]);
    }

    return {
      people: peopleResponse,
      currentPageNumber: pageNumber,
      totalPages: people.length / itemsPerPage
    };
  }

  $httpProvider.interceptors.push(function() {
    return {
      request: function(config) {
        if (config.url === 'azPagination.html') {
          return config;
        }

        config.transformResponse = function(data) {
          var pageNumber = config.url.slice(42);
          return getPage(pageNumber, 2);
        }
        return config;
      }
    };
  });
}
