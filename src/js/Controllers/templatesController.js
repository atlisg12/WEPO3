angular.module('evaluationApp').controller('templatesController', [
	'$scope', '$location', '$rootScope', '$routeParams', '$http', 'adminResource', 'currentUser',
	function ($scope, $location, $rootScope, $routeParams, $http, adminResource, currentUser) {
		// If the user didn't go through login,
		// redirect them to the login page.
		if(currentUser.username === '') {
			$location.path('/login');
			return;
		}

		$scope.templates = {};
		$scope.fullName = currentUser.fullName;
		$scope.infoMessage = '';

		$scope.createTemplate = function() {
			$location.path('/template');
		};

		$scope.makeEvaluation = function() {

		};

		var startDate = $(function() {
    		$( "#beginDatepicker" ).datepicker();
  		});
  		var endDate = $(function() {
    		$( "#endDatepicker" ).datepicker();
  		});
  		console.log(startDate);
  		console.log(endDate);

		adminResource.getTemplates().success(function(data) {
			if (data.length === 0) {
				$scope.infoMessage = 'Engin sniðmát eru til staðar.';
			}
			$scope.templates = data;
		}).error(function(data) {
			// Handle this error!
		});

		  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.clear = function () {
    $scope.dt = null;
  };

  // Disable weekend selection
  $scope.disabled = function(date, mode) {
    return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
  };

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };
  $scope.toggleMin();

  $scope.open = function($event) {
    $event.preventDefault();
    $event.stopPropagation();

    $scope.opened = true;
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
	}
]);