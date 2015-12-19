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
    public class ActivitesController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Activites
        public IQueryable<Activite> GetActivites()
        {
            return db.Activites;
        }

       

        [Route("api/Activites/GetActivitesJour")]
        public List<ActiviteDTO> GetActivitesJour(int jourId)
        {
            Jour jour = db.Jours.Find(jourId);
            List<ActiviteDTO> lstDTO = new List<ActiviteDTO>();
            List<Activite> lstActivite = db.Activites.Where(a => a.Jour.Id == jour.Id).ToList();

            foreach(Activite a in lstActivite)
            {
                lstDTO.Add(new ActiviteDTO(a));
            }

            return lstDTO;
        }

        // GET: api/Activites/5
        [ResponseType(typeof(Activite))]
        public IHttpActionResult GetActivite(int id)
        {
            Activite activite = db.Activites.Find(id);
            if (activite == null)
            {
                return NotFound();
            }

            return Ok(activite);
        }

        // PUT: api/Activites/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutActivite(int id, Activite activite)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != activite.Id)
            {
                return BadRequest();
            }

            db.Entry(activite).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActiviteExists(id))
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

        [Route("api/Jours/PostActiviteCustom")]
        public int PostActiviteCustom(int id, Activite activite)
        {
            activite.Jour = db.Jours.FirstOrDefault(j => j.Id == activite.Jour.Id);


            db.Jours.FirstOrDefault(j => j.Id == activite.Jour.Id).Activites.Add(activite);
            db.Entry(db.Jours.FirstOrDefault(j => j.Id == activite.Jour.Id)).State = EntityState.Modified;

            db.Activites.Add(activite);
            db.SaveChanges();

            return 0;
        }

        // POST: api/Activites
        [ResponseType(typeof(Activite))]
        public IHttpActionResult PostActivite(Activite activite)
        {
            //activite.HeureDebut = DateTime.Now;
            //activite.HeureFin = DateTime.Now;
            activite.Jour = db.Jours.FirstOrDefault(j => j.Id == activite.Jour.Id);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Jours.FirstOrDefault(j => j.Id == activite.Jour.Id).Activites.Add(activite);
            db.Entry(db.Jours.FirstOrDefault(j => j.Id == activite.Jour.Id)).State = EntityState.Modified;

            db.Activites.Add(activite);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = activite.Id }, activite.Id);
        }

        // DELETE: api/Activites/5
        [ResponseType(typeof(Activite))]
        public IHttpActionResult DeleteActivite(int id)
        {
            Activite activite = db.Activites.Find(id);
            if (activite == null)
            {
                return NotFound();
            }

            db.Activites.Remove(activite);
            db.SaveChanges();

            return Ok(activite);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ActiviteExists(int id)
        {
            return db.Activites.Count(e => e.Id == id) > 0;
        }
    }
}