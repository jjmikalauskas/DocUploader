using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using UploaderApp.API.Data;
using UploaderApp.API.Dtos;
using UploaderApp.API.Models;

namespace DatingApp.API.Controllers
{
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly ISendLinkRepository _repo;
        public ValuesController(DataContext context, ISendLinkRepository repo)
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

        [Route("api/[controller]/{id}")]
        // GET api/values/5
        [HttpGet]
        public async Task<IActionResult> Get(int id)
        {
            string s1 = "Not found";
            var value = await _context.Values.FirstOrDefaultAsync(x => x.Id == id);
            var doc = _repo.GetEmailLink(new Guid(), "2020-3815-1403-SS99").Result;
            if (doc!=null)
            {
                s1 = $"Sent {doc.DocumentFullName} to {doc.FirstName} {doc.LastName} at {doc.EmailAddress} at company {doc.Company}";
                Debug.WriteLine(s1);
            }
            return Ok(s1);
        }

        // POST api/values
        [HttpPost("api/sendlink")]
        public async Task<IActionResult> Post(DocumentInfo doc) //[FromBody] string value)
        {
            string s1 = $"Sent {doc.DocumentFullName} to {doc.FirstName} {doc.LastName} at {doc.EmailAddress} at company {doc.Company}";
            Debug.WriteLine(s1);
            // Add in useful values
            string sLink = GetNewEmailLinkId();
            doc.Description = sLink;
            doc.dateSent = DateTime.Now;
            doc.Status = "0-Sent";
            string[] files = doc.DocumentFullName.Split(';');

            var obj = JsonConvert.SerializeObject(s1);

            _repo.Add<DocumentInfo>(doc);

            if (await _repo.SaveAll())
                return Ok();

            return BadRequest("Error saving document/ email link info to database");
        }

        private string GetNewEmailLinkId()
        {
            return DateTime.Now.ToString("yyyy-mmdd-HHMM-SS")+"99";
        }

        // POST api/values
        [HttpPost("api/docs")]
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