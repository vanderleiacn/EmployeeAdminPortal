using EmployeeAdminPortal.Models;
using EmployeeAdminPortal.Models.Entities;
using Microsoft.EntityFrameworkCore;

namespace EmployeeAdminPortal.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        // Adicione aqui as tabelas
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Product> Products { get; set; }   // caso já tenha criado Product
    }
}
