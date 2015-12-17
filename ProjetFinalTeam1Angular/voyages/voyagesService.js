angular.module('projetequipe1.voyagesService', [])

.service('DataService', function() {
    this.lstVoyages = [];
})

.service('VoyagesService', function(DataService) {
    
    this.dataService = DataService;
    
    //ADD NEW VOYAGE
    this.ajouterVoyage = function(name,budgetVoyage,dateTimeDebut,nbDeJour)
    { 
        //var date = formatDate(dateTimeDebut)
        //console.log(date);
        $.ajax({
                method: 'POST',
                url: "http://localhost:3216/api/Voyages/",
                data: {
                    Name: name,
                    BudgetVoyage: budgetVoyage,
                    DateTimeDebut: dateTimeDebut,
                    NbDeJour: nbDeJour
                }

            }).success(function (response)  {
                //TODO Remplacer initVoyage par ajout à la liste
                DataService.lstVoyages.push({Id:response.Id, Nom:response.Name, BudgetVoyage: response.BudgetVoyage, DateTimeDebut: response.DateTimeDebut.split('T')[0], NbDeJour: response.NbDeJour});
                //this.initVoyage();
                //$scope.$apply();
                console.log(response);
                //$scope.$apply();
            }).error(function (response) {
                console.log("erreur ajout voyage");
        });
    }
    
    //FIND ALL VOYAGE FROM DATABASE
    this.initVoyage = function()
    {
        DataService.lstVoyages=[];
        
        $.ajax({
            method: 'GET',
            url: "http://localhost:3216/api/Voyages/GetVoyagesDTO/",
            success: function (response) 
            {
                console.log(response);
                for(var i =0; i < response.length; i++)
                {
                     DataService.lstVoyages.push({Id:response[i].Id, Nom:response[i].Name, BudgetVoyage: response[i].BudgetVoyage, DateTimeDebut: response[i].DateTimeDebut.split('T')[0], NbDeJour: response[i].NbDeJour});
                }
                //$scope.$apply();
                //$scope.$apply();
            }
        });

    }
    
    
    
    
    
});
