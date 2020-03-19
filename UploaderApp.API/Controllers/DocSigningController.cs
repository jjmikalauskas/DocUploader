using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using UploaderApp.API.Data;
using UploaderApp.API.Dtos;
using UploaderApp.API.Models;

namespace UploaderApp.API.Controllers
{
    [ApiController]
    public class LicensingController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ISendLinkRepository _repo;
        public LicensingController(DataContext context, ISendLinkRepository repo)
        {
            _repo = repo;
            _context = context;
        }

        // GET api/values
        // [Route("api/[controller]")]
        [HttpGet("api/[controller]")]
        public async Task<ActionResult> Get()
        {
            var values = await _context.Values.ToListAsync();
            return Ok(values);
        }

        [Route("api/values/{id}")]
        // GET api/values/5
        [HttpGet]
        public async Task<IActionResult> Get(int id)
        {
            var value = await _context.Values.FirstOrDefaultAsync(x => x.Id == id);           
            return Ok(value.Name);
        }

        [Route("/[controller]/{emaillink}")]
        // Get api/licesing/5
        [HttpGet]
        public IActionResult GetDocInfo(string emaillink)
        {
            string s1 = "not found";
            var doc = _repo.GetEmailLink(new Guid(), emaillink).Result;
            if (doc!=null)
            {
                s1 = $"Sent {doc.DocumentFullName} to {doc.FirstName} {doc.LastName} at {doc.EmailAddress} at company {doc.Company}";
                return Ok(doc);
            }
            return NoContent();
        }

        // POST api/values
        [HttpPost("/sendlink")]
        public async Task<IActionResult> Post(DocumentInfo doc) //[FromBody] string value)
        {
            string s1 = $"Sent {doc.DocumentFullName} to {doc.FirstName} {doc.LastName} at {doc.EmailAddress} at company {doc.Company}";
            Debug.WriteLine(s1);
            // Add in useful values
            string sLink = GetNewEmailLinkId();
            doc.Description = sLink;
            doc.UniqueLinkId = sLink;
            doc.dateSent = DateTime.Now;
            doc.Status = "Sent";
            string[] files = doc.DocumentFullName.Split(';');
            // TESTING
            if (string.IsNullOrEmpty(doc.DocumentFullName))
                doc.DocumentFullName = "donttread.jfif";

            _repo.Add<DocumentInfo>(doc);

            if (await _repo.SaveAll())
            {
                string from = "johnmik35@hotmail.com";
                string to = doc.EmailAddress;
                string subject = "Master Sales Agreement for IndxLogic";

                MailMessage msg = CreateMsg(sLink, from, to, subject);
                SendMsg(msg);
                
                // CreatedAtRouteResult carr = CreatedAtRoute("GetEmailLink", new { emaillink = sLink });
                return Created("GetEmailLink", new { emaillink = sLink }); // carr;
            }

            return BadRequest("Error saving document/ email link info to database");
        }


        [HttpGet("emaillink", Name="GetEmailLink")]
        public IActionResult GetEmailLink(string emaillink)
        {
            return Ok(emaillink);
        }


        private bool SendMsg(MailMessage msg)
        {
            SmtpClient sv = new SmtpClient("smtp.gmail.com", 587);
            sv.EnableSsl = true;
            sv.Credentials = new NetworkCredential("cxmikalauskas@gmail.com", "So1omonOrange");

            try
            {
                sv.Send(msg);
                Console.WriteLine("email Sent");
            }
            catch (Exception ex)
            {
                Console.WriteLine("email not sent");
                Console.WriteLine(ex.Message);
                return false;
            }
            return true;
        }

        private string signingBase = "localhost:5000/licensing/";

        private MailMessage CreateMsg(string uniqueId, string from, string to, string subject)
        {
            MailMessage msg = null;
            string body = "Hi. Thanks for your business. Please click this link to sign the licensing agreement. Your id is" + uniqueId;
            // body += $"<button><a href='{signingBase}/{uniqueId}'></a></button>";
            // body += "<button style ='background-color='#1800ff'' > " + "" +
            //     "<a style='font-size:20px;font-family:Arial;color:#ffffff;text-align:center;text-decoration:none;display:block;" +
            //     "background-color:#1800ff;border:1px solid #1800ff;padding:12px 32px;border-radius:3px" +
            //     "' href='http://www.google.com'" + uniqueId  + ">" +
            //     "</a></button>";

          body += @"<button type='button' style ='background-color:#1800ff'>
        <a style='font-size:20px;font-family:Arial;color:#ffffff;text-align:center;text-decoration:none;display:block;
                  background-color:#1800ff;border:1px solid #1800ff;padding:12px 32px;border-radius:3px' href='http://localhost:4200/sign-doc/" + uniqueId + @"'>Click to view
        </a></button>";

            msg = new MailMessage(from, to, subject, body);
            msg.IsBodyHtml = true;
            return msg;
        }

        private string GetNewEmailLinkId()
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var stringChars = new char[16];
            var random = new Random();

            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }
            // var UniqueID = new String(stringChars);
            return new String(stringChars);
        }

        // POST api/values
        [HttpPost("/docs")]
        public IActionResult PostDocs([FromForm] FilesForUpload doc) //[FromBody] string value)
        {
            var file = doc.File;

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    // var uploadParams = new ImageUploadParams() { 
                    //     File = new FileDescription(file.Name, stream),
                    //     Transformation = new Transformation().Width(500).Height(500).Crop("fill").Gravity("face")
                    // };
                    // uploadResult = _cloudinary.Upload(uploadParams);
                }
            }
            return Ok(file.Length.ToString());
        }       

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}