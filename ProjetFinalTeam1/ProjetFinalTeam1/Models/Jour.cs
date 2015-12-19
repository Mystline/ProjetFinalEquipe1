using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ProjetFinalTeam1.Models
{
    public class Jour
    {
        public int Id { get; set; }

        [Required]
        public double BudgetJournee { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public virtual Voyage Voyage { get; set; }

        public virtual List<Activite> Activites { get; set; }

        public virtual List<Transport> Transports { get; set; }
    }
}