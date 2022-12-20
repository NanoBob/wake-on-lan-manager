using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WakeOnLan.Web.Migrations
{
    public partial class LastKnownIp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "LastKnownIp",
                table: "Devices",
                type: "TEXT",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastKnownIp",
                table: "Devices");
        }
    }
}
