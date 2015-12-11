using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProjetFinalTeam1.Models
{
    public class ActiviteDTO
    {
        public ActiviteDTO(Activite a)
        {
            Id = a.Id;
            HeureDebut = a.HeureDebut;
            HeureFin = a.HeureFin;
            Cout = a.Cout;
            Latitude = a.Latitude;
            Longitude = a.Longitude;

            if (a.Jour != null)
            {
                JourId = a.Jour.Id;
            }
            if (a.TransportUtilise != null)
            {
                TransportUtiliseId = a.TransportUtilise.Id;
            }
        }

        public int Id { get; set; }
        public DateTime HeureDebut { get; set; }
        public DateTime HeureFin { get; set; }
        public double Cout { get; set; }
        public double Latitude { get; set; }
        public double Longitude { get; set; }
        public int JourId { get; set; }
        public int TransportUtiliseId { get; set; }
    }
}