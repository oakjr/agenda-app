[ApiController]
[Route("api/eventos")]
public class EventoController : ControllerBase
{
    private readonly AppDbContext _context;

    public EventoController(AppDbContext context)
    {
        _context = context;
    }

    [HttpPost]
    public IActionResult CriarEvento([FromBody] EventoDTO dto)
    {
        var evento = new Evento
        {
            Nome = dto.Nome,
            Descricao = dto.Descricao,
            Data = dto.Data,
            Local = dto.Local,
            Tipo = dto.Tipo,
            CriadorId = ObterUsuarioId()
        };

        evento.Participantes = _context.Usuarios
            .Where(u => dto.ParticipantesIds.Contains(u.Id))
            .ToList();

        _context.Eventos.Add(evento);
        _context.SaveChanges();
        return Ok();
    }

    private int ObterUsuarioId()
    {
        return int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
    }
}