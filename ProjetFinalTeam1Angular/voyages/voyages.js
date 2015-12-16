angular
    .module('projetequipe1')
    .controller('VoyageController', ['$scope', '$rootScope', '$http', '$route', '$sce', '$timeout',

function VoyageController($scope, $rootScope, $http, $route, $sce, $timeout)
        {

            $scope.nomVoyage = "";
            $scope.budgetVoyage = "";
            $scope.dateDebut = "";
            $scope.nbJours = "";
            $scope.voyages = [];
            $scope.voyageerror= "";


            $scope.ajouterVoyage = function () {
                
                //validVoyage.apply($('#login-pass'));
                validVoyage();
                if (errors != 0) {
                    alert("Information invalide");
                    return;
                }
                
                if ($scope.budgetVoyage == "" || $scope.dateDebut == "" || $scope.nbJours == "") 
                {
                    alert("Un ou plusieurs champs ne sont pas valides");
                } 
                else {
                    
                    var dt = new Date();
                    var dtstring = dt.getFullYear()
                    + '-' + pad2(dt.getMonth()+1)
                    + '-' + pad2(dt.getDate())
                    + ' ' + pad2(dt.getHours())
                    + ':' + pad2(dt.getMinutes())
                    + ':' + pad2(dt.getSeconds());
                    
                    console.log($scope.nomVoyage, $scope.dateDebut,$scope.budgetVoyage,$scope.nbJours);
                    $.ajax({
                        method: 'POST',
                        url: "http://localhost:3216/api/Voyages/",
                        data: {
                            Name: $scope.nomVoyage,
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

            //Ajoute tout les voyages dans la liste $scope.voyages
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
                            $scope.voyages.push({Id:response[i].Id, Nom:response[i].Name, BudgetVoyage: response[i].BudgetVoyage, DateTimeDebut: response[i].DateTimeDebut.split('T')[0], NbDeJour: response[i].NbDeJour});
                        }
                        $scope.$apply();
                    }
                });
                
            }
            
            $scope.applyValidation = function (keyEvent) {
                $timeout(function () {
                    validVoyage();
                });

            }
            
            //Fonction de validation pour création d'un voyage
            function validVoyage() {             
                var mess = "";
                errors = 0;

                //
                //Validation du nom
                //
                if((""+$scope.nomVoyage).length < 3 || (""+$scope.nomVoyage).length > 30) {
                    $scope.styleVoyageNom = { 'border': '1px solid #e74c3c' };
                    mess += "<li class='red'>Le nom du voyage doit etre de 3 a 30 caracteres</li>";
                    errors++; 
                }
                else {
                   $scope.styleVoyageNom = { 'border': '1px solid #1abc9c' };
                    mess += "<li class='green'>Le nom du voyage est valide</li>";
                }
                
                //
                //Validation du nombre de jours
                //
                if ((""+$scope.nbJours).length < 3 && (""+$scope.nbJours).length > 0) {
                    $scope.styleVoyageNbJour = { 'border': '1px solid #1abc9c' };
                    mess += "<li class='green'>Le nombre de jour est valide</li>";
                }
                else {
                    $scope.styleVoyageNbJour = { 'border': '1px solid #e74c3c' };
                    mess += "<li class='red'>Il doit avoir de 1 a 99 jours dans un voyage</li>";
                    errors++;
                }

                //
                //Validation du budget
                //
                if((""+$scope.budgetVoyage).length > 9 || (""+$scope.budgetVoyage).length < 1) {
                    $scope.styleVoyageBudget = { 'border': '1px solid #e74c3c' };
                    mess += "<li class='red'>Le budget est trop important</li>";
                    errors++; 
                }
                else {
                   $scope.styleVoyageBudget = { 'border': '1px solid #1abc9c' };
                    mess += "<li class='green'>Le budget est valide</li>";
                }

                $scope.voyageerror = mess;
                $scope.renderHtml($scope.voyageerror); 
                console.log($scope.voyageerror);
            }
            
            //Pour afficher les <li> dans la liste du message d'erreur 
            $scope.renderHtml = function (htmlCode) {
                return $sce.trustAsHtml(htmlCode);
            };
            
            //Pour former une date
            function pad2(number) {
                return (number < 10 ? '0' : '') + number
            }   
            
            
            $scope.initVoyage();

            
            
            /*$scope.supprimerVoyage = function (voyage) {
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
            }*/
            
            
            //$scope.dateDebut
                //$scope.budgetVoyage
                /*$('#voyage-jour').on('change keypress paste focus textInput input', function () {
                    $scope.validVoyage();
                    $scope.$apply();
                });
                
                $('#voyage-budget').on('change keypress paste focus textInput input', function () {
                     $scope.validVoyage();
                     $scope.$apply();
                });*/
            

            /*
            $http({
                method: 'GET',
                url: "http://localhost:59044/api/Voyages"
            }).success(function (data) {
                console.log(data)
                $scope.voyages = data;
            });*/
}]);