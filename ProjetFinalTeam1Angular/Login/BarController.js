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
             $('#Notconnected').hide();
        }
        else{
            $rootScope.activeUser = "nouserconnected";
        $('#Notconnected').show();
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


 $scope.getUserInfo = function () {
     var token = localStorage.getItem("token");
        if (token)
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3216/api/Account/UserInfo',
            headers:{ Authorization: 'Bearer ' + token},
            success: function (data) {
                    console.log(data);
            },
            error: function () {
                
            }
        });
    }




    $scope.getUser();
    
    $scope.getUserInfo();
}]);