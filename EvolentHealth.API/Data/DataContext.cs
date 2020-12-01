
using EvolentHealth.API.Models;
using Microsoft.EntityFrameworkCore;

namespace EvolentHealth.API.Data
{
    public class DataContext  : DbContext 
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }
        public DbSet<Contact> Contacts { get; set; }
    }
}