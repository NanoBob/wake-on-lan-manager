using Microsoft.EntityFrameworkCore;
using WakeOnLan.Web.Models;

namespace WakeOnLan.Web.Persistence
{
    public class WakeContext : DbContext
    {
        public DbSet<Device> Devices { get; set; } = null!;

        public WakeContext() : base()
        {

        }

        public WakeContext(DbContextOptions options) : base(options)
        {
            if (Database.GetPendingMigrations().Any())
            {
                Database.Migrate();
            }
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite(@"Data Source=devices.db");
        }
    }
}
