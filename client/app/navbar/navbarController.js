var navbar = angular.module('navbar', []);
navbar.controller('navbarController', ['Plants', 'ProfileInfo', function(Plants, ProfileInfo){
	var that = this;
	that.userImage = ProfileInfo.profile.userPic;
	that.userName = ProfileInfo.profile.username;

}]);