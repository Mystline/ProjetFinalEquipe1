angular
    .module('projetequipe1')
    .controller('LoginController',['$rootScope', '$scope', '$http', '$location','$sce', '$timeout', 

function LoginController($rootScope, $scope, $http, $location,$sce,$timeout) {
    $scope.siUser = "";
    $scope.siPass = "";
    $scope.suUser = "";
    $scope.suPass = "";
    $scope.suPassC = "";

    var errors = 0;


    $scope.register = function () {
        changePassword.apply($('#login-pass'));
        if (errors != 0) {
            return;
        }

        $.ajax({
            method: 'POST',
            url: "http://localhost:3216/api/Account/Register",
            data:
            {
                Email: $scope.suUser,
                Password: $scope.suPass,
                ConfirmPassword: $scope.suPassC
            },
            error: function (data) {
                $scope.righterrorModel = "Les informations soumises ne repondent pas aux critéres.";
                $scope.$apply();
            }
        }).success(function (data) {
            $.ajax({
                type: 'POST',
                url: 'http://localhost:3216/Token',
                data: {
                    grant_type: 'password',
                    username: $scope.suUser,
                    password: $scope.suPass
                }
            }).done(function (data) {
                localStorage.setItem("token", data.access_token);
                localStorage.setItem("user", data.userName);
                var s = localStorage.getItem("back");
                if (s === null)
                    s = window.location.protocol + "//" + window.location.host;
                window.location = window.location.protocol + "//" + window.location.host;
            });
        });
    }

    $scope.login = function () {
        $("#lefterror").text("");
        $('#imgLoadSi').show();
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3216/Token',
            data: {
                grant_type: 'password',
                username: $scope.siUser,
                password: $scope.siPass
            },
            error: function (data) {
                 $scope.lefterrorModel = "Les informations soumises ne repondent pas aux critéres.";
                $scope.$apply();
            }
        }).done(function (data) {
            $('#imgLoadSi').hide();
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("user", data.userName);
            var s = localStorage.getItem("back");
            if (s === null)
                s = window.location.protocol + "//" + window.location.host;
            window.location = window.location.protocol + "//" + window.location.host;;
        });
    }


    $scope.myFunct = function (keyEvent) {
        $timeout(function () {
            changePassword();
        });
       
    }
    function changePassword() {

        var mess = "";
        errors = 0;

       
        if ($scope.suPass.length < 6) {
            $scope.StylePass = { 'border': '1px solid #e74c3c' };
            $scope.StylePassC = { 'border': '1px solid #e74c3c' };
            mess += "<li class='red'>La longueur d'un mot de passe doit être d'au moins six caractéres.</li>";
            errors++;
        } else {
         $scope.StylePass = { 'border': '1px solid #1abc9c' };
            $scope.StylePassC = { 'border': '1px solid #1abc9c' };
        }

        if (!/[A-Z]/.test($scope.suPass)) {
            $scope.StylePass = { 'border': '1px solid #e74c3c' };
            $scope.StylePassC = { 'border': '1px solid #e74c3c' };
            mess += "<li class='red'>Le mot de passe doit contenir au moins une lettre majuscule.</li>";
            errors++;
        } else {

            $scope.StylePass = { 'border': '1px solid #1abc9c' };
            $scope.StylePassC = { 'border': '1px solid #1abc9c' };
        }

        if (!/[0-9]/.test($scope.suPass)) {
            $scope.StylePass = { 'border': '1px solid #e74c3c' };
            $scope.StylePassC = { 'border': '1px solid #e74c3c' };
            mess += "<li class='red'>Le mot de passe doit contenir au moins un chiffre.</li>";
            errors++;
        } else {

        }

        if (!/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/.test($scope.suPass)) {
            $scope.StylePass = { 'border': '1px solid #e74c3c' };
            $scope.StylePassC = { 'border': '1px solid #e74c3c' };
            mess += "<li class='red'>Le mot de passe doit contenir au moins un caractére spécial.</li>";
            errors++;
        } else {
            $scope.StylePass = { 'border': '1px solid #1abc9c' };
            $scope.StylePassC = { 'border': '1px solid #1abc9c' };
        }


        if ($scope.suPass === $scope.suPassC ) {
            $scope.StylePass = { 'border': '1px solid #1abc9c' };
            $scope.StylePassC = { 'border': '1px solid #1abc9c' };
            
       }
        else {

            $scope.StylePass = { 'border': '1px solid #e74c3c' };
            $scope.StylePassC = { 'border': '1px solid #e74c3c' };
            
            mess += "<li class='red'>Les mots de passe ne corespondent pas. </li>";
            errors++;
        }

        $scope.righterrorhtml = mess;
      
        $scope.renderHtml($scope.righterrorhtml);
       
    }

    $scope.renderHtml = function (htmlCode) {
        return $sce.trustAsHtml(htmlCode);
       
    };
}]);