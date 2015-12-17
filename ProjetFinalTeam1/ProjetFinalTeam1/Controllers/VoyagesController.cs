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
using System.Globalization;

namespace ProjetFinalTeam1.Controllers
{

    public class VoyagesController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Voyages
        public IQueryable<Voyage> GetVoyages()
        {
            return db.Voyages;
        }

        [Route("api/Voyages/GetVoyagesDTO")]
        public List<VoyageDTO> GetVoyagesDTO()
        {
            List<VoyageDTO> lstDTO = new List<VoyageDTO>();
            List<Voyage> lstJours = db.Voyages.ToList();

            foreach(Voyage v in lstJours)
            {
                lstDTO.Add(new VoyageDTO(v));
            }

            return lstDTO;
        }

        // GET: api/Voyages/5
        [ResponseType(typeof(Voyage))]
        public IHttpActionResult GetVoyage(int id)
        {
            Voyage voyage = db.Voyages.Find(id);
            if (voyage == null)
            {
                return NotFound();
            }

            return Ok(voyage);
        }

        // PUT: api/Voyages/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutVoyage(int id, Voyage voyage)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != voyage.Id)
            {
                return BadRequest();
            }

            db.Entry(voyage).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!VoyageExists(id))
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

        // POST: api/Voyages
        [ResponseType(typeof(VoyageDTO))]
        public IHttpActionResult PostVoyage(Voyage voyage)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            int lenght = voyage.NbDeJour;

            for(int i = 0; i < lenght; i++)
            {
                Jour temp = new Jour();
                temp.Voyage = voyage;
                temp.Date = voyage.DateTimeDebut.AddDays(i);
                temp.BudgetJournee = 0;
                db.Jours.Add(temp);
                voyage.Jours.Add(temp);
            }
            
            db.Voyages.Add(voyage);
            db.SaveChanges();

            VoyageDTO dto = new VoyageDTO(voyage);

            return Ok(dto);
        }

        // DELETE: api/Voyages/5
        [ResponseType(typeof(Voyage))]
        public IHttpActionResult DeleteVoyage(int id)
        {
            Voyage voyage = db.Voyages.Find(id);
            if (voyage == null)
            {
                return NotFound();
            }

            db.Voyages.Remove(voyage);
            db.SaveChanges();

            return Ok(voyage);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool VoyageExists(int id)
        {
            return db.Voyages.Count(e => e.Id == id) > 0;
        }
    }
}