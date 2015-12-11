using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ProjetFinalTeam1.Models
{
    public class JourDTO
    {
        public JourDTO(Jour j)
        {
            Id = j.Id;
            BudgetJournee = j.BudgetJournee;
            Date = j.Date;

            if (j.Voyage != null)
            {
                VoyageId = j.Voyage.Id;
            }

            if (j.Activites != null)
            {
                ActivitesId = new List<int>();

                foreach (Activite a in j.Activites)
                {
                    ActivitesId.Add(a.Id);
                }
            }

        }

        public int Id { get; set; }

        public double BudgetJournee { get; set; }

        public DateTime Date { get; set; }

        public int VoyageId { get; set; }

        public List<int> ActivitesId { get; set; }
    }
}