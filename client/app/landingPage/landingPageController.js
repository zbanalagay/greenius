var landingPage = angular.module('landingPage', []);
landingPage.controller('landingPageController', ['$http', 'auth', 'store', '$location', 'Users', '$window', function($http, auth, store, $location, Users, $window){
	var that = this;
  that.data = {};

  that.login = function(){
      auth.signin({}, function(profile, token){
        store.set('profile', profile);
        store.set('token', token);

        that.data.email = profile.email;
        that.data.username = profile.name;
        that.data.userPic = profile.picture;
        that.data.createdAt = profile.created_at;

        Users.getUser(that.data)
        .then(function(results){
          if(results === undefined){
            Users.addUser(that.data)
              .then(function(results){
                $window.localStorage.setItem('username', results.username);
              })
              .catch(function(error){
                console.log(error);
              })
          }
          $window.localStorage.setItem('username', results.data.username);
          $location.path('/navbar/dashboard');
        })
        .catch(function(error){
          console.log(error)
        })
      }, function(){
        //error callback
      });
    };

  that.logout = function(){
    auth.signout();
    store.remove('profile');
    store.remove('token');
  };

  function UserInfoCtrl(that, auth){
    that.auth = auth;
  };

}]);
