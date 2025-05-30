using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.InMemory;

var builder = WebApplication.CreateBuilder(args);

// JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        var key = Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"]);
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseInMemoryDatabase("MockDb"));

builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// ✅ Mock de usuários no banco em memória
using (var scope = app.Services.CreateScope())
{
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();

    if (!context.Usuarios.Any())
    {
        var usuario1 = new Usuario { Id = 1, Nome = "Alice", Email = "alice@test.com", Senha = "123" };
        var usuario2 = new Usuario { Id = 2, Nome = "Bob", Email = "bob@test.com", Senha = "123" };
        var usuario3 = new Usuario { Id = 3, Nome = "Omar", Email = "omar@test.com", Senha = "123" };

        var evento1 = new Evento
        {
            Id = 1,
            Nome = "Reunião Inicial",
            Descricao = "Reunião de kickoff do projeto",
            Data = DateTime.Today.AddHours(10),
            Local = "Zoom",
            Tipo = TipoEvento.Exclusivo,
            CriadorId = 1,
            Criador = usuario1,
            Ativo = true,
            Participantes = new List<Usuario> { usuario2 }
        };
        var evento2 = new Evento
        {
            Id = 2,
            Nome = "Happy Hour",
            Descricao = "Happy com a galera",
            Data = DateTime.Today.AddHours(18),
            Local = "Churrascaria",
            Tipo = TipoEvento.Compartilhado,
            CriadorId = 2,
            Criador = usuario3,
            Ativo = true,
            Participantes = new List<Usuario> { usuario3, usuario1, usuario2 }
        };

        context.Usuarios.AddRange(usuario1, usuario2, usuario3);
        context.Eventos.Add(evento1);
        context.Eventos.Add(evento2);
        context.SaveChanges();
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
