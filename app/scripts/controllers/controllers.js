(function() {
  'use strict';
  angular
    .module('app.controllers', [
      'ui.router'
    ])
    .controller('LoginController', [
      '$scope',
      '$firebase',
      'BASEURL',
      loginCtrl
    ])
    .controller('HomeController', [
      '$scope',
      '$firebase',
      'BASEURL',
      homeCtrl
    ])

    function loginCtrl($scope, $firebase, BASEURL) {
      console.log(BASEURL)
      var userRef = new Firebase(BASEURL + '/users');
      var sync = $firebase(userRef);
      $scope.setMale = function() {
        $scope.user.avatar = 'images/male.png';
      };
      $scope.setFemale = function() {
        $scope.user.avatar = 'images/female.jpeg';
      };

      $scope.login = function() {
        if ($scope.user) {
          sync.$push($scope.user)
          .then(function(ref) {
            $scope.user.uid = ref.key();
            $scope.$emit('user:login', ref.key());
          });
        } else {
          alert('something goes wrong, babe?')
        }
      }
    }
    function homeCtrl($scope, $firebase, BASEURL) {
      $scope.$on('user:login', function(evt, uid) {
        var userRef = new Firebase(BASEURL +'/users');
        var sync = $firebase(userRef);

      })
    }
})();