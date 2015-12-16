
angular.module('projetequipe1.transportsService', [])

.service('DataService', function() {
    this.lstTransports = [];
})

.service('TransportsService', function(DataService) {
    this.dataService = DataService;
    
    //GET ALL TRANSPORTS
    this.getTransports = function() {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3216/api/Transports'
        }).success(function (data) {
            console.log(data);
            
            for(var i=0; i<data.length; i++)
            {
                DataService.lstTransports.push(data[i]);
            }
        });
    };
    
    //**GET TRANSPORTS DU VOYAGES
    this.getTransportsVoyage = function(voyageId) {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3216/api/TransportsVoyage',
            data:
            {
                VoyageId: voyageId
            }
        }).success(function (data) {
            console.log(data);
            
            for(var i=0; i<data.length; i++)
            {
                DataService.lstTransports.push(data[i]);
            }
        });
    };
    
    //**CREATE
    this.createTransport = function(transport) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3216/api/Transports',
            data:
            {
                Cout: transport.cout,
                Type: transport.type,
                Transporteur: transport.transporteur,
                LatDepart: transport.latDepart,
                LongDepart: transport.longDepart,
                LatArrive: transport.latArrive,
                LongArrive: transport.longArrive,
                
                //???????????
                Jour_Id: transport.jour_Id
            }
        }).success(function(data) {
            console.log(data);
        })
    };
    
    //**UPDATE
    this.updateTransport = function(transport) {
        $.ajax({
            type: 'PUT',
            url: 'http://localhost:3216/api/Transports/'+transport.Id,
            data:
            {
                id: transport.Id,
                Id: transport.Id,
                Cout: transport.Cout,
                Type: transport.Type,
                Transporteur: transport.Transporteur,
                LatDepart: transport.LatDepart,
                LongDepart: transport.LongDepart,
                LatArrive: transport.LatArrive,
                LongArrive: transport.LongArrive,
                
                //???????????
                Jour_Id: transport.Jour_Id
            }
        }).success(function(data) {
            console.log(data);
        })
    };
    
    //X DELETE
    this.deleteTransport = function(transportID) {
        $.ajax({
            type: 'DELETE',
            url: 'http://localhost:3216/api/Transports/'+transportID,
            data:
            {
                id: transportID
            }
        }).success(function(data) {
            console.log(data);
        })
    };
})