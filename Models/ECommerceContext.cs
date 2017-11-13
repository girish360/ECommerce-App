using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using WebApplication1.Models;

namespace WebApplication1.Models
{
    public partial class ECommerceContext : DbContext
    {
        public virtual DbSet<Table> Table { get; set; }
    public virtual DbSet<Table> Cart { get; set; }

    public ECommerceContext(DbContextOptions options) : base(options)
        {
  }
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
      modelBuilder.Entity("WebApplication1.Models.Table", b =>
                 {
                   b.Property<int>("Id");

                   b.Property<string>("Descrption")
                                           .HasMaxLength(50)
                                           .IsUnicode(false);

                   b.Property<string>("Name")
                                          .IsRequired()
                                           .HasMaxLength(50)
                                           .IsUnicode(false);

                   b.Property<double>("Price");

                   b.HasKey("Id");

                   b.ToTable("Table");
                 });

      modelBuilder.Entity("WebApplication1.Models.Cart", b =>
      {
        b.Property<string>("Name");
        b.Property<int>("ItemId");

        b.HasKey("Name");

        b.ToTable("Cart");
      });
      /*
      modelBuilder.Entity<Cart>(entity =>
      {
        entity.Property(e => e.Name)
                   .IsRequired()
                   .HasMaxLength(50)
                   .IsUnicode(false);
        entity.HasKey(e => e.Name);
        entity.Property(e => e.ItemId).ValueGeneratedNever();

      });
      */
    }
    public DbSet<WebApplication1.Models.Cart> Cart_1 { get; set; }
    }
}
