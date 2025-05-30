using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/usuario")]
public class UsuarioController : ControllerBase
{
    private readonly AppDbContext _context;
    private readonly ITokenService _tokenService;

    public UsuarioController(AppDbContext context, ITokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    [HttpPost("registrar")]
    public IActionResult Registrar([FromBody] Usuario usuario)
    {
        if (_context.Usuarios.Any(u => u.Email == usuario.Email))
            return BadRequest("Email já registrado.");

        _context.Usuarios.Add(usuario);
        _context.SaveChanges();

        return Ok(usuario);
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        var usuario = _context.Usuarios.FirstOrDefault(u => u.Email == request.Email && u.Senha == request.Senha);
        if (usuario == null)
            return Unauthorized("Credenciais inválidas.");

        var token = _tokenService.GenerateToken(usuario);
        return Ok(new { token });
    }
}

