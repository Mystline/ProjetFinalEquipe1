angular.module('projetequipe1.voyagesService', [])

.service('VoyageDataService', function() {
    this.lstVoyages = [];
})

.service('VoyagesService', function($http, VoyageDataService) {
    
    this.dataService = VoyageDataService;
    
    //ADD NEW VOYAGE
    this.ajouterVoyage = function(name,budgetVoyage,dateTimeDebut,nbDeJour)
    { 
        $http({
                method: 'POST',
                url: "http://localhost:3216/api/Voyages/",
                data: {
                    Name: name,
                    BudgetVoyage: budgetVoyage,
                    DateTimeDebut: dateTimeDebut,
                    NbDeJour: nbDeJour
                }
            }).success(function (response)  {
                VoyageDataService.lstVoyages.push({Id:response.Id, Nom:response.Name, BudgetVoyage: response.BudgetVoyage, DateTimeDebut: response.DateTimeDebut.split('T')[0], NbDeJour: response.NbDeJour});
                console.log(response);
            }).error(function (response) {
                console.log("erreur ajout voyage");
        });
    }
    
    //FIND ALL VOYAGE FROM DATABASE
    this.initVoyage = function()
    {
        VoyageDataService.lstVoyages.length = 0;
        
        $http({
            method: 'GET',
            url: "http://localhost:3216/api/Voyages/GetVoyagesDTO/"
        }).success(function (response) {
            console.log(response);
            for(var i =0; i < response.length; i++)
                {
                     VoyageDataService.lstVoyages.push({Id:response[i].Id, Nom:response[i].Name, BudgetVoyage: response[i].BudgetVoyage,
                                                  DateTimeDebut: response[i].DateTimeDebut.split('T')[0], NbDeJour: response[i].NbDeJour});
                }
        });       
    }    
});

