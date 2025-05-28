builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddDbContext<AppDbContext>(options => options.UseSqlServer("SuaStringDeConexao"));