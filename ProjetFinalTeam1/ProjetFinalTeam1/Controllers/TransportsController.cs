﻿using System;
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
    public class TransportsController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        //GET api/Transports/GetTransportsJour
        [Route("api/Transports/GetTransportsJour")]
        public List<Transport> GetTransportsJour(int jourId)
        {
            List<Transport> lstTransports = new List<Transport>();
            lstTransports = db.Transports.Where(t => t.Jour.Id == jourId).ToList();
            return lstTransports;
        }

        //GET api/Transports/GetTransportsVoyage
        [Route("api/Transports/GetTransportsVoyage")]
        public List<Transport> GetTransportsVoyage(int voyageId)
        {
            List<Transport> lstTransports = new List<Transport>();
            lstTransports = db.Transports.Where(t => t.Jour.Voyage.Id == voyageId).ToList();
            return lstTransports;
        }

        // GET api/Transports
        public IQueryable<Transport> GetTransports()
        {
            return db.Transports;
        }

        // GET api/Transports/5
        [ResponseType(typeof(Transport))]
        public IHttpActionResult GetTransport(int id)
        {
            Transport transport = db.Transports.Find(id);
            if (transport == null)
            {
                return NotFound();
            }

            return Ok(transport);
        }

        // PUT api/Transports/5
        public IHttpActionResult PutTransport(int id, Transport transport)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != transport.Id)
            {
                return BadRequest();
            }

            db.Entry(transport).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TransportExists(id))
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

        // POST api/Transports
        [ResponseType(typeof(Transport))]
        public IHttpActionResult PostTransport(Transport transport)
        {
            transport.Jour = db.Jours.FirstOrDefault(j => j.Id == transport.Jour.Id);

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            db.Jours.FirstOrDefault(j => j.Id == transport.Jour.Id).Transports.Add(transport);
            db.Entry(db.Jours.FirstOrDefault(j => j.Id == transport.Jour.Id)).State = EntityState.Modified;

            db.Transports.Add(transport);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = transport.Id }, transport);
        }

        // DELETE api/Transports/5
        [ResponseType(typeof(Transport))]
        public IHttpActionResult DeleteTransport(int id)
        {
            Transport transport = db.Transports.Find(id);
            if (transport == null)
            {
                return NotFound();
            }

            db.Transports.Remove(transport);
            db.SaveChanges();

            return Ok(transport);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TransportExists(int id)
        {
            return db.Transports.Count(e => e.Id == id) > 0;
        }
    }
}