namespace APIWeb.Pessoas
{
    public record PessoaDto(int Id, string? Nome, DateOnly? DataNascimento, bool? Inativo, short? Nacionalidade, string? RG, string? Passaporte);
}
