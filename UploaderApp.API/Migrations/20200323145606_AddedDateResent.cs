using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace UploaderApp.API.Migrations
{
    public partial class AddedDateResent : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "dateConfirmationSent",
                table: "DocumentInfo");

            migrationBuilder.AddColumn<DateTime>(
                name: "dateResent",
                table: "DocumentInfo",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "dateResent",
                table: "DocumentInfo");

            migrationBuilder.AddColumn<DateTime>(
                name: "dateConfirmationSent",
                table: "DocumentInfo",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
