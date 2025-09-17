using EmployeeAdminPortal.Data;
using EmployeeAdminPortal.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace EmployeeAdminPortal.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public ProductsController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public IActionResult GetAllProducts() => Ok(dbContext.Products.ToList());

        [HttpGet("{id:guid}")]
        public IActionResult GetProductById(Guid id)
        {
            var product = dbContext.Products.Find(id);
            if (product == null) return NotFound();
            return Ok(product);
        }

        [HttpPost]
        public IActionResult AddProduct(Product product)
        {
            dbContext.Products.Add(product);
            dbContext.SaveChanges();
            return Ok(product);
        }

        [HttpPut("{id:guid}")]
        public IActionResult UpdateProduct(Guid id, Product updatedProduct)
        {
            var product = dbContext.Products.Find(id);
            if (product == null) return NotFound();

            product.Name = updatedProduct.Name;
            product.Price = updatedProduct.Price;
            product.Description = updatedProduct.Description;

            dbContext.SaveChanges();
            return Ok(product);
        }

        [HttpDelete("{id:guid}")]
        public IActionResult DeleteProduct(Guid id)
        {
            var product = dbContext.Products.Find(id);
            if (product == null) return NotFound();

            dbContext.Products.Remove(product);
            dbContext.SaveChanges();
            return Ok();
        }
    }
}
