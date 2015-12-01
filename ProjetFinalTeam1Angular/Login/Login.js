angular
    .module('projetequipe1')
    .controller('LoginController',['$rootScope', '$scope', '$http', '$location', '$window',

function LoginController($rootScope, $scope, $http, $location, $window) {
  
    $scope.TOKEN_KEY = "TOKEN";


    
   $scope.siUser = "";
    $scope.siPass = "";
    $scope.suUser = "";
    $scope.suPass = "";
    $scope.suPassC = "";

    $scope.register = function () {

        if ($scope.valCheckPassword == $scope.valPassword) {
            $http({
                method: 'POST',
                url: "http://localhost:3216/api/Account/Register",
                data:
                {
                    Email: $scope.suUser,
                    Password: $scope.suPass,
                    ConfirmPassword: $scope.suPassC
                }

            }).success(function (data) {
                console.log(data);
                $scope.login();
            });
        }
        else { alert('password doesnt match'); }
    }
    
    
    
    $scope.login = function () {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3216/Token',
            data: {
                grant_type: 'password',
                username: $scope.siUser,
                password: $scope.siPass
            }
        }).success(function (data) {
            console.log(data);
            $rootScope.UserName = data.userName;         
            localStorage.setItem($scope.TOKEN_KEY, data.access_token);
            
//change url here
            
            $rootScope.$apply();
           
        })
    }
    $scope.logout = function () {
        $rootScope.UserName = null;
        localStorage.removeItem($scope.TOKEN_KEY)
    }

}]);