using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UploaderApp.API.Data;
using UploaderApp.API.Dtos;

namespace DatingApp.API.Controllers
{
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext _context;
        public ValuesController(DataContext context)
        {
            _context = context;
        }

        // GET api/values
       // [Route("api/[controller]")]
        [HttpGet("send")]
        public async Task<ActionResult> Get()
        {
            var values = await _context.Values.ToListAsync();
            return Ok(values);
        }

        [Route("api/[controller]")]
        // GET api/values/5
        [HttpGet("{id}")]
        public async Task<IActionResult> Get(int id)
        {
             var value = await _context.Values.FirstOrDefaultAsync(x => x.Id == id);
            return Ok(value);
        }

         // POST api/values
        [HttpPost("api/send")]
        public IActionResult Post(SendingDocument doc ) //[FromBody] string value)
        {
            string[] s1 = doc.Documents;
            string[] s2 = doc.RecipientList;
            Debug.WriteLine(s2.ToList());
            return Ok(s2.ToList());
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