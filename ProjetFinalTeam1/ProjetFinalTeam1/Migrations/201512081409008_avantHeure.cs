namespace ProjetFinalTeam1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class avantHeure : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Activites", "HeureDebut", c => c.DateTime(nullable: false));
            AddColumn("dbo.Activites", "HeureFin", c => c.DateTime(nullable: false));
            AddColumn("dbo.Voyages", "NbDeJour", c => c.Int(nullable: false));
            DropColumn("dbo.Activites", "DateTimeDebut");
            DropColumn("dbo.Activites", "DateTimeFin");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Activites", "DateTimeFin", c => c.DateTime(nullable: false));
            AddColumn("dbo.Activites", "DateTimeDebut", c => c.DateTime(nullable: false));
            DropColumn("dbo.Voyages", "NbDeJour");
            DropColumn("dbo.Activites", "HeureFin");
            DropColumn("dbo.Activites", "HeureDebut");
        }
    }
}
