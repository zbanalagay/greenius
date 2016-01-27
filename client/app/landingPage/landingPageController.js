var landingPage = angular.module('landingPage',[]);
landingPage.controller('landingPageController', ['ldp', '$http', 'auth', 'store', '$location', function(ldp, $http, auth, store, $location){
	var that = this;
  that.login = function(){
    auth.signin({}, function(profile, token) {
      //success callback
      store.set('profile', profile);
      store.set('token', token);
      console.log('LANDING PAGE PROFILE', profile, 'LANDING PAGE TOKEN', token);
      // TODO make sure user is in DB == look up exactly what store.set does and $location.path
      $location.path('/navbar/dashboard');
    }, function() {
      //error callback
    });
  }
}]);
