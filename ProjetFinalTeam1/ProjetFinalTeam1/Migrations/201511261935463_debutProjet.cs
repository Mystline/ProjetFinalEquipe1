namespace ProjetFinalTeam1.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class debutProjet : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.TransportActivites", "Transport_Id", "dbo.Transports");
            DropForeignKey("dbo.TransportActivites", "Activite_Id", "dbo.Activites");
            DropIndex("dbo.TransportActivites", new[] { "Transport_Id" });
            DropIndex("dbo.TransportActivites", new[] { "Activite_Id" });
            DropPrimaryKey("dbo.Transports");
            AddColumn("dbo.Transports", "longitudeDepart", c => c.String(nullable: false));
            AddColumn("dbo.Transports", "latitudeDepart", c => c.String(nullable: false));
            AlterColumn("dbo.Transports", "Id", c => c.Int(nullable: false));
            AddPrimaryKey("dbo.Transports", "Id");
            CreateIndex("dbo.Transports", "Id");
            AddForeignKey("dbo.Transports", "Id", "dbo.Activites", "Id");
            DropTable("dbo.TransportActivites");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.TransportActivites",
                c => new
                    {
                        Transport_Id = c.Int(nullable: false),
                        Activite_Id = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Transport_Id, t.Activite_Id });
            
            DropForeignKey("dbo.Transports", "Id", "dbo.Activites");
            DropIndex("dbo.Transports", new[] { "Id" });
            DropPrimaryKey("dbo.Transports");
            AlterColumn("dbo.Transports", "Id", c => c.Int(nullable: false, identity: true));
            DropColumn("dbo.Transports", "latitudeDepart");
            DropColumn("dbo.Transports", "longitudeDepart");
            AddPrimaryKey("dbo.Transports", "Id");
            CreateIndex("dbo.TransportActivites", "Activite_Id");
            CreateIndex("dbo.TransportActivites", "Transport_Id");
            AddForeignKey("dbo.TransportActivites", "Activite_Id", "dbo.Activites", "Id", cascadeDelete: true);
            AddForeignKey("dbo.TransportActivites", "Transport_Id", "dbo.Transports", "Id", cascadeDelete: true);
        }
    }
}
