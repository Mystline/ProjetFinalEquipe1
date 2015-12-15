
//****Decider en equipe si on met tous dans le meme module ou on creer des modules differents.
angular.module('projetequipe1.transports', [])

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
    
    //POST NEW TRANPORT
    /*this.postTransport = function() {
        $.ajax({
            type: 'POST',
            url: 'http://localhost:3216/api/Transports',
            data:
            {
                
            }
        }).success(function(data) {
            console.log(data);
        })
    }*/
})