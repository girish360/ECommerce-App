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
    [Produces("application/json")]
    [Route("api/Carts")]
    public class CartsController : Controller
    {
        private readonly ECommerceContext _context;

        public CartsController(ECommerceContext context)
        {
            _context = context;
        }

        // GET: api/Carts
        [HttpGet]
        public IEnumerable<Cart> GetCart_1()
        {
            return _context.Cart_1;
        }

        // GET: api/Carts/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCart([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cart = await _context.Cart_1.SingleOrDefaultAsync(m => m.Name == id);

            if (cart == null)
            {
                return NotFound();
            }

            return Ok(cart);
        }

    //can't async this for some reason research why
    // PUT: api/Carts/
    [EnableCors("CorsDevPolicy")]
    [HttpPut]
      public Boolean verifyPurchase()
      {

      double totalPrice = 0;
      List<Cart> carts = _context.Cart_1.ToList();
      List<Table> tables = _context.Table.ToList();
      foreach(Table _table in tables)
      {
        System.Console.WriteLine(_table.Name);
        System.Console.WriteLine(_table.Id);
      }
      foreach (Cart _table in carts)
      {

        System.Console.WriteLine(_table.ItemId);
      }
      foreach (Cart cartItem in carts )
      {
        foreach (Table _table in tables)
        {
          if (_table.Id == cartItem.ItemId)
          {
            if (_table.Price > 0)
            {

              totalPrice += _table.Price;
            }
            else
            {
              return false;
            }
          }
        }
      }
      System.Console.WriteLine(totalPrice > 0);
      return totalPrice > 0;

    }

        // POST: api/Carts
        [HttpPost]
        public async Task<IActionResult> PostCart([FromBody] Cart cart)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Cart_1.Add(cart);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCart", new { id = cart.Name }, cart);
        }

        // DELETE: api/Carts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCart([FromRoute] string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var cart = await _context.Cart_1.FirstOrDefaultAsync(m => m.Name == id);
            if (cart == null)
            {
                return NotFound();
            }

            _context.Cart_1.Remove(cart);
            await _context.SaveChangesAsync();

            return Ok(cart);
        }

        private bool CartExists(string id)
        {
            return _context.Cart_1.Any(e => e.Name == id);
        }
    }
}
