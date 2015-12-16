
angular.module('projetequipe1.transportsService', [])

.service('DataService', function() {
    this.lstTransports = [];
})

.service('TransportsService', function(DataService) {
    //GET ALL TRANSPORTS
    this.getTransports = function() {
        $.ajax({
            type: 'GET',
            url: 'http://localhost:3216/api/Transports'
        }).success(function (data) {
            console.log(data);
            //DataService.lstTransports = data;
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
            //DataService.lstTransports = data;
        });
    };
    
    //**CREATE NEW TRANPORT
    this.createTransport = function(transport) {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3216/api/Transports',
            data:
            {
                Cout: transport.cout,
                Type: transport.type,
                Transporteur: transport.lransporteur,
                LatDepart: transport.latDepart,
                LongDepart: transport.longDepart,
                LatArrive: transport.latArrive,
                LongArrive: transport.longArrive,
                Jour_Id: transport.jour_Id
            }
        }).success(function(data) {
            console.log(data);
        })
    };
    
    //X UPDATE TRANSPORT
    this.updateTransport = function(transport) {
        
    };
    
    //X DELETE TRANSPORT
    this.deleteTransport = function(transport) {
        /*$.ajax({
            type: 'POST',
            url: 'http://localhost:3216/api/Transports',
            data:
            {
                
            }
        }).success(function(data) {
            console.log(data);
        })*/
    };
})