angular.module('evaluationApp', ['ngRoute']);

angular.module('evaluationApp').config(['$routeProvider',
	function ($routeProvider) {
		$routeProvider
			.when('/login', { templateUrl: '../html/login.html',   controller: 'loginController' })
			.otherwise({
				redirectTo: '/login'
			});
	}
]);

angular.module('evaluationApp').factory('evaluationResource',
	function($http) {
		var factory = {};

		factory.loginUser = function(loginObject) {
			return $http.post('http://dispatch.ru.is/demo/api/v1/login', loginObject);
		};

		factory.getEvaluations = function(token) {
			var tok = 'Basic ' + token;
			var config = {headers         : {'Authorization': tok},
			              withCredentials : true
	        };
			return $http.get('http://dispatch.ru.is/demo/api/v1/my/evaluations', config);
		};

		return factory;
	}
);

angular.module('evaluationApp').controller('loginController', [
	'$scope', '$location', '$rootScope', '$routeParams', '$http', 'evaluationResource',
	function ($scope, $location, $rootScope, $routeParams, $http, evaluationResource) {
	$scope.token = '';

	$rootScope.login = function() {
		var loginObject = {user:'bergthor13', pass:'123456'};

		evaluationResource.loginUser(loginObject).then(function(response) {
			console.log(response);
			$scope.token = response.data.Token;
			console.log('Basic ' + $scope.token);
		});

		evaluationResource.getEvaluations($scope.token).then(function(response) {
			console.log(response);
		});
	};

}]);