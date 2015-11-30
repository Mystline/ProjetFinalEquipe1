using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ProjetFinalTeam1.Models
{
    public class Voyage
    {

        public int Id { get; set; }

        [Required]
        public double BudgetVoyage { get; set; }

        [Required]
        public DateTime DateTimeDebut { get; set; }

        public virtual List<ApplicationUser> ApplicationUsers { get; set; }

        public virtual List<Jour> Jours { get; set; }
    }
}