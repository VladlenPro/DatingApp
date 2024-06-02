using APIVersion7.Entities;
using Microsoft.EntityFrameworkCore;

namespace APIVersion7.Data;

public class DataContext : DbContext
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }
    
    public DbSet<AppUser> Users { get; set; }
}