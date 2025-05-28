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

    [HttpPost("login")]
    public IActionResult Login([FromBody] LoginRequest request)
    {
        var usuario = _context.Usuarios.FirstOrDefault(u => u.Email == request.Email);
        if (usuario == null || usuario.Senha != request.Senha)
        {
            return Unauthorized("Credenciais inválidas");
        }

        var token = _tokenService.GenerateToken(usuario);
        return Ok(new { token });
    }

    [HttpPost("registrar")]
    public IActionResult Registrar([FromBody] Usuario novoUsuario)
    {
        _context.Usuarios.Add(novoUsuario);
        _context.SaveChanges();
        return Ok();
    }
}
