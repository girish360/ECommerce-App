using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace WebApplication1.Models
{
    public partial class ECommerceContext : DbContext
    {
        public virtual DbSet<Table> Table { get; set; }
    public virtual DbSet<Table> Cart { get; set; }
    public virtual DbSet<Table> SuperSecret { get; set; }

    public ECommerceContext(DbContextOptions options) : base(options)
        {
  } 
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
      modelBuilder.Entity<Table>(entity =>
      {
        entity.Property(e => e.Id).ValueGeneratedNever();

        entity.Property(e => e.Descrption)
            .HasMaxLength(50)
            .IsUnicode(false);

        entity.Property(e => e.Name)
            .IsRequired()
            .HasMaxLength(50)
            .IsUnicode(false);
      });

      modelBuilder.Entity<Cart>(entity =>
      {
        entity.Property(e => e.ItemId).ValueGeneratedNever();
        entity.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50)
                    .IsUnicode(false);
        entity.HasKey(e => e.Name);
      });

      modelBuilder.Entity<SuperSecret>(entity =>
      {
        entity.Property(e => e.Id).ValueGeneratedNever();
        //entity.HasKey(e => e.Id);
      });
    }
}
