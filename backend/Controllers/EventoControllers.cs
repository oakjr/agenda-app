using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

[ApiController]
[Route("api/eventos")]
[Authorize]
public class EventoController : ControllerBase
{
    private readonly AppDbContext _context;

    public EventoController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult Get([FromQuery] string? search, [FromQuery] DateTime? data)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var query = _context.Eventos
            .Where(e => e.CriadorId == userId || e.Participantes.Any(p => p.Id == userId));

        if (!string.IsNullOrEmpty(search))
            query = query.Where(e => e.Nome.Contains(search) || e.Descricao.Contains(search));

        if (data.HasValue)
            query = query.Where(e => e.Data.Date == data.Value.Date);

        return Ok(query.ToList());
    }

    [HttpGet("hoje")]
    public IActionResult EventosHoje()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var hoje = DateTime.Today;
        var eventos = _context.Eventos
            .Where(e => (e.CriadorId == userId || e.Participantes.Any(p => p.Id == userId)) && e.Data.Date == hoje)
            .ToList();
        return Ok(eventos);
    }

    [HttpGet("semana")]
    public IActionResult EventosSemana()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var hoje = DateTime.Today;
        var inicioSemana = hoje.AddDays(-(int)hoje.DayOfWeek);
        var fimSemana = inicioSemana.AddDays(7);

        var eventos = _context.Eventos
            .Where(e => (e.CriadorId == userId || e.Participantes.Any(p => p.Id == userId)) && e.Data >= inicioSemana && e.Data < fimSemana)
            .ToList();
        return Ok(eventos);
    }

    [HttpGet("mes")]
    public IActionResult EventosMes()
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);
        var hoje = DateTime.Today;
        var inicioMes = new DateTime(hoje.Year, hoje.Month, 1);
        var fimMes = inicioMes.AddMonths(1);

        var eventos = _context.Eventos
            .Where(e => (e.CriadorId == userId || e.Participantes.Any(p => p.Id == userId)) && e.Data >= inicioMes && e.Data < fimMes)
            .ToList();
        return Ok(eventos);
    }

    [HttpPost]
    public IActionResult CriarEvento([FromBody] EventoDTO dto)
    {
        var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)!);

        var evento = new Evento
        {
            Nome = dto.Nome,
            Descricao = dto.Descricao,
            Data = dto.Data,
            Local = dto.Local,
            Tipo = dto.Tipo,
            Ativo = true,
            CriadorId = userId,
            Participantes = _context.Usuarios.Where(u => dto.ParticipantesIds.Contains(u.Id)).ToList()
        };

        _context.Eventos.Add(evento);
        _context.SaveChanges();
        return Created($"/api/eventos/{evento.Id}", evento);
    }

    [HttpPut("{id}")]
    public IActionResult EditarEvento(int id, [FromBody] EventoDTO dto)
    {
        var evento = _context.Eventos.Include(e => e.Participantes).FirstOrDefault(e => e.Id == id);
        if (evento == null) return NotFound();

        evento.Nome = dto.Nome;
        evento.Descricao = dto.Descricao;
        evento.Data = dto.Data;
        evento.Local = dto.Local;
        evento.Tipo = dto.Tipo;
        evento.Participantes = _context.Usuarios.Where(u => dto.ParticipantesIds.Contains(u.Id)).ToList();

        _context.SaveChanges();
        return Ok(evento);
    }

    [HttpPatch("{id}/status")]
    public IActionResult AlterarStatusEvento(int id, [FromQuery] bool ativo)
    {
        var evento = _context.Eventos.Find(id);
        if (evento == null) return NotFound();

        evento.Ativo = ativo;
        _context.SaveChanges();
        return Ok(evento);
    }

    [HttpDelete("{id}")]
    public IActionResult RemoverEvento(int id)
    {
        var evento = _context.Eventos.Include(e => e.Participantes).FirstOrDefault(e => e.Id == id);
        if (evento == null) return NotFound();

        evento.Participantes.Clear();
        _context.Eventos.Remove(evento);
        _context.SaveChanges();
        return NoContent();
    }
}
