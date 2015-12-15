angular
    .module('projetequipe1')
    .controller('LoginController',['$rootScope', '$scope', '$http', '$location','$sce', 

function LoginController($rootScope, $scope, $http, $location,$sce) {
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
                $("#righterror").text("Les informations soumises ne repondent pas aux critéres.");
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
                $("#lefterror").text("L'identifiant et le mot de passe ne fonctionnent pas.");
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


    function init() {
        $('#login-pass-r').on('change keypress paste focus textInput input', function () {
            changePassword.apply(this);
        });
        $('#login-pass').on('change keypress paste focus textInput input', function () {
            changePassword.apply(this);
        });
    }

    function changePassword() {
        var id = $(this).attr('id');
        var i1, i2;
        var mess = "";
        errors = 0;

        if (id === "login-pass") {
            id1 = "#login-pass";
            id2 = "#login-pass-r";
        } else {
            id2 = "#login-pass";
            id1 = "#login-pass-r";
        }

        if ($scope.suPass === $scope.suPassC && $scope.suPass.length > 5) {
          //  $scope.suPass.css = "border", "1px solid #1abc9c";
         //   $scope.suPassC.css = "border", "1px solid #1abc9c";
          //$(id2).css("border", "1px solid #1abc9c");
         //$(id1).css("border", "1px solid #1abc9c");
            mess += "<li class='green'>Les mots de passe corespondent. </li>";
        }
        else {
            
            $(id1).css("border", "1px solid #e74c3c");
            $(id2).css("border", "1px solid #e74c3c");
            mess += "<li class='red'>Les mots de passe ne corespondent pas. </li>";
            errors++;
        }

        if ($scope.suPass.length < 6) {
            mess += "<li class='red'>La longueur d'un mot de passe doit être d'au moins six caractéres.</li>";
            errors++;
        } else {
            mess += "<li class='green'>La longueur du mot de passe est d'au moins six caractéres.</li>";
        }

        if (!/[A-Z]/.test($scope.suPass)) {
            mess += "<li class='red'>Le mot de passe doit contenir au moins une lettre majuscule.</li>";
            errors++;
        } else {
            mess += "<li class='green'>Le mot de passe contient au moins une lettre majuscule.</li>";
        }

        if (!/[0-9]/.test($scope.suPass)) {
            mess += "<li class='red'>Le mot de passe doit contenir au moins un chiffre.</li>";
            errors++;
        } else {
            mess += "<li class='green'>Le mot de passe contient au moins un chiffre.</li>";
        }

        if (!/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]/.test($scope.suPass)) {
            mess += "<li class='red'>Le mot de passe doit contenir au moins un caractére spécial.</li>";
            errors++;
        } else {
            mess += "<li class='green'>Le mot de passe contient au moins un caractére spécial.</li>";
        }

        //$('#righterror').html(mess);
       // $scope.righterror = mess;
        //$scope.html = mess;
        
      

        $scope.righterrorhtml = mess;
        $scope.renderHtml($scope.righterrorhtml);
         $scope.$apply();
    }

     $scope.renderHtml = function (htmlCode) {
            return $sce.trustAsHtml(htmlCode);
        };

  

    init();
}]);