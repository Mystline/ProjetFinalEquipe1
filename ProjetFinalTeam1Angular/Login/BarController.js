angular
    .module('projetequipe1')
    .controller('BarController',[ '$scope', '$http','$rootScope', '$location', 

function BarController($scope, $http, $rootScope, $location) {

    $rootScope.activeUser = "";


    $scope.getUser = function () {
        var token = localStorage.getItem("token");
        if (token) {
       
             $rootScope.activeUser = localStorage.getItem("user");
         
          $('#connected').show();
        }
        else{
            $rootScope.activeUser = "nouserconnected";
        }
    }

    $scope.logout = function () {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        $('#connected').hide();
        localStorage.setItem("back", window.location.href);
       s = window.location.protocol + "//" + window.location.host;
    window.location = s;
    }







    $scope.getUser();
}]);