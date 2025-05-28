using Microsoft.EntityFrameworkCore;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    public DbSet<Usuario> Usuarios { get; set; }
    public DbSet<Evento> Eventos { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<Evento>()
            .HasOne(e => e.Criador)
            .WithMany(u => u.EventosCriados)
            .HasForeignKey(e => e.CriadorId);

        modelBuilder.Entity<Evento>()
            .HasMany(e => e.Participantes)
            .WithMany(u => u.EventosParticipando)
            .UsingEntity(j => j.ToTable("EventoParticipante"));
    }
}