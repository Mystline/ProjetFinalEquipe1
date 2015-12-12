using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using ProjetFinalTeam1.Models;

namespace ProjetFinalTeam1.Controllers
{
    public class JoursController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Jours
        public IQueryable<Jour> GetJours()
        {
            return db.Jours;
        }

        [Route("api/Jours/GetJoursVoyage")]
        // GET: api/Jours
        public List<JourDTO> GetJoursVoyage(int voyageId)
        {
            Voyage voyage = db.Voyages.FirstOrDefault(v => v.Id == voyageId);

            List<JourDTO> lstDTO = new List<JourDTO>();

            if (voyage != null)
            {
                List<Jour> lstJours = db.Jours.Where(j => j.Voyage.Id == voyage.Id).ToList();

                foreach (Jour j in lstJours)
                {
                    lstDTO.Add(new JourDTO(j));
                }
            }
            return lstDTO;
        }

        [Route("api/Jours/GetBudget")]
        public int GetBudget(int id, double budget)
        {
            db.Jours.FirstOrDefault(j => j.Id == id).BudgetJournee = budget;

            db.SaveChanges();

            return 0;
        }

        // GET: api/Jours/5
        [ResponseType(typeof(Jour))]
        public IHttpActionResult GetJour(int id)
        {
            Jour jour = db.Jours.Find(id);
            if (jour == null)
            {
                return NotFound();
            }

            return Ok(jour);
        }

        // PUT: api/Jours/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutJour(int id, JourDTO jour)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != jour.Id)
            {
                return BadRequest();
            }

            db.Entry(jour).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!JourExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Jours
        [ResponseType(typeof(Jour))]
        public IHttpActionResult PostJour(Jour jour)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Jours.Add(jour);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = jour.Id }, jour);
        }

        // DELETE: api/Jours/5
        [ResponseType(typeof(Jour))]
        public IHttpActionResult DeleteJour(int id)
        {
            Jour jour = db.Jours.Find(id);
            if (jour == null)
            {
                return NotFound();
            }

            db.Jours.Remove(jour);
            db.SaveChanges();

            return Ok(jour);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool JourExists(int id)
        {
            return db.Jours.Count(e => e.Id == id) > 0;
        }
    }
}