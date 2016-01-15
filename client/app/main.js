var main = angular.module('greeniusApp',
	['browsePlant',
	'auth',
	'dashboard',
	'myPlants',
	'plantProfile',
	'services']);

main.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider){
	$urlRouterProvider.otherwise('/dashboard');

	$stateProvider
		.state('login', {
			url: '/login',
			views: {
				'indexPage': {
					templateUrl: './auth/loginView.html',
					controller: 'authController'
				}
			}
		})
		.state('signup', {
			url: '/signup',
			views: {
				'indexPage': {
					templateUrl: './auth/signupView.html',
					controller: 'authController'
				}
			}
		})
		.state('browsePlant', {
			url: '/browsePlant',
			views: {
				'indexPage': {
					templateUrl: './browsePlant/browsePlantView.html',
					controller: 'browsePlantController'
				}
			}
		})
		.state('dashboard', {
			url: '/dashboard',
			views: {
				'indexPage': {
					templateUrl: './dashboard/dashboardView.html',
					controller: 'dashboardController'
				}
			}
		})
		.state('myPlants', {
			url: '/myPlants',
			views: {
				'indexPage': {
					templateUrl: './myPlants/myPlantsView.html',
					controller: 'myPlantsController'
				}
			}
		})
		.state('plantProfile', {
			url: '/plantProfile',
			views: {
				'indexPage': {
					templateUrl: './plantProfile/plantProfileView.html',
					controller: 'plantProfileController'
				}
			}
		})
}]);
