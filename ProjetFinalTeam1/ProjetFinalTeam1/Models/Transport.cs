using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ProjetFinalTeam1.Models
{
    public class Transport
    {
        public int Id { get; set; }

        [Required]
        public double Cout { get; set; }

        [Required]
        public string Type { get; set; }

        [Required]
        public string Transporteur { get; set; }

        [Required]
        public string longitudeDepart { get; set; }

        [Required]
        public string latitudeDepart { get; set; }

        public virtual Jour Jour { get; set; }

        public virtual Activite ActiviteDestination { get; set; }

    }
}