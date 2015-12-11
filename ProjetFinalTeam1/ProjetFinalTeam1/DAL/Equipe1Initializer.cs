using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using ProjetFinalTeam1.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace ProjetFinalTeam1.DAL
{
    public class Equipe1Initializer : DropCreateDatabaseAlways<ApplicationDbContext>
    {

        protected override void Seed(ApplicationDbContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //

            UserManager<ApplicationUser> UserManager = new UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));


            //Users
            ApplicationUser admin = new ApplicationUser();
            admin.UserName = "Admin";
            admin.Email = "admin@admin.com";
            UserManager.Create(admin, "Passw0rd!");

            ApplicationUser hugoUser = new ApplicationUser();
            hugoUser.UserName = "hugo";
            hugoUser.Email = "hugo@hugo.com";
            UserManager.Create(hugoUser, "Passw0rd-");


            //Voyages

            //Jour

            //Activites

            //Transports

            context.SaveChanges();
            base.Seed(context);

        }
    }
}