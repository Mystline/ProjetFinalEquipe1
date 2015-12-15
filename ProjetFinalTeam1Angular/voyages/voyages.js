angular
    .module('projetequipe1')
    .controller('VoyageController', ['$scope', '$rootScope', '$http', '$route', '$sce',

function VoyageController($scope, $rootScope, $http, $route, $sce)
        {

            $scope.budgetVoyage = "";
            $scope.dateDebut = "";
            $scope.nbJours = "";
            $scope.voyages = [];
/*
            $http({
                method: 'GET',
                url: "http://localhost:59044/api/Voyages"
            }).success(function (data) {
                console.log(data)
                $scope.voyages = data;
            });*/

            $scope.ajouterVoyage = function () {
                
                validVoyage.apply($('#login-pass'));
                if (errors != 0) {
                    alert("Information invalide");
                    return;
                }
                
                if ($scope.budgetVoyage == "" || $scope.dateDebut == "" || $scope.nbJours == "") {


                    alert("Un ou plusieurs champs ne sont pas valides");

                } else {
                    
                    var dt = new Date();
                    var dtstring = dt.getFullYear()
                    + '-' + pad2(dt.getMonth()+1)
                    + '-' + pad2(dt.getDate())
                    + ' ' + pad2(dt.getHours())
                    + ':' + pad2(dt.getMinutes())
                    + ':' + pad2(dt.getSeconds());
                    
                    console.log($scope.dateDebut,$scope.budgetVoyage,$scope.nbJours);
                    $.ajax({
                        method: 'POST',
                        url: "http://localhost:3216/api/Voyages/",
                        data: {
                            BudgetVoyage: $scope.budgetVoyage,
                            DateTimeDebut: dtstring,
                            NbDeJour: $scope.nbJours
                        }

                    }).success(function (data)  {
                        $scope.initVoyage();
                        console.log(data);
                        $scope.$apply();
                    }).error(function (data) {
                        
                        console.log("erreur ajout voyage");
                    });
                }

            }
            
            $scope.selectionnerVoyage = function(voyage){
                console.log(voyage);
                $rootScope.voyageSelect = voyage;
                $rootScope.changeView('/jours'); 
            
            }

            $scope.supprimerVoyage = function (voyage) {
                $.ajax({
                    method: 'DELETE',
                    url: "http://localhost:3216/api/Voyages/" + voyage.Id

                }).success(function (data) {
                    console.log(data);
                    $scope.voyageIndexASupprimer = $scope.voyageIndex($scope.voyages, voyage);
                    $rootScope.data.memos.splice($scope.voyageIndexASupprimer, 1);
                });

            }

            $scope.voyageIndex = function arrayObjectIndexOf(arr, obj) {
                for (var i = 0; i < arr.length; i++) {
                    if (angular.equals(arr[i], obj)) {
                        return i;
                    }
                };
                return -1;
            }
            
            
            function pad2(number) {
                return (number < 10 ? '0' : '') + number
            }   
            
            
            $scope.initVoyage = function()
            {
                $scope.voyages = [];
                
                $.ajax({
                    method: 'GET',
                    url: "http://localhost:3216/api/Voyages/GetVoyagesDTO/",
                    success: function (response) 
                    {
                        console.log(response);
                        for(var i =0; i < response.length; i++)
                        {
                            $scope.voyages.push({Id:response[i].Id, BudgetVoyage: response[i].BudgetVoyage, DateTimeDebut: response[i].DateTimeDebut, NbDeJour: response[i].NbDeJour});
                        }
                        $scope.$apply();
                    }
                });
                
                $('#voyage-jour').on('change keypress paste focus textInput input', function () {
                    validVoyage.apply(this);
                });
                
                $('#voyage-budget').on('change keypress paste focus textInput input', function () {
                    validVoyage.apply(this);
                });
            }
            
            function validVoyage() {
                    var mess = "";
                    errors = 0;


                    if ($("#voyage-jour").val().length < 3 && $("#voyage-jour").val().length > 0) {
                        $('#voyage-jour').css("border", "1px solid #1abc9c");
                        mess += "<li class='green'>Le nombre de jour est valide</li>";
                    }
                    else {
                        $('#voyage-jour').css("border", "1px solid #e74c3c");
                        mess += "<li class='red'>Il doit avoir de 1 a 99 jours dans un voyage</li>";
                        errors++;
                    }
                
                    if($('#voyage-budget').val().length > 9 || $('#voyage-budget').val().length < 1)
                    {
                        $('#voyage-budget').css("border", "1px solid #e74c3c");
                        mess += "<li class='red'>Le budget est trop important</li>";
                        errors++; 
                    }
                    else
                    {
                        $('#voyage-budget').css("border", "1px solid #1abc9c");
                        mess += "<li class='green'>Le budget est valide</li>";
                    }
                

                    $('#voyageerror').html(mess);
                }
            
            
            $scope.initVoyage();


}]);