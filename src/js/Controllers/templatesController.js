angular.module('evaluationApp').controller('templatesController', [
	'$scope', '$location', '$rootScope', '$routeParams', '$http', 'evaluationResource', 'currentUser',
	function ($scope, $location, $rootScope, $routeParams, $http, evaluationResource, currentUser) {
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

		$scope.editTemplate = function(ID) {
			console.log(ID);
			$location.path('/template/' + ID);
		};

		evaluationResource.getTemplates().success(function(data) {
			if (data.length === 0) {
				$scope.infoMessage = 'Engin sniðmát eru til staðar.';
			}
			$scope.templates = data;
		}).error(function(data) {
			// Handle this error!
		});
	}
]);