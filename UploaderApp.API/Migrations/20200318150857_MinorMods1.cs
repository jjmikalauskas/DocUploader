using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace UploaderApp.API.Migrations
{
    public partial class MinorMods1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {           

            migrationBuilder.AlterColumn<string>(
                name: "UniqueLinkId",
                table: "DocumentInfo",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddColumn<string>(
                name: "Title",
                table: "DocumentInfo",
                nullable: true);

            // migrationBuilder.AddPrimaryKey(
            //     name: "PK_DocumentInfo",
            //     table: "DocumentInfo",
            //     column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_DocumentInfo",
                table: "DocumentInfo");

            migrationBuilder.DropColumn(
                name: "Title",
                table: "DocumentInfo");

            migrationBuilder.RenameTable(
                name: "DocumentInfo",
                newName: "MyProperty");

            migrationBuilder.AlterColumn<Guid>(
                name: "UniqueLinkId",
                table: "MyProperty",
                type: "uniqueidentifier",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_MyProperty",
                table: "MyProperty",
                column: "Id");
        }
    }
}
