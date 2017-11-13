using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Models;
using Microsoft.AspNetCore.Cors;

namespace WebApplication1.Controllers
{
  [EnableCors("CorsDevPolicy")]
  [Produces("application/json")]
    [Route("api/Tables")]
    public class TablesController : Controller
    {
        private readonly ECommerceContext _context;

        public TablesController(ECommerceContext context)
        {
            _context = context;
        }

        // GET: api/Tables
        [HttpGet]
        public IEnumerable<Table> GetTable()
        {
            return _context.Table;
        }

    // GET: api/Tables/5
    [HttpGet("{id}")]
        public async Task<IActionResult> GetTable([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var table = await _context.Table.SingleOrDefaultAsync(m => m.Id == id);

            if (table == null)
            {
                return NotFound();
            }

            return Ok(table);
        }

    /*Moved to CartsController
        // PUT: api/Tables/
        [HttpPut]
        public Boolean verifyPurchase([FromBody] IEnumerable<Table> table)
        {
      double totalPrice = 0;
      foreach (Table _table in table)
      {
        totalPrice += _table.Price;
      }
            return totalPrice > 0;
        }
        */

    // POST: api/Tables

    [EnableCors("CorsDevPolicy")]
    [HttpPost]
        public async Task<IActionResult> PostTable([FromBody]Table table1)
        {
            
            _context.Table.Add(table1);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (TableExists(table1.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetTable", new { id = table1.Id }, table1);
        }

        // DELETE: api/Tables/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTable([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var table = await _context.Table.SingleOrDefaultAsync(m => m.Id == id);
            if (table == null)
            {
                return NotFound();
            }

            _context.Table.Remove(table);
            await _context.SaveChangesAsync();

            return Ok(table);
        }
    
        public String getTest()
        {
      return "Hello World";
        }
        private bool TableExists(int id)
        {
            return _context.Table.Any(e => e.Id == id);
        }
    }
}
