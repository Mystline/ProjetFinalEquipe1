angular
    .module('projetequipe1')
    .controller('VoyageController', ['$scope', '$rootScope', '$http', '$route', '$sce', '$timeout', 'VoyagesService', 'GlobalService',

function VoyageController($scope, $rootScope, $http, $route, $sce, $timeout, VoyagesService, GlobalService)
        {

            $scope.nomVoyage = "";
            $scope.budgetVoyage = "";
            $scope.dateDebut = "";
            $scope.nbJours = "";
            $scope.voyageerror= "";
            
            $scope.voyages = VoyagesService.dataService.lstVoyages;
            
            $scope.VoyagesService = VoyagesService;            
            
            $scope.$watch('VoyagesService.dataService.lstVoyages', function(newVal, oldVal, scope) {
                console.log("valeur ajouter");
                scope.voyages = VoyagesService.dataService.lstVoyages;
            });

            //Remplissage de la liste de voyages (Database)
            //$scope.voyages = [];
            
            //$scope.voyages = VoyagesService.dataService.lstVoyages
            console.log($scope.voyages);
            
            //Ajout du voyage
            $scope.ajouterVoyage = function() { 
                var dt = $scope.dateDebut;
                var dtstring = dt.getFullYear()
                + '-' + pad2(dt.getMonth()+1)
                + '-' + pad2(dt.getDate())
                + ' ' + pad2(dt.getHours())
                + ':' + pad2(dt.getMinutes())
                + ':' + pad2(dt.getSeconds());
                
                console.log(dtstring);
                
                VoyagesService.ajouterVoyage($scope.nomVoyage,$scope.budgetVoyage, dtstring, $scope.nbJours);
                //$scope.$apply();               
            }
            
            //Selection du voyage
            $scope.selectionnerVoyage = function(voyage){
                console.log(voyage);
                GlobalService.selectVoyage = voyage;
                $rootScope.voyageSelect = voyage;
                
        $rootScope.NGconnected = true;
        $rootScope.NGvoyage = true;
        $rootScope.NGjours = true;
        $rootScope.NGtransport = false;
        $rootScope.NGutilisateur = true;
        $rootScope.NGactivite = false;
                
                $rootScope.changeView('/jours'); 
            
            }
            
            //Performe la validation pour l'ajout de voyage
            $scope.applyValidation = function (keyEvent) {
                $timeout(function () {
                    validVoyage();
                });
            }
            
            //Pour former une date
            function pad2(number) {
                return (number < 10 ? '0' : '') + number
            }   

            function formatDate(dt)
            {
                
                var dtstring = dt.getFullYear()
                + '-' + pad2(dt.getMonth()+1)
                + '-' + pad2(dt.getDate())
                + ' ' + pad2(dt.getHours())
                + ':' + pad2(dt.getMinutes())
                + ':' + pad2(dt.getSeconds());
                return dt;
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

            
            VoyagesService.initVoyage();

}]);