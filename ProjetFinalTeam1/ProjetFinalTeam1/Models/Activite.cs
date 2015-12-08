using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ProjetFinalTeam1.Models
{
    public class Activite
    {
        public int Id { get; set; }

        [Required]
        public DateTime HeureDebut { get; set; }

        [Required]
        public DateTime HeureFin { get; set; }

        [Required]
        public double Cout { get; set; }

        [Required]
        public double Latitude { get; set; }

        [Required]
        public double Longitude { get; set; }

        public virtual Jour Jour { get; set; }

        public virtual Transport TransportUtilise { get; set; }

    }
}