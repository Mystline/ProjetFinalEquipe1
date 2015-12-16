using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System.Collections.Generic;
using System.Data.Entity;

namespace ProjetFinalTeam1.Models
{
    // Vous pouvez ajouter des données de profil pour l'utilisateur en ajoutant d'autres propriétés à votre classe ApplicationUser, consultez http://go.microsoft.com/fwlink/?LinkID=317594 pour en savoir davantage.
    public class ApplicationUser : IdentityUser
    {
        public virtual List<Voyage> Voyages { get; set; }
        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Notez que authenticationType doit correspondre à l'instance définie dans CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Ajouter des revendications d’utilisateur personnalisées ici
            return userIdentity;
        }
    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            /*modelBuilder.Entity<VoyageUser>().HasRequired(vu => vu.User).WithMany(u => u.VoyageUsers);
            modelBuilder.Entity<VoyageUser>().HasRequired(vu => vu.Voyage).WithMany(u => u.VoyageUsers);*/

            modelBuilder.Entity<Jour>().HasRequired(v => v.Voyage).WithMany(j => j.Jours);

            modelBuilder.Entity<Activite>().HasRequired(j => j.Jour).WithMany(a => a.Activites);

        } 
        
        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        public System.Data.Entity.DbSet<ProjetFinalTeam1.Models.Voyage> Voyages { get; set; }

        public System.Data.Entity.DbSet<ProjetFinalTeam1.Models.Jour> Jours { get; set; }

        public System.Data.Entity.DbSet<ProjetFinalTeam1.Models.Activite> Activites { get; set; }

        public System.Data.Entity.DbSet<ProjetFinalTeam1.Models.Transport> Transports { get; set; }
    }
}