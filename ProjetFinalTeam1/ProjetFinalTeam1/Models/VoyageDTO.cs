using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProjetFinalTeam1.Models
{
    public class VoyageDTO
    {
        public VoyageDTO(Voyage v)
        {
            Id = v.Id;
            BudgetVoyage = v.BudgetVoyage;
            DateTimeDebut = v.DateTimeDebut;
            NbDeJour = v.NbDeJour;

            if (v.Jours != null)
            {
                JoursID = new List<int>();

                foreach (Jour j in v.Jours)
                {
                    JoursID.Add(j.Id);
                }
            }
        }

        public int Id { get; set; }

        public double BudgetVoyage { get; set; }

        public DateTime DateTimeDebut { get; set; }

        public int NbDeJour { get; set; }

        public List<int> JoursID { get; set; }
    }
}