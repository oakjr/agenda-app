// MODELS

public enum TipoEvento
{
    Exclusivo,
    Compartilhado
}

public class Usuario
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Email { get; set; }
    public string Senha { get; set; } // Criptografada
    public List<Evento> EventosCriados { get; set; } = new();
    public List<Evento> EventosParticipando { get; set; } = new();
}

public class Evento
{
    public int Id { get; set; }
    public string Nome { get; set; }
    public string Descricao { get; set; }
    public DateTime Data { get; set; }
    public string Local { get; set; }
    public TipoEvento Tipo { get; set; }
    public bool Ativo { get; set; } = true;

    public int CriadorId { get; set; }
    public Usuario Criador { get; set; }
    public List<Usuario> Participantes { get; set; } = new();

}

// DTOs
public class LoginRequest
{
    public string Email { get; set; }
    public string Senha { get; set; }
}

public class EventoDTO
{
    public string Nome { get; set; }
    public string Descricao { get; set; }
    public DateTime Data { get; set; }
    public string Local { get; set; }
    public TipoEvento Tipo { get; set; }
    public List<int> ParticipantesIds { get; set; } = new();
}
