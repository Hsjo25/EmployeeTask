namespace EmployeeTask.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class In : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.Employee", "Mobile", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.Employee", "Mobile", c => c.String());
        }
    }
}
